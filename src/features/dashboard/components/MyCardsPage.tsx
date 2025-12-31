import { useState } from 'react';
import { ArrowLeft, Plus, Eye, EyeOff, Receipt, Percent, ScanLine, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../../components/layout/BottomNav';
import { useLanguage } from '../../../contexts/LanguageContext';

export const MyCardsPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [showBalance, setShowBalance] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);

    return (
        <div className="h-full flex flex-col relative bg-white">
            {/* Header */}
            <div className="pt-14 px-4 pb-2 flex items-center justify-between relative z-10">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">{t('cards.title')}</h1>
                <button className="p-1">
                    <Plus className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-2 space-y-6">

                {/* Total Assets & Chart Row */}
                <div className="flex gap-3">
                    {/* Total Assets Card */}
                    <div className="flex-1 border border-gray-200 rounded-xl p-3 flex flex-col justify-center relative">
                        <span className="text-gray-500 text-xs font-medium mb-1">{t('cards.total_assets')}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-bold text-sm">{t('global.currency_vnd')}</span>
                            <span className="text-gray-900 font-bold text-lg">
                                {showBalance ? '150.000.000' : '*********'}
                            </span>
                            <button onClick={() => setShowBalance(!showBalance)}>
                                {showBalance ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                            </button>
                        </div>
                    </div>
                    {/* Pie Chart Mockup */}
                    <div className="w-[80px] border border-gray-200 rounded-xl flex items-center justify-center p-2">
                        <div className="w-10 h-10 rounded-full border-4 border-r-blue-400 border-t-orange-400 border-l-green-400 border-b-gray-200"></div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    <button className="px-4 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-bold whitespace-nowrap">{t('cards.tab_account')}</button>
                    <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium whitespace-nowrap">{t('cards.tab_family')}</button>
                    <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium whitespace-nowrap">{t('cards.tab_credit')}</button>
                </div>

                {/* My Cards Section */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">{t('cards.my_cards_title')} (1)</h2>
                    <div className="bg-gray-50 rounded-2xl p-4 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div className="relative z-10">
                                <p className="text-lg font-bold text-gray-800 tracking-wider mb-2 flex items-center gap-2">
                                    {showCardDetails ? '9753245234534' : '9753245***534'}
                                    <button onClick={() => setShowCardDetails(!showCardDetails)}>
                                        {showCardDetails ? <EyeOff className="w-3 h-3 text-blue-600" /> : <Eye className="w-3 h-3 text-blue-600" />}
                                    </button>
                                </p>
                                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-700">{t('cards.active_status')}</span>
                            </div>
                            {/* Mock Card Image */}
                            <div className="w-28 h-16 bg-gradient-to-br from-blue-900 to-indigo-800 rounded-lg shadow-md flex flex-col justify-between p-2 relative">
                                <span className="text-[6px] text-white/70">Visa Infinite Business</span>
                                <div className="flex justify-between items-end">
                                    <div className="flex gap-1">
                                        <div className="w-3 h-2 bg-white/20 rounded-sm"></div>
                                        <div className="w-2 h-2 rounded-full border border-white/50"></div>
                                    </div>
                                    <span className="text-[8px] font-bold text-white italic">VISA</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-3 gap-2 mt-6">
                            <button className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-green-500 hover:scale-105 transition-transform">
                                    <Receipt className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-medium text-gray-700">{t('cards.action_pay')}</span>
                            </button>
                            <button className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-yellow-500 hover:scale-105 transition-transform">
                                    <Percent className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-medium text-gray-700">{t('cards.action_install')}</span>
                            </button>
                            <button className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-800 hover:scale-105 transition-transform">
                                    <ScanLine className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-medium text-gray-700">{t('cards.action_auth')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hot Pick & Offers */}
                <div className="grid grid-cols-2 gap-3 relative">
                    {/* Badge */}
                    <span className="absolute -top-3 -left-2 bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm rotate-[-5deg]">{t('savings.offers')}</span>

                    <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-3 flex flex-col items-center text-center shadow-sm border border-blue-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">{t('cards.hot_pick')}</span>
                        <h3 className="text-xs font-bold text-blue-900 mb-2 leading-tight">{t('cards.visa_platinum')}</h3>
                        <div className="w-16 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded shadow-lg rotate-12 mb-2"></div>
                        <button className="text-[10px] text-blue-600 font-bold underline">{t('cards.view_details')}</button>
                    </div>

                    <div className="bg-[#002855] rounded-xl p-3 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                        <div className="flex items-center gap-1 mb-2">
                            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[8px] font-bold">O</div>
                            <span className="text-[10px] font-bold">{t('cards.promo_igen')}</span>
                        </div>
                        <p className="text-[10px] opacity-80 leading-relaxed">{t('cards.promo_igen_desc')}</p>
                        <div className="mt-2 flex justify-end">
                            <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                            <div className="w-6 h-6 rounded-full bg-red-500 -ml-2"></div>
                        </div>
                    </div>
                </div>

                {/* Personalize Card Banner */}
                <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-100 p-3 overflow-hidden">
                    <div className="w-24 h-14 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-md relative flex items-center justify-center text-white">
                        <span className="text-[8px] tracking-widest font-light">PLATINUM</span>
                        <div className="absolute bottom-1 right-1 flex">
                            <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500/80 rounded-full -ml-1.5"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2">{t('cards.banner_personalize')}</h3>
                        <div className="flex items-center justify-between">
                            <button className="bg-green-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-green-800 transition-colors">
                                {t('cards.open_now')}
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                                <ArrowRight className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <BottomNav />
        </div >
    );
};
