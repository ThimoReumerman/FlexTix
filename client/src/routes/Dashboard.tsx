import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { NavBarProps } from "../components/NavBar";
import ArtistForm from "../components/forms/ArtistForm";

export const DashboardNav: NavBarProps = {
    items: [
        {
            href: "/home",
            title: "Home"
        }
    ]
}

interface IProps {
    navHandler: (nav: NavBarProps) => void
}

interface IState {
    
}

class LastMinute extends Component<IProps & RouteComponentProps, IState> {
    async componentDidMount() {

        console.log("Component did mount.");

        // Set navigation bar
        this.props.navHandler(DashboardNav);

        // // Fetch concerts
        // const response: AxiosResponse<IConcert[]> = await axios.get(`${apiLink}/concerts/`);

        // console.log(response);

        // // Put artist in state
        // this.setState({concerts: response.data});

    }

    render() {
        return (
            <div id="dashboard">
                <div id="dashboardNav">
                    
                </div>
                <div id="dashboardContent">
                    <ArtistForm />  
                </div>
            </div>
        )
    }
}

export default withRouter(LastMinute);