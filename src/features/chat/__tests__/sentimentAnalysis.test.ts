/**
 * Sentiment Analysis Tests
 * Test Cases: NEW-01 (Sentiment Analysis - Phát hiện giận dữ)
 */
import { describe, test, expect } from 'vitest';
import { analyzeSentiment } from '../utils/sentimentAnalysis';

describe('NEW-01: Sentiment Analysis (Phát hiện cảm xúc tiêu cực)', () => {
    describe('Anger Detection - Standard Vietnamese', () => {
        test('detects anger from complaint: "Làm ăn chán quá, trừ tiền rồi mà chưa nhận được!"', () => {
            const result = analyzeSentiment('Làm ăn chán quá, trừ tiền rồi mà chưa nhận được!');
            expect(result).toBe('angry');
        });

        test.each([
            'Bực quá!',
            'Tệ quá đi!',
            'Dịch vụ kém',
            'Chán lắm rồi!',
            'Ghét ngân hàng này',
            'Tôi không hài lòng',
            'Thất vọng quá!',
            'Làm ăn vớ vẩn'
        ])('detects anger from "%s"', (input) => {
            const result = analyzeSentiment(input);
            expect(result).toBe('angry');
        });
    });

    describe('Anger Detection - Gen Z Slang', () => {
        test.each([
            'Hãm vcl',
            'Cà chớn quá',
            'Như hạch',
            'Ngáo vãi',
            'Cay quá',
            'Ức chế ghê',
            'Chán đời'
        ])('detects anger from Gen Z slang: "%s"', (input) => {
            const result = analyzeSentiment(input);
            expect(result).toBe('angry');
        });
    });

    describe('Inquisitive Detection', () => {
        test.each([
            'Tại sao?',
            'Sao lại thế?',
            'Lý do là gì?',
            'Là sao vậy?',
            'Thế nào?'
        ])('detects inquisitive sentiment from "%s"', (input) => {
            const result = analyzeSentiment(input);
            expect(result).toBe('inquisitive');
        });
    });

    describe('Neutral Detection', () => {
        test.each([
            'Xin chào',
            'Tôi muốn chuyển tiền',
            'Số dư của tôi',
            'Cảm ơn bạn',
            'OK'
        ])('detects neutral sentiment from "%s"', (input) => {
            const result = analyzeSentiment(input);
            expect(result).toBe('neutral');
        });
    });

    describe('Priority: Anger Over Inquisitive', () => {
        test('anger takes priority when both keywords present', () => {
            const result = analyzeSentiment('Tại sao làm ăn chán thế?');
            expect(result).toBe('angry');
        });
    });
});

describe('Sentiment Analysis Edge Cases', () => {
    test('handles empty string', () => {
        const result = analyzeSentiment('');
        expect(result).toBe('neutral');
    });

    test('handles only whitespace', () => {
        const result = analyzeSentiment('   ');
        expect(result).toBe('neutral');
    });

    test('is case insensitive', () => {
        const result = analyzeSentiment('BỰC QUÁ!');
        expect(result).toBe('angry');
    });
});
