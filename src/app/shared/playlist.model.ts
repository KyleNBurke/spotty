import { Track } from "./track.model";

export interface Playlist {
    name: string,
    tracks: Track[],
    id: string,
    uri: string,
    image: string,
    public: boolean,
    owner: string
}