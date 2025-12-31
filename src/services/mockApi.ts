// src/services/mockApi.ts

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock User Data Persistence (In-memory for session)
let mockUserStore = {
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random",
    theme: 'light',
    password: 'password123'
};

// Helper: Convert File to Base64 Data URL (for localStorage persistence)
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const settingsApi = {
    updateAvatar: async (file: File): Promise<string> => {
        await delay(1000); // Simulate upload
        // Random Error (10% chance)
        if (Math.random() < 0.1) throw new Error("UploadFailed: Connection Interrupted");

        // Convert to base64 data URL (persists in localStorage properly)
        const base64Url = await fileToBase64(file);
        mockUserStore.avatar = base64Url;
        return base64Url;
    },

    updateTheme: async (theme: 'light' | 'dark'): Promise<string> => {
        await delay(500);
        mockUserStore.theme = theme;
        return theme;
    },

    changePassword: async (currentPass: string, newPass: string): Promise<boolean> => {
        await delay(2000);

        // Validation Logic
        if (currentPass !== mockUserStore.password) {
            throw new Error("PasswordMismatch: Mật khẩu hiện tại không đúng.");
        }

        if (newPass.length < 6) {
            throw new Error("WeakPassword: Mật khẩu mới phải có ít nhất 6 ký tự.");
        }

        if (newPass === currentPass) {
            throw new Error("SamePassword: Mật khẩu mới không được trùng với mật khẩu cũ.");
        }

        // Random Server Error (10% chance)
        if (Math.random() < 0.1) throw new Error("ServerError: Hệ thống đang bảo trì. Vui lòng thử lại sau.");

        mockUserStore.password = newPass;
        return true;
    },

    getBeneficiaries: async () => {
        await delay(800);
        return [
            { id: 1, name: 'NGUYEN VAN B', bank: 'VCB', account: '9876543210' },
            { id: 2, name: 'LE HONG C', bank: 'TCB', account: '1234567890' },
            { id: 3, name: 'PHAM THI D', bank: 'MB', account: '456123789' },
        ];
    },

    closeAccount: async (reason: string) => {
        await delay(3000);
        if (!reason) throw new Error("ReasonRequired: Vui lòng nhập lý do.");
        return true;
    }
};
