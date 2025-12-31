import { ArrowLeft, Home, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { transactionHistory } from '../../../mockData';
import { clsx } from 'clsx';
import { useMemo } from 'react';

export const TransactionHistoryPage = () => {
    const navigate = useNavigate();

    // Group transactions by date
    const groupedTransactions = useMemo(() => {
        const groups: Record<string, typeof transactionHistory> = {};

        transactionHistory.forEach(tx => {
            // Simple date formatting for grouping keys
            const dateObj = new Date(tx.date);
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let dateKey = '';
            if (dateObj.toDateString() === today.toDateString()) {
                dateKey = 'Hôm nay';
            } else if (dateObj.toDateString() === yesterday.toDateString()) {
                dateKey = 'Hôm qua';
            } else {
                // Format: Thứ Hai, 29 Thg 12, 2025
                dateKey = dateObj.toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }).replace('thg', 'Thg');
                // Capitalize first letter of day
                dateKey = dateKey.charAt(0).toUpperCase() + dateKey.slice(1);
            }

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(tx);
        });

        // Sort keys (this is a bit simplistic, for robust sorting we might need real date keys)
        // For mock data, keys are inserted in order of appearance usually if mock data is sorted.
        // Assuming mock data is sorted desc by date.
        return groups;
    }, []);

    const filters = ['7 ngày trước', '30 ngày trước', '60 ngày trước'];

    return (
        <div className="h-full flex flex-col bg-[#F8FFF9]"> {/* Light green background as per image hint */}
            {/* Header */}
            <div className="flex items-center justify-between p-4 pt-14 pb-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-gray-800">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">Lịch sử giao dịch</h1>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-gray-800">
                    <Home className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-3 px-4 mb-6 overflow-x-auto no-scrollbar">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        className={clsx(
                            "px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap",
                            index === 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Transaction List */}
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6">
                {Object.entries(groupedTransactions).map(([dateLabel, transactions]) => (
                    <div key={dateLabel}>
                        <h3 className="text-sm font-medium text-gray-500 mb-3">{dateLabel}</h3>
                        <div className="space-y-4">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white shrink-0 mt-1">
                                            {tx.type === 'out' ? (
                                                <ArrowUpRight className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                                            ) : (
                                                <ArrowDownLeft className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase">
                                                {tx.beneficiaryName || tx.description}
                                            </h4>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                                                {tx.description}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                        {tx.type === 'out' ? '-' : '+'}{tx.amount.toLocaleString('vi-VN')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Divider Line Logic could be added if strictly following Figma, usually typically rendered between items or groups */}
            </div>
        </div>
    );
};
