import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Palette, Image as ImageIcon, Globe,
    ShieldCheck, ScanFace, Lock, Key,
    FileText, Users, CreditCard, RefreshCw, Trash2,
    LogOut, Camera, Sun, Moon, CheckCircle
} from 'lucide-react';
import { currentUser } from '../../../mockData';
import { BottomNav } from '../../../components/layout/BottomNav';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useUser } from '../../../contexts/UserContext';
import { settingsApi } from '../../../services/mockApi';

// --- SUB-COMPONENTS ---

interface SettingsItemProps {
    icon: React.ElementType;
    label: string;
    rightElement?: React.ReactNode;
    onClick?: () => void;
    isLast?: boolean;
    textColor?: string;
}

const SettingsItem = ({ icon: Icon, label, rightElement, onClick, isLast, textColor = "text-gray-700" }: SettingsItemProps) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!isLast ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
    >
        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center shrink-0 shadow-sm">
            <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <span className={`flex-1 text-left font-medium ${textColor} dark:text-gray-200 transition-colors`}>{label}</span>
        {rightElement}
    </button>
);

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
    <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 px-1 transition-colors">{title}</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
            {children}
        </div>
    </div>
);

// --- MAIN PAGE ---

export const SettingsPage = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { user: profile, updateAvatar } = useUser();

    // Local State
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogout = () => {
        // Note: We do NOT clear the profile on logout since avatar is tied to account
        navigate('/login');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const newUrl = await settingsApi.updateAvatar(file);
            updateAvatar(newUrl); // Use context to persist
            showToast('Đổi ảnh đại diện thành công!', 'success');
        } catch (error) {
            showToast('Lỗi tải ảnh: Vui lòng thử lại.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureNotReady = () => {
        showToast('Tính năng đang phát triển', 'error');
    };

    return (
        <div className={`h-full flex flex-col relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-[#F2F4F8]'}`}>
            {/* Toast Notification */}
            {toast && (
                <div className={`absolute top-4 left-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-4 ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 font-bold">!</div>}
                    <span className="font-medium">{toast.msg}</span>
                </div>
            )}

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">

                {/* Header / Profile Area */}
                <div className={`pt-12 pb-6 px-4 flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-b from-green-50 to-[#F2F4F8]'}`}>
                    <div className="relative">
                        <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-600 shadow-sm mb-3 overflow-hidden">
                            {profile?.avatar ? (
                                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-gray-800 dark:text-gray-300" />
                            )}
                        </div>
                        <button
                            onClick={handleAvatarClick}
                            className="absolute bottom-2 right-0 bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition-colors"
                        >
                            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Camera className="w-4 h-4" />}
                        </button>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{t('settings.greeting')}</p>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.fullName}</h1>
                </div>

                <div className="px-4 mt-6">
                    {/* 1. Personal Settings */}
                    <SettingsSection title={t('settings.personal')}>
                        <SettingsItem
                            icon={User}
                            label={t('settings.avatar')}
                            onClick={handleAvatarClick}
                        />
                        <SettingsItem
                            icon={Palette}
                            label={t('settings.theme')}
                            onClick={toggleTheme}
                            rightElement={
                                theme === 'light' ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-blue-400" />
                            }
                        />
                        <SettingsItem icon={ImageIcon} label={t('settings.wallpaper')} onClick={handleFeatureNotReady} />
                        <SettingsItem
                            icon={Globe}
                            label={t('settings.language')}
                            isLast
                            onClick={toggleLanguage}
                            rightElement={
                                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{language === 'vi' ? 'VN' : 'EN'}</span>
                                    {language === 'en' ? (
                                        <div className="w-4 h-4 rounded-full bg-blue-800 relative overflow-hidden flex items-center justify-center border border-white">
                                            <div className="absolute inset-0 bg-blue-900"></div>
                                            <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-white rotate-45"></div><div className="w-full h-0.5 bg-white -rotate-45"></div></div>
                                            <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-1 bg-white"></div><div className="h-full w-1 bg-white"></div></div>
                                            <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-red-600"></div><div className="h-full w-0.5 bg-red-600"></div></div>
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full bg-red-600 relative overflow-hidden flex items-center justify-center border border-white">
                                            <div className="text-[8px] text-yellow-400">★</div>
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    </SettingsSection>

                    {/* 2. Security Settings */}
                    <SettingsSection title={t('settings.security')}>
                        <SettingsItem icon={ShieldCheck} label={t('settings.biometrics')} onClick={handleFeatureNotReady} />
                        <SettingsItem icon={ScanFace} label={t('settings.faceid')} onClick={handleFeatureNotReady} />
                        <SettingsItem
                            icon={Lock}
                            label={t('settings.password')}
                            onClick={() => navigate('/settings/password')}
                        />
                        <SettingsItem icon={Key} label={t('settings.smartotp')} isLast onClick={handleFeatureNotReady} />
                    </SettingsSection>

                    {/* 3. Service Settings */}
                    <SettingsSection title={t('settings.service')}>
                        <SettingsItem icon={FileText} label={t('settings.reports')} onClick={handleFeatureNotReady} />
                        <SettingsItem icon={Users} label={t('settings.contacts')} onClick={handleFeatureNotReady} />
                        <SettingsItem icon={FileText} label={t('settings.templates')} onClick={handleFeatureNotReady} />
                        <SettingsItem icon={RefreshCw} label={t('settings.info')} onClick={handleFeatureNotReady} />
                        <SettingsItem icon={CreditCard} label={t('settings.balance')} onClick={handleFeatureNotReady} />
                        <SettingsItem icon={Trash2} label={t('settings.close_account')} isLast textColor="text-red-500" onClick={handleFeatureNotReady} />
                    </SettingsSection>

                    {/* Logout Buttons */}
                    <div className="space-y-3 mt-8 mb-8">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-[#E3000F] text-white font-bold py-3.5 rounded-xl shadow-sm hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-5 h-5" />
                            {t('settings.logout')}
                        </button>

                        <button className="w-full bg-[#007D3A] text-white font-bold py-3.5 rounded-xl shadow-sm hover:bg-green-800 active:scale-[0.98] transition-all">
                            {t('settings.employee_login')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Nav Fixed */}
            <BottomNav />
        </div>
    );
};
