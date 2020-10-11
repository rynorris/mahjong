import { ResolvedHand, ResolvedWinState, Score, WinState } from "./types";
import { calculateYakus } from "./yaku";


export function calculateHan(state: WinState, resolvedHand: ResolvedHand): number {
    return 1;
}

export function calculateFu(hand: ResolvedHand): number {
    return 20;
}

export function calculateBasicPoints(han: number, fu: number): number {
    if (han > 12) {
        // Kazoe Yakuman.
        return 8000;
    } else if (han > 10) {
        // Sanbaiman.
        return 6000;
    } else if (han > 7) {
        // Baiman.
        return 4000;
    } else if (han > 5) {
        // Haneman.
        return 3000;
    } else if (han === 5) {
        // Mangan.
        return 2000;
    } else {
        return Math.min(fu * Math.pow(2, 2 + han), 2000);
    }
}

function roundUpToNearestHundred(points: number): number {
    return Math.ceil(points / 100) * 100;
}

export function calculatePayments(han: number, fu: number): [number, number] {
    const basicPoints = calculateBasicPoints(han, fu);
    const dealerPays = roundUpToNearestHundred(2 * basicPoints);
    const nonDealerPays = roundUpToNearestHundred(basicPoints);
    return [dealerPays, nonDealerPays];
}

export function calculateHandScore(state: ResolvedWinState): Score {
    const fu = calculateFu(state.hand);
    const yakus = calculateYakus(state);
    const han = yakus.map(yaku => yaku.han as number).reduce((a, b) => a + b);

    const [dealerPays, nonDealerPays] = calculatePayments(han, fu);
    const totalValue = 
    return { fu, han, dealerPays, nonDealerPays, totalValue };
}