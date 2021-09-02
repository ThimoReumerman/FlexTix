export default interface IArtist {
    _id?: string,
    name: string,
    bio: string,
    media?: [{
        alt: string,
        description: string,
        path: string
    }]
}

export const EmptyArtist: IArtist = {
    name: "",
    bio: ""
}