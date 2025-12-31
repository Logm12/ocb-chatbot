import { type ReactNode } from 'react';

export const MobileFrame = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans">
            {/* Phone Case - Responsive height to fit viewport */}
            <div className="relative w-[340px] h-[calc(100vh-2rem)] max-h-[700px] bg-black rounded-[2.5rem] p-2.5 shadow-2xl border-4 border-gray-800 ring-1 ring-gray-950">

                {/* Hardware Buttons */}
                <div className="absolute top-24 -left-[2px] w-[2px] h-6 bg-gray-600 rounded-l-md"></div>
                <div className="absolute top-36 -left-[2px] w-[2px] h-12 bg-gray-600 rounded-l-md"></div>
                <div className="absolute top-24 -right-[2px] w-[2px] h-16 bg-gray-600 rounded-r-md"></div>

                {/* Screen Area */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                    {/* Status Bar Mockup */}
                    <div className="absolute top-0 w-full h-11 z-50 flex items-center justify-between px-6 pointer-events-none text-xs font-medium text-black/80">
                        <span>9:41</span>
                        <div className="flex gap-1.5 items-center">
                            <div className="w-4 h-4 rounded-full border border-black/20"></div>
                            <div className="w-4 h-4 rounded-full border border-black/20"></div>
                            <div className="w-6 h-3 rounded-[4px] border border-black/30 relative">
                                <div className="absolute inset-0.5 bg-black/80 rounded-[2px]" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>



                    {/* App Content */}
                    <div className="w-full h-full flex flex-col relative overflow-hidden bg-white">
                        {children}
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};
