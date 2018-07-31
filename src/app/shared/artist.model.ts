import { Track } from "./track.model";
import { Context } from "./spotify-api.service";

export interface Artist {
    context: Context,
    name: string,
    image: string,
    tracks: Track[],
    uri: string,
    albumName: string[],
    albumImage: string[],
    albumID: string[],
    singleName: string[],
    singleImage: string[],
    singleID: string[]
}