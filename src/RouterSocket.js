import React from 'react';
import Eventer from './Event/event'
import EventCreator from './EventCreator'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import socketClient from 'socket.io-client'
const SERVER = 'https://whentoscrimdemo.herokuapp.com/'
//const SERVER = 'http://localhost:8080'
const socket = socketClient(SERVER)

export default function RouterSocker(props) {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>When2Scrim</Navbar.Brand>
                <Link to="/">Create New Event</Link>
            </Navbar>
            <Switch>
            <Route path="/:id/:start?/:end?" children={<Eventer socket={socket}/>} />
            <Route path="/" children={<EventCreator socket={socket}/>} />
            </Switch>
        </Router>
    )
}