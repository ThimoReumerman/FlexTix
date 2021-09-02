export default interface IConcert {
    title: string,
    description: string,
    genre: string,
    price: number,
    location: string,
    artists?: [{
        artistId: string
    }],
    media?: [{
        alt: string,
        description: string,
        path: string,
        type: string
    }]
}

export const EmptyConcert: IConcert = {
    title: "",
    description: "",
    genre: "",
    price: 0,
    location: ""
}