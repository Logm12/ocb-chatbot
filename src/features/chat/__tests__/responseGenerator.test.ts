/**
 * Response Generator Tests
 * Test Cases: AI-02 (RAG Accuracy), AI-03 (Hallucination Check), AI-04 (Context Awareness)
 */
import { describe, test, expect } from 'vitest';
import {
    generateResponse,
    generateInterestRateResponse,
    generateBalanceResponse,
    generateFollowUpResponse,
    getInterestRate
} from '../services/responseGenerator';
import { recognizeIntent } from '../services/intentRecognition';

describe('AI-02: RAG Accuracy (Độ chính xác thông tin)', () => {
    test('returns correct 6-month interest rate (5.7%)', () => {
        const response = generateInterestRateResponse('6');
        expect(response.rate).toBe(5.7);
        expect(response.text).toContain('5.7%');
    });

    test('returns correct 3-month interest rate (4.6%)', () => {
        const response = generateInterestRateResponse('3');
        expect(response.rate).toBe(4.6);
        expect(response.text).toContain('4.6%');
    });

    test('returns correct 12-month interest rate (5.8%)', () => {
        const response = generateInterestRateResponse('12');
        expect(response.rate).toBe(5.8);
        expect(response.text).toContain('5.8%');
    });

    test('interest rate matches policy document exactly', () => {
        const rate6 = getInterestRate('6');
        const rate12 = getInterestRate('12');

        expect(rate6?.rate).toBe(5.7);
        expect(rate12?.rate).toBe(5.8);
    });

    test('full query "Lãi suất tiết kiệm 6 tháng là bao nhiêu?" returns 5.7%', () => {
        const intent = recognizeIntent('Lãi suất tiết kiệm 6 tháng là bao nhiêu?');
        const response = generateResponse(intent);
        expect(response.rate).toBe(5.7);
    });
});

describe('AI-03: Hallucination Check (Chống ảo giác)', () => {
    test('refuses Bitcoin interest rate query', () => {
        const intent = recognizeIntent('Lãi suất gửi Bitcoin tại OCB là bao nhiêu?');
        const response = generateResponse(intent);

        expect(response.isRefusal).toBe(true);
        expect(response.text).toContain('chưa hỗ trợ');
        expect(response.rate).toBeUndefined();
    });

    test('refuses cryptocurrency query with Vietnamese term', () => {
        const intent = recognizeIntent('Lãi suất tiền điện tử');
        const response = generateResponse(intent);

        expect(response.isRefusal).toBe(true);
    });

    test('refuses Ethereum interest rate query', () => {
        const response = generateInterestRateResponse(undefined, 'ethereum');
        expect(response.isRefusal).toBe(true);
        expect(response.text).toContain('chưa hỗ trợ');
    });

    test('does NOT fabricate rates - no rate in refusal response', () => {
        const response = generateInterestRateResponse(undefined, 'bitcoin');
        expect(response.rate).toBeUndefined();
    });

    test('accepts valid savings product query', () => {
        const intent = recognizeIntent('Lãi suất tiết kiệm 6 tháng');
        const response = generateResponse(intent);

        expect(response.isRefusal).toBeFalsy();
        expect(response.rate).toBe(5.7);
    });
});

describe('AI-04: Context Awareness (Nhớ ngữ cảnh)', () => {
    test('understands follow-up "Vậy kỳ hạn 12 tháng thì sao?" after interest rate query', () => {
        // First query establishes context
        const firstIntent = recognizeIntent('Lãi suất tiết kiệm?');
        const context = { previousIntent: firstIntent.type };

        // Follow-up query
        const followUpIntent = recognizeIntent('Vậy kỳ hạn 12 tháng thì sao?', context as any);
        const response = generateFollowUpResponse(followUpIntent, {
            previousIntent: 'interest_rate',
            previousTerm: '6'
        });

        expect(response.rate).toBe(5.8);
        expect(response.text).toContain('12 tháng');
    });

    test('recognizes "thì sao" as follow-up question', () => {
        const context = { previousIntent: 'interest_rate' as const };
        const intent = recognizeIntent('Vậy kỳ hạn 12 tháng thì sao?', context);

        expect(intent.type).toBe('follow_up');
        expect(intent.term).toBe('12');
    });

    test('extracts term from follow-up question', () => {
        const context = { previousIntent: 'interest_rate' as const };
        const intent = recognizeIntent('Còn 6 tháng thì sao?', context);

        expect(intent.term).toBe('6');
    });
});

describe('Balance Inquiry Response', () => {
    test('returns current balance with proper formatting', () => {
        const response = generateBalanceResponse();

        expect(response.type).toBe('balance');
        expect(response.balance).toBeDefined();
        expect(response.text).toContain('VND');
    });
});

describe('Spending Analysis Response', () => {
    test('returns spending chart data for spending query', () => {
        const intent = recognizeIntent('Chi tiêu tháng này');
        const response = generateResponse(intent);

        expect(response.type).toBe('spending_chart');
        expect(response.spendingData).toBeDefined();
        expect(response.spendingData.categories).toHaveLength(4);
    });
});
