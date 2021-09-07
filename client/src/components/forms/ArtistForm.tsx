import { Component } from 'react';

import axios, { AxiosResponse } from 'axios';
import apiLink from '../../api';

import IArtist from "../../interfaces/Artist";

import MediaForm from "../forms/MediaForm";

interface IProps {
    _id?: string
}

interface IState {
    artist?: IArtist
}

class ArtistForm extends Component<IProps, IState> {
    async componentDidMount() {

        console.log("Component did mount.");

        // Get artist if ID exists
        if (this.props._id) {
            const response: AxiosResponse<IArtist> = await axios.get(`${apiLink}/artists/${this.props._id}`);
            this.setState({artist: response.data});
        }
    }

    render() {
        return (
            <div>
                <form id="artistForm">
                    <label htmlFor="artistName">
                        Name
                        <input id="artistName" type="text" name="name" value={this.state?.artist?.name} />
                    </label>
                    <label htmlFor="artistBio">
                        Bio
                        <textarea id="artistBio" name="bio" value={this.state?.artist?.bio}/>
                    </label>
                </form>
                <MediaForm />
            </div>

        )
    }
}

export default ArtistForm;