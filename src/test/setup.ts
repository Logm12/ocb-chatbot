import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock performance.now for latency tests
const originalPerformanceNow = performance.now.bind(performance);
vi.spyOn(performance, 'now').mockImplementation(originalPerformanceNow);

// Reset all mocks between tests
afterEach(() => {
    vi.clearAllMocks();
});
