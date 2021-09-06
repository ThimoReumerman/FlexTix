import React, { Component } from 'react';

import axios, { AxiosResponse } from 'axios';
import apiLink from '../../api';

import IMedia, {MediaType} from "../../interfaces/Media";

interface IProps {
    media?: IMedia
}

class MediaForm extends Component<IProps> {
    async componentDidMount() {
        console.log("Component did mount.");
    }

    async handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
        // Prevent the page from refreshing
        event.preventDefault();

        // Upload media to localhost

    }

    render() {
        return (
            <form id="mediaForm" onSubmit={this.handleSubmit}>
                <label htmlFor="description">
                    Description
                </label>
                <input id="description" type="text" value={this.props.media?.description} />
                <label htmlFor="alt">
                    Alt
                </label>
                <input id="alt" type="text" value={this.props.media?.alt} />
            </form>
        )
    }
}

export default MediaForm;