import { ArrowRightLeft, PiggyBank, CreditCard, Zap, HandCoins, Building2, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const QuickActions = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const actions = [
        { icon: ArrowRightLeft, label: t('dash.action_transfer'), color: 'text-green-600', path: '/transfer', code: 'transfer' },
        { icon: PiggyBank, label: t('dash.action_savings'), color: 'text-green-600', path: '/savings', code: 'savings' },
        { icon: CreditCard, label: t('dash.action_cards'), color: 'text-blue-500', code: 'cards' },
        { icon: Zap, label: t('dash.action_bills'), color: 'text-yellow-500', code: 'bills' },
        { icon: HandCoins, label: t('dash.action_currency'), sub: t('dash.action_currency_sub'), color: 'text-purple-500', code: 'currency' },
        { icon: Building2, label: t('dash.action_loans'), color: 'text-red-500', code: 'loans' },
    ];

    return (
        <div className="py-4">
            <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="font-bold text-gray-800 dark:text-gray-100">{t('dash.favorite_functions')}</h3>
                <button className="text-xs text-ocb-primary dark:text-green-400 flex items-center gap-1 font-medium hover:underline">
                    {t('dash.customize')} <LayoutGrid className="w-3 h-3" />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {actions.map((action) => (
                    <button
                        key={action.code}
                        onClick={() => action.path && navigate(action.path)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center group-active:scale-95 transition-colors ${action.color} dark:brightness-110`}>
                            <action.icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <div className="text-center">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block transition-colors">{action.label}</span>
                            {action.sub && <span className="text-[10px] text-gray-400 dark:text-gray-500 block -mt-0.5">{action.sub}</span>}
                        </div>
                    </button>
                ))}

                {/* See All Button */}
                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-active:scale-95 transition-all text-gray-500 dark:text-gray-400">
                        <LayoutGrid className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-500">{t('dash.view_all')}</span>
                </button>
            </div>
        </div>
    );
};
