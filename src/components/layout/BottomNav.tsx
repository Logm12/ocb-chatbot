import { Home, Layers, Settings, Bot, QrCode } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import clsx from 'clsx';

export const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-[#006e3e] grid grid-cols-5 items-center px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50 pb-2">
            {/* Home */}
            <button
                onClick={() => navigate('/dashboard')}
                className="flex flex-col items-center justify-center gap-1 w-full"
            >
                <Home
                    className={clsx("w-6 h-6 transition-colors", isActive('/dashboard') ? "text-yellow-300" : "text-white/80")}
                    strokeWidth={isActive('/dashboard') ? 3 : 2.5}
                />
                <span className={clsx("text-[10px] font-medium transition-colors", isActive('/dashboard') ? "text-yellow-300" : "text-white/80")}>
                    {t('nav.home')}
                </span>
            </button>

            {/* Products */}
            <button
                onClick={() => navigate('/products')}
                className="flex flex-col items-center justify-center gap-1 w-full"
            >
                <div className="relative">
                    <Layers
                        className={clsx("w-6 h-6 transition-colors", isActive('/products') ? "text-yellow-300" : "text-white/80")}
                        strokeWidth={isActive('/products') ? 3 : 2.5}
                    />
                </div>
                <span className={clsx("text-[10px] font-medium transition-colors", isActive('/products') ? "text-yellow-300" : "text-white/80")}>
                    {t('nav.products')}
                </span>
            </button>

            {/* QR Code - Center Highlight */}
            <button className="flex flex-col items-center justify-center w-full -mt-6">
                <div className="w-14 h-14 bg-[#00b14f] rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-4 border-gray-100">
                    <QrCode className="w-7 h-7 text-white" />
                </div>
            </button>

            {/* Settings */}
            <button
                onClick={() => navigate('/settings')}
                className="flex flex-col items-center justify-center gap-1 w-full"
            >
                <Settings
                    className={clsx("w-6 h-6 transition-colors", isActive('/settings') ? "text-yellow-300" : "text-white/80")}
                    strokeWidth={isActive('/settings') ? 3 : 2.5}
                />
                <span className={clsx("text-[10px] font-medium transition-colors", isActive('/settings') ? "text-yellow-300" : "text-white/80")}>
                    {t('nav.settings')}
                </span>
            </button>

            {/* Chatbot - Circle Icon */}
            <button
                onClick={() => navigate('/chat-welcome')}
                className="flex flex-col items-center justify-center gap-1 w-full"
            >
                <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors", isActive('/chat-welcome') ? "bg-yellow-300" : "bg-white")}>
                    <Bot className={clsx("w-5 h-5 transition-colors", isActive('/chat-welcome') ? "text-[#006e3e]" : "text-[#006e3e]")} />
                </div>
                {/* Optional label if needed, or keep compact */}
            </button>
        </div>
    );
};
