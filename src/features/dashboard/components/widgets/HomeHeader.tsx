import { Bell, Power } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../contexts/UserContext';

export const HomeHeader = () => {
    const navigate = useNavigate();
    useUser(); // Consuming context but not using values for now

    return (
        <div className="flex items-center justify-between pt-12 pb-2 px-4">
            {/* Logo Area - Using Official OCB Logo */}
            <div className="flex items-center">
                <img
                    src="/ocb-brand-logo.png"
                    alt="OCB - Ngân hàng Phương Đông"
                    className="h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all"
                />
            </div>

            {/* Actions - Icons with better visibility */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate('/transactions')}
                    className="p-2 bg-white dark:bg-gray-800 rounded-full text-green-700 dark:text-green-400 shadow-sm border border-gray-100 dark:border-gray-700 relative hover:shadow-md transition-all"
                >
                    <Bell className="w-5 h-5" strokeWidth={2} />
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="p-2 bg-white dark:bg-gray-800 rounded-full text-red-600 dark:text-red-400 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                >
                    <Power className="w-5 h-5" strokeWidth={2} />
                </button>
            </div>
        </div>
    );
};
