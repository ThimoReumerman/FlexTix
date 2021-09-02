import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// Get API request impors
import axios, {AxiosResponse} from 'axios';
import apiLink from '../api';


import { NavBarProps } from "../components/NavBar";
import IConcert from '../interfaces/Concert';

export const LastMinuteNav: NavBarProps = {
    items: [
        {
            href: "./home",
            title: "Home"
        }, 
        {
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
    concerts: IConcert[]
}

class LastMinute extends Component<IProps & RouteComponentProps, IState> {
    constructor(props: IProps & RouteComponentProps) {
        super(props);

        this.state = {concerts: []};
    }
    
    async componentDidMount() {

        console.log("Component did mount.");

        // Set navigation bar
        this.props.navHandler(LastMinuteNav);

        // Fetch concerts
        const response: AxiosResponse<IConcert[]> = await axios.get(`${apiLink}/concerts/`);

        console.log(response);

        // Put artist in state
        this.setState({concerts: response.data});

    }

    render() {
        // Sort concerts based on genre, then title
        const concerts: IConcert[] = this.state.concerts
            .sort((a, b) => a.genre > b.genre ? 1 : (a.genre === b.genre) ? ((a.title > b.title) ? 1 : -1) : -1);

        return (
            <div id="last-minute">
                <h2>Last-minute concerts</h2>

                <div id="concerts">
                    {concerts.map(item => {
                        return (
                            <div className="concert" key={item.title}>
                                <h4>{item.title}</h4>
                                <p>{item.genre}</p>
                                <p>{item.price}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(LastMinute);