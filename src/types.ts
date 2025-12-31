export interface User {
    id: string;
    fullName: string;
    accountNumber: string;
    balance: number;
    avatarUrl?: string;
}

export interface Beneficiary {
    id: string;
    name: string;
    accountNumber: string;
    bankName: string;
    bankShortName: string; // Ví dụ: OCB, MB, VCB
    bankId?: string; // Link to Bank ID
}

export interface Transaction {
    id: string;
    date: string; // ISO format YYYY-MM-DD
    amount: number;
    type: 'in' | 'out'; // Tiền vào hoặc Tiền ra
    description: string;
    beneficiaryName?: string;
}

export interface InterestRate {
    term: string; // Kỳ hạn
    rate: number; // %/năm
    type: 'counter' | 'online'; // Tại quầy hoặc Online
}

export interface Bank {
    id: string;
    shortName: string;
    name: string;
    logo?: string;
    color?: string;
    logoUrl?: string;
}
