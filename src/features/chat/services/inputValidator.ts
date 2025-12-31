/**
 * Input Validator Service
 * Validates user inputs for transfers and other operations
 */

import { TRANSFER_RULES } from '../constants/policyData';

export interface ValidationResult {
    valid: boolean;
    error?: string;
    sanitizedValue?: number | string;
}

/**
 * Validate transfer amount
 * SEC-01: Input Validation - rejects negative amounts
 */
export const validateAmount = (amount: number): ValidationResult => {
    // Check for negative amount
    if (amount < 0) {
        return {
            valid: false,
            error: 'Số tiền không hợp lệ. Số tiền phải là số dương.'
        };
    }

    // Check minimum
    if (amount < TRANSFER_RULES.minAmount) {
        return {
            valid: false,
            error: `Số tiền tối thiểu là ${TRANSFER_RULES.minAmount.toLocaleString('vi-VN')} VND.`
        };
    }

    // Check maximum
    if (amount > TRANSFER_RULES.maxAmount) {
        return {
            valid: false,
            error: `Số tiền tối đa là ${TRANSFER_RULES.maxAmount.toLocaleString('vi-VN')} VND.`
        };
    }

    return {
        valid: true,
        sanitizedValue: amount
    };
};

/**
 * Validate account number format
 */
export const validateAccountNumber = (accountNumber: string): ValidationResult => {
    // Remove spaces and dashes
    const cleaned = accountNumber.replace(/[\s-]/g, '');

    // Must be digits only
    if (!/^\d+$/.test(cleaned)) {
        return {
            valid: false,
            error: 'Số tài khoản chỉ được chứa các chữ số.'
        };
    }

    // Length validation (Vietnamese bank accounts typically 9-16 digits)
    if (cleaned.length < 9 || cleaned.length > 16) {
        return {
            valid: false,
            error: 'Số tài khoản phải từ 9 đến 16 chữ số.'
        };
    }

    return {
        valid: true,
        sanitizedValue: cleaned
    };
};

/**
 * Validate transfer content/message
 */
export const validateTransferContent = (content: string): ValidationResult => {
    const trimmed = content.trim();

    // Max length check
    if (trimmed.length > 160) {
        return {
            valid: false,
            error: 'Nội dung chuyển tiền không được quá 160 ký tự.'
        };
    }

    // Remove potentially dangerous characters (basic XSS prevention)
    const sanitized = trimmed
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');

    return {
        valid: true,
        sanitizedValue: sanitized
    };
};

/**
 * Validate OTP input
 * SEC-02: Security Check
 */
export const validateOTP = (otp: string): ValidationResult => {
    const cleaned = otp.replace(/\s/g, '');

    // OTP must be 6 digits
    if (!/^\d{6}$/.test(cleaned)) {
        return {
            valid: false,
            error: 'Mã OTP phải gồm 6 chữ số.'
        };
    }

    return {
        valid: true,
        sanitizedValue: cleaned
    };
};

/**
 * Check if OTP is required for transaction
 */
export const isOTPRequired = (_allow_amount: number): boolean => {
    // All transactions require OTP for security
    return true;
};

/**
 * Combined transfer validation
 */
export const validateTransfer = (
    amount: number,
    accountNumber: string,
    content: string,
    otp?: string
): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    const amountResult = validateAmount(amount);
    if (!amountResult.valid && amountResult.error) {
        errors.push(amountResult.error);
    }

    const accountResult = validateAccountNumber(accountNumber);
    if (!accountResult.valid && accountResult.error) {
        errors.push(accountResult.error);
    }

    const contentResult = validateTransferContent(content);
    if (!contentResult.valid && contentResult.error) {
        errors.push(contentResult.error);
    }

    // OTP validation only if provided
    if (otp !== undefined) {
        const otpResult = validateOTP(otp);
        if (!otpResult.valid && otpResult.error) {
            errors.push(otpResult.error);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
};
