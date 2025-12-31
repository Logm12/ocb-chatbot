import { type Bank } from '../../../mockData';
import { useLanguage } from '../../../contexts/LanguageContext';

interface TransferReviewStepProps {
    data: {
        bank: Bank;
        account: string;
        name: string;
        amount: number;
        content: string;
    };
    onConfirm: (amount: number, content: string) => void;
}

export const TransferReviewStep = ({ data, onConfirm }: TransferReviewStepProps) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
            <div className="p-4 space-y-4">
                {/* Review Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm space-y-4">
                    <h2 className="text-center font-bold text-gray-900 text-lg uppercase">{t('transfer.review_title')}</h2>

                    <div className="space-y-1 py-2 border-b border-dashed border-gray-200">
                        <p className="text-xs text-gray-500">{t('transfer.label_dest_bank')}</p>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 ${!data.bank.logoUrl ? data.bank.color : 'bg-white'}`}>
                                {data.bank.logoUrl ? (
                                    <img src={data.bank.logoUrl} alt={data.bank.shortName} className="w-full h-full object-contain p-1" />
                                ) : (
                                    <span className="text-white text-[10px] font-bold">{data.bank.shortName[0]}</span>
                                )}
                            </div>
                            <p className="font-bold text-gray-900">{data.bank.name}</p>
                        </div>
                    </div>

                    <div className="space-y-1 py-2 border-b border-dashed border-gray-200">
                        <p className="text-xs text-gray-500">{t('transfer.label_dest_account')}</p>
                        <p className="font-bold text-lg text-gray-900 font-mono tracking-wide">{data.account}</p>
                    </div>

                    <div className="space-y-1 py-2 border-b border-dashed border-gray-200">
                        <p className="text-xs text-gray-500">{t('transfer.label_dest_name')}</p>
                        <p className="font-bold text-lg text-blue-700 uppercase">{data.name}</p>
                    </div>

                    <div className="space-y-1 py-2 border-b border-dashed border-gray-200">
                        <p className="text-xs text-gray-500">{t('transfer.label_amount')}</p>
                        <p className="font-bold text-2xl text-green-600">{data.amount.toLocaleString()} {t('global.currency_vnd')}</p>
                    </div>

                    <div className="space-y-1 py-2">
                        <p className="text-xs text-gray-500">{t('transfer.label_content')}</p>
                        <p className="font-medium text-gray-900">{data.content}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 mt-auto">
                <button
                    onClick={() => onConfirm(data.amount, data.content)}
                    className="w-full py-3.5 bg-ocb-secondary text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all active:scale-[0.98]"
                >
                    {t('global.confirm')}
                </button>
            </div>
        </div>
    );
};
