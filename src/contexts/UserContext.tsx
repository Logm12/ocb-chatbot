import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { users as initialMockUsers, type User as MockUserType } from '../mockData';

interface UserProfile {
    id: string;
    fullName: string;
    phoneNumber: string;
    avatar: string | null;
    balance: number;
    accountNumber: string;
}

interface UserContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    login: (phoneNumber: string, passwordHash: string) => boolean;
    logout: () => void;
    register: (phoneNumber: string, passwordHash: string, fullName: string) => boolean;
    updateAvatar: (url: string) => void;
}

const USER_KEY = 'ocb_users_db';
const SESSION_KEY = 'ocb_session_user';
const TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    // 1. Load User Database (mock + local storage)
    const [userDb, setUserDb] = useState<MockUserType[]>(() => {
        const saved = localStorage.getItem(USER_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        // Seed with fixed credential
        localStorage.setItem(USER_KEY, JSON.stringify(initialMockUsers));
        return initialMockUsers;
    });

    // 2. Session State
    const [user, setUser] = useState<UserProfile | null>(() => {
        const saved = localStorage.getItem(SESSION_KEY);
        return saved ? JSON.parse(saved) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

    // Persist DB updates
    useEffect(() => {
        localStorage.setItem(USER_KEY, JSON.stringify(userDb));
    }, [userDb]);

    // Persist Session updates
    useEffect(() => {
        if (user) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(user));
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem(SESSION_KEY);
            setIsAuthenticated(false);
        }
    }, [user]);

    // Login Function
    const login = (phoneNumber: string, passwordHash: string): boolean => {
        // Find user
        const foundUser = userDb.find(u => u.username === phoneNumber && u.passwordHash === passwordHash);
        if (foundUser) {
            const profile: UserProfile = {
                id: foundUser.username,
                fullName: foundUser.fullName,
                phoneNumber: foundUser.phoneNumber,
                avatar: foundUser.avatar,
                balance: foundUser.balance,
                accountNumber: foundUser.accountNumber
            };
            setUser(profile);
            return true;
        }
        return false;
    };

    // Logout Function
    const logout = useCallback(() => {
        setUser(null);
        window.location.href = '/login';
    }, []);

    // Register Function
    const register = (phoneNumber: string, passwordHash: string, fullName: string): boolean => {
        if (userDb.some(u => u.username === phoneNumber)) {
            return false; // Already exists
        }
        const newUser: MockUserType = {
            id: phoneNumber, // Use phone as ID for mock
            username: phoneNumber,
            passwordHash: passwordHash,
            fullName: fullName,
            avatar: 'https://i.pravatar.cc/150?u=' + phoneNumber,
            accountNumber: '1900' + Math.floor(Math.random() * 100000000), // Random account number
            balance: 0, // New account has 0 balance
            email: `${phoneNumber}@example.com`,
            phoneNumber: phoneNumber
        };
        setUserDb(prev => [...prev, newUser]);
        return true;
    };

    // Update Avatar
    const updateAvatar = (url: string) => {
        if (user) {
            setUser(prev => prev ? { ...prev, avatar: url } : null);
            // Also update in DB
            setUserDb(prev => prev.map(u => u.username === user.phoneNumber ? { ...u, avatar: url } : u));
        }
    };

    // Auto Logout Timeout
    useEffect(() => {
        if (!isAuthenticated) return;
        let timer: ReturnType<typeof setTimeout>;

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                console.log('Session expired');
                logout();
            }, TIMEOUT_MS);
        }

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keydown', resetTimer);

        resetTimer();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        }
    }, [isAuthenticated, logout]);


    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout, register, updateAvatar }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
