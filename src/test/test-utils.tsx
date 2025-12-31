import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { UserProvider } from '../contexts/UserContext';
import type { ReactElement, ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
}

const AllProviders = ({ children }: WrapperProps) => {
    return (
        <UserProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </LanguageProvider>
            </ThemeProvider>
        </UserProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
