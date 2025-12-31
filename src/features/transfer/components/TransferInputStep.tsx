import { useState } from 'react';
import { ChevronDown, Info, LayoutGrid } from 'lucide-react';
import { type Bank } from '../../../mockData';
import { useLanguage } from '../../../contexts/LanguageContext';
import clsx from 'clsx';
// import { type Beneficiary } from '../../../types';

interface TransferInputStepProps {
    onNext: (data: { amount: number, content: string }) => void;
    initialData: {
        bank: Bank;
        account: string;
        name: string;
        amount: number;
        content: string;
    };
}

export const TransferInputStep = ({ onNext, initialData }: TransferInputStepProps) => {
    // State
    const [amount, setAmount] = useState<string>(initialData.amount ? initialData.amount.toLocaleString('vi-VN') : '');
    const [content, setContent] = useState(initialData.content || 'Chuyen tien');
    const [showBalance, setShowBalance] = useState(true);

    const { t } = useLanguage();

    const handleContinue = () => {
        if (!amount) return;

        const rawAmount = parseInt(amount.replace(/\D/g, ''));

        onNext({
            amount: rawAmount,
            content: content
        });
    };

    // Formatter
    const formatAmount = (val: string) => {
        const number = parseInt(val.replace(/\D/g, ''));
        if (isNaN(number)) return '';
        return number.toLocaleString('vi-VN');
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setAmount(formatAmount(val));
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto no-scrollbar">
            {/* Header Title (Back button is in Parent/Layout usually, but we can add title here if needed, 
                though MobileFrame usually handles it. The prompt image shows a header "Thông tin chuyển tiền") */}
            <div className="bg-white p-4 pb-2">
                <h1 className="text-lg font-bold text-gray-900 text-center">{t('transfer.step_input_title')}</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* 1. Source Account Card (Green) */}
                <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                    {/* Decor circle */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

                    <div className="flex items-start justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                                {/* Placeholder Avatar */}
                                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-green-100 text-xs mb-0.5">
                                    <span>{t('transfer.label_source')}</span>
                                    <span className="font-mono font-bold tracking-wide">1983493579</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-green-100">{t('transfer.label_balance')}</span>
                                    <span className="font-bold text-lg">
                                        {showBalance ? '1,850,000 VND' : '******'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setShowBalance(!showBalance)} className="text-white/80 hover:text-white">
                            <ChevronDown className={clsx("w-5 h-5 transition-transform", showBalance ? "rotate-180" : "")} />
                        </button>
                    </div>
                </div>

                {/* 2. Beneficiary (Destination) Card */}
                {/* Visual Connector */}
                <div className="flex justify-center -my-6 relative z-20">
                    <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 text-green-600">
                        <ChevronDown className="w-5 h-5 animate-bounce-short" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 pt-8 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm shrink-0 overflow-hidden bg-white border border-gray-100`}>
                        {initialData.bank.logoUrl ? (
                            <img
                                src={initialData.bank.logoUrl}
                                alt={initialData.bank.shortName}
                                className="w-full h-full object-contain p-2"
                            />
                        ) : (
                            <div className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${initialData.bank.color || 'bg-gray-400'}`}>
                                {initialData.bank.shortName[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 uppercase">{initialData.name}</p>
                        <p className="text-sm text-gray-500 font-mono tracking-wide">{initialData.account} - {initialData.bank.shortName}</p>
                    </div>
                </div>

                {/* 3. Amount Input */}
                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{t('transfer.label_amount')}</span>
                        <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                            <Info className="w-3 h-3" />
                            {t('transfer.label_limit')}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0"
                            className="w-full text-3xl font-bold text-gray-900 py-2 focus:outline-none placeholder:text-gray-200"
                        />
                        {/* Optional cleanup button or currency suffix if needed */}
                    </div>
                    {/* Basic suggestions if empty? No, Figma doesn't show them */}
                </div>

                {/* 4. Content Input */}
                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-500">{t('transfer.label_content')}</span>
                        <span className="text-[10px] text-gray-400">{content.length}/250</span>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full font-medium text-gray-900 text-sm focus:outline-none resize-none"
                        rows={2}
                        placeholder={t('transfer.placeholder_content')}
                    />
                </div>

                {/* 5. Category (Mock) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="mb-2">
                        <span className="text-xs text-gray-500">{t('transfer.label_category')}</span>
                    </div>
                    <button className="w-full flex items-center justify-between group">
                        <div className="flex items-center gap-3 text-gray-500 group-hover:text-green-700 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                <LayoutGrid className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">{t('transfer.select_category')}</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-auto p-4 pb-6">
                <button
                    onClick={handleContinue}
                    disabled={!amount}
                    className="w-full py-4 bg-green-800 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-900/20 hover:bg-green-900 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none"
                >
                    {t('global.continue')}
                </button>
            </div>
        </div>
    );
};
