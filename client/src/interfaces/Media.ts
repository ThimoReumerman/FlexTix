export enum MediaType {
    Image,
    Video,
    None
}

export default interface IMedia {
    alt: string,
    description: string,
    path: string,
    type: MediaType
}

export const EmptyMedia: IMedia = {
    alt: "",
    description: "",
    path: "",
    type: MediaType.None
}