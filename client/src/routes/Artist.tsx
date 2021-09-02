import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// Get API request imports
import axios, {AxiosResponse} from 'axios';
import apiLink from '../api';

// Import React Player
import ReactPlayer from 'react-player';


import { NavBarProps } from "../components/NavBar";
import IArtist, { EmptyArtist } from '../interfaces/Artist';

export const ArtistNav: NavBarProps = {
    items: [
        {
            href: "/home",
            title: "Home"
        }, 
        {
            title: "Welcome"
        },
        {
            href: "/last-minute",
            title: "Last Minute"
        }
    ]
}

interface IProps {
    navHandler: (nav: NavBarProps) => void
}

interface IState {
    artist: IArtist
}

interface IParams {
    _id: string
}

class Artist extends Component<IProps & RouteComponentProps, IState> {
    constructor(props: IProps & RouteComponentProps) {
        super(props);

        this.state = {artist: EmptyArtist};
    }
    
    async componentDidMount() {

        console.log("Component did mount.");

        // Set navigation bar
        this.props.navHandler(ArtistNav);

        // Get Artist ID
        const { _id } = this.props.match.params as IParams;

        // Fetch artist
        const response: AxiosResponse<IArtist> = await axios.get(`${apiLink}/artists/${_id}`);

        // Put artist in state
        this.setState({artist: response.data});

    }



    render() {
        const artist: IArtist = this.state.artist;

        return (
            <div id="artist">
                <h2>{artist.name}</h2>
                <p>{artist.bio}</p>
                {artist.media?.map(item => {
                    switch (item.type) {
                        case "image":
                            return (<img src={item.path} alt={item.alt} />);
                        case "video":
                            return (<ReactPlayer url={item.path} />)
                        default: 
                            return (<div className="noPath" />)
                    }
                })}
            </div>
        )
    }
}

export default withRouter(Artist);