import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TransferSelectorStep } from './TransferSelectorStep';
import { TransferInputStep } from './TransferInputStep';
import { TransferReviewStep } from './TransferReviewStep';
import { TransferSuccessStep } from './TransferSuccessStep';
import { TransferOTPStep } from './TransferOTPStep';
import { processTransfer, type Bank, banks } from '../../../mockData';
import { useLanguage } from '../../../contexts/LanguageContext';

type Step = 'selector' | 'input' | 'review' | 'otp' | 'success';

interface TransferData {
    bank: Bank | null;
    account: string;
    name: string;
    amount: number;
    content: string;
}

export const TransferPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const [step, setStep] = useState<Step>('selector');
    const [data, setData] = useState<TransferData>({
        bank: null,
        account: '',
        name: '',
        amount: 0,
        content: ''
    });

    // Check for pre-filled data from Chatbot
    useEffect(() => {
        if (location.state?.transferDetails) {
            const { name, accountNumber, bankName, amount } = location.state.transferDetails;

            // Find bank object (Mock logic: finding based on shortName or ID)
            const foundBank = banks.find(b => b.shortName === bankName) || banks[0];

            setData({
                bank: foundBank,
                account: accountNumber || '',
                name: name || '',
                amount: amount || 0,
                content: 'Chuyen tien' // Default content
            });

            // If we have enough info, skip to input
            if (accountNumber && foundBank) {
                setStep('input');
            }
        }
    }, [location.state]);

    const handleSelectorNext = (inp: { bank: Bank, account: string, name: string }) => {
        setData(prev => ({ ...prev, ...inp }));
        setStep('input');
    };

    const handleInputNext = (inp: { amount: number, content: string }) => {
        setData(prev => ({ ...prev, amount: inp.amount, content: inp.content }));
        setStep('review');
    };

    const handleReviewConfirm = (amount: number, content: string) => {
        setData(prev => ({ ...prev, amount, content }));
        setStep('otp');
    };

    const handleOtpConfirm = async () => {
        // Simulate API call
        await processTransfer(data.amount, data.content, {
            id: 'temp',
            name: data.name,
            accountNumber: data.account,
            bankId: data.bank!.id
        });
        setStep('success');
    };

    const handleDone = () => {
        navigate('/dashboard');
    };

    return (
        <div className="h-full flex flex-col relative bg-white">
            {/* Header - Only for Selector, Input, Review, OTP steps */}
            {step !== 'success' && (
                <div className="pt-14 px-4 pb-2 flex items-center justify-between relative z-10 bg-white border-b border-gray-100">
                    <button onClick={() => {
                        if (step === 'selector') navigate(-1);
                        else if (step === 'input') setStep('selector');
                        else if (step === 'review') setStep('input');
                        else if (step === 'otp') setStep('review');
                    }} className="p-1">
                        <ArrowLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">
                        {step === 'selector' ? t('transfer.title') :
                            step === 'input' ? t('transfer.step_input_title') :
                                t('transfer.info_title')}
                    </h1>
                    <div className="w-8"></div>
                </div>
            )}

            <div className="flex-1 overflow-hidden relative">
                {step === 'selector' && (
                    <TransferSelectorStep onNext={handleSelectorNext} />
                )}
                {step === 'input' && data.bank && (
                    <TransferInputStep
                        initialData={{
                            bank: data.bank,
                            account: data.account,
                            name: data.name,
                            amount: data.amount,
                            content: data.content
                        }}
                        onNext={handleInputNext}
                    />
                )}
                {step === 'review' && data.bank && (
                    <TransferReviewStep
                        data={{ bank: data.bank, account: data.account, name: data.name, amount: data.amount, content: data.content }}
                        onConfirm={handleReviewConfirm}
                    />
                )}
                {step === 'otp' && (
                    <TransferOTPStep onConfirm={handleOtpConfirm} />
                )}

                {step === 'success' && data.bank && (
                    <TransferSuccessStep
                        data={{
                            bankName: data.bank.name,
                            account: data.account,
                            name: data.name,
                            amount: data.amount,
                            content: data.content
                        }}
                        onDone={handleDone}
                    />
                )}
            </div>
        </div>
    );
};
