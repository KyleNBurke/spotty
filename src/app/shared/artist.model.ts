import { Track } from "./track.model";

export interface Artist {
    name: string,
    image: string,
    popularTracks: Track[]
}