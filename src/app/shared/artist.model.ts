import { Track } from "./track.model";
import { Context } from "./spotify-api.service";

export interface Artist {
    context: Context,
    name: string,
    image: string,
    tracks: Track[],
    uri: string,
    albums: [ArtistAlbum[]],
    singles: ArtistAlbum[]
}

export interface ArtistAlbum {
    name: string,
    image: string,
    id: string,
    date: string
}