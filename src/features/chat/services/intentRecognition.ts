/**
 * Intent Recognition Service
 * Extracts user intent from natural language input
 */

export type IntentType =
    | 'balance_inquiry'
    | 'interest_rate'
    | 'transfer'
    | 'spending_analysis'
    | 'loan_inquiry'
    | 'cancel'
    | 'follow_up'
    | 'transaction_history'
    | 'unknown';

export interface Intent {
    type: IntentType;
    term?: string;           // For interest rate queries (3, 6, 12)
    amount?: number;         // For transfer
    beneficiary?: string;    // For transfer
    product?: string;        // For product-specific queries
    isNegative?: boolean;    // For negative amount detection
    raw: string;             // Original input
}

// Keywords for each intent category
const INTENT_PATTERNS = {
    balance: [
        'số dư', 'bao nhiêu tiền', 'tiền trong ví', 'còn bao nhiêu',
        'tài khoản', 'balance', 'account', 'số tiền'
    ],
    interestRate: [
        'lãi suất', 'tiết kiệm', 'gửi tiết kiệm', 'interest', 'rate',
        'lãi', 'tiền gửi'
    ],
    transfer: [
        'chuyển', 'ck', 'chuyển khoản', 'transfer', 'gửi tiền cho'
    ],
    spending: [
        'chi tiêu', 'tháng này', 'đã tiêu', 'spending', 'expense'
    ],
    loan: [
        'vay', 'khoản vay', 'loan', 'mượn tiền'
    ],
    cancel: [
        'hủy', 'reset', 'thôi', 'cancel', 'bỏ qua'
    ],
    followUp: [
        'thì sao', 'còn gì', 'vậy thì', 'thế còn'
    ],
    history: [
        'lịch sử', 'giao dịch', 'đã chuyển', 'history', 'sao kê', 'biến động'
    ]
};

// Crypto/unsupported product keywords for hallucination detection
const UNSUPPORTED_KEYWORDS = [
    'bitcoin', 'crypto', 'ethereum', 'tiền điện tử', 'tiền ảo',
    'nft', 'btc', 'eth', 'usdt', 'coin'
];

/**
 * Extract numeric amount from text
 */
export const extractAmount = (text: string): number | null => {
    const lower = text.toLowerCase().replace(/,/g, '').replace(/\./g, '');

    // Check for negative indicators
    const isNegative = lower.includes('âm') || lower.includes('-') || lower.includes('trừ');

    let multiplier = 1;
    if (lower.includes('k') || lower.includes('nghìn') || lower.includes('ngàn')) multiplier = 1000;
    if (lower.includes('tr') || lower.includes('triệu')) multiplier = 1000000;
    if (lower.includes('tỷ')) multiplier = 1000000000;

    const match = lower.match(/(\d+)/);
    if (!match) return null;

    const value = parseInt(match[0]) * multiplier;
    return isNegative ? -value : value;
};

/**
 * Extract term period from interest rate query
 */
export const extractTerm = (text: string): string | null => {
    const lower = text.toLowerCase();

    if (lower.includes('12 tháng') || lower.includes('1 năm') || lower.includes('12t')) return '12';
    if (lower.includes('6 tháng') || lower.includes('6t')) return '6';
    if (lower.includes('3 tháng') || lower.includes('3t')) return '3';

    // Default to 6 months if just asking about interest
    return null;
};

/**
 * Check if query is about unsupported products (for hallucination prevention)
 */
export const isUnsupportedProduct = (text: string): string | null => {
    const lower = text.toLowerCase();
    const found = UNSUPPORTED_KEYWORDS.find(kw => lower.includes(kw));
    return found || null;
};

/**
 * Main intent recognition function
 */
export const recognizeIntent = (text: string, context?: { previousIntent?: IntentType }): Intent => {
    const lower = text.toLowerCase();
    const amount = extractAmount(text);

    // 1. Check for cancel
    if (INTENT_PATTERNS.cancel.some(kw => lower.includes(kw))) {
        return { type: 'cancel', raw: text };
    }

    // 2. Check for follow-up (requires context)
    if (context?.previousIntent && INTENT_PATTERNS.followUp.some(kw => lower.includes(kw))) {
        const term = extractTerm(text);
        return {
            type: 'follow_up',
            term: term || undefined,
            raw: text
        };
    }

    // 3. Check for balance inquiry
    if (INTENT_PATTERNS.balance.some(kw => lower.includes(kw))) {
        return { type: 'balance_inquiry', raw: text };
    }

    // 4. Check for interest rate query
    if (INTENT_PATTERNS.interestRate.some(kw => lower.includes(kw))) {
        const unsupported = isUnsupportedProduct(text);
        if (unsupported) {
            return { type: 'interest_rate', product: unsupported, raw: text };
        }
        return { type: 'interest_rate', term: extractTerm(text) || undefined, raw: text };
    }

    // 5. Check for loan inquiry FIRST (loans often have amounts but contain 'vay' keyword)
    if (INTENT_PATTERNS.loan.some(kw => lower.includes(kw))) {
        return { type: 'loan_inquiry', amount: amount || undefined, raw: text };
    }

    // 6. Check for transfer
    if (INTENT_PATTERNS.transfer.some(kw => lower.includes(kw)) || amount) {
        return {
            type: 'transfer',
            amount: amount || undefined,
            isNegative: amount !== null && amount < 0,
            raw: text
        };
    }

    // 7. Check for spending analysis
    if (INTENT_PATTERNS.spending.some(kw => lower.includes(kw))) {
        return { type: 'spending_analysis', raw: text };
    }

    // 8. Check for transaction history
    if (INTENT_PATTERNS.history.some(kw => lower.includes(kw))) {
        return { type: 'transaction_history', raw: text };
    }

    return { type: 'unknown', raw: text };
};
