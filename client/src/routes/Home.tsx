import { Component } from 'react';

import { NavBarProps } from "../components/NavBar";

export const HomeNav: NavBarProps = {
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

type HomeProps = {
    navHandler: (nav: NavBarProps) => void;
}

export default class Home extends Component<HomeProps> {
    componentDidMount() {
        var navigationHandler = this.props.navHandler;

        navigationHandler(HomeNav);
    }

    render() {
        return (
            <div id="home">
                <h2>Welcome to Flextix</h2>
                <p className="bigdesc">Looking for last-minute concert tickets?</p>
                <p className="smalldesc">We got you.</p>
                <a href="./last-minute">Explore concerts</a>
            </div>
        )
    }
}
