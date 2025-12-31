import { useState } from 'react';
import { Eye, EyeOff, Copy, User, History, CreditCard } from 'lucide-react';
import { type User as UserType } from '../../../../types';
import { useUser } from '../../../../contexts/UserContext';
import { useLanguage } from '../../../../contexts/LanguageContext';

interface AccountCardProps {
    user: UserType;
}

export const AccountCard = ({ user }: AccountCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { user: contextUser } = useUser();
    const { t } = useLanguage();

    // Use context user if available, otherwise fall back to prop
    const displayUser = contextUser || user;

    // Use uploaded avatar from UserContext, fallback to user.avatarUrl, then to generated avatar
    const avatarSrc = (displayUser as any).avatar || (displayUser as any).avatarUrl || `https://ui-avatars.com/api/?name=${displayUser.fullName}&background=random`;

    return (
        <div className="bg-gradient-to-br from-[#00b14f] to-[#006e3e] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 overflow-hidden">
                            {avatarSrc ? (
                                <img
                                    src={avatarSrc}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <User className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg leading-none mb-1">{displayUser.fullName}</h3>
                            <span className="bg-yellow-400 text-ocb-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{t('dash.new_badge')}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-2 opacity-90 mb-1">
                        <span className="text-sm">{t('dash.account_num')}</span>
                        <span className="font-mono font-medium">{displayUser.accountNumber || 'xxxx-xxxx'}</span>
                        <Copy className="w-4 h-4 cursor-pointer hover:text-white/80" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <span className="text-sm font-normal opacity-90 mr-1">{t('dash.balance_label')}</span>
                            {isVisible ? (
                                <span>{(displayUser.balance || 0).toLocaleString('vi-VN')} <span className="text-xl font-normal">{t('global.currency_vnd')}</span></span>
                            ) : (
                                <span className="tracking-widest text-2xl">******</span>
                            )}
                            <button onClick={() => setIsVisible(!isVisible)} className="opacity-80 hover:opacity-100">
                                {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-3">
                    <button className="flex items-center justify-center gap-2 text-sm font-medium hover:bg-white/10 py-1.5 rounded transition-colors pl-2">
                        <History className="w-4 h-4" />
                        {t('dash.transaction_history')}
                    </button>
                    <button onClick={() => window.location.href = '/my-cards'} className="flex items-center justify-center gap-2 text-sm font-medium hover:bg-white/10 py-1.5 rounded transition-colors border-l border-white/20 pr-2">
                        <CreditCard className="w-4 h-4" />
                        {t('dash.accounts_cards')}
                    </button>
                </div>
            </div>
        </div>
    );
};
