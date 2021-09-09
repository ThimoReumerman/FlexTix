import React, { FC, useState } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';
import apiLink from '../../api';

import { useForm, SubmitHandler } from 'react-hook-form';

import IMedia, { MediaType } from "../../interfaces/Media";

interface IProps {
    media?: IMedia,
    onMediaSubmit: (media: IMedia) => void
}

interface IUploadMedia extends IMedia {
    upload: File,
    uploadList: FileList
}

const MediaForm: FC<IProps> = ({media, onMediaSubmit}) => {

    const [submitted, setSubmitted] = useState<boolean>(false);

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
        ).then((response: AxiosResponse<IMedia>) => {
            alert("Successfully added media");
            onMediaSubmit(response.data);
            console.log(response);
        }).catch((error: AxiosError) => {
            console.log(error);
        });

        

        setSubmitted(true);
    }

    return (
        <form className={submitted ? "submitted" : ""} id="mediaForm" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Description
                <input {...register("description")} id="description" type="text" defaultValue={media?.description} />
            </label>
            <label>
                Alt
                <input {...register("alt")} id="alt" type="text" defaultValue={media?.alt} />
            </label>
            <label>
                Type
                <select {...register("type")} id="type" name="type" defaultValue={MediaType.None}>
                    <option value={MediaType.None}>Selecteer een type...</option>
                    <option value={MediaType.Image}>Foto</option>
                    <option value={MediaType.Video}>Video</option>
                </select>  
            </label>
            <label>
                Media
                <input {...register("uploadList")} id="upload" type="File" accept="image/*, video/*" />
                {media?.path && <img width="250px" src={media.path} alt={media.alt} />}
            </label>
            <label>
                Submit
                <input type="submit" value="Submit" />
            </label>
        </form>
    );
}

export default MediaForm;