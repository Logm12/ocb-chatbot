import { Check } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
    data: { bankName: string, account: string, name: string, amount: number, content: string };
    onDone: () => void;
}

export const TransferSuccessStep = ({ data, onDone }: Props) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-green-50 overflow-y-auto no-scrollbar">
            <div className="flex-1 flex flex-col items-center p-8 pt-12 space-y-6">

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-short">
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-xl font-medium text-gray-800">Giao dịch</h2>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase">{t('transfer.success_message')}</h1>
                    <p className="text-lg font-medium text-gray-700">{t('transfer.to')} {data.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{data.amount.toLocaleString()} {t('global.currency_vnd')}</p>
                </div>

                {/* Receipt Details */}
                <div className="w-full space-y-6 pt-4">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500">{t('transfer.label_dest_account')}</p>
                        <p className="text-sm font-bold text-gray-900">{data.bankName}</p>
                        <p className="text-sm text-gray-600">{data.account}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500">{t('transfer.label_content')}</p>
                        <p className="text-sm font-bold text-gray-900">{data.content}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500">{t('transfer.label_date')}</p>
                        <p className="text-sm font-bold text-gray-900">{new Date().toLocaleString('vi-VN')}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500">{t('transfer.label_trans_id')}</p>
                        <p className="text-sm font-bold text-gray-900">GUIA{Math.floor(Math.random() * 1000000000000)}</p>
                    </div>
                </div>

            </div>

            {/* Bottom Button */}
            <div className="p-4">
                <button
                    onClick={onDone}
                    className="w-full py-3 bg-green-700 text-white font-bold rounded-xl shadow-md hover:bg-green-800 transition-colors"
                >
                    {t('global.complete')}
                </button>
            </div>
        </div>
    );
};
