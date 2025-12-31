import clsx from 'clsx';
import { Check, ThumbsUp, ThumbsDown, Landmark, AlertTriangle, Headset } from 'lucide-react';
import type { Message } from '../types';
import botAvatar from '../../../assets/images/bot_avatar.png';
import { useLanguage } from '../../../contexts/LanguageContext';
// import agentAvatar from '../../../assets/images/agent_avatar.png'; // Assume we might add this later, use icon for now

interface ChatBubbleProps {
    message: Message;
    onFeedback?: (id: string, type: 'like' | 'dislike') => void;
    onSelectBeneficiary?: (ben: any) => void;
    onNavigate?: (path: string) => void;
    onCancelTransfer?: () => void;
    onConfirmTransfer?: (details: any) => void;
    onShowInterest?: () => void;
}

export const ChatBubble = ({ message, onFeedback, onSelectBeneficiary, onCancelTransfer, onConfirmTransfer, onShowInterest }: ChatBubbleProps) => {
    const isUser = message.sender === 'user';
    const isBot = message.sender === 'bot';
    const isAgent = message.sender === 'agent';
    const { t } = useLanguage();

    return (
        <div className={clsx("flex w-full animate-in slide-in-from-bottom-2 duration-300", isUser ? "justify-end" : "justify-start")}>
            {/* Avatar */}
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-2 shrink-0 overflow-hidden self-end mb-1 transition-colors">
                    {isBot ? (
                        <img src={botAvatar} alt="Bot" className="w-full h-full object-cover" />
                    ) : (
                        <div className="bg-orange-100 dark:bg-orange-900/30 w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-400 transition-colors">
                            <Headset className="w-5 h-5" />
                        </div>
                    )}
                </div>
            )}

            <div className={clsx(
                "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line group relative transition-colors",
                isUser
                    ? "bg-ocb-secondary text-white rounded-br-none"
                    : isAgent
                        ? "bg-orange-50 dark:bg-orange-900/20 text-gray-900 dark:text-gray-100 rounded-bl-none border border-orange-200 dark:border-orange-800/50"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700"
            )}>
                {/* Agent Name Badge */}
                {isAgent && <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold mb-1 transition-colors">{t('chat.agent_badge')}</p>}

                {/* Text Content */}
                {message.type !== 'transaction_summary' && message.type !== 'transfer_confirmation' && message.type !== 'spending_chart' && message.type !== 'handover_alert' && (
                    <p>{message.text}</p>
                )}

                {/* Handover Alert */}
                {message.type === 'handover_alert' && (
                    <div className="flex flex-col gap-2">
                        <p>{message.text}</p>
                        <div className="bg-orange-100 text-orange-700 p-3 rounded-xl flex items-center gap-3 border border-orange-200 mt-1">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <span className="font-medium text-xs">Hệ thống ghi nhận bạn đang không hài lòng</span>
                        </div>
                    </div>
                )}

                {/* Spending Chart */}
                {message.type === 'spending_chart' && message.spendingData && (
                    <div>
                        <p className="mb-3">{message.text}</p>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <div className="flex justify-between items-end h-24 gap-2 mb-2">
                                {message.spendingData.categories.map((cat, idx) => {
                                    const heightPercent = Math.min((cat.amount / message.spendingData!.total) * 100 * 2, 100);
                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                                            <span className="text-[10px] text-gray-400 font-medium">{(cat.amount / 1000000).toFixed(1)}Tr</span>
                                            <div
                                                className={`w-full ${cat.color} rounded-t-md transition-all hover:opacity-80`}
                                                style={{ height: `${heightPercent}%` }}
                                            ></div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500 font-medium px-1">
                                {message.spendingData.categories.map((cat, idx) => (
                                    <span key={idx} className="truncate w-12 text-center">{cat.label}</span>
                                ))}
                            </div>
                        </div>
                        {message.spendingData.total > message.spendingData.limit && (
                            <div className="mt-3 flex items-start gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded-lg border border-orange-100">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>Bạn nên cân nhắc giảm chi tiêu các mục Mua sắm và Ăn uống nhé.</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Beneficiary List */}
                {message.type === 'beneficiary_list' && message.beneficiaryList && (
                    <div className="mt-3 flex flex-col gap-2">
                        <p className="text-xs font-medium text-gray-500 px-1">Chọn người nhận:</p>
                        <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
                            {message.beneficiaryList.map(ben => (
                                <button
                                    key={ben.id}
                                    onClick={() => onSelectBeneficiary?.(ben)}
                                    className="w-full flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-200 hover:border-green-200 transition-all text-left group"
                                >
                                    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-ocb-secondary font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                                        {ben.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-800 text-xs truncate group-hover:text-green-700 transition-colors">{ben.name}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{ben.bankShortName} - {ben.accountNumber}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Transfer Confirmation */}
                {message.type === 'transfer_confirmation' && message.transferDetails && (
                    <div className="bg-gradient-to-br from-[#E6FFEA] to-white p-4 -m-1 rounded-xl border border-green-200 mt-2 shadow-sm">
                        {/* ... confirmation content ... */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md">
                                <Check className="w-5 h-5" strokeWidth={3} />
                            </div>
                            <span className="font-bold text-green-800 text-sm">Xác nhận chuyển tiền</span>
                        </div>
                        <div className="bg-white/60 rounded-xl p-3 space-y-2 text-xs border border-green-100 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Người nhận</span>
                                <span className="font-bold text-gray-900 text-right">{message.transferDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Số tài khoản</span>
                                <span className="font-mono text-gray-700 text-right">{message.transferDetails.accountNumber}</span>
                            </div>
                            <div className="border-t border-dashed border-gray-300 my-2 pt-2 flex justify-between items-center">
                                <span className="text-gray-500">Số tiền</span>
                                <span className="text-lg font-bold text-green-600">{message.transferDetails.amount.toLocaleString('vi-VN')} đ</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={onCancelTransfer} className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">{t('chat.cancel')}</button>
                            <button onClick={() => onConfirmTransfer?.(message.transferDetails)} className="flex-1 py-2.5 bg-ocb-secondary text-white rounded-xl text-xs font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all">{t('chat.continue')}</button>
                        </div>
                    </div>
                )}

                {/* Interest Rate */}
                {message.type === 'interest_rate' && (
                    <button
                        onClick={onShowInterest}
                        className="mt-3 bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all w-full justify-center border border-green-200"
                    >
                        <Landmark className="w-4 h-4" />
                        Xem bảng lãi suất
                    </button>
                )}

                {/* Feedback Buttons */}
                {(isBot || isAgent) && (
                    <div className="mt-2 pt-2 border-t border-gray-100/50 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onFeedback?.(message.id, 'like')}
                            className={clsx("p-1 rounded hover:bg-green-50 transition-colors", message.feedback === 'like' ? "text-green-600" : "text-gray-400")}
                        >
                            <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onFeedback?.(message.id, 'dislike')}
                            className={clsx("p-1 rounded hover:bg-red-50 transition-colors", message.feedback === 'dislike' ? "text-red-500" : "text-gray-400")}
                        >
                            <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
