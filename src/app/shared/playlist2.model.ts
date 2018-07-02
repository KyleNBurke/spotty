import { Track } from "../track/track.model";

export interface Playlist2 {
    name: string,
    tracksLoaded: boolean,
    tracks: Track[]
}