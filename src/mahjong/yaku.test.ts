import { meldsFromString, pairFromString } from "./serde";
import * as Tiles from "./tiles";
import { ResolvedWinState, Yaku } from "./types";
import { calculateYakus } from "./yaku";

interface TestCase {
    state: ResolvedWinState;
    yakus: Yaku[];
}

type RequiredFields = "hand" | "call";

const winStateDefaults: Omit<ResolvedWinState, RequiredFields> = {
        dora: { dora: [Tiles.wind("w")], ura: [Tiles.wind("w")] },
        roundWind: "e",
        playerWind: "s",
        isDealer: false,
        modifiers: [],
};

function winState(
    state: Pick<ResolvedWinState, RequiredFields> & Partial<Omit<ResolvedWinState, RequiredFields>>
): ResolvedWinState {
    return { ...winStateDefaults, ...state };
}

const YAKU_TEST_CASES: [string, TestCase][] = [
    ["Tanyao Nomi", {
        state: winState({
            hand: {
                type: "normal",
                closedMelds: meldsFromString("2m3m4m 8p8p8p"),
                openMelds: meldsFromString("4m5m6m 6s7s8s"),
                pair: pairFromString("6s6s"),
                wait: "tanki",
            },
            call: "ron",
        }),
        yakus: [
            { type: "tanyao", han: 1, isYaku: true },
        ],
    }],

    ["Riichi Nomi", {
        state: winState({
            hand: {
                type: "normal",
                closedMelds: meldsFromString("2m3m4m 8p8p8p"),
                openMelds: meldsFromString("4m5m6m 6s7s8s"),
                pair: pairFromString("1s1s"),
                wait: "tanki",
            },
            call: "ron",
            modifiers: ["riichi"],
        }),
        yakus: [
            { type: "riichi", han: 1, isYaku: true },
        ],
    }],

    ["Riichi Tanyao", {
        state: winState({
            hand: {
                type: "normal",
                closedMelds: meldsFromString("2m3m4m 8p8p8p"),
                openMelds: meldsFromString("4m5m6m 6s7s8s"),
                pair: pairFromString("2s2s"),
                wait: "tanki",
            },
            call: "ron",
            modifiers: ["riichi"],
        }),
        yakus: [
            { type: "riichi", han: 1, isYaku: true },
            { type: "tanyao", han: 1, isYaku: true },
        ],
    }],

    ["Hatsu Nomi", {
        state: winState({
            hand: {
                type: "normal",
                closedMelds: meldsFromString("2m3m4m 8p8p8p"),
                openMelds: meldsFromString("gDgDgD 6s7s8s"),
                pair: pairFromString("1s1s"),
                wait: "tanki",
            },
            call: "ron",
        }),
        yakus: [
            { type: "hatsu", han: 1, isYaku: true },
        ],
    }],
];

test.each(YAKU_TEST_CASES)("%s", (_name, { state, yakus }) => {
    expect(calculateYakus(state)).toStrictEqual(yakus);
})