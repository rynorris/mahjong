import { Dragon, DragonTile, HonorTile, NumericTile, RedFive, Suit, Tile, TileNumber, Wind, WindTile } from "./types";

export function numeric(suit: Suit, number: TileNumber): NumericTile {
    return { type: "numeric", suit, number };
}

export function pinzu(number: TileNumber): NumericTile {
    return { type: "numeric", suit: "p", number };
}

export function manzu(number: TileNumber): NumericTile {
    return { type: "numeric", suit: "m", number };
}

export function souzu(number: TileNumber): NumericTile {
    return { type: "numeric", suit: "s", number };
}

export function redFive(suit: Suit): RedFive {
    return { type: "red-five", suit, number: 5 };
}

export function wind(wind: Wind): WindTile {
    return { type: "wind", wind };
}

export function dragon(dragon: Dragon): DragonTile {
    return { type: "dragon", dragon };
}

export function isWind(tile: Tile): tile is WindTile {
    return tile.type === "wind";
}

export function isDragon(tile: Tile): tile is DragonTile {
    return tile.type === "dragon";
}

export function isHonor(tile: Tile): tile is HonorTile {
    return isWind(tile) || isDragon(tile);
}

export function isNumeric(tile: Tile): tile is NumericTile {
    return tile.type === "numeric";
}

export function isRedFive(tile: Tile): tile is RedFive {
    return tile.type === "red-five";
}

export function hasNumber(tile: Tile): tile is NumericTile | RedFive {
    return isNumeric(tile) || isRedFive(tile);
}

export function isTerminal(tile: Tile): boolean {
    return tile.type === "numeric" && (tile.number === 1 || tile.number === 9);
}

export function isSimple(tile: Tile): boolean {
    return !isHonor(tile) && !isTerminal(tile);
}

export function areMatching(tile1: Tile, tile2: Tile): boolean {
    if (isDragon(tile1) && isDragon(tile2)) {
        return tile1.dragon === tile2.dragon;
    }

    if (isWind(tile1) && isWind(tile2)) {
        return tile1.wind === tile2.wind;
    }

    if (hasNumber(tile1) && hasNumber(tile2)) {
        return tile1.suit === tile2.suit && tile1.number === tile2.number;
    }

    return false;
}

export function allMatch(...tiles: Tile[]): boolean {
    if (tiles.length === 0) {
        return true;
    }

    return tiles.every(tile => areMatching(tile, tiles[0]));
}

export function areEqual(tile1: Tile, tile2: Tile) {
    return areMatching(tile1, tile2) && tile1.type === tile2.type;
}