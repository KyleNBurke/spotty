import { Track } from "./track.model";
import { Context } from "./spotify-api.service";

export interface Album {
    context: Context,
    name: string,
    tracks: Track[],
    uri: string,
    image: string,
    artist: string[],
    type: string
}