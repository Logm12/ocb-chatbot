import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './features/auth/components/LoginPage';
import { RegisterPage } from './features/auth/components/register/RegisterPage';
import { DashboardPage } from './features/dashboard/components/DashboardPage';
import { ProductsPage } from './features/dashboard/components/ProductsPage';
import { MyCardsPage } from './features/dashboard/components/MyCardsPage';
import { SavingsPage } from './features/dashboard/components/SavingsPage';
import { TransferPage } from './features/transfer/components/TransferPage';
import { TransactionHistoryPage } from './features/transactions/components/TransactionHistoryPage';
import { ChatWelcomePage } from './features/chat/components/ChatWelcomePage';
import { ChatInterfacePage } from './features/chat/components/ChatInterfacePage';
import { SettingsPage } from './features/settings/components/SettingsPage';
import { ChangePasswordPage } from './features/settings/components/ChangePasswordPage';
import { MobileFrame } from './components/layout/MobileFrame';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <MobileFrame>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/my-cards" element={<MyCardsPage />} />
                <Route path="/savings" element={<SavingsPage />} />
                <Route path="/transfer" element={<TransferPage />} />
                <Route path="/transactions" element={<TransactionHistoryPage />} />
                <Route path="/chat-welcome" element={<ChatWelcomePage />} />
                <Route path="/chat" element={<ChatInterfacePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/password" element={<ChangePasswordPage />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </MobileFrame>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
