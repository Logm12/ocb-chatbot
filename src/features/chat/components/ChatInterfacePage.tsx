import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, Send, ThumbsUp, Wallet, Landmark, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import botAvatar from '../../../assets/images/bot_avatar.png';
import { useChatController } from '../hooks/useChatController';
import { ChatBubble } from './ChatBubble';
import { useLanguage } from '../../../contexts/LanguageContext';

export const ChatInterfacePage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [showInterestSheet, setShowInterestSheet] = useState(false);
    const [feedbackToast, setFeedbackToast] = useState(false);

    const {
        messages,
        sendMessage,
        handleFeedback,
        handleSelectBeneficiary
    } = useChatController();

    const suggestions = [
        { label: t('chat.suggest_loan'), icon: Landmark },
        { label: t('chat.suggest_spending'), icon: Wallet },
        { label: t('chat.suggest_balance'), icon: Wallet },
        { label: t('chat.suggest_transfer'), icon: Send },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onFeedback = (id: string, type: 'like' | 'dislike') => {
        handleFeedback(id, type);
        setFeedbackToast(true);
        setTimeout(() => setFeedbackToast(false), 3000);
    };

    const handleSend = () => {
        if (inputValue) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#F2F4F8] dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 p-4 pt-14 flex items-center gap-3 shadow-sm z-10 transition-colors">
                <button onClick={() => navigate(-1)} className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden relative">
                    <span className="absolute inset-0 bg-green-500/10 animate-pulse"></span>
                    <img src={botAvatar} alt="Bot" className="w-full h-full object-cover relative z-10" />
                </div>
                <div>
                    <h1 className="text-sm font-bold text-gray-900 dark:text-white transition-colors">{t('chat.bot_name')}</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-green-600 dark:text-green-400 font-medium transition-colors">{t('chat.online')}</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg}
                        onFeedback={onFeedback}
                        onSelectBeneficiary={(ben) => {
                            sendMessage(`Chuyển cho ${ben.name}`);
                            handleSelectBeneficiary(ben);
                        }}
                        onShowInterest={() => setShowInterestSheet(true)}
                        onNavigate={(path) => navigate(path)}
                        onCancelTransfer={() => sendMessage('Hủy')}
                        onConfirmTransfer={(details) => navigate('/transfer', { state: { transferDetails: details } })}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & Input */}
            <div className="pb-6 bg-white dark:bg-gray-900 w-full shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] z-20 rounded-t-3xl border-t border-transparent dark:border-gray-800 transition-colors">
                <div className="px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar">
                    {suggestions.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => sendMessage(s.label)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl text-xs font-medium whitespace-nowrap border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 hover:border-green-200 dark:hover:border-green-800 active:scale-95 transition-all"
                        >
                            {/* <s.icon className="w-3.5 h-3.5" /> */}
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className="px-4 flex items-center gap-3 transition-colors">
                    <button className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"><Mic className="w-6 h-6" /></button>
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('chat.input_placeholder')}
                            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-white dark:focus:bg-gray-700 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium border border-transparent dark:border-gray-700"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors">☺️</button>
                    </div>
                    <button onClick={handleSend} className={clsx("transition-all duration-300 p-2 rounded-full", inputValue ? "bg-ocb-secondary text-white shadow-lg shadow-green-200 rotate-0 scale-100" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rotate-45 scale-90")}>
                        {inputValue ? <Send className="w-5 h-5 ml-0.5" /> : <ThumbsUp className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Interest Rate Sheet (Keep same) */}
            {showInterestSheet && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-[#E6FFEA] w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-300 relative">
                        <button onClick={() => setShowInterestSheet(false)} className="absolute top-4 right-4 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"><X className="w-5 h-5 text-gray-600" /></button>
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 mt-2">{t('chat.interest_sheet')}</h2>
                        <div className="rounded-xl overflow-hidden shadow-sm border border-green-200">
                            <table className="w-full text-sm">
                                <thead><tr className="bg-[#34D399] text-black"><th className="py-3 px-2 text-center font-bold border-r border-green-400/30">{t('chat.interest_term')}</th><th className="py-3 px-2 text-center font-bold">{t('chat.interest_rate')}</th></tr></thead>
                                <tbody className="bg-[#9EEBB6]">
                                    <tr className="border-b border-green-400/30"><td className="py-3 px-2 text-center font-medium border-r border-green-400/30">6 tháng</td><td className="py-3 px-2 text-center font-medium">5.7%</td></tr>
                                    <tr><td className="py-3 px-2 text-center font-medium border-r border-green-400/30">12 tháng</td><td className="py-3 px-2 text-center font-medium">5.8%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Toast */}
            {feedbackToast && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-xl text-xs flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 max-w-[90%] z-50">
                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0"><Check className="w-4 h-4" /></span>
                    <span>{t('chat.feedback_thanks')}</span>
                </div>
            )}
        </div>
    );
};
