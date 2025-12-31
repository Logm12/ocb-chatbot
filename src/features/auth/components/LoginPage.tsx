import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { currentUser } from '../../../mockData'; // Removed unused import
import { useUser } from '../../../contexts/UserContext';
import { useLanguage } from '../../../contexts/LanguageContext';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const { t } = useLanguage();

    // Form State
    const [username, setUsername] = useState('0913144768'); // Pre-fill for convenience as per user request
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Simulate network delay for realism
        setTimeout(() => {
            const success = login(username, password);
            setIsLoading(false);

            if (success) {
                navigate('/dashboard');
            } else {
                setError('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header with OCB Logo - Reduced size */}
            <div className="bg-white pt-16 pb-4 px-6 flex flex-col items-center">
                <img
                    src="/ocb-brand-logo.png"
                    alt="OCB"
                    className="h-12 w-auto object-contain"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 px-8 py-10 flex flex-col max-w-md mx-auto w-full">

                {/* Greeting */}
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{t('auth.greeting')}</h2>
                    <p className="text-ocb-primary font-bold text-lg mt-1">Xin chào!</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-ocb-primary font-medium text-sm mb-1">{t('auth.label_username')}</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocb-primary/50 text-gray-700 bg-gray-50 transition-all placeholder:text-gray-400"
                            placeholder={t('auth.placeholder_username')}
                        />
                    </div>

                    <div>
                        <label className="block text-ocb-primary font-medium text-sm mb-1">{t('auth.label_password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocb-primary/50 text-gray-700 bg-gray-50 transition-all placeholder:text-gray-400"
                            placeholder={t('auth.placeholder_password')}
                        />
                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-xs text-blue-800 hover:underline">{t('auth.forgot_password')}</a>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center">
                            <span className="font-medium mr-1">Lỗi:</span> {error}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-ocb-primary hover:bg-green-800 text-white font-bold py-3.5 rounded-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Đang đăng nhập...' : t('auth.login_btn')}
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-8">
                        {t('auth.no_account')} <span onClick={() => navigate('/register')} className="text-red-600 hover:underline font-medium cursor-pointer">{t('auth.register_now')}</span>
                    </p>
                </form>
            </div>
        </div>
    );
};
