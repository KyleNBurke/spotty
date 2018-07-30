export interface Track {
    title: string,
    artistName: string[],
    artistID: string[],
    albumName: string,
    albumID: string,
    uri: string,
    image: string,
    length: number,
    lengthFormatted: string,
    explicit: boolean
}