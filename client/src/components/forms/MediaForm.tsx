import React, { FC } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';
import apiLink from '../../api';

import { useForm, SubmitHandler } from 'react-hook-form';

import IMedia, { MediaType } from "../../interfaces/Media";

interface IProps {
    media?: IMedia
}

interface IUploadMedia extends IMedia {
    upload: File,
    uploadList: FileList
}

const MediaForm: FC<IProps> = ({media}) => {

    const {register, handleSubmit} = useForm<IUploadMedia>();
    
    const onSubmit: SubmitHandler<IUploadMedia> = (data) => {

        // Create FormData variable 
        const formData: FormData = new FormData();

        // Add data to formdata
        formData.append("description", data.description);
        formData.append("alt", data.alt);
        formData.append("type", data.type.toString());
        formData.append("upload", data.uploadList[0]);

        // Post request
        axios.post(
            `${apiLink}/media`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then((response: AxiosResponse) => {
            alert("Successfully added media");
            console.log(response);
        }).catch((error: AxiosError) => {
            console.log(error);
        });
    }

    return (
        <form id="mediaForm" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Description
                <input {...register("description")} id="description" type="text" value={media?.description} />
            </label>
            <label>
                Alt
                <input {...register("alt")} id="alt" type="text" value={media?.alt} />
            </label>
            <label>
                Type
                <select {...register("type")} id="type" name="type">
                    <option value={MediaType.None}>Selecteer een type...</option>
                    <option value={MediaType.Image}>Foto</option>
                    <option value={MediaType.Video}>Video</option>
                </select>  
            </label>
            <label>
                Media
                <input {...register("uploadList")} id="upload" type="File" accept="image/*, video/*" />
            </label>
            <label>
                Submit
                <input type="submit" value="Submit" />
            </label>
        </form>
    )
}

// class MediaForm extends Component<IProps, IState> {
//     constructor (props: IProps) {
//         super(props);

//         // Set state based on prop media, else use an empty media object
//         this.state = {media: props.media ? props.media : EmptyMedia};

//         // Bind change and submit handling
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async componentDidMount() {
//         console.log("Component did mount.");
//     }

//     async handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
//         // Prevent the page from refreshing
//         event.preventDefault();

//         // Upload media to localhost
        
//     }

//     handleChange (event: React.FormEvent<HTMLFormElement>): void {
//         let myMedia: IMedia = this.state.media;
//         const target: ITarget = event.target;

//         target.media?.alt
        
//         // I need to get set the media state to the event variables

//         // this.setState(/* ... */);
//     }

//     render() {
//         return (
//             <form id="mediaForm" onSubmit={this.handleSubmit} onChange={this.handleChange}>
//                 <label htmlFor="description">
//                     Description
//                 </label>
//                 <input id="description" type="text" value={this.props.media?.description} />
//                 <label htmlFor="alt">
//                     Alt
//                 </label>
//                 <input id="alt" type="text" value={this.props.media?.alt} />
//                 <label htmlFor="type">Type</label>
//                 <select id="type" name="type">
//                     <option value={MediaType.None}>Selecteer een type...</option>
//                     <option value={MediaType.Image}>Foto</option>
//                     <option value={MediaType.Video}>Video</option>
//                 </select>

                                
//             </form>
//         )
//     }
// }

export default MediaForm;