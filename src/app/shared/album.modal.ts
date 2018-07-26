import { Track } from "./track.model";

export interface Album {
    name: string,
    tracks: Track[],
    uri: string,
    image: string,
    artist: string
    type: string
}