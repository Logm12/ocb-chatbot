/**
 * Chat Welcome Page Component Tests
 * Test Cases: UI-03 (Legal Disclaimer visibility)
 */
import { describe, test, expect } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import { ChatWelcomePage } from '../ChatWelcomePage';

describe('ChatWelcomePage', () => {
    describe('UI-03: Legal Disclaimer Visibility', () => {
        test('displays legal disclaimer at the bottom', () => {
            render(<ChatWelcomePage />);

            const disclaimer = screen.getByTestId('legal-disclaimer');
            expect(disclaimer).toBeInTheDocument();
        });

        test('disclaimer text contains "Nghị định 13"', () => {
            render(<ChatWelcomePage />);

            const disclaimer = screen.getByTestId('legal-disclaimer');
            expect(disclaimer.textContent).toContain('Nghị định 13');
        });

        test('disclaimer text contains AI disclaimer', () => {
            render(<ChatWelcomePage />);

            const disclaimer = screen.getByTestId('legal-disclaimer');
            expect(disclaimer.textContent).toContain('Miễn trừ trách nhiệm AI');
        });

        test('disclaimer has small text styling', () => {
            render(<ChatWelcomePage />);

            const disclaimer = screen.getByTestId('legal-disclaimer');
            expect(disclaimer.className).toContain('text-');
            expect(disclaimer.className).toContain('text-gray');
        });
    });

    describe('Page Structure', () => {
        test('renders OCB logo', () => {
            render(<ChatWelcomePage />);

            const logo = screen.getByAltText('OCB Logo');
            expect(logo).toBeInTheDocument();
        });

        test('renders main heading', () => {
            render(<ChatWelcomePage />);

            expect(screen.getByText('Tiếp cận với OCB OMNI')).toBeInTheDocument();
        });

        test('renders start button', () => {
            render(<ChatWelcomePage />);

            const button = screen.getByRole('button', { name: /bắt đầu chia sẻ/i });
            expect(button).toBeInTheDocument();
        });

        test('renders all feature items', () => {
            render(<ChatWelcomePage />);

            // 'Hãy bắt đầu chia sẻ' appears twice - in feature list and button
            const shareElements = screen.getAllByText('Hãy bắt đầu chia sẻ');
            expect(shareElements.length).toBeGreaterThanOrEqual(1);
            expect(screen.getByText('Không cần dùng tay')).toBeInTheDocument();
            expect(screen.getByText('Nhắn tin an toàn')).toBeInTheDocument();
            expect(screen.getByText('Ngôn ngữ tự động')).toBeInTheDocument();
        });
    });
});
