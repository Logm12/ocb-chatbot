import { type Beneficiary, type Transaction, type InterestRate } from './types';

// 1. Dữ liệu Người dùng (User Profile)
export const currentUser: User = {
    id: 'user_001',
    username: '0913144768',
    passwordHash: 'hashed_pwd',
    fullName: 'NGUYEN VAN A',
    accountNumber: '1983493579',
    balance: 1850000,
    avatar: '', // fallback if avatarUrl specific
    avatarUrl: 'https://i.pravatar.cc/150?u=nguyenvana',
    email: 'email@example.com',
    phoneNumber: '0913144768'
};

// 2. Danh bạ thụ hưởng (Saved Contacts)
export const beneficiaries: Beneficiary[] = [
    {
        id: 'ben_001',
        name: 'TRAN VAN C',
        accountNumber: '103000234718',
        bankName: 'Ngân hàng TMCP Công Thương Việt Nam',
        bankShortName: 'OCB',
        bankId: 'ocb'
    },
    {
        id: 'ben_002',
        name: 'NGO VAN B',
        accountNumber: '103000345898',
        bankName: 'Ngân hàng Phương Đông',
        bankShortName: 'OCB',
        bankId: 'ocb'
    },
    {
        id: 'ben_003',
        name: 'LE HONG H',
        accountNumber: '928643923235',
        bankName: 'Ngân hàng Ngoại thương Việt Nam',
        bankShortName: 'Vietcombank',
        bankId: 'vcb'
    },
    {
        id: 'ben_004',
        name: 'DAO LE KHANH',
        accountNumber: '0913144768',
        bankName: 'Ngân hàng Quân đội',
        bankShortName: 'MB',
        bankId: 'mb'
    }
];

// Alias for compatibility with new Transfer components
export const savedBeneficiaries = beneficiaries;

// 3. Lịch sử giao dịch (Transaction History)
export const transactionHistory: Transaction[] = [
    {
        id: 'trans_001',
        date: '2025-12-30',
        amount: 200000,
        type: 'out',
        description: 'Chuyen tien cho DAO LE KHANH',
        beneficiaryName: 'DAO LE KHANH'
    },
    {
        id: 'trans_002',
        date: '2025-12-29',
        amount: 50000,
        type: 'out',
        description: 'NGUYEN VAN A chuyen tien',
        beneficiaryName: 'TRAN VAN C'
    },
    {
        id: 'trans_003',
        date: '2025-12-29',
        amount: 100000,
        type: 'out',
        description: 'NGUYEN VAN A chuyen tien',
        beneficiaryName: 'LE HONG H'
    },
    {
        id: 'trans_004',
        date: '2025-12-28',
        amount: 40000,
        type: 'out',
        description: 'NGUYEN VAN A chuyen tien',
        beneficiaryName: 'DAO LE KHANH'
    },
    {
        id: 'trans_005',
        date: '2025-12-28',
        amount: 200000,
        type: 'in',
        description: 'NGUYEN VAN A chuyen tien',
        beneficiaryName: 'MAC PHAM THIEN LONG'
    }
];

// 4. Bảng Lãi suất Tiết kiệm
export const interestRates: InterestRate[] = [
    { term: '3 tháng', rate: 4.6, type: 'online' },
    { term: '6 tháng', rate: 5.7, type: 'online' },
    { term: '12 tháng', rate: 5.8, type: 'online' }
];

// 5. Thống kê chi tiêu (Cho biểu đồ Chart)
export const spendingStats = [
    { month: 'Tháng 9', amount: 1500000 },
    { month: 'Tháng 10', amount: 500000 },
    { month: 'Tháng 11', amount: 1000000 },
    { month: 'Tháng 12', amount: 1200000 },
];

// 1. User Database
export interface User {
    id: string; // Added id field
    username: string; // Modified: Added field to match usage
    passwordHash: string; // Plain text for mock
    fullName: string;
    avatar: string; // URL or base64
    accountNumber: string;
    balance: number;
    email: string;
    phoneNumber: string;
    avatarUrl?: string; // Added optional to match existing data usages
}

// Fixed Credential: 0913144768 / 123456
export const users: User[] = [
    {
        id: 'user_001', // Added id
        username: '0913144768',
        passwordHash: '123456',
        fullName: 'NGUYEN VAN A',
        avatar: 'https://i.pravatar.cc/150?img=11',
        accountNumber: '1983493579',
        balance: 1850000,
        email: 'nguyenvana@example.com',
        phoneNumber: '0913144768'
    }
];
// 5. Bank Database
export interface Bank {
    id: string;
    shortName: string;
    name: string;
    logo?: string; // CSS Color class (Fallback)
    color?: string; // CSS Color class
    logoUrl?: string; // Path to image
}

export const banks: Bank[] = [
    { id: 'ocb', shortName: 'OCB', name: 'Ngân hàng Phương Đông', color: 'bg-green-600', logoUrl: '/assets/banks/ocb.png' }, // Updated OCB Logo
    { id: 'vcb', shortName: 'Vietcombank', name: 'Ngân hàng Ngoại thương', color: 'bg-green-700', logoUrl: '/assets/banks/vietcombank.png' },
    { id: 'bidv', shortName: 'BIDV', name: 'Ngân hàng Đầu tư và Phát triển', color: 'bg-blue-600', logoUrl: '/assets/banks/bidv.png' },
    { id: 'agri', shortName: 'Agribank', name: 'Ngân hàng Agribank', color: 'bg-red-800', logoUrl: '/assets/banks/agribank.png' },
    { id: 'mb', shortName: 'MB', name: 'Ngân hàng Quân Đội', color: 'bg-blue-800', logoUrl: '/assets/banks/mbbank.png' },
    { id: 'tcb', shortName: 'Techcombank', name: 'Ngân hàng Kỹ thương', color: 'bg-red-600', logoUrl: '/assets/banks/techcombank.png' },
    { id: 'acb', shortName: 'ACB', name: 'Ngân hàng Á Châu', color: 'bg-blue-500', logoUrl: '/assets/banks/acb.png' },
    { id: 'vpb', shortName: 'VPBank', name: 'Ngân hàng VPBank', color: 'bg-green-500', logoUrl: '/assets/banks/vpbank.png' },
    { id: 'tp', shortName: 'TPBank', name: 'Ngân hàng Tiên Phong', color: 'bg-purple-600', logoUrl: '/assets/banks/tpbank.png' },
    { id: 'sacom', shortName: 'Sacombank', name: 'Ngân hàng Sài Gòn Thương Tín', color: 'bg-blue-400', logoUrl: '/assets/banks/sacombank.png' },
];

// 7. Mock Logic
export const resolveAccountName = (bankId: string, accountNumber: string): Promise<string | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const found = beneficiaries.find(b => (b.bankId === bankId || b.bankShortName.toLowerCase() === bankId) && b.accountNumber === accountNumber);
            if (found) resolve(found.name);
            else if (accountNumber.length > 8) resolve('NGUYEN VAN A');
            else resolve(null);
        }, 800);
    });
};

export const processTransfer = (amount: number, content: string, beneficiary: any): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Update Mock Balance (Visual only)
            console.log(`Transferred ${amount} to ${beneficiary.name} with content: ${content}`);
            resolve(true);
        }, 1500);
    });
};
