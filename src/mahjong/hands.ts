import { NormalResolvedHand, ResolvedHand } from "./types";


export function isNormal(hand: ResolvedHand): hand is NormalResolvedHand {
    return hand.type === "normal";
}