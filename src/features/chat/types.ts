import type { Beneficiary, Bank } from '../../types'; // Fix: Import from original types definition

export type ChatState = 'IDLE' | 'AWAITING_AMOUNT' | 'AWAITING_BENEFICIARY' | 'LOAN_DENIED' | 'HANDOVER_PENDING' | 'HUMAN_CONNECTED';

export interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user' | 'agent'; // Added 'agent' for human handover
    type?: 'text' | 'link' | 'transaction_summary' | 'interest_rate' | 'beneficiary_list' | 'transfer_confirmation' | 'spending_chart' | 'handover_alert';
    linkPath?: string;
    transactionDetails?: {
        bank: string;
        account: string;
        name: string;
        amount: string;
        status: string;
    };
    beneficiaryList?: Beneficiary[];
    transferDetails?: {
        name: string;
        accountNumber: string;
        bankName: string;
        amount: number;
        bank?: Bank;
    };
    spendingData?: {
        total: number;
        limit: number;
        categories: { label: string; amount: number; color: string }[];
    };
    feedback?: 'like' | 'dislike' | null;
}
