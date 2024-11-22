// todo: create necessary types on this file and types.d.ts file

declare module 'types' {
    export interface StakeInfo {
        amount: string;
        lockPeriod: number;
        communityType: string;
        lastRewardTime: number;
        ratings: number[];
        transactionCount: number;
    }
}