import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// Get API request impors
import axios, {AxiosResponse} from 'axios';
import apiLink from '../api';


import { NavBarProps } from "../components/NavBar";
import IArtist, { EmptyArtist } from '../interfaces/Artist';

export const ArtistNav: NavBarProps = {
    items: [
        {
            href: "./home",
            title: "Home"
        }, 
        {
            href: "./welcome",
            title: "Welcome"
        },
        {
            href: "./lastMinute",
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
        return (
            <div>
                <h2>{this.state.artist.name}</h2>
            </div>
        )
    }
}

export default withRouter(Artist);