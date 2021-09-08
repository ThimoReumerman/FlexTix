import { Component } from 'react';

import axios, { AxiosResponse } from 'axios';
import apiLink from '../../api';

import IArtist, {EmptyArtist} from "../../interfaces/Artist";
import IMedia, {EmptyMedia} from "../../interfaces/Media";

import MediaForm from "../forms/MediaForm";

interface IProps {
    _id?: string
}

interface IState {
    artist?: IArtist,
    media: IMedia[]
}

class ArtistForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = ({
            artist: EmptyArtist,
            media: new Array<IMedia>()
        })
    }

    async componentDidMount() {

        console.log("ArtistForm component did mount.");

        this.addMedia.bind(this);
        this.handleChange.bind(this);

        let exists: boolean = false;

        // Get artist if ID exists
        if (this.props._id) {

            // Fetch artist data
            const artistResponse: AxiosResponse<IArtist> = await axios.get(`${apiLink}/artists/${this.props._id}`);

            // Return if artist data is null
            if (artistResponse.data == null) return;

            // If not null, you can say the artist exists
            exists = true;

            // Set state of artist to fetched data
            this.setState({artist: artistResponse.data});

            // Create media array
            let mediaArray: IMedia[] = new Array<IMedia>();

            // Loop through media items to get the actual media information
            artistResponse.data.media?.forEach(async (media) => {

                // Fetch media data from database
                const mediaResponse: AxiosResponse<IMedia> = await axios.get(`${apiLink}/media/${media.mediaId}`);

                // Push new media data to media array
                mediaArray.push(mediaResponse?.data);
            });

            if (mediaArray.length === 0) mediaArray.push(EmptyMedia);

            // Set the new media array in the media state
            this.setState({media: mediaArray});

        }

        if (!exists) {
            this.setState({artist: EmptyArtist});
        }
    }

    addMedia (media: IMedia) {
        console.log(`Adding media with ID ${media._id}`)
        
        let newMedia: IMedia[] = this.state!.media!;

        newMedia.push(media);

        this.setState({media: newMedia});
    }

    handleChange (e: React.FormEvent<HTMLFormElement>) {

    }

    render() {
        return (
            <div>
                <form id="artistForm" onChange={(e) => {this.handleChange(e)}}>
                    <label htmlFor="artistName">
                        Name
                        <input id="artistName" type="text" name="name" defaultValue={this.state.artist?.name} />
                    </label>
                    <label htmlFor="artistBio">
                        Bio
                        <textarea id="artistBio" name="bio" defaultValue={this.state?.artist?.bio} />
                    </label>
                </form>
                {
                        this.state?.media?.map((m) => {
                            return <MediaForm media={m} onMediaSubmit={(media: IMedia) => this.addMedia(media)} />
                    })
                }
                <button onClick={() => {this.addMedia(EmptyMedia)}}>Add media</button>
            </div>

        )
    }
}

export default ArtistForm;