import { HonorTile, OneHanYaku, ResolvedHand, ResolvedWinState, Tile, WinState, Yaku } from "./types";
import * as Hands from "./hands";
import * as Tiles from "./tiles";

type YakuCalculator = (state: ResolvedWinState) => Yaku | null;

const oneHan = (type: OneHanYaku["type"]): OneHanYaku => ({ type, han: 1, isYaku: true });

export const Tanyao: YakuCalculator = state => {
    if (!Hands.isNormal(state.hand)) {
        return null;
    }

    const allTiles: Tile[] = [
        ...state.hand.closedMelds.flatMap(meld => meld.tiles),
        ...state.hand.openMelds.flatMap(meld => meld.tiles),
        ...state.hand.pair.tiles,
    ];

    const allSimples = allTiles.every(Tiles.isSimple);
    return allSimples ? oneHan("tanyao") : null;
};

export const Riichi: YakuCalculator = state => {
    return state.modifiers.includes("riichi") ? oneHan("riichi") : null;
};

function yakuhai(type: OneHanYaku["type"], toMatch: (state: ResolvedWinState) => HonorTile): YakuCalculator {
    return state => {
        if (!Hands.isNormal(state.hand)) {
            return null;
        }

        const tileToMatch = toMatch(state);
        const allMelds = [...state.hand.closedMelds, ...state.hand.openMelds];
        const isYaku = allMelds.find(meld => meld.tiles.every(tile => Tiles.areEqual(tile, tileToMatch))) !== undefined;
        return isYaku ? oneHan(type) : null;
    };
}

export const Haku: YakuCalculator = yakuhai("haku", () => Tiles.dragon("w"));
export const Hatsu: YakuCalculator = yakuhai("hatsu", () => Tiles.dragon("g"));
export const Chun: YakuCalculator = yakuhai("chun", () => Tiles.dragon("r"));
export const Jikaze: YakuCalculator = yakuhai("jikaze", state => Tiles.wind(state.playerWind));
export const Bakaze: YakuCalculator = yakuhai("bakaze", state => Tiles.wind(state.roundWind));

const calculators: YakuCalculator[] = [
    Riichi,
    Haku,
    Hatsu,
    Chun,
    Jikaze,
    Bakaze,
    Tanyao,
]

function isNotNull<T>(arg: T | null): arg is T {
    return arg !== null;
}

export function calculateYakus(state: ResolvedWinState): Yaku[] {
    return calculators.map(calc => calc(state)).filter(isNotNull);
}