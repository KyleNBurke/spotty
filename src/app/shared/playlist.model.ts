import { Track } from "../track/track.model";

export interface Playlist {
    name: string,
    tracksLoaded: boolean,
    tracks: Track[],
    id: string
}