import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Keep if used for other things or remove if 100% unused
import { currentUser, beneficiaries, transactionHistory } from '../../../mockData';
import type { Beneficiary } from '../../../types';
import type { Message, ChatState } from '../types';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { INTEREST_RATES, UNSUPPORTED_PRODUCTS } from '../constants/policyData';

const INITIAL_MESSAGE: Message = { id: '1', text: `Chào ${currentUser.fullName}, tôi có thể giúp gì cho bạn?`, sender: 'bot' };

export const useChatController = () => {
    // const navigate = useNavigate(); // Unused
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [chatState, setChatState] = useState<ChatState>('IDLE');
    const [pendingTransfer, setPendingTransfer] = useState<{ amount?: number; beneficiary?: Beneficiary }>({});

    // Unique ID generator to prevent duplicate keys
    const generateId = (() => {
        let counter = 0;
        return () => `msg_${Date.now()}_${++counter}`;
    })();

    // Helper to add bot message
    const addBotMessage = (text: string, type: Message['type'] = 'text', extra?: Partial<Message>) => {
        setMessages(prev => [...prev, {
            id: generateId(),
            text,
            sender: 'bot',
            type,
            ...extra
        }]);
    };

    const addAgentMessage = (text: string) => {
        setMessages(prev => [...prev, {
            id: generateId(),
            text,
            sender: 'agent',
            type: 'text'
        }]);
    };

    const triggerHandover = (reason: 'angry' | 'loan_inquiry') => {
        // Prevent double trigger
        setChatState('HANDOVER_PENDING'); // Immediate blocking state

        const reply = reason === 'angry'
            ? "Xin lỗi vì trải nghiệm chưa tốt. Hệ thống ghi nhận bạn đang không hài lòng. Tôi đã chuyển cuộc hội thoại cho nhân viên CSKH ưu tiên xử lý ngay."
            : "Vấn đề này cần nhân viên hỗ trợ. Tôi đang kết nối bạn với nhân viên tư vấn...";

        addBotMessage(reply, 'handover_alert');

        // Simulate Connection Delay
        setTimeout(() => {
            setMessages(prev => [...prev, { id: generateId(), text: "--- Đang kết nối với Nhân viên tư vấn. Vui lòng chờ trong giây lát ---", sender: 'bot', type: 'text' }]); // System msg

            setTimeout(() => {
                setChatState('HUMAN_CONNECTED');
                addAgentMessage(`Chào anh/chị ${currentUser.fullName}, em có thể hỗ trợ mình về vấn đề gì ạ?`);
            }, 2500);
        }, 1500);
    };

    // --- LOGIC HELPERS ---
    /* const extractAmount = (text: string): number | null => {
        const lower = text.toLowerCase().replace(/,/g, '').replace(/\./g, '');
        let multiplier = 1;
        if (lower.includes('k') || lower.includes('nghìn')) multiplier = 1000;
        if (lower.includes('tr') || lower.includes('triệu')) multiplier = 1000000;
        const match = lower.match(/(\d+)/);
        return match ? parseInt(match[0]) * multiplier : null;
    }; */

    const findBeneficiary = (text: string): Beneficiary | undefined => {
        const lowerText = text.toLowerCase();
        const exact = beneficiaries.find(b => lowerText.includes(b.name.toLowerCase()));
        if (exact) return exact;
        const ignore = ['chuyển', 'tiền', 'cho', 'tới', 'vnd', 'đ', 'k'];
        const tokens = lowerText.split(/\s+/).filter(t => !ignore.includes(t) && t.length >= 2 && !/\d/.test(t));
        for (const token of tokens) {
            const match = beneficiaries.find(b => b.name.toLowerCase().split(/\s+/).some(p => p.includes(token)));
            if (match) return match;
        }
        return undefined;
    };

    // --- MAIN PROCESSOR ---
    const processMessage = (text: string) => {
        const lower = text.toLowerCase();

        // 0. HUMAN AGENT MODE
        if (chatState === 'HUMAN_CONNECTED' || chatState === 'HANDOVER_PENDING') {
            return;
        }

        // 1. GLOBAL ANGER DETECTION (Priority #1)
        const sentiment = analyzeSentiment(text);
        if (sentiment === 'angry') {
            triggerHandover('angry');
            return;
        }

        // 2. Reset
        if (lower.includes('hủy') || lower.includes('reset')) {
            setChatState('IDLE');
            setPendingTransfer({});
            addBotMessage('Đã hủy yêu cầu.');
            return;
        }

        // 3. Balance Inquiry (AI-01)
        if (lower.includes('số dư') || lower.includes('bao nhiêu tiền') || lower.includes('tiền trong ví') || lower.includes('tra cứu số dư') || lower.includes('tài khoản')) {
            addBotMessage(`Số dư hiện tại của bạn là ${currentUser.balance.toLocaleString('vi-VN')} VND.`);
            return;
        }

        // 3.5. Transaction History
        if (lower.includes('lịch sử') || lower.includes('giao dịch') || lower.includes('sao kê') || lower.includes('history')) {
            // Mock history response
            addBotMessage("Dưới đây là 5 giao dịch gần nhất của bạn:");
            setTimeout(() => {
                // In a real app, this would be a structured message or card
                const historyText = transactionHistory.slice(0, 5).map(t =>
                    `- ${t.date}: ${t.type === 'in' ? '+' : '-'}${t.amount.toLocaleString()} VND (${t.description})`
                ).join('\n');
                addBotMessage(historyText);
            }, 500);
            return;
        }

        // 4. Interest Rate Query (AI-02, AI-03)
        if (lower.includes('lãi suất') || lower.includes('tiết kiệm')) {
            // Check for unsupported products (AI-03 Hallucination Prevention)
            const isUnsupported = UNSUPPORTED_PRODUCTS.some(p => lower.includes(p));
            if (isUnsupported) {
                addBotMessage('Xin lỗi, OCB hiện chưa hỗ trợ tiền điện tử hoặc các tài sản số. Vui lòng liên hệ hotline 1800 6678 để biết thêm chi tiết.');
                return;
            }

            // Extract term
            let term = '6'; // default
            if (lower.includes('12 tháng') || lower.includes('1 năm')) term = '12';
            else if (lower.includes('3 tháng')) term = '3';

            const rateInfo = INTEREST_RATES[term as keyof typeof INTEREST_RATES];
            if (rateInfo) {
                addBotMessage(`Lãi suất tiết kiệm online kỳ hạn ${rateInfo.term} là ${rateInfo.rate}%/năm.`, 'interest_rate');
            } else {
                addBotMessage('Xin lỗi, không tìm thấy thông tin lãi suất cho kỳ hạn này.');
            }
            return;
        }

        // 5. Loan Logic (Specific Handover Trigger)
        if (lower.includes('vay') || lower.includes('khoản vay')) {
            addBotMessage("Dựa trên lịch sử tín dụng của bạn, OCB không thể cho bạn sử dụng Khoản vay của ngân hàng.");
            setChatState('LOAN_DENIED');
            return;
        }

        // 4. Loan Denied - Why? (Case Specific Handover)
        if (chatState === 'LOAN_DENIED') {
            if (sentiment === 'inquisitive') {
                triggerHandover('loan_inquiry');
                return;
            }
        }

        // 5. Spending Analysis
        if (lower.includes('chi tiêu') || (lower.includes('bao nhiêu') && lower.includes('tháng này'))) {
            const mockSpending = {
                total: 15450000, limit: 10000000,
                categories: [
                    { label: 'Ăn uống', amount: 5450000, color: 'bg-orange-400' },
                    { label: 'Mua sắm', amount: 4800000, color: 'bg-blue-400' },
                    { label: 'Di chuyển', amount: 3200000, color: 'bg-green-400' },
                    { label: 'Khác', amount: 2000000, color: 'bg-gray-300' },
                ]
            };
            const diff = mockSpending.total - mockSpending.limit;
            addBotMessage(
                `⚠️ Tổng chi tiêu tháng này của bạn là ${mockSpending.total.toLocaleString('vi-VN')} VND. Bạn đã vượt hạn mức ${diff.toLocaleString('vi-VN')} VND!`,
                'spending_chart',
                { spendingData: mockSpending }
            );
            return;
        }

        // 6. Transfer Flow
        // FIX: Use centralized extractAmount to handle negative numbers correctly if we imported it, 
        // but here we can just fix the local logic or manually check for negative.
        // Let's implement negative check logic here directly for simplicity as I can't easily add imports in this Replace block without affecting top file.

        let amount = null;
        const lowerForAmount = text.toLowerCase().replace(/,/g, '').replace(/\./g, '');

        // Critical Fix: Check for negative sign
        const isNegative = lowerForAmount.includes('-') || lowerForAmount.includes('âm') || lowerForAmount.includes('trừ');

        if (!isNegative) {
            let multiplier = 1;
            if (lowerForAmount.includes('k') || lowerForAmount.includes('nghìn')) multiplier = 1000;
            if (lowerForAmount.includes('tr') || lowerForAmount.includes('triệu')) multiplier = 1000000;
            const match = lowerForAmount.match(/(\d+)/);
            if (match) amount = parseInt(match[0]) * multiplier;
        } else {
            // If negative detected
            const match = lowerForAmount.match(/(\d+)/);
            if (match) amount = -1 * parseInt(match[0]); // Mark as negative
        }

        // IMMEDIATE VALIDATION
        if (amount !== null && amount < 0) {
            addBotMessage("Số tiền không hợp lệ. Số tiền phải là số dương.");
            return;
        }

        const ben = findBeneficiary(text);
        const hasIntent = lower.includes('chuyển') || lower.includes('ck');

        if (chatState === 'AWAITING_AMOUNT' && amount) {
            const newData = { ...pendingTransfer, amount };
            if (newData.beneficiary) finalizeTransfer(newData as any);
            else {
                setPendingTransfer(newData);
                setChatState('AWAITING_BENEFICIARY');
                addBotMessage(`Chuyển ${amount.toLocaleString()} VND cho ai?`, 'beneficiary_list', { beneficiaryList: beneficiaries });
            }
            return;
        }

        if (chatState === 'AWAITING_BENEFICIARY' && ben) {
            handleSelectBeneficiary(ben);
            return;
        }

        if (hasIntent || (amount && ben)) {
            if (amount && ben) finalizeTransfer({ amount, beneficiary: ben });
            else if (amount) {
                setPendingTransfer({ amount });
                setChatState('AWAITING_BENEFICIARY');
                addBotMessage(`Chuyển ${amount.toLocaleString()} VND cho ai?`, 'beneficiary_list', { beneficiaryList: beneficiaries });
            } else if (ben) {
                setPendingTransfer({ beneficiary: ben });
                setChatState('AWAITING_AMOUNT');
                addBotMessage(`Bạn muốn chuyển bao nhiêu cho ${ben.name}?`);
            } else {
                setChatState('AWAITING_AMOUNT');
                addBotMessage('Bạn muốn chuyển bao nhiêu tiền?');
            }
            return;
        }

        // Default
        addBotMessage('Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi về "Khoản vay", "Chuyển tiền", hoặc "Chi tiêu".');
    };

    const handleSelectBeneficiary = (ben: Beneficiary) => {
        if (chatState === 'AWAITING_BENEFICIARY') {
            finalizeTransfer({ ...pendingTransfer, beneficiary: ben } as any);
        } else if (chatState === 'IDLE') {
            setPendingTransfer({ beneficiary: ben });
            setChatState('AWAITING_AMOUNT');
            addBotMessage(`Bạn muốn chuyển bao nhiêu cho ${ben.name}?`);
        } else {
            finalizeTransfer({ amount: pendingTransfer.amount || 0, beneficiary: ben });
        }
    };

    const finalizeTransfer = (data: { amount: number, beneficiary: Beneficiary }) => {
        setChatState('IDLE');
        setPendingTransfer({});
        setTimeout(() => {
            addBotMessage('Vui lòng xác nhận thông tin:', 'transfer_confirmation', {
                transferDetails: {
                    name: data.beneficiary.name,
                    accountNumber: data.beneficiary.accountNumber,
                    bankName: data.beneficiary.bankShortName,
                    amount: data.amount,
                }
            });
        }, 500);
    };

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { id: generateId(), text, sender: 'user' }]);
        setTimeout(() => processMessage(text), 600);
    };

    const handleFeedback = (id: string, type: 'like' | 'dislike') => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback: type } : m));
    };

    return { messages, chatState, sendMessage, handleFeedback, handleSelectBeneficiary };
};
