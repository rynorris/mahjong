export type Suit = "m" | "s" | "p";
export type TileNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Wind = "n" | "s" | "e" | "w";
export type Dragon = "w" | "g" | "r";

export interface NumericTile {
    type: "numeric";
    suit: Suit;
    number: TileNumber;
}

export interface RedFive {
    type: "red-five";
    suit: Suit;
    number: 5;
}

export interface WindTile {
    type: "wind";
    wind: Wind;
}

export interface DragonTile {
    type: "dragon";
    dragon: Dragon;
}

export type HonorTile = WindTile | DragonTile;
export type Tile = NumericTile | RedFive | HonorTile;

export interface Pon {
    type: "pon";
    tiles: [Tile, Tile, Tile];
}

export interface ClosedKan {
    type: "closed-kan";
    tiles: [Tile, Tile, Tile, Tile];
}

export interface OpenKan {
    type: "open-kan";
    tiles: [Tile, Tile, Tile, Tile];
}

export interface Chii {
    type: "chii";
    tiles: [Tile, Tile, Tile];
}

export interface Pair {
    type: "pair";
    tiles: [Tile, Tile];
}

export type Meld = Pon | ClosedKan | OpenKan | Chii;

interface NoMeldsHand {
    tiles: [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile];
    melds: [];
}

interface OneMeldHand {
    tiles: [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile];
    melds: [Meld];
}

interface TwoMeldsHand {
    tiles: [Tile, Tile, Tile, Tile, Tile, Tile, Tile];
    melds: [Meld, Meld];
}

interface ThreeMeldsHand {
    tiles: [Tile, Tile, Tile, Tile];
    melds: [Meld, Meld, Meld];
}

interface FourMeldsHand {
    tiles: [Tile];
    melds: [Meld, Meld, Meld, Meld];
}

export type Hand = NoMeldsHand | OneMeldHand | TwoMeldsHand | ThreeMeldsHand | FourMeldsHand;

interface OneDora { dora: [Tile], ura: [Tile] };
interface TwoDora { dora: [Tile, Tile], ura: [Tile, Tile] };
interface ThreeDora { dora: [Tile, Tile, Tile], ura: [Tile, Tile, Tile] };
interface FourDora { dora: [Tile, Tile, Tile, Tile], ura: [Tile, Tile, Tile, Tile] };

type Dora = OneDora | TwoDora | ThreeDora | FourDora;

export type WinningCall = "ron" | "tsumo";

export type Modifier = "riichi" | "ippatsu" | "double-riichi" | "haitei" | "houtei" | "tenhou" | "chihou" | "chankan" | "nagashi";

export interface WinState {
    hand: Hand;
    finalTile: Tile;
    call: WinningCall;
    dora:  Dora;
    roundWind: Wind;
    playerWind: Wind;
    isDealer: boolean;
    modifiers: Modifier[];
}

export interface NormalResolvedHand {
    type: "normal";
    closedMelds: Meld[];
    openMelds: Meld[];
    pair: Pair;
    wait: "tanki" | "penchan" | "kanchan" | "ryanmen";
}

export interface ChiitoitsuResolvedHand {
    type: "chiitoitsu";
    pairs: [Pair, Pair, Pair, Pair, Pair, Pair, Pair];
    wait: "tanki";
}

export interface KokushiResolvedHand {
    type: "kokushi";
    tiles: [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile];
    wait: "single" | "thirteen-way";
}

export type ResolvedHand = NormalResolvedHand | ChiitoitsuResolvedHand | KokushiResolvedHand;

export type ResolvedWinState = Omit<WinState, "hand" | "finalTile"> & { hand: ResolvedHand };

export interface OneHanYaku {
    type: "chun" | "hatsu" | "haku" | "jikaze" | "bakaze" | "tanyao" | "riichi" | "ippatsu";
    han: 1;
    isYaku: true;
}

export interface TwoHanYaku {
    type: "toitoi" | "sanankou" | "sankantsu" | "sanshoku-doukou";
    han: 2;
    isYaku: true;
}

export interface DoraYaku {
    type: "dora" | "red-five" | "ura-dora";
    han: 1;
    isYaku: false;
}

export type Yaku = OneHanYaku | TwoHanYaku | DoraYaku;

export interface Score {
    fu: number;
    han: number;
    dealerPays: number;
    nonDealerPays: number;
    totalValue: number;
}