import { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar, { NavBarProps } from './components/NavBar';

import Home, {HomeNav} from "./routes/Home";
import Artist from "./routes/Artist";
import Welcome from "./routes/Welcome";

type NavState = {
    navItems: NavBarProps
}
class Routes extends Component<{}, NavState>  {
    state: NavState = {
        navItems: HomeNav
    }

    navHandler(nav: NavBarProps) {
        console.log("Handling nav!");

        this.setState({navItems: nav});
    }

    render () {
        console.log("Rendering routes");
        return (
            <div>
            <NavBar items={this.state.navItems.items} />
            <Switch>
                <Route 
                    exact 
                    path="/home"
                    render={
                        () => (
                            <Home navHandler={this.navHandler.bind(this)} />
                        )
                    }
                 />
                <Route 
                    exact 
                    path="/welcome"
                    render={
                        () => (
                            <Welcome navHandler={this.navHandler.bind(this)} />
                        )
                    }
                 />
                <Route 
                    exact 
                    path="/artist/:_id"
                    render={
                        () => (
                            <Artist navHandler={this.navHandler.bind(this)} />
                        )
                    }
                 />
                <Route exact path="/">
                <Redirect to="/home" />
                </Route>
            </Switch>
            </div>
            )
    }
}

export default Routes;