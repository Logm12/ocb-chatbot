import { ArrowLeft, Share2, Hand, ShieldCheck, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ocbLogoFull from '../../../assets/images/ocb_logo_full.png';
import { useLanguage } from '../../../contexts/LanguageContext';

export const ChatWelcomePage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const features = [
        { icon: Share2, title: t('chat.feature_share_title'), desc: t('chat.feature_share_desc') },
        { icon: Hand, title: t('chat.feature_handsfree_title'), desc: t('chat.feature_handsfree_desc') },
        { icon: ShieldCheck, title: t('chat.feature_safe_title'), desc: t('chat.feature_safe_desc') },
        { icon: Languages, title: t('chat.feature_lang_title'), desc: t('chat.feature_lang_desc') },
    ];

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-[#F8FFF9] to-white dark:from-gray-900 dark:to-gray-950 relative transition-colors duration-300">
            {/* Header */}
            <div className="p-4 pt-14">
                <button onClick={() => navigate('/dashboard')} className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center px-6 pt-0 space-y-8 overflow-y-auto pb-40">
                {/* Branding Logo */}
                <div className="relative mb-2 mt-4">
                    {/* Using OCB Logo as requested by user ("Logo OCB như ảnh") */}
                    <img
                        src={ocbLogoFull}
                        alt="OCB Logo"
                        className="w-36 h-auto object-contain drop-shadow-sm dark:brightness-0 dark:invert transition-all"
                    />
                </div>


                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center transition-colors">
                    {t('chat.welcome_title')}
                </h1>

                <div className="space-y-6 w-full">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start p-3 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors group">
                            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0 shadow-sm text-green-700 dark:text-green-400 transition-colors">
                                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-gray-200 text-sm mt-1 transition-colors">{feature.title}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed transition-colors">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Action with "Plate" */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-6 transition-colors">
                <button
                    onClick={() => navigate('/chat')}
                    className="w-full bg-ocb-secondary hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {t('chat.start_button')}
                </button>
                {/* UI-03: Legal Disclaimer */}
                <p
                    data-testid="legal-disclaimer"
                    className="text-[11px] text-gray-500 dark:text-gray-500 text-center mt-3 leading-relaxed font-medium transition-colors"
                >
                    {t('chat.disclaimer')}
                </p>
            </div>
        </div>
    );
};
