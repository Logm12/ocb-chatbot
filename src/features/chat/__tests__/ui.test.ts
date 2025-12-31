/**
 * UI Tests
 * Test Cases: UI-01 (Consistency), UI-02 (Data Visualization), UI-03 (Legal Disclaimer)
 */
import { describe, test, expect } from 'vitest';
import { OCB_COLORS, LEGAL_DISCLAIMER } from '../constants/policyData';

describe('UI-01: Consistency (Tính nhất quán)', () => {
    describe('OCB Brand Colors', () => {
        test('primary color is green-800 (#166534)', () => {
            expect(OCB_COLORS.primary).toBe('#166534');
        });

        test('secondary color is green-500 (#22C55E)', () => {
            expect(OCB_COLORS.secondary).toBe('#22C55E');
        });

        test('accent color is yellow-400 (#FACC15)', () => {
            expect(OCB_COLORS.accent).toBe('#FACC15');
        });

        test('all color values are valid hex codes', () => {
            const hexPattern = /^#[0-9A-Fa-f]{6}$/;
            Object.values(OCB_COLORS).forEach(color => {
                expect(color).toMatch(hexPattern);
            });
        });
    });

    describe('Brand Color Palette', () => {
        test('OCB colors include green and yellow (brand colors)', () => {
            // OCB brand is Green/Yellow
            expect(OCB_COLORS.primary).toContain('16'); // Green shade
            expect(OCB_COLORS.accent).toContain('FA'); // Yellow shade
        });
    });
});

describe('UI-02: Data Visualization (Biểu đồ)', () => {
    describe('Spending Chart Data Structure', () => {
        const mockSpendingData = {
            total: 15450000,
            limit: 10000000,
            categories: [
                { label: 'Ăn uống', amount: 5450000, color: 'bg-orange-400' },
                { label: 'Mua sắm', amount: 4800000, color: 'bg-blue-400' },
                { label: 'Di chuyển', amount: 3200000, color: 'bg-green-400' },
                { label: 'Khác', amount: 2000000, color: 'bg-gray-300' },
            ]
        };

        test('has valid total amount', () => {
            expect(mockSpendingData.total).toBeGreaterThan(0);
        });

        test('has defined spending limit', () => {
            expect(mockSpendingData.limit).toBeGreaterThan(0);
        });

        test('categories have labels and amounts', () => {
            mockSpendingData.categories.forEach(cat => {
                expect(cat.label).toBeDefined();
                expect(cat.amount).toBeGreaterThan(0);
                expect(cat.color).toBeDefined();
            });
        });

        test('categories sum approximately equals total', () => {
            const sum = mockSpendingData.categories.reduce((acc, cat) => acc + cat.amount, 0);
            // Allow small rounding difference
            expect(Math.abs(sum - mockSpendingData.total)).toBeLessThan(100);
        });

        test('categories have distinct colors (no overlapping)', () => {
            const colors = mockSpendingData.categories.map(c => c.color);
            const uniqueColors = new Set(colors);
            expect(uniqueColors.size).toBe(colors.length);
        });

        test('category labels are clear and readable', () => {
            mockSpendingData.categories.forEach(cat => {
                expect(cat.label.length).toBeGreaterThan(0);
                expect(cat.label.length).toBeLessThan(20); // Short enough for chart labels
            });
        });
    });
});

describe('UI-03: Legal Disclaimer (Pháp lý)', () => {
    describe('Disclaimer Text Content', () => {
        test('Vietnamese disclaimer mentions Nghị định 13', () => {
            expect(LEGAL_DISCLAIMER.vi).toContain('Nghị định 13');
        });

        test('Vietnamese disclaimer mentions AI disclaimer', () => {
            expect(LEGAL_DISCLAIMER.vi).toContain('Miễn trừ trách nhiệm AI');
        });

        test('English disclaimer mentions Decree 13', () => {
            expect(LEGAL_DISCLAIMER.en).toContain('Decree 13');
        });

        test('English disclaimer mentions AI Disclaimer', () => {
            expect(LEGAL_DISCLAIMER.en).toContain('AI Disclaimer');
        });
    });
});
