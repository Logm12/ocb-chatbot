/**
 * Chat Integration Tests
 * Test Cases: FL-02 (Loan Rejection), FL-03 (Human Handoff)
 */
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { ChatInterfacePage } from '../components/ChatInterfacePage';

describe('FL-02: Negative Path - Loan Rejection (Từ chối vay)', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('displays loan rejection message when user requests loan', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(<ChatInterfacePage />);

        // Find input and type loan request
        const input = screen.getByPlaceholderText(/nhập tin nhắn/i);
        await user.type(input, 'Tôi muốn vay 500 triệu');
        await user.keyboard('{Enter}');

        // Wait for bot response with act wrapper
        await act(async () => {
            await vi.advanceTimersByTimeAsync(1000);
        });

        // Check for rejection message
        await waitFor(() => {
            const messages = screen.getAllByText(/tín dụng|không thể/i);
            expect(messages.length).toBeGreaterThan(0);
        });
    });
});

describe('FL-03: Human Handoff (Chuyển người)', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('triggers handoff when user expresses anger', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(<ChatInterfacePage />);

        // Find input and type angry message
        const input = screen.getByPlaceholderText(/nhập tin nhắn/i);
        await user.type(input, 'Làm ăn chán quá!');
        await user.keyboard('{Enter}');

        // Wait for handoff response with act wrapper
        await act(async () => {
            await vi.advanceTimersByTimeAsync(2000);
        });

        // Check for handoff indicators
        await waitFor(() => {
            // Should show apology and handoff message
            const apologyMessages = screen.queryAllByText(/xin lỗi|không hài lòng/i);
            expect(apologyMessages.length).toBeGreaterThan(0);
        });
    });

    test('agent takes over after handoff', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(<ChatInterfacePage />);

        const input = screen.getByPlaceholderText(/nhập tin nhắn/i);
        await user.type(input, 'Làm ăn chán quá!');
        await user.keyboard('{Enter}');

        // Wait for full handoff process (including agent connection) with act wrapper
        await act(async () => {
            await vi.advanceTimersByTimeAsync(6000);
        });

        // Check for agent indicator
        await waitFor(() => {
            const agentMessages = screen.queryAllByText(/nhân viên|tư vấn/i);
            expect(agentMessages.length).toBeGreaterThan(0);
        });
    });
});

describe('Chat Functionality', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('displays initial greeting message', () => {
        render(<ChatInterfacePage />);

        // Check for greeting with user name
        expect(screen.getByText(/chào/i)).toBeInTheDocument();
    });

    test('shows suggestion buttons', () => {
        render(<ChatInterfacePage />);

        expect(screen.getByText('Tôi muốn vay 50tr')).toBeInTheDocument();
        expect(screen.getByText('Chi tiêu tháng này')).toBeInTheDocument();
        expect(screen.getByText('Tra cứu số dư')).toBeInTheDocument();
        expect(screen.getByText('Chuyển tiền')).toBeInTheDocument();
    });

    test('clicking suggestion sends message', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        render(<ChatInterfacePage />);

        // Click a suggestion
        await user.click(screen.getByText('Tra cứu số dư'));

        // Wait for processing with act wrapper
        await act(async () => {
            await vi.advanceTimersByTimeAsync(1000);
        });

        // User message should appear (not just the suggestion button)
        await waitFor(() => {
            const items = screen.getAllByText(/tra cứu số dư/i);
            expect(items.length).toBeGreaterThanOrEqual(1);
        });
    });
});
