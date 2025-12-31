import { ScanFace, Check, X, RefreshCw } from 'lucide-react';

export type FaceIDState = 'idle' | 'scanning' | 'success' | 'error';

interface FaceIDModalProps {
    isOpen: boolean;
    state: FaceIDState;
    onClose: () => void;
    onRetry: () => void;
}

export const FaceIDModal = ({ isOpen, state, onClose, onRetry }: FaceIDModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="w-80 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">

                {/* Content Area */}
                <div className="relative w-24 h-24 flex items-center justify-center mb-4">

                    {state === 'scanning' && (
                        <div className="relative">
                            <ScanFace className="w-20 h-20 text-gray-400" />
                            {/* Scanning Laser Animation */}
                            <div className="absolute left-0 right-0 h-1 bg-ocb-primary shadow-[0_0_10px_rgba(0,110,62,0.6)] animate-[scan_2s_ease-in-out_infinite]" />
                        </div>
                    )}

                    {state === 'success' && (
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in spin-in-12 duration-300">
                            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
                        </div>
                    )}

                    {state === 'error' && (
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-in shake duration-300">
                            <X className="w-10 h-10 text-red-600" strokeWidth={3} />
                        </div>
                    )}
                </div>

                {/* Text Status */}
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {state === 'scanning' && 'Face ID'}
                    {state === 'success' && 'Face ID'}
                    {state === 'error' && 'Xác thực lỗi'}
                </h3>

                {state === 'scanning' && <p className="text-sm text-gray-500">Đang quét khuôn mặt...</p>}
                {state === 'success' && <p className="text-sm text-green-600 font-medium">Xác thực thành công</p>}
                {state === 'error' && (
                    <div className="flex flex-col items-center gap-2 w-full mt-2">
                        <button
                            onClick={onRetry}
                            className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1"
                        >
                            <RefreshCw className="w-3 h-3" /> Thử lại
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-400 text-sm hover:text-gray-600 mt-2"
                        >
                            Hủy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
