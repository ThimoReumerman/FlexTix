import { Component } from 'react';

import { NavBarProps } from "../components/NavBar";

export const HomeNav: NavBarProps = {
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
            <div>
                <h1>Hello!</h1>
            </div>
        )
    }
}
