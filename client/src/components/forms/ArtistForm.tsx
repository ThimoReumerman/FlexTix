import { Component } from 'react';

import axios, { AxiosResponse } from 'axios';
import apiLink from '../../api';

import IArtist from "../../interfaces/Artist";

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
            <form id="artistForm">
                <label>
                    Name
                    <input type="text" />
                </label>
                <label>
                    Bio
                    <input type="text" />
                </label>
            </form>

        )
    }
}

export default ArtistForm;