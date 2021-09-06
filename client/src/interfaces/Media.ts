export enum MediaType {
    None,
    Image,
    Video
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

export const UploadMedia = async (media: IMedia): Promise<void> => {
    
}