import { handFromString, handToString, meldFromString, meldToString, tileFromString, tileToString } from "./serde";
import * as Tiles from "./tiles";
import { Hand, Meld, Tile } from "./types";

const TILE_TEST_CASES: [string, Tile][] = [
    ["7m", Tiles.numeric("m", 7)],
    ["1s", Tiles.numeric("s", 1)],
    ["9p", Tiles.numeric("p", 9)],
    ["*m", Tiles.redFive("m")],
    ["rD", Tiles.dragon("r")],
    ["eW", Tiles.wind("e")],
];

test.each(TILE_TEST_CASES)("tileToString[%s]", (str, tile) => {
    expect(tileToString(tile)).toBe(str);
});

test.each(TILE_TEST_CASES)("tileFromString[%s]", (str, tile) => {
    expect(tileFromString(str)).toStrictEqual(tile);
});

const MELD_TEST_CASES: [string, Meld][] = [
    ["1m1m1m", {
        type: "pon",
        tiles: [Tiles.numeric("m", 1), Tiles.numeric("m", 1), Tiles.numeric("m", 1)],
    }],
    ["5s*s5s", {
        type: "pon",
        tiles: [Tiles.numeric("s", 5), Tiles.redFive("s"), Tiles.numeric("s", 5)],
    }],
    ["wWwWwW", {
        type: "pon",
        tiles: [Tiles.wind("w"), Tiles.wind("w"), Tiles.wind("w")],
    }],
    ["gDgDgDgD", {
        type: "open-kan",
        tiles: [Tiles.dragon("g"), Tiles.dragon("g"), Tiles.dragon("g"), Tiles.dragon("g")],
    }],
    ["[9p9p9p9p]", {
        type: "closed-kan",
        tiles: [Tiles.numeric("p", 9), Tiles.numeric("p", 9), Tiles.numeric("p", 9), Tiles.numeric("p", 9)],
    }],
];

test.each(MELD_TEST_CASES)("meldToString[%s]", (str, meld) => {
    expect(meldToString(meld)).toBe(str);
});

test.each(MELD_TEST_CASES)("meldFromString[%s]", (str, meld) => {
    expect(meldFromString(str)).toStrictEqual(meld);
});

const HAND_TEST_CASES: [String, Hand][] = [
    ["1m1m2m8s9seWeW 4p*p6p gDgDgD", {
        tiles: [
            Tiles.manzu(1), Tiles.manzu(1), Tiles.manzu(2),
            Tiles.souzu(8), Tiles.souzu(9),
            Tiles.wind("e"), Tiles.wind("e"),
        ],
        melds: [
            { type: "chii", tiles: [Tiles.pinzu(4), Tiles.redFive("p"), Tiles.pinzu(6)] },
            { type: "pon", tiles: [Tiles.dragon("g"), Tiles.dragon("g"), Tiles.dragon("g")] },
        ],
    }]
];

test.each(HAND_TEST_CASES)("handToString[%s]", (str, hand) => {
    expect(handToString(hand)).toBe(str);
});

test.each(HAND_TEST_CASES)("handFromString[%s]", (str, hand) => {
    expect(handFromString(str)).toStrictEqual(hand);
});