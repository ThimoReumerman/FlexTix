import React, { Component, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import NavBar, { NavBarProps } from "./components/NavBar";

import Home, { HomeNav } from "./routes/Home";
import LastMinute from "./routes/LastMinute";
import Artist from "./routes/Artist";
import Dashboard from "./routes/Dashboard";


const Routes: React.FC = () => {
    const [navItems, setNavItems] = useState<NavBarProps>({items: []});

    const navHandler = (nav: NavBarProps) => {
        console.log("Handling nav!");

        setNavItems(nav);
    }

    return (
        <div>
        <NavBar items={navItems.items} />
        <div id="content">
          <Switch>
            <Route
              exact
              path="/home"
              render={() => <Home navHandler={navHandler.bind(this)} />}
            />
            <Route
              exact
              path="/last-minute"
              render={() => (
                <LastMinute navHandler={navHandler.bind(this)} />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={() => (
                <Dashboard navHandler={navHandler.bind(this)} />
              )}
            />
            <Route
              exact
              path="/artist/:_id"
              render={() => <Artist navHandler={navHandler.bind(this)} />}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </div>
    )
}

export default Routes;
