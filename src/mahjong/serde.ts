import * as Tiles from "./tiles";
import { Dragon, Hand, Meld, Pair, Tile, TileNumber, Wind } from "./types";

export function tileToString(tile: Tile): string {
    switch (tile.type) {
        case "numeric":
            return `${tile.number}${tile.suit}`;
        case "red-five":
            return `*${tile.suit}`;
        case "dragon":
            return `${tile.dragon}D`;
        case "wind":
            return `${tile.wind}W`;
    }
}

export function tileFromString(s: string): Tile {
    if (s.length !== 2) {
        throw new Error("Tile string must be length 2");
    }

    const value = s[0];
    const type = s[1];

    switch (type) {
        case "m":
        case "s":
        case "p":
            if (value === "*") {
                return Tiles.redFive(type);
            } else {
                return Tiles.numeric(type, parseInt(value) as TileNumber);
            }
        case "D":
            if (value === "g" || value === "w" || value === "r") {
                return Tiles.dragon(value as Dragon);
            } else {
                throw new Error(`Invalid dragon: ${value}`);
            }
        case "W":
            if (value === "n" || value === "s" || value === "e" || value === "w") {
                return Tiles.wind(value as Wind);
            } else {
                throw new Error(`Invalid dragon: ${value}`);
            }
        default:
            throw new Error(`Invalid tile type: ${type}`);
    }
}

export function tilesFromString(s: string): Tile[] {
    const chunks = s.match(/(.{2})/g);
    if (chunks == null) {
        throw new Error("Failed to split chunks");
    }

    return chunks.map(tileFromString);
}

export function pairFromString(s: string): Pair {
    const tiles = tilesFromString(s);
    if (tiles.length !== 2) {
        throw new Error(`Pair must contain exactly 2 tiles: ${s}`);
    }

    return { type: "pair", tiles: tiles as [Tile, Tile] };
}

export function meldToString(meld: Meld): string {
    const str = meld.tiles.map(tileToString).join("");
    if (meld.type === "closed-kan") {
        return `[${str}]`
    } else {
        return str;
    }
}

export function meldFromString(s: string): Meld {
    if (s.length !== 6 && s.length !== 8 && s.length !== 10) {
        throw new Error("Meld string must be 6, 8 or 10 chars long");
    }

    const closedKan = s.match(/\[(.{8})\]/);
    if (closedKan != null) {
        s = closedKan[1];
    }

    const tiles = tilesFromString(s);

    if (tiles.length === 4) {
        return { type: closedKan == null ? "open-kan" : "closed-kan", tiles: tiles as [Tile, Tile, Tile, Tile] };
    }

    const [tile1, tile2, tile3] = tiles;

    if (Tiles.allMatch(tile1, tile2, tile3)) {
        return { type: "pon", tiles: [tile1, tile2, tile3] };
    }

    if (Tiles.hasNumber(tile1) && Tiles.hasNumber(tile2) && Tiles.hasNumber(tile3)) {
        if ((tile2.number === tile1.number + 1) && (tile3.number === tile2.number + 1)) {
            return { type: "chii", tiles: [tile1, tile2, tile3] };
        }
        throw new Error(`Invalid chii, numbers not sequential: ${s}`);
    }

    throw new Error(`Failed to deserialize meld: ${s}`);
}

export function meldsFromString(s: string): Meld[] {
    return s.split(" ").map(meldFromString);
}

export function handToString(hand: Hand): string {
    const tiles = hand.tiles.map(tileToString).join("");
    const melds = hand.melds.map(meldToString).join(" ");
    return `${tiles} ${melds}`;
}

export function handFromString(s: String): Hand {
    const chunks = s.split(" ");
    const [tileString, ...meldStrings] = chunks;
    const tiles = tilesFromString(tileString);
    const melds = meldStrings.map(meldFromString);

    if (tiles.length != 13 - (melds.length * 3)) {
        throw new Error(`Invalid hand size: ${s}`)
    }

    return { tiles, melds } as Hand;
}