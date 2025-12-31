/**
 * Response Generator Service
 * Generates appropriate bot responses based on intent and context
 */

import { currentUser, beneficiaries } from '../../../mockData';
import { INTEREST_RATES, UNSUPPORTED_PRODUCTS, RESPONSE_TEMPLATES, type InterestTerm } from '../constants/policyData';
import type { Intent, IntentType } from './intentRecognition';

export interface ChatContext {
    previousIntent?: IntentType;
    previousTerm?: string;
    pendingTransfer?: {
        amount?: number;
        beneficiaryId?: string;
    };
}

export interface BotResponse {
    text: string;
    type: 'text' | 'balance' | 'interest_rate' | 'transfer_confirmation' | 'beneficiary_list' | 'spending_chart' | 'loan_denied' | 'handover_alert' | 'error';
    isRefusal?: boolean;
    rate?: number;
    balance?: number;
    beneficiaryList?: typeof beneficiaries;
    spendingData?: any;
    transferDetails?: any;
}

/**
 * Get interest rate for a specific term
 */
export const getInterestRate = (term: string): { rate: number; termLabel: string } | null => {
    const termKey = term as InterestTerm;
    if (INTEREST_RATES[termKey]) {
        return {
            rate: INTEREST_RATES[termKey].rate,
            termLabel: INTEREST_RATES[termKey].term
        };
    }
    return null;
};

/**
 * Check if product is unsupported (for hallucination prevention)
 */
export const isProductUnsupported = (product: string): boolean => {
    const lower = product.toLowerCase();
    return UNSUPPORTED_PRODUCTS.some(p => lower.includes(p));
};

/**
 * Generate response for balance inquiry
 */
export const generateBalanceResponse = (): BotResponse => {
    return {
        text: RESPONSE_TEMPLATES.balanceInquiry(currentUser.balance),
        type: 'balance',
        balance: currentUser.balance
    };
};

/**
 * Generate response for interest rate query
 */
export const generateInterestRateResponse = (term?: string, product?: string): BotResponse => {
    // Hallucination check: refuse unsupported products
    if (product && isProductUnsupported(product)) {
        return {
            text: RESPONSE_TEMPLATES.unsupportedProduct(product),
            type: 'error',
            isRefusal: true
        };
    }

    // If no specific term, show all rates
    if (!term) {
        const rateInfo = Object.values(INTEREST_RATES)
            .map(r => `${r.term}: ${r.rate}%`)
            .join(', ');
        return {
            text: `Lãi suất tiết kiệm online OCB: ${rateInfo}`,
            type: 'interest_rate'
        };
    }

    const rateData = getInterestRate(term);
    if (!rateData) {
        return {
            text: `Xin lỗi, OCB hiện không có thông tin lãi suất cho kỳ hạn ${term} tháng.`,
            type: 'error'
        };
    }

    return {
        text: RESPONSE_TEMPLATES.interestRate(rateData.termLabel, rateData.rate),
        type: 'interest_rate',
        rate: rateData.rate
    };
};

/**
 * Generate response for follow-up questions using context
 */
export const generateFollowUpResponse = (intent: Intent, context: ChatContext): BotResponse => {
    // If previous was interest rate, assume this is about rates too
    if (context.previousIntent === 'interest_rate') {
        return generateInterestRateResponse(intent.term);
    }

    return {
        text: 'Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi rõ hơn không?',
        type: 'text'
    };
};

/**
 * Generate response based on intent
 */
export const generateResponse = (intent: Intent, context: ChatContext = {}): BotResponse => {
    switch (intent.type) {
        case 'balance_inquiry':
            return generateBalanceResponse();

        case 'interest_rate':
            return generateInterestRateResponse(intent.term, intent.product);

        case 'follow_up':
            return generateFollowUpResponse(intent, context);

        case 'spending_analysis':
            const mockSpending = {
                total: 15450000,
                limit: 10000000,
                categories: [
                    { label: 'Ăn uống', amount: 5450000, color: 'bg-orange-400' },
                    { label: 'Mua sắm', amount: 4800000, color: 'bg-blue-400' },
                    { label: 'Di chuyển', amount: 3200000, color: 'bg-green-400' },
                    { label: 'Khác', amount: 2000000, color: 'bg-gray-300' },
                ]
            };
            return {
                text: `⚠️ Tổng chi tiêu tháng này của bạn là ${mockSpending.total.toLocaleString('vi-VN')} VND.`,
                type: 'spending_chart',
                spendingData: mockSpending
            };

        case 'loan_inquiry':
            return {
                text: 'Dựa trên lịch sử tín dụng của bạn, OCB không thể cho bạn sử dụng Khoản vay của ngân hàng.',
                type: 'loan_denied'
            };

        case 'transfer':
            if (intent.isNegative) {
                return {
                    text: RESPONSE_TEMPLATES.negativeAmount,
                    type: 'error'
                };
            }
            if (intent.amount && !intent.beneficiary) {
                return {
                    text: `Chuyển ${intent.amount.toLocaleString()} VND cho ai?`,
                    type: 'beneficiary_list',
                    beneficiaryList: beneficiaries
                };
            }
            return {
                text: 'Bạn muốn chuyển bao nhiêu tiền?',
                type: 'text'
            };

        case 'cancel':
            return {
                text: 'Đã hủy yêu cầu.',
                type: 'text'
            };

        default:
            return {
                text: 'Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể hỏi về "Số dư", "Lãi suất", "Chuyển tiền", hoặc "Chi tiêu".',
                type: 'text'
            };
    }
};
