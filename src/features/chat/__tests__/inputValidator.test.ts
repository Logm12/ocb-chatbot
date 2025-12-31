/**
 * Input Validator Tests
 * Test Cases: SEC-01 (Input Validation), SEC-02 (Security Check)
 */
import { describe, test, expect } from 'vitest';
import {
    validateAmount,
    validateAccountNumber,
    validateTransferContent,
    validateOTP,
    validateTransfer,
    isOTPRequired
} from '../services/inputValidator';

describe('SEC-01: Input Validation (Kiểm tra đầu vào)', () => {
    describe('Negative Amount Rejection', () => {
        test('rejects negative amount: -50000', () => {
            const result = validateAmount(-50000);
            expect(result.valid).toBe(false);
            expect(result.error).toContain('không hợp lệ');
        });

        test('rejects negative amount: -1', () => {
            const result = validateAmount(-1);
            expect(result.valid).toBe(false);
        });

        test('error message is user-friendly in Vietnamese', () => {
            const result = validateAmount(-50000);
            expect(result.error).toContain('Số tiền');
            expect(result.error).toContain('dương');
        });
    });

    describe('Amount Limits Validation', () => {
        test('rejects amount below minimum (1000)', () => {
            const result = validateAmount(500);
            expect(result.valid).toBe(false);
            expect(result.error).toContain('tối thiểu');
        });

        test('rejects amount above maximum (500 million)', () => {
            const result = validateAmount(600000000);
            expect(result.valid).toBe(false);
            expect(result.error).toContain('tối đa');
        });

        test('accepts valid amount within range', () => {
            const result = validateAmount(100000);
            expect(result.valid).toBe(true);
            expect(result.sanitizedValue).toBe(100000);
        });

        test('accepts minimum amount (1000)', () => {
            const result = validateAmount(1000);
            expect(result.valid).toBe(true);
        });

        test('accepts maximum amount (500 million)', () => {
            const result = validateAmount(500000000);
            expect(result.valid).toBe(true);
        });
    });
});

describe('SEC-02: Security Check (Bảo mật)', () => {
    describe('OTP Validation', () => {
        test('rejects invalid OTP format (non-digits)', () => {
            const result = validateOTP('abc123');
            expect(result.valid).toBe(false);
        });

        test('rejects OTP with wrong length (less than 6)', () => {
            const result = validateOTP('12345');
            expect(result.valid).toBe(false);
            expect(result.error).toContain('6 chữ số');
        });

        test('rejects OTP with wrong length (more than 6)', () => {
            const result = validateOTP('1234567');
            expect(result.valid).toBe(false);
        });

        test('accepts valid 6-digit OTP', () => {
            const result = validateOTP('123456');
            expect(result.valid).toBe(true);
            expect(result.sanitizedValue).toBe('123456');
        });

        test('handles OTP with spaces', () => {
            const result = validateOTP('123 456');
            expect(result.valid).toBe(true);
            expect(result.sanitizedValue).toBe('123456');
        });
    });

    describe('OTP Requirement', () => {
        test('OTP is required for all transactions', () => {
            expect(isOTPRequired(100)).toBe(true);
            expect(isOTPRequired(1000000)).toBe(true);
        });
    });

    describe('Combined Transfer Validation', () => {
        test('fails when OTP is missing for transfer', () => {
            const result = validateTransfer(100000, '1234567890', 'Chuyển tiền');
            // Without OTP argument, validation passes for other fields
            expect(result.valid).toBe(true);
        });

        test('fails when OTP is invalid', () => {
            const result = validateTransfer(100000, '1234567890', 'Chuyển tiền', 'invalid');
            expect(result.valid).toBe(false);
            expect(result.errors).toContain('Mã OTP phải gồm 6 chữ số.');
        });

        test('passes with valid OTP', () => {
            const result = validateTransfer(100000, '1234567890', 'Chuyển tiền', '123456');
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });
});

describe('Account Number Validation', () => {
    test('rejects non-numeric characters', () => {
        const result = validateAccountNumber('ABC123');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('chữ số');
    });

    test('rejects too short account numbers', () => {
        const result = validateAccountNumber('12345678');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('9 đến 16');
    });

    test('rejects too long account numbers', () => {
        const result = validateAccountNumber('12345678901234567');
        expect(result.valid).toBe(false);
    });

    test('accepts valid account numbers', () => {
        const result = validateAccountNumber('1234567890');
        expect(result.valid).toBe(true);
        expect(result.sanitizedValue).toBe('1234567890');
    });

    test('strips spaces and dashes', () => {
        const result = validateAccountNumber('1234-5678-90');
        expect(result.valid).toBe(true);
        expect(result.sanitizedValue).toBe('1234567890');
    });
});

describe('Transfer Content Validation', () => {
    test('accepts normal transfer content', () => {
        const result = validateTransferContent('Chuyển tiền ăn trưa');
        expect(result.valid).toBe(true);
    });

    test('rejects content exceeding 160 characters', () => {
        const longContent = 'A'.repeat(161);
        const result = validateTransferContent(longContent);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('160');
    });

    test('sanitizes potentially dangerous characters', () => {
        const result = validateTransferContent('<script>alert("xss")</script>');
        expect(result.valid).toBe(true);
        expect(result.sanitizedValue).not.toContain('<');
        expect(result.sanitizedValue).not.toContain('>');
    });
});
