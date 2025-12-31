import { Search, CreditCard, PiggyBank, PieChart, Banknote, Building2, Landmark, Receipt, Heart, ShieldCheck, Gift, Star, Home } from 'lucide-react';
import { BottomNav } from '../../../components/layout/BottomNav';
import { type LucideIcon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ProductItem {
    id: string;
    label: string;
    icon: LucideIcon;
    color: string; // Tailwind text color class
    bgColor?: string; // Optional bg color for icon container
}

export const ProductsPage = () => {
    const { t } = useLanguage();

    const products: ProductItem[] = [
        { id: 'cards', label: t('products.cat_cards'), icon: CreditCard, color: 'text-green-500' },
        { id: 'savings', label: t('products.cat_savings'), icon: PiggyBank, color: 'text-green-500' },
        { id: 'finance', label: t('products.cat_finance'), icon: PieChart, color: 'text-orange-500' },
        { id: 'cash', label: t('products.cat_cash'), icon: Banknote, color: 'text-green-500' },
        { id: 'invest', label: t('products.cat_invest'), icon: Building2, color: 'text-green-600' },
        { id: 'loan', label: t('products.cat_loan'), icon: Landmark, color: 'text-green-600' },
        { id: 'bill', label: t('products.cat_bill'), icon: Receipt, color: 'text-green-500' },
        { id: 'group', label: 'Hội nhóm', icon: Heart, color: 'text-yellow-500' }, // Missing key
        { id: 'public', label: 'Dịch vụ công', icon: Building2, color: 'text-green-700' }, // Missing key
        { id: 'forex', label: 'Dịch vụ ngoại tệ', icon: Banknote, color: 'text-blue-500' }, // Missing key
        { id: 'insurance', label: 'Bảo hiểm', icon: ShieldCheck, color: 'text-green-500' }, // Missing key
        { id: 'charity', label: 'Thiện nguyện', icon: Gift, color: 'text-orange-500' }, // Missing key
        { id: 'loyalty', label: 'Đặc quyền', icon: Star, color: 'text-yellow-500' }, // Missing key
        { id: 'kids', label: 'Smart Kids', icon: Home, color: 'text-green-500' }, // Missing key
    ];

    return (
        <div className="h-full flex flex-col relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Simple Header */}
            <div className="pt-4 px-4 pb-2 flex items-center justify-between bg-white dark:bg-gray-900 transition-colors">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t('products.title')}</h1>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 20-4-3.15 15.54L1 11.5a2.03 2.03 0 0 0 2 0Z" /><path d="m22 3-5 5" /><path d="m5 15 5-5" /></svg>
                        {/* Visual approximation of the stack icon in Figma using Layers icon from Lucide might be better if available, but using custom SVG or standard icon for now. Using Stack/Layers icon from Lucide below. */}
                    </button>
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder={t('products.search_placeholder')}
                        className="w-full h-11 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-green-500 text-sm"
                    />
                </div>
            </div>

            {/* Grid Content */}
            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {products.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'cards') window.location.href = '/my-cards';
                                else if (item.id === 'savings') window.location.href = '/savings';
                            }}
                            className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
                        >
                            <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <item.icon className={`w-7 h-7 ${item.color} dark:brightness-110`} strokeWidth={1.5} />
                            </div>
                            <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight max-w-[120px] transition-colors">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Nav */}
            <BottomNav />
        </div>
    );
};
