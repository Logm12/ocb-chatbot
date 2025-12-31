/**
 * Intent Recognition Tests
 * Test Cases: AI-01 (Intent Understanding)
 */
import { describe, test, expect } from 'vitest';
import { recognizeIntent, extractAmount, extractTerm, isUnsupportedProduct } from '../services/intentRecognition';

describe('AI-01: Intent Understanding (Hiểu ý định đa dạng)', () => {
    describe('Balance Inquiry Detection', () => {
        test.each([
            'Số dư',
            'Tôi còn bao nhiêu tiền?',
            'Tiền trong ví'
        ])('recognizes "%s" as balance_inquiry intent', (input) => {
            const intent = recognizeIntent(input);
            expect(intent.type).toBe('balance_inquiry');
        });

        test('recognizes "Tài khoản của tôi có bao nhiêu?" as balance intent', () => {
            const intent = recognizeIntent('Tài khoản của tôi có bao nhiêu?');
            expect(intent.type).toBe('balance_inquiry');
        });
    });

    describe('Interest Rate Intent Detection', () => {
        test.each([
            'Lãi suất tiết kiệm',
            'Lãi suất tiết kiệm 6 tháng là bao nhiêu?',
            'Cho tôi biết lãi suất gửi tiền'
        ])('recognizes "%s" as interest_rate intent', (input) => {
            const intent = recognizeIntent(input);
            expect(intent.type).toBe('interest_rate');
        });
    });

    describe('Transfer Intent Detection', () => {
        test.each([
            'Chuyển tiền',
            'Chuyển 500 nghìn cho mẹ',
            'CK 1tr cho bạn'
        ])('recognizes "%s" as transfer intent', (input) => {
            const intent = recognizeIntent(input);
            expect(intent.type).toBe('transfer');
        });
    });

    describe('Spending Analysis Detection', () => {
        test.each([
            'Chi tiêu tháng này',
            'Tháng này tôi đã tiêu bao nhiêu',
            'Phân tích chi tiêu'
        ])('recognizes "%s" as spending_analysis intent', (input) => {
            const intent = recognizeIntent(input);
            expect(intent.type).toBe('spending_analysis');
        });
    });

    describe('Loan Inquiry Detection', () => {
        test.each([
            'Tôi muốn vay 50 triệu',
            'Khoản vay',
            'Cho tôi vay tiền'
        ])('recognizes "%s" as loan_inquiry intent', (input) => {
            const intent = recognizeIntent(input);
            expect(intent.type).toBe('loan_inquiry');
        });
    });

    describe('Cancel Detection', () => {
        test.each([
            'Hủy',
            'Reset',
            'Thôi không làm nữa'
        ])('recognizes "%s" as cancel intent', (input) => {
            const intent = recognizeIntent(input);
            expect(intent.type).toBe('cancel');
        });
    });
});

describe('extractAmount', () => {
    test('extracts simple numbers', () => {
        expect(extractAmount('500')).toBe(500);
    });

    test('handles thousands (k/nghìn)', () => {
        expect(extractAmount('500k')).toBe(500000);
        expect(extractAmount('500 nghìn')).toBe(500000);
        expect(extractAmount('500 ngàn')).toBe(500000);
    });

    test('handles millions (tr/triệu)', () => {
        expect(extractAmount('1tr')).toBe(1000000);
        expect(extractAmount('1 triệu')).toBe(1000000);
    });

    test('handles billions (tỷ)', () => {
        expect(extractAmount('1 tỷ')).toBe(1000000000);
    });

    test('detects negative amounts', () => {
        expect(extractAmount('âm 50 nghìn')).toBe(-50000);
        expect(extractAmount('-50k')).toBe(-50000);
    });

    test('returns null for non-numeric input', () => {
        expect(extractAmount('hello')).toBeNull();
    });
});

describe('extractTerm', () => {
    test('extracts 3-month term', () => {
        expect(extractTerm('lãi suất 3 tháng')).toBe('3');
        expect(extractTerm('kỳ hạn 3t')).toBe('3');
    });

    test('extracts 6-month term', () => {
        expect(extractTerm('lãi suất 6 tháng')).toBe('6');
    });

    test('extracts 12-month term', () => {
        expect(extractTerm('lãi suất 12 tháng')).toBe('12');
        expect(extractTerm('lãi suất 1 năm')).toBe('12');
    });

    test('returns null for unspecified term', () => {
        expect(extractTerm('lãi suất tiết kiệm')).toBeNull();
    });
});

describe('isUnsupportedProduct', () => {
    test('detects Bitcoin as unsupported', () => {
        expect(isUnsupportedProduct('bitcoin')).toBe('bitcoin');
        expect(isUnsupportedProduct('lãi suất Bitcoin')).toBe('bitcoin');
    });

    test('detects crypto keywords as unsupported', () => {
        expect(isUnsupportedProduct('tiền điện tử')).toBe('tiền điện tử');
        expect(isUnsupportedProduct('ethereum')).toBe('ethereum');
    });

    test('returns null for supported products', () => {
        expect(isUnsupportedProduct('tiết kiệm')).toBeNull();
        expect(isUnsupportedProduct('chuyển tiền')).toBeNull();
    });
});
