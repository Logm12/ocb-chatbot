import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    vi: {
        // Settings
        'settings.title': 'Cài đặt',
        'settings.personal': 'Cài đặt cá nhân',
        'settings.avatar': 'Đổi ảnh đại diện',
        'settings.theme': 'Đổi giao diện',
        'settings.wallpaper': 'Đổi ảnh nền',
        'settings.language': 'Ngôn ngữ',
        'settings.security': 'Cài đặt an toàn và bảo mật',
        'settings.biometrics': 'Cài đặt sinh trắc học',
        'settings.faceid': 'Cài đặt FaceID',
        'settings.password': 'Đổi mật khẩu',
        'settings.smartotp': 'Cài đặt Smart OTP',
        'settings.service': 'Cài đặt dịch vụ',
        'settings.reports': 'Báo cáo giao dịch',
        'settings.contacts': 'Danh bạ chuyển tiền',
        'settings.templates': 'Mẫu thanh toán',
        'settings.info': 'Đổi thông tin cá nhân',
        'settings.balance': 'Biến động số dư',
        'settings.close_account': 'Đóng tài khoản',
        'settings.logout': 'Đăng xuất',
        'settings.employee_login': 'Đăng nhập TK Nhân viên',
        'settings.greeting': 'Xin chào!',

        // Bottom Nav
        'nav.home': 'Trang chủ',
        'nav.products': 'Sản phẩm',
        'nav.settings': 'Cài đặt',

        // Dashboard
        'dash.financial_solutions': 'Giải pháp tài chính',
        'dash.manage_loans': 'Quản lý vay',
        'dash.register_now': 'Đăng ký ngay',
        'dash.transaction_history': 'Lịch sử giao dịch',
        'dash.view_all': 'Xem tất cả',
        'dash.recent_activity': 'Hoạt động gần đây',
        'dash.balance_fluctuation': 'Biến động số dư',
        'dash.total_balance': 'Tổng tài sản',
        'dash.account_num': 'Số tài khoản',
        'dash.action_transfer': 'Chuyển tiền',
        'dash.action_payment': 'Thanh toán',
        'dash.action_topup': 'Nạp tiền',
        'dash.action_qr': 'Quét QR',
        'dash.action_wallet': 'Ví VNPAY',
        'dash.action_savings': 'Tiết kiệm',
        'dash.action_cards': 'Dịch vụ thẻ',
        'dash.action_bills': 'Tiền điện',
        'dash.action_currency': 'Bán tiền',
        'dash.action_currency_sub': 'Kinh doanh',
        'dash.action_loans': 'Vay vốn',
        'dash.greeting': 'Xin chào,',
        'dash.new_badge': 'Mới',
        'dash.balance_label': 'Số dư:',
        'dash.accounts_cards': 'Tài khoản & Thẻ',
        'dash.favorite_functions': 'Chức năng ưa thích',
        'dash.customize': 'Tùy chỉnh',
        'dash.loan_package_title': 'Chọn gói vay - Nhà, xe trong tầm tay',
        'dash.special_interest_title': 'Lãi suất ưu đãi - Mở rộng kinh doanh',

        // Products
        'products.title': 'Sản phẩm & Dịch vụ',
        'products.subtitle': 'Khám phá các tiện ích của OCB OMNI',
        'products.search_placeholder': 'Tìm kiếm sản phẩm',
        'products.new_badge': 'Mới',
        'products.promo_title': 'Gửi tiết kiệm Online',
        'products.promo_desc': 'Lãi suất hấp dẫn lên tới 6.5%/năm',
        'products.learn_more': 'Tìm hiểu ngay',
        'products.cat_cards': 'Dịch vụ thẻ',
        'products.cat_savings': 'Tiết kiệm',
        'products.cat_finance': 'Tài chính cá nhân',
        'products.cat_cash': 'Rút tiền không thẻ',
        'products.cat_invest': 'Đầu tư',
        'products.cat_loan': 'Vay vốn',
        'products.cat_bill': 'Thanh toán',

        // Chat
        'chat.welcome_title': 'Tiếp cận với OCB OMNI',
        'chat.start_button': 'Hãy bắt đầu chia sẻ',
        'chat.disclaimer': 'Tuân thủ Nghị định 13/2023/NĐ-CP & Miễn trừ trách nhiệm AI',
        'chat.feature_share_title': 'Hãy bắt đầu chia sẻ',
        'chat.feature_share_desc': 'Giờ đây bạn có thể chia sẻ mong muốn của bạn với OCB OMNI',
        'chat.feature_handsfree_title': 'Không cần dùng tay',
        'chat.feature_handsfree_desc': 'Làm những việc khác trong khi đang giao tiếp với ngân hàng',
        'chat.feature_safe_title': 'Nhắn tin an toàn',
        'chat.feature_safe_desc': 'Độ bảo mật theo tiêu chuẩn 2FA và sinh trắc học',
        'chat.feature_lang_title': 'Ngôn ngữ tự động',
        'chat.feature_lang_desc': 'Lựa chọn ngôn ngữ mà bạn muốn',
        'chat.bot_name': 'Trợ lý OCB',
        'chat.online': 'Đang trực tuyến',
        'chat.input_placeholder': 'Nhập tin nhắn...',
        'chat.agent_badge': 'Nhân viên tư vấn',
        'chat.feedback_thanks': 'Cảm ơn bạn đã đánh giá. Những ý kiến đóng góp của bạn sẽ giúp cho OCB OMNI hoàn thiện hơn nhé!',
        'chat.suggest_loan': 'Tôi muốn vay 50tr',
        'chat.suggest_spending': 'Chi tiêu tháng này',
        'chat.suggest_balance': 'Tra cứu số dư',
        'chat.suggest_transfer': 'Chuyển tiền',
        'chat.interest_sheet': 'Bảng lãi suất',
        'chat.interest_term': 'Kỳ hạn',
        'chat.interest_rate': 'Lãi suất',
        'chat.cancel': 'Hủy bỏ',
        'chat.continue': 'Tiếp tục',

        // Cards (New)
        'cards.title': 'Tài khoản & Thẻ',
        'cards.total_assets': 'Tổng tài sản',
        'cards.tab_account': 'Tài khoản',
        'cards.tab_family': 'Gia đình & Hội nhóm',
        'cards.tab_credit': 'Thẻ tín dụng',
        'cards.my_cards_title': 'Thẻ của tôi',
        'cards.active_status': 'Đang hoạt động',
        'cards.action_pay': 'Thanh toán',
        'cards.action_install': 'Trả góp 0%',
        'cards.action_auth': 'Định danh',
        'cards.hot_pick': 'HOT PICK',
        'cards.promo_igen': 'OCB iGen',
        'cards.promo_igen_desc': 'Khám phá thế giới ưu đãi dành riêng cho Gen Z.',
        'cards.banner_personalize': 'Khám phá ngay cá nhân hóa thẻ của bạn',
        'cards.open_now': 'Mở thẻ ngay',
        'cards.visa_platinum': 'Mở ngay thẻ Tín dụng Quốc tế Visa Platinum',
        'cards.view_details': 'Xem chi tiết',

        // Savings (New)
        'savings.title': 'Ví Tiết kiệm',
        'savings.tab_own': 'Sở hữu',
        'savings.tab_invest': 'Đầu tư',
        'savings.legend_account': 'Tài khoản',
        'savings.legend_savings': 'Tiết kiệm',
        'savings.insight': 'Với 10 triệu mỗi ngày bạn sẽ có 2.000 đ cùng nhiều quà tặng hấp dẫn',
        'savings.action_transfer': 'Chuyển tiền',
        'savings.action_withdraw': 'Nạp/Rút',
        'savings.action_accumulate': 'Tích lũy',
        'savings.promo_arena': 'Thêm bí kíp sinh lời mỗi giờ',
        'savings.promo_arena_desc': 'Tích lũy tài sản cho Đấu Trường Tri Thức',
        'savings.offers': 'Ưu đãi',
        'savings.promo_task': 'Làm nhiệm vụ',
        'savings.promo_reward': 'Nhận thưởng',
        'savings.promo_fund': 'Quỹ Bảo Vệ',
        'savings.promo_daily': 'mỗi ngày',
        'savings.play_now': 'CHƠI NGAY',

        // Transfer (New)
        'transfer.title': 'Chuyển tiền',
        'transfer.info_title': 'Thông tin chuyển tiền',
        'transfer.success_title': 'Chuyển tiền thành công',
        'transfer.step_input_title': 'Thông tin chuyển tiền',
        'transfer.label_source': 'TK nguồn:',
        'transfer.label_balance': 'Số dư:',
        'transfer.label_amount': 'Số tiền chuyển (VND)',
        'transfer.label_limit': 'Hạn mức',
        'transfer.label_content': 'Nội dung',
        'transfer.placeholder_content': 'Nhập nội dung chuyển tiền',
        'transfer.label_category': 'Danh mục chi tiêu',
        'transfer.select_category': 'Chọn danh mục',
        'transfer.review_title': 'Kiểm tra thông tin',
        'transfer.label_dest_bank': 'Ngân hàng thụ hưởng',
        'transfer.label_dest_account': 'Tài khoản thụ hưởng',
        'transfer.label_dest_name': 'Người thụ hưởng',
        'transfer.otp_title': 'Vui lòng nhập OTP xác nhận',
        'transfer.otp_desc': 'Mã OTP đã được gửi đến số điện thoại',
        'transfer.success_message': 'Giao dịch THÀNH CÔNG',
        'transfer.to': 'Tới',
        'transfer.label_date': 'Ngày thực hiện',
        'transfer.label_trans_id': 'Mã giao dịch',

        // Transfer Selector (New)
        'transfer.tab_account': 'Tới số tài khoản',
        'transfer.tab_card': 'Tới số thẻ',
        'transfer.select_bank': 'Chọn ngân hàng nhận',
        'transfer.label_dest_account_input': 'Số tài khoản',
        'transfer.toggle_same_owner': 'Cùng chủ tài khoản',
        'transfer.contacts': 'Danh bạ',
        'transfer.view_all_contacts': 'Xem tất cả',
        'transfer.search_contact': 'Tìm kiếm trong danh bạ',

        // Auth
        'auth.greeting': 'Xin chào',
        'auth.label_username': 'Tên đăng nhập / Số điện thoại',
        'auth.placeholder_username': 'Nhập SĐT hoặc Tên đăng nhập',
        'auth.label_password': 'Mật khẩu',
        'auth.placeholder_password': 'Nhập mật khẩu',
        'auth.forgot_password': 'Bạn quên mật khẩu?',
        'auth.login_btn': 'Đăng nhập',
        'auth.no_account': 'Bạn chưa có tài khoản?',
        'auth.register_now': 'Đăng ký ngay',

        // Global
        'global.currency_vnd': 'VND',
        'global.continue': 'Tiếp tục',
        'global.confirm': 'Xác nhận',
        'global.complete': 'Hoàn thành',
    },
    en: {
        // Settings
        'settings.title': 'Settings',
        'settings.personal': 'Personal Settings',
        'settings.avatar': 'Change Avatar',
        'settings.theme': 'Change Theme',
        'settings.wallpaper': 'Change Wallpaper',
        'settings.language': 'Language',
        'settings.security': 'Security Settings',
        'settings.biometrics': 'Biometric Settings',
        'settings.faceid': 'FaceID Settings',
        'settings.password': 'Change Password',
        'settings.smartotp': 'Smart OTP Settings',
        'settings.service': 'Service Settings',
        'settings.reports': 'Transaction Reports',
        'settings.contacts': 'Transfer Contacts',
        'settings.templates': 'Payment Templates',
        'settings.info': 'Update Personal Info',
        'settings.balance': 'Balance Alerts',
        'settings.close_account': 'Close Account',
        'settings.logout': 'Log Out',
        'settings.employee_login': 'Employee Login',
        'settings.greeting': 'Hello!',

        // Bottom Nav
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.settings': 'Settings',

        // Dashboard
        'dash.financial_solutions': 'Financial Solutions',
        'dash.manage_loans': 'Manage Loans',
        'dash.register_now': 'Register Now',
        'dash.transaction_history': 'Transaction History',
        'dash.view_all': 'View All',
        'dash.recent_activity': 'Recent Activity',
        'dash.balance_fluctuation': 'Balance Flux',
        'dash.total_balance': 'Total Balance',
        'dash.account_num': 'Account No.',
        'dash.action_transfer': 'Transfer',
        'dash.action_payment': 'Payment',
        'dash.action_topup': 'Top Up',
        'dash.action_qr': 'Scan QR',
        'dash.action_wallet': 'VNPAY Wallet',
        'dash.action_savings': 'Savings',
        'dash.action_cards': 'Card Services',
        'dash.action_bills': 'Bill Payment',
        'dash.action_currency': 'Currency Exchange',
        'dash.action_currency_sub': 'Trading',
        'dash.action_loans': 'Loans',
        'dash.greeting': 'Hello,',
        'dash.new_badge': 'New',
        'dash.balance_label': 'Balance:',
        'dash.accounts_cards': 'Accounts & Cards',
        'dash.favorite_functions': 'Favorite Functions',
        'dash.customize': 'Customize',
        'dash.loan_package_title': 'Home & Car Loans - Within Reach',
        'dash.special_interest_title': 'Special Rates - Expand Business',

        // Products
        'products.title': 'Products & Services',
        'products.subtitle': 'Explore OCB OMNI utilities',
        'products.search_placeholder': 'Search products',
        'products.new_badge': 'New',
        'products.promo_title': 'Online Savings',
        'products.promo_desc': 'Attractive interest rates up to 6.5%/year',
        'products.learn_more': 'Learn More',
        'products.cat_cards': 'Card Services',
        'products.cat_savings': 'Savings',
        'products.cat_finance': 'Personal Finance',
        'products.cat_cash': 'Cardless Cash',
        'products.cat_invest': 'Investment',
        'products.cat_loan': 'Loans',
        'products.cat_bill': 'Bill Payment',

        // Chat
        'chat.welcome_title': 'Connect with OCB OMNI',
        'chat.start_button': 'Start Sharing',
        'chat.disclaimer': 'Compliant with Decree 13/2023/ND-CP & AI Disclaimer',
        'chat.feature_share_title': 'Start Sharing',
        'chat.feature_share_desc': 'Share your desires with OCB OMNI now',
        'chat.feature_handsfree_title': 'Hands Free',
        'chat.feature_handsfree_desc': 'Multitask while banking properly',
        'chat.feature_safe_title': 'Secure Messaging',
        'chat.feature_safe_desc': '2FA & Biometric security standards',
        'chat.feature_lang_title': 'Auto Language',
        'chat.feature_lang_desc': 'Choose your preferred language',
        'chat.bot_name': 'OCB Assistant',
        'chat.online': 'Online',
        'chat.input_placeholder': 'Type a message...',
        'chat.agent_badge': 'Support Agent',
        'chat.feedback_thanks': 'Thanks for your feedback! It helps improve OCB OMNI.',
        'chat.suggest_loan': 'I want to borrow 50m',
        'chat.suggest_spending': 'Monthly spending',
        'chat.suggest_balance': 'Check balance',
        'chat.suggest_transfer': 'Transfer money',
        'chat.interest_sheet': 'Interest Rates',
        'chat.interest_term': 'Term',
        'chat.interest_rate': 'Rate',
        'chat.cancel': 'Cancel',
        'chat.continue': 'Continue',

        // Cards (New)
        'cards.title': 'Accounts & Cards',
        'cards.total_assets': 'Total Assets',
        'cards.tab_account': 'Account',
        'cards.tab_family': 'Family & Group',
        'cards.tab_credit': 'Credit Cards',
        'cards.my_cards_title': 'My Cards',
        'cards.active_status': 'Active',
        'cards.action_pay': 'Pay',
        'cards.action_install': '0% Installment',
        'cards.action_auth': 'Identify',
        'cards.hot_pick': 'HOT PICK',
        'cards.promo_igen': 'OCB iGen',
        'cards.promo_igen_desc': 'Explore exclusive offers for Gen Z.',
        'cards.banner_personalize': 'Discover personalization for your card',
        'cards.open_now': 'Open Now',
        'cards.visa_platinum': 'Open Visa Platinum International Credit Card',
        'cards.view_details': 'View Details',

        // Savings (New)
        'savings.title': 'Savings Wallet',
        'savings.tab_own': 'Own',
        'savings.tab_invest': 'Invest',
        'savings.legend_account': 'Account',
        'savings.legend_savings': 'Savings',
        'savings.insight': 'With 10 million/day you earn 2,000 VND plus many gifts',
        'savings.action_transfer': 'Transfer',
        'savings.action_withdraw': 'Topup/Withdraw',
        'savings.action_accumulate': 'Accumulate',
        'savings.promo_arena': 'Gain profit tips every hour',
        'savings.promo_arena_desc': 'Accumulate assets for Knowledge Arena',
        'savings.offers': 'Offers',
        'savings.promo_task': 'Do Tasks',
        'savings.promo_reward': 'Get Rewards',
        'savings.promo_fund': 'Protection Fund',
        'savings.promo_daily': 'daily',
        'savings.play_now': 'PLAY NOW',

        // Transfer (New)
        'transfer.title': 'Transfer',
        'transfer.info_title': 'Transfer Info',
        'transfer.success_title': 'Transfer Success',
        'transfer.step_input_title': 'Transfer Info',
        'transfer.label_source': 'Source:',
        'transfer.label_balance': 'Balance:',
        'transfer.label_amount': 'Amount (VND)',
        'transfer.label_limit': 'Limit',
        'transfer.label_content': 'Content',
        'transfer.placeholder_content': 'Enter transfer content',
        'transfer.label_category': 'Spending Category',
        'transfer.select_category': 'Select Category',
        'transfer.review_title': 'Review Info',
        'transfer.label_dest_bank': 'Beneficiary Bank',
        'transfer.label_dest_account': 'Beneficiary Account',
        'transfer.label_dest_name': 'Beneficiary Name',
        'transfer.otp_title': 'Enter OTP Verification',
        'transfer.otp_desc': 'OTP code sent to phone number',
        'transfer.success_message': 'Transaction SUCCESSFUL',
        'transfer.to': 'To',
        'transfer.label_date': 'Transaction Date',
        'transfer.label_trans_id': 'Transaction ID',

        // Transfer Selector (New)
        'transfer.tab_account': 'To Account',
        'transfer.tab_card': 'To Card',
        'transfer.select_bank': 'Select Entity',
        'transfer.label_dest_account_input': 'Account Number',
        'transfer.toggle_same_owner': 'Same Owner',
        'transfer.contacts': 'Contacts',
        'transfer.view_all_contacts': 'View All',
        'transfer.search_contact': 'Search contacts',

        // Auth
        'auth.greeting': 'Hello',
        'auth.label_username': 'Username / Phone',
        'auth.placeholder_username': 'Enter Phone or Username',
        'auth.label_password': 'Password',
        'auth.placeholder_password': 'Enter Password',
        'auth.forgot_password': 'Forgot Password?',
        'auth.login_btn': 'Log In',
        'auth.no_account': 'No account yet?',
        'auth.register_now': 'Register Now',

        // Global
        'global.currency_vnd': 'VND',
        'global.continue': 'Continue',
        'global.confirm': 'Confirm',
        'global.complete': 'Complete',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    // Initialize from localStorage or default to 'vi'
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLang = localStorage.getItem('language');
        return (savedLang === 'en' || savedLang === 'vi') ? savedLang : 'vi';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
