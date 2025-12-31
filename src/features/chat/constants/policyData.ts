/**
 * Policy constants for OCB Banking
 * Used by RAG (Retrieval Augmented Generation) to ensure accurate responses
 */

// Interest rates - Official OCB rates
export const INTEREST_RATES = {
    '3': { rate: 4.6, term: '3 tháng' },
    '6': { rate: 5.7, term: '6 tháng' },
    '12': { rate: 5.8, term: '12 tháng' },
} as const;

export type InterestTerm = keyof typeof INTEREST_RATES;

// Supported products - For hallucination prevention
export const SUPPORTED_PRODUCTS = [
    'savings',         // Tiết kiệm
    'deposit',         // Gửi tiền
    'transfer',        // Chuyển tiền
    'loan',            // Vay vốn
    'card',            // Thẻ
    'payment',         // Thanh toán
] as const;

// Explicitly NOT supported products - For hallucination rejection
export const UNSUPPORTED_PRODUCTS = [
    'bitcoin',
    'crypto',
    'cryptocurrency',
    'ethereum',
    'tiền điện tử',
    'tiền ảo',
    'nft',
] as const;

// OCB Brand colors - For UI consistency tests
export const OCB_COLORS = {
    primary: '#166534',     // Green-800
    secondary: '#22C55E',   // Green-500 (ocb-secondary)
    accent: '#FACC15',      // Yellow-400
    warning: '#F97316',     // Orange-500
    error: '#EF4444',       // Red-500
    background: '#F2F4F8',  // Gray background
} as const;

// Legal disclaimer texts
export const LEGAL_DISCLAIMER = {
    vi: 'Tuân thủ Nghị định 13/2023/NĐ-CP & Miễn trừ trách nhiệm AI',
    en: 'Compliant with Decree 13/2023/ND-CP & AI Disclaimer',
} as const;

// Transfer validation rules
export const TRANSFER_RULES = {
    minAmount: 1000,
    maxAmount: 500000000,
    maxDailyTransactions: 20,
} as const;

// Response templates
export const RESPONSE_TEMPLATES = {
    balanceInquiry: (balance: number) =>
        `Số dư hiện tại của bạn là ${balance.toLocaleString('vi-VN')} VND.`,
    interestRate: (term: string, rate: number) =>
        `Lãi suất tiết kiệm kỳ hạn ${term} là ${rate}%/năm.`,
    unsupportedProduct: (product: string) =>
        `Xin lỗi, OCB hiện chưa hỗ trợ ${product}. Vui lòng liên hệ hotline 1800 6678 để biết thêm chi tiết.`,
    invalidAmount: 'Số tiền không hợp lệ. Vui lòng nhập số tiền từ 1,000 đến 500,000,000 VND.',
    negativeAmount: 'Số tiền không hợp lệ. Số tiền phải là số dương.',
    apology: 'Em xin lỗi vì sự bất tiện này. Em sẽ chuyển cuộc hội thoại cho nhân viên hỗ trợ ngay ạ.',
} as const;
