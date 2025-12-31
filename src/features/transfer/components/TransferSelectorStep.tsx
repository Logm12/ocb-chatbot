import { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { type Bank, banks, savedBeneficiaries, resolveAccountName } from '../../../mockData';
import { ChevronDown, ScanLine, Search } from 'lucide-react';
import clsx from 'clsx';

interface TransferSelectorStepProps {
    onNext: (data: { bank: Bank, account: string, name: string }) => void;
}

export const TransferSelectorStep = ({ onNext }: TransferSelectorStepProps) => {
    const { t } = useLanguage();
    const [tab, setTab] = useState<'account' | 'card'>('account');
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [isSameOwner, setIsSameOwner] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isLoadingName, setIsLoadingName] = useState(false);

    // Filter beneficiaries based on search
    const filteredContacts = savedBeneficiaries.filter(c =>
        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
        c.accountNumber.includes(searchText)
    );

    const handleContinue = async () => {
        if (!selectedBank || (!accountNumber && !isSameOwner)) return;

        // If same owner, mock logic to self
        if (isSameOwner) {
            onNext({
                bank: banks.find(b => b.shortName === 'OCB') || banks[0],
                account: '1983493579', // Current user account
                name: 'NGUYEN VAN A'
            });
            return;
        }

        setIsLoadingName(true);
        // Simulate resolving name
        const name = await resolveAccountName(selectedBank.id, accountNumber) || 'NGUYEN VAN A'; // Fallback to avoid flow blocking
        setIsLoadingName(false);

        onNext({
            bank: selectedBank,
            account: accountNumber,
            name: name
        });
    };

    const handleContactSelect = (contact: any) => {
        // Auto select bank and fill account
        const bank = banks.find(b => b.id === contact.bankId) || banks[0];
        setSelectedBank(bank);
        setAccountNumber(contact.accountNumber);

        // Optional: auto-proceed or let user click continue? 
        // Let's set state and let user click continue to confirm (or auto resolve name)
        // For better UX, we can just fill it.
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* 1. Tabs */}
            <div className="flex p-4 gap-4">
                <button
                    onClick={() => setTab('account')}
                    className={clsx(
                        "flex-1 py-2 rounded-lg font-medium text-sm transition-colors",
                        tab === 'account' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}
                >
                    {t('transfer.tab_account')}
                </button>
                <button
                    onClick={() => setTab('card')}
                    className={clsx(
                        "flex-1 py-2 rounded-lg font-medium text-sm transition-colors",
                        tab === 'card' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}
                >
                    {t('transfer.tab_card')}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-6 pb-20">
                {/* 2. Bank Selection */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium text-sm">{t('transfer.select_bank')}</span>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Horizontal Bank List */}
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {banks.map((bank) => (
                            <button
                                key={bank.id}
                                onClick={() => setSelectedBank(bank)}
                                className="flex flex-col items-center gap-1 min-w-[70px] group"
                            >
                                <div className={clsx(
                                    "w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all border-2 overflow-hidden bg-white",
                                    selectedBank?.id === bank.id ? "border-green-500 scale-110 ring-2 ring-green-200" : "border-gray-100 opacity-80 group-hover:opacity-100"
                                )}>
                                    {bank.logoUrl ? (
                                        <img
                                            src={bank.logoUrl}
                                            alt={bank.shortName}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    ) : (
                                        <div className={clsx("w-full h-full flex items-center justify-center text-white font-bold text-xs", bank.color || 'bg-gray-400')}>
                                            {bank.shortName[0]}
                                        </div>
                                    )}
                                </div>
                                <span className={clsx(
                                    "text-[10px] text-center font-medium",
                                    selectedBank?.id === bank.id ? "text-green-700 font-bold" : "text-gray-500"
                                )}>
                                    {bank.shortName}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Account Input */}
                <div className="space-y-2">
                    <label className="block text-gray-500 font-medium text-sm">{t('transfer.label_dest_account_input')}</label>
                    <div className="relative border-b border-gray-200 pb-1 focus-within:border-green-600 transition-colors">
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="0000 0000 0000"
                            className="w-full text-lg font-medium text-gray-900 focus:outline-none py-1 pr-10"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-ocb-secondary">
                            <ScanLine className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* 4. Same Owner Toggle */}
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm">{t('transfer.toggle_same_owner')}</span>
                    <button
                        onClick={() => setIsSameOwner(!isSameOwner)}
                        className={clsx(
                            "w-11 h-6 rounded-full relative transition-colors",
                            isSameOwner ? "bg-green-600" : "bg-gray-300"
                        )}
                    >
                        <div className={clsx(
                            "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all",
                            isSameOwner ? "left-6" : "left-1"
                        )}></div>
                    </button>
                </div>

                {/* 5. Contacts */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">{t('transfer.contacts')}</h3>
                        <button className="text-xs text-blue-600 font-medium">{t('transfer.view_all_contacts')}</button>
                    </div>

                    {/* Search */}
                    <div className="bg-gray-50 rounded-xl flex items-center px-4 py-3 gap-3">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder={t('transfer.search_contact')}
                            className="bg-transparent w-full text-sm focus:outline-none text-gray-900"
                        />
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {filteredContacts.map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => handleContactSelect(contact)}
                                className="w-full flex items-center gap-4 group"
                            >
                                <div className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden bg-white border border-gray-100",
                                )}>
                                    {/* Simplistic lookup for mock contacts - finding bank by name or ID */}
                                    {(() => {
                                        const b = banks.find(bk => bk.id === contact.bankId || bk.shortName === contact.bankShortName);
                                        if (b && b.logoUrl) {
                                            return <img src={b.logoUrl} alt={b.shortName} className="w-full h-full object-contain p-1.5" />
                                        }
                                        return <div className={clsx("w-full h-full flex items-center justify-center text-white font-bold text-xs", (contact.bankId === 'ocb') ? "bg-green-600" : "bg-blue-600")}>{(contact.bankShortName || 'B')[0]}</div>
                                    })()}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors uppercase">{contact.name}</p>
                                    <p className="text-xs text-gray-500">{contact.accountNumber} - {contact.bankShortName}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="p-4 bg-white border-t border-gray-100 absolute bottom-0 left-0 right-0">
                <button
                    onClick={handleContinue}
                    disabled={(!selectedBank || !accountNumber) && !isSameOwner}
                    className="w-full py-3.5 bg-green-800 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-green-900 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none flex items-center justify-center gap-2"
                >
                    {isLoadingName && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {t('global.continue')}
                </button>
            </div>
        </div>
    );
};
