import { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../../contexts/LanguageContext';

interface TransferOTPStepProps {
    onConfirm: () => void;
}

export const TransferOTPStep = ({ onConfirm }: TransferOTPStepProps) => {
    const { t } = useLanguage();
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

    useEffect(() => {
        // Auto-focus logic or simple simulation could go here
    }, []);

    const handleNumberClick = (num: string) => {
        const index = otp.findIndex(d => d === '');
        if (index !== -1) {
            const newOtp = [...otp];
            newOtp[index] = num;
            setOtp(newOtp);
        }
    };

    const handleDelete = () => {
        const index = [...otp].reverse().findIndex(d => d !== '');
        if (index !== -1) {
            const realIndex = 5 - index;
            const newOtp = [...otp];
            newOtp[realIndex] = '';
            setOtp(newOtp);
        }
    };

    const isComplete = otp.every(d => d !== '');

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* OTP Display Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{t('transfer.otp_title')}</h2>
                <p className="text-sm text-gray-500 mb-8 text-center">{t('transfer.otp_desc')} 091***4768</p>

                <div className="flex gap-3 mb-8">
                    {otp.map((digit, idx) => (
                        <div
                            key={idx}
                            className={clsx(
                                "w-10 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold bg-white transition-all",
                                digit ? "border-green-600 text-green-700" : "border-gray-300"
                            )}
                        >
                            {digit}
                        </div>
                    ))}
                </div>
            </div>

            {/* Numeric Keypad */}
            <div className="bg-gray-200 pb-8 pt-2 px-2">
                <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleNumberClick(num.toString())}
                            className="bg-white rounded-lg py-3 shadow-sm text-xl font-bold text-gray-800 active:bg-gray-100"
                        >
                            {num}
                        </button>
                    ))}
                    <div className="py-3"></div> {/* Empty slot */}
                    <button
                        onClick={() => handleNumberClick('0')}
                        className="bg-white rounded-lg py-3 shadow-sm text-xl font-bold text-gray-800 active:bg-gray-100"
                    >
                        0
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center rounded-lg py-3 text-gray-800 active:bg-gray-300"
                    >
                        <Delete className="w-6 h-6" />
                    </button>
                </div>

                {/* Confirm Button (Only appears when complete) */}
                <div className="mt-4 px-2">
                    <button
                        onClick={onConfirm}
                        disabled={!isComplete}
                        className={clsx(
                            "w-full py-3 rounded-xl font-bold text-white transition-all",
                            isComplete
                                ? "bg-ocb-secondary hover:bg-green-700 shadow-lg"
                                : "bg-gray-400 cursor-not-allowed"
                        )}
                    >
                        {t('global.complete')}
                    </button>
                </div>
            </div>
        </div>
    );
};
