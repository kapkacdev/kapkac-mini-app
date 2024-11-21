export interface StakeInfo {
    amount: string;            // Using string for better compatibility
    lockPeriod: number;
    communityType: string;
    lastRewardTime: number;
    ratings: number[];
    transactionCount: number;
}