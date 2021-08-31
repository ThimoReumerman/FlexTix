import { Component } from 'react';

import { NavBarProps } from "../components/NavBar";

const WelcomeNav: NavBarProps = {
    items: [
        {
            href: "./back",
            title: "Back"
        }, 
        {
            href: "./home",
            title: "Home"
        },
        {
            href: "./lastMinute",
            title: "Last Minute"
        }
    ]
}

type WelcomeProps = {
    navHandler: (nav: NavBarProps) => void;
}

export default class Welcome extends Component<WelcomeProps> {
    componentDidMount() {
        var navigationHandler = this.props.navHandler;

        navigationHandler(WelcomeNav);
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
            </div>
        )
    }
}
