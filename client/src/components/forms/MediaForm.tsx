import { Component } from 'react';

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

    render() {
        return (
            <form id="mediaForm">
                <label>
                    Description
                    <input type="text" value={this.props.media?.description} />
                </label>
                <label>
                    Alt
                    <textarea value={this.props.media?.alt}/>
                </label>
            </form>

        )
    }
}

export default MediaForm;