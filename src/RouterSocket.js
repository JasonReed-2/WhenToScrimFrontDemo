import React from 'react';
import Eventer from './Event/event'
import EventCreator from './EventCreator'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import socketClient from 'socket.io-client'
const SERVER = 'https://whentoscrimdemo.herokuapp.com/'
//const SERVER = 'http://localhost:8080'
const socket = socketClient(SERVER)

export default function RouterSocker(props) {
    return (
        <Router>
            <Switch>
            <Route path="/:id/:start?/:end?" children={<Eventer socket={socket}/>} />
            <Route path="/" children={<EventCreator socket={socket}/>} />
            </Switch>
        </Router>
    )
}