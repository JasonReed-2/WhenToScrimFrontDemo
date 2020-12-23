import React, {useState, useEffect} from 'react'
import socketClient from 'socket.io-client'
import Calender from './calendar'
import './event.css'
const SERVER = 'https://whentoscrimdemo.herokuapp.com/'
//const SERVER2 = 'http://localhost:8080'

export default function MainEvent(props) {
    const [sock, setSocket] = useState(undefined)
    const [sharedCal, setSharedCal] = useState()
    const [personalCal, setPersonalCal] = useState()
    const [connections, setConnections] = useState(0)

    const [userInput, setUserInput] = useState()

    const setUserName = () => {
        sock.emit('newUser', userInput)
    }

    const handleType = (e) => {
        setUserInput(e.target.value)
    }

    const calendarUpdate = (newCal) => {
        sock.emit('updateCalendar', newCal)
    }

    const clearServer = () => {
        sock.emit('clear')
    }

    useEffect(() => {
        var socket = socketClient(SERVER)
        socket.on('calendarUpdate', (newCalendar) => {
            setSharedCal(newCalendar)
        })
        socket.on('usersUpdate', (count) => {
            setConnections(count)
        })
        socket.on('updatePersonalCal', (cal) => {
            setPersonalCal(cal)
        })
        setSocket(socket)
    }, [])
    return (
        <>
        <input type="text" onChange={handleType}></input><button onClick={setUserName}>Submit</button>
        <button onClick={clearServer}>Clear</button>
        <h1>{connections}</h1>
        <div id="bigCont">            
            <div id="personal"><Calender start={300} end={600} jump={15} personal={true} startCal={personalCal} update={calendarUpdate}/></div>
            <div id="shared"><Calender start={300} end={600} jump={15} personal={false} calendar={sharedCal} userCount={connections} /></div>
        </div>
        </>
    ) 
}