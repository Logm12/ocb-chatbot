import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { settingsApi } from '../../../services/mockApi';

export const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        current: '',
        newPass: '',
        confirm: ''
    });
    const [showPass, setShowPass] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status === 'error') setStatus('idle'); // Clear error on edit
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        // Pre-validation
        if (formData.newPass !== formData.confirm) {
            setStatus('error');
            setErrorMsg('Mật khẩu xác nhận không khớp.');
            return;
        }

        setStatus('loading');
        try {
            await settingsApi.changePassword(formData.current, formData.newPass);
            setStatus('success');
            setTimeout(() => navigate('/settings'), 1500); // Auto go back
        } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.message || 'Có lỗi xảy ra.');
        }
    };

    if (status === 'success') {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-green-50 px-4 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Đổi mật khẩu thành công!</h2>
                <p className="text-gray-500">Đang quay lại cài đặt...</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#F2F4F8]">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm z-10">
                <button onClick={() => navigate('/settings')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Đổi mật khẩu</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
                <div className="space-y-6">
                    {/* Error Banner */}
                    {status === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span className="text-sm font-medium">{errorMsg}</span>
                        </div>
                    )}

                    {/* Current Password */}
                    <PasswordField
                        label="Mật khẩu hiện tại"
                        name="current"
                        value={formData.current}
                        onChange={handleChange}
                        show={showPass.current}
                        onToggle={() => setShowPass(prev => ({ ...prev, current: !prev.current }))}
                    />

                    {/* New Password */}
                    <PasswordField
                        label="Mật khẩu mới"
                        name="newPass"
                        value={formData.newPass}
                        onChange={handleChange}
                        show={showPass.new}
                        onToggle={() => setShowPass(prev => ({ ...prev, new: !prev.new }))}
                    />

                    {/* Confirm Password */}
                    <PasswordField
                        label="Nhập lại mật khẩu mới"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                        show={showPass.confirm}
                        onToggle={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                    />

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={status === 'loading' || !formData.current || !formData.newPass}
                            className="w-full bg-[#006e3e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Xác nhận đổi
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center px-8">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Mật khẩu nên có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số để đảm bảo an toàn.
                    </p>
                </div>
            </form>
        </div>
    );
};

// Helper Implementation
interface PasswordFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    show: boolean;
    onToggle: () => void;
}

const PasswordField = ({ label, name, value, onChange, show, onToggle }: PasswordFieldProps) => (
    <div className="relative group">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block ml-1">
            {label}
        </label>
        <div className="relative">
            <input
                type={show ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-gray-200 text-gray-800 font-medium text-lg px-4 py-3.5 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all placeholder:text-gray-300"
                placeholder="••••••"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
        </div>
    </div>
);
