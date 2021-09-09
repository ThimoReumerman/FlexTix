export default interface IArtist {
    _id?: string,
    name: string,
    bio: string,
    media?: {
        mediaId: string
    }[]
}

export const EmptyArtist: IArtist = {
    name: "",
    bio: ""
}