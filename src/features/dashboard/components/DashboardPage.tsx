import { BottomNav } from '../../../components/layout/BottomNav';
import { currentUser } from '../../../mockData';
import { AccountCard } from './widgets/AccountCard';
import { HomeHeader } from './widgets/HomeHeader';
import { QuickActions } from './widgets/QuickActions';
import { ArrowRight, Bot } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const DashboardPage = () => {
    const { t } = useLanguage();

    return (
        <div className="h-full flex flex-col relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-green-50 to-transparent dark:from-green-900/20 pointer-events-none"></div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-4">
                <HomeHeader />

                <div className="mt-2">
                    <AccountCard user={currentUser} />
                </div>

                <div className="mt-4">
                    <QuickActions />
                </div>

                {/* Banner Ads */}
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{t('dash.financial_solutions')}</h3>
                        <button className="text-xs text-ocb-primary dark:text-green-400 flex items-center gap-1 font-medium">
                            {t('dash.manage_loans')} <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/40 dark:to-teal-800/40 p-3 rounded-xl min-h-[120px] flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 mb-2 flex items-center justify-center text-teal-700 dark:text-teal-300">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-teal-900 dark:text-teal-100 leading-tight">{t('dash.loan_package_title')}</h4>
                            </div>
                            <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 underline mt-2 relative z-10">{t('dash.register_now')}</span>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-100 to-purple-50 dark:from-indigo-900/40 dark:to-purple-800/40 p-3 rounded-xl min-h-[120px] flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 mb-2 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-100 leading-tight">{t('dash.special_interest_title')}</h4>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 underline mt-2 relative z-10">{t('dash.register_now')}</span>
                        </div>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{t('dash.transaction_history')}</h3>
                        <button className="text-xs text-ocb-primary dark:text-green-400 flex items-center gap-1 font-medium">
                            {t('dash.view_all')} <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {/* Filter Tabs Mockup */}
                        <div className="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-lg mb-4">
                            <button className="flex-1 bg-white dark:bg-gray-600 dark:text-white text-xs font-bold py-1.5 rounded shadow-sm text-center transition-colors">{t('dash.recent_activity')}</button>
                            <button className="flex-1 text-xs font-medium py-1.5 text-center text-gray-500 dark:text-gray-400">{t('dash.balance_fluctuation')}</button>
                        </div>

                        <div className="space-y-4">
                            {/* Mocking a date header */}
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Hôm qua, 25 Thg 12, 2025</span>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border dark:border-gray-700">
                                {[
                                    { name: 'NGUYEN VAN A', amount: -50000, desc: 'Chuyen tien an trua', time: '12:30' },
                                    { name: 'LE HONG H', amount: -100000, desc: 'Thanh toan tien dien', time: '09:15' },
                                    { name: 'LAI SUAT TIET KIEM', amount: 56000, desc: 'Tra lai tiet kiem', time: '07:00' }
                                ].map((tx, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${tx.amount > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                                {tx.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase">{tx.name}</h4>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">{tx.desc}</p>
                                            </div>
                                        </div>
                                        <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('vi-VN')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <BottomNav />
        </div>
    );
};
