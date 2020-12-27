import React, {useState, useEffect} from 'react'
import socketClient from 'socket.io-client'
//import Calender from './calendar'
import PersonalCalendar from '../Calendar/personalCalendar'
import SharedCalendar from '../Calendar/sharedCalendar'
import './event.css'
const SERVER = 'https://whentoscrimdemo.herokuapp.com/'
//const SERVER = 'http://localhost:8080'

export default function MainEvent(props) {
    const [sock, setSocket] = useState(undefined)
    const [sharedCal, setSharedCal] = useState()
    const [personalCal, setPersonalCal] = useState()
    const [connections, setConnections] = useState(0)
    const [availableRooms, setAvailableRooms] = useState([])
    const [availableUsers, setAvailableUsers] = useState([])

    const availableRoomsList = availableRooms.map((item) => {
        return (<button onClick={() => sock.emit('newRoom', item)}>{item}</button>)
    })

    const availableUsersList = availableUsers.map((item) => {
        return (<button onClick={() => sock.emit('newUser', item)}>{item}</button>)
    })

    const [userInput, setUserInput] = useState()
    const [userNameShow, setUserNameShow] = useState()

    const setUserName = () => {
        sock.emit('newUser', userInput)
    }

    const handleType = (e) => {
        setUserInput(e.target.value)
    }

    const [roomName, setRoomName] = useState()
    const [roomNameShow, setRoomNameShow] = useState()

    const handleName = (e) => {
        setRoomName(e.target.value)
    }

    const submitName = () => {
        sock.emit('newRoom', roomName)
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
        socket.on('updateRoom', (roomName) => {
            setRoomNameShow(roomName)
        })
        socket.on('updateUsername', (newUsername) => {
            setUserNameShow(newUsername)
        })
        socket.on('updateAvailableRooms', (roomsList) => {
            setAvailableRooms(roomsList)
        })
        socket.on('updateUsersList', (usersList) => {
            console.log(usersList)
            setAvailableUsers(usersList)
        })
        setSocket(socket)
    }, [])
    return (
        <>
        <h1>{'Current Room: ' + roomNameShow}</h1>
        <li>
            {availableRoomsList}
        </li>
        <h1>{'Current User: ' + userNameShow}</h1>
        <li>
            {availableUsersList}
        </li>
        <input type="text" onChange={handleType} placeholder="Change Username"></input>
        <button onClick={setUserName}>Add New User</button>
        <input type="text" onChange={handleName} placeholder="Change Room Name"></input>
        <button onClick={submitName}>Add Room</button>
        <button onClick={clearServer}>Clear</button>
        <h1>{connections}</h1>
        <div id="bigCont">            
            <div id="personal"><PersonalCalendar 
                start={300} 
                end={600} 
                jump={15} 
                startCal={personalCal} 
                update={calendarUpdate}
            /></div>
            <div id="shared"><SharedCalendar 
                start={300} 
                end={600} 
                jump={15} 
                calendar={sharedCal} 
                userCount={connections} 
            /></div>
        </div>
        </>
    ) 
}