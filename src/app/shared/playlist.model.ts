import { Track } from "./track.model";
import { Context } from "./spotify-api.service";

export interface Playlist {
    context: Context,
    name: string,
    tracks: Track[],
    id: string,
    uri: string,
    image: string,
    public: boolean,
    owner: string
}