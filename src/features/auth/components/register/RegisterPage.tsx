import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, CheckCircle, ScanFace, ChevronRight, Lock } from 'lucide-react';
import { useUser } from '../../../../contexts/UserContext';

type Step = 'phone' | 'otp' | 'intro-ekyc' | 'camera' | 'create-password' | 'success';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useUser();
    const [step, setStep] = useState<Step>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit OTP
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Step 1: Phone Input
    const handlePhoneSubmit = () => {
        if (phone.length > 9) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStep('otp');
            }, 1000);
        }
    };

    // Step 2: OTP
    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }

        // Auto submit if full
        if (newOtp.every(d => d !== '')) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStep('intro-ekyc');
            }, 1500);
        }
    };

    // Step 4: Camera Simulation
    const [cameraProgress, setCameraProgress] = useState(0);
    useEffect(() => {
        if (step === 'camera') {
            const interval = setInterval(() => {
                setCameraProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStep('create-password');
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    // Step 5: Password Creation
    const handleRegister = () => {
        if (!password || password !== confirmPassword) {
            setError('Mật khẩu không khớp hoặc bị thiếu.');
            return;
        }

        setIsLoading(true);
        // Simulate API Call
        setTimeout(() => {
            // Register User
            const success = register(phone, password, 'NGUYEN VAN MOI'); // Mock extracted name
            setIsLoading(false);

            if (success) {
                setStep('success');
            } else {
                setError('Số điện thoại này đã được đăng ký.');
            }
        }, 1000);
    };

    const renderContent = () => {
        switch (step) {
            case 'phone':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-ocb-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Smartphone className="w-8 h-8 text-ocb-secondary" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Mở tài khoản trực tuyến</h2>
                            <p className="text-sm text-gray-500 mt-2">Nhập số điện thoại để bắt đầu</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocb-primary focus:border-transparent outline-none transition-all text-lg tracking-widest"
                                placeholder="09xxxxxxx"
                                autoFocus
                            />
                        </div>
                        <button
                            onClick={handlePhoneSubmit}
                            disabled={phone.length < 10 || isLoading}
                            className="w-full bg-ocb-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
                            {!isLoading && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                );

            case 'otp':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Xác thực OTP</h2>
                            <p className="text-sm text-gray-500 mt-2">Mã xác thực đã được gửi đến <b className="text-gray-800">{phone}</b></p>
                        </div>
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    className="w-12 h-14 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-ocb-primary focus:ring-2 focus:ring-ocb-primary/20 outline-none transition-all"
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                if (otp.every(d => d !== '')) {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        setStep('intro-ekyc');
                                    }, 1000);
                                }
                            }}
                            disabled={isLoading || otp.some(d => d === '')}
                            className="w-full bg-ocb-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-8"
                        >
                            {isLoading ? 'Đang xác thực...' : 'Xác nhận'}
                        </button>
                    </div>
                );

            case 'intro-ekyc':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center py-4">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/face-scan-4438396-3718449.png" alt="eKYC" className="w-48 mx-auto mb-4 opacity-90 object-contain h-48" />
                            <h2 className="text-xl font-bold text-gray-800">Xác thực danh tính (eKYC)</h2>
                            <p className="text-sm text-gray-500 mt-2 px-4">Vui lòng chuẩn bị CCCD/CMND và thực hiện quét khuôn mặt để hoàn tất đăng ký.</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                            <ScanFace className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-blue-800 text-sm">Hướng dẫn</h4>
                                <ul className="text-xs text-blue-700 mt-1 list-disc list-inside space-y-1">
                                    <li>Đảm bảo đủ ánh sáng</li>
                                    <li>Không đeo kính râm hoặc khẩu trang</li>
                                    <li>Giữ khuôn mặt trong khung hình</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => setStep('camera')}
                            className="w-full bg-ocb-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-green-800 transition-all active:scale-[0.98]"
                        >
                            Bắt đầu chụp
                        </button>
                    </div>
                );

            case 'camera':
                return (
                    <div className="flex flex-col h-full animate-in fade-in duration-500">
                        <div className="relative flex-1 bg-black rounded-2xl overflow-hidden mb-4">
                            {/* Mock Camera View */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                <ScanFace className="w-40 h-40 text-white" />
                            </div>
                            <div className="absolute inset-0 border-2 border-dashed border-white/50 m-8 rounded-3xl"></div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-10 left-8 right-8">
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-100 ease-linear"
                                        style={{ width: `${cameraProgress}%` }}
                                    />
                                </div>
                                <p className="text-center text-white text-xs mt-3">Đang quét dữ liệu sinh trắc học...</p>
                            </div>
                        </div>
                    </div>
                );

            case 'create-password':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-ocb-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-ocb-secondary" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Thiết lập mật khẩu</h2>
                            <p className="text-sm text-gray-500 mt-2">Tạo mật khẩu đăng nhập cho tài khoản của bạn</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocb-primary outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocb-primary outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
                        )}

                        <button
                            onClick={handleRegister}
                            disabled={isLoading}
                            className="w-full bg-ocb-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-green-800 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? 'Đang tạo tài khoản...' : 'Hoàn tất đăng ký'}
                        </button>
                    </div>
                );

            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in duration-300 py-10">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Đăng ký thành công!</h2>
                            <p className="text-gray-500 mt-2">Tài khoản của bạn đã được khởi tạo.</p>
                            <p className="text-gray-500 text-sm mt-1">Sử dụng SĐT <b>{phone}</b> và mật khẩu vừa tạo để đăng nhập.</p>
                        </div>
                        <div className="w-full pt-8">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-ocb-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-green-800 transition-all active:scale-[0.98]"
                            >
                                Quay về trang Login
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
                <button
                    onClick={() => step === 'phone' ? navigate('/login') : setStep('phone')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Đăng ký tài khoản</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-6 py-8 flex flex-col max-w-md mx-auto w-full">
                {renderContent()}
            </div>
        </div>
    );
};
