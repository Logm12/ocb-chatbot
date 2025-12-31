import { ArrowLeft, ArrowRight, ArrowLeftRight, Wallet, PiggyBank, CreditCard, Gift, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../../components/layout/BottomNav';
import { useLanguage } from '../../../contexts/LanguageContext';

export const SavingsPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="h-full flex flex-col relative bg-white">
            {/* Header */}
            <div className="pt-14 px-4 pb-2 flex items-center justify-between relative z-10">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">{t('savings.title')}</h1>
                <div className="w-8"></div> {/* Spacer for center alignment */}
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-4 space-y-6">

                {/* Tabs */}
                <div className="bg-gray-100 p-1 rounded-xl flex">
                    <button className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold shadow-sm">{t('savings.tab_own')}</button>
                    <button className="flex-1 py-2 text-gray-500 font-medium text-sm">{t('savings.tab_invest')}</button>
                </div>

                {/* Donut Chart Simulation */}
                <div className="flex flex-col items-center justify-center py-4 relative">
                    <div className="w-48 h-48 rounded-full border-[20px] border-sky-300 relative border-l-sky-400 border-t-sky-400 transform -rotate-45">
                        {/* CSS-only approximation */}
                    </div>
                    {/* SVG Chart Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E0F2FE" strokeWidth="15" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#7DD3FC" strokeWidth="15" strokeDasharray="188.5 251.2" />
                        </svg>
                    </div>

                    {/* Chart Inner Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-gray-500 text-xs font-medium">{t('cards.total_assets')}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-400 text-xs font-bold">{t('global.currency_vnd')}</span>
                            <span className="text-gray-900 text-2xl font-bold">9,15 Tr</span>
                        </div>
                    </div>
                </div>

                {/* Legend & Insight */}
                <div className="space-y-4">
                    {/* Legend */}
                    <div className="flex gap-4 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-sky-200"></div>
                            <span className="text-gray-500 text-xs font-medium">{t('savings.legend_account')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                            <span className="text-gray-500 text-xs font-medium">{t('savings.legend_savings')}</span>
                        </div>
                    </div>

                    {/* Insight Text */}
                    <p className="text-center text-xs text-gray-800 font-medium px-8 leading-relaxed">
                        {t('savings.insight')}
                    </p>
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-3 gap-4 px-2">
                    <button className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-green-500 hover:scale-105 transition-transform">
                            <ArrowLeftRight className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-medium text-gray-800">{t('savings.action_transfer')}</span>
                    </button>
                    <button className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-orange-500 hover:scale-105 transition-transform">
                            <CreditCard className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-medium text-gray-800">{t('savings.action_withdraw')}</span>
                    </button>
                    <button className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-green-600 hover:scale-105 transition-transform">
                            <Wallet className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-medium text-gray-800">{t('savings.action_accumulate')}</span>
                    </button>
                </div>

                {/* Promotions Carousel */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white">
                                <PiggyBank className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-800">{t('savings.promo_arena')}</h3>
                                <p className="text-[10px] text-gray-500">{t('savings.promo_arena_desc')}</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-bold text-gray-800 flex items-center gap-0.5">
                            {t('savings.offers')} <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                        {/* Promo Card 1 */}
                        <div className="min-w-[140px] bg-pink-50 rounded-xl p-3 flex flex-col items-center text-center border border-pink-100 relative overflow-hidden">
                            <div className="relative z-10 w-full">
                                <div className="w-full h-8 bg-yellow-200/50 rounded-full mb-1 flex items-center justify-center">
                                    <span className="text-[9px] font-bold text-yellow-800">Vào Đấu Trường săn Xu</span>
                                </div>
                                <h4 className="text-xl font-black text-pink-600 leading-none mb-1">12h30</h4>
                                <h4 className="text-md font-bold text-pink-500 mb-2">{t('savings.promo_daily')}</h4>
                                <button className="w-full py-1 bg-pink-500 text-white text-[10px] font-bold rounded-lg shadow-sm">{t('savings.play_now')}</button>
                            </div>
                        </div>

                        {/* Promo Card 2 */}
                        <div className="min-w-[140px] bg-green-50 rounded-xl p-3 flex flex-col justify-between border border-green-100 relative overflow-hidden">
                            <div>
                                <span className="text-[9px] text-gray-500 font-medium">{t('savings.promo_task')}</span>
                                <h4 className="text-xs font-bold text-gray-800 mb-2">{t('savings.promo_reward')}</h4>
                                <div className="flex items-center gap-1 text-blue-500 font-bold text-[10px] mb-2">
                                    <Zap className="w-3 h-3 fill-current" /> +8 Năng lượng
                                </div>
                            </div>
                            <p className="text-[8px] text-gray-500 leading-tight">{t('savings.promo_arena_desc')}</p>
                        </div>

                        {/* Promo Card 3 */}
                        <div className="min-w-[140px] bg-purple-50 rounded-xl p-3 flex flex-col justify-between border border-purple-100">
                            <div>
                                <span className="text-[9px] text-gray-500 font-medium">Nhận Kim Cương</span>
                                <h4 className="text-xs font-bold text-gray-800 mb-2">{t('savings.promo_fund')}</h4>
                            </div>
                            <div className="flex items-center gap-1 text-pink-500 font-bold text-[10px]">
                                <Gift className="w-3 h-3" /> +1/{t('savings.promo_daily')}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <BottomNav />
        </div >
    );
};
