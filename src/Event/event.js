import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import PersonalCalendar from '../Calendar/personalCalendar'
import SharedCalendar from '../Calendar/sharedCalendar'
import './event.css'

export default function MainEvent(props) {
    const socket = props.socket
    const [sharedCal, setSharedCal] = useState()
    const [personalCal, setPersonalCal] = useState()
    const [connections, setConnections] = useState(0)
    const [start, setStart] = useState(300)
    const [end, setEnd] = useState(600)
    const [jump, setJump] = useState(15)
    const {id} = useParams()

    const [userInput, setUserInput] = useState()
    const [userNameShow, setUserNameShow] = useState()

    const setUserName = () => {
        socket.emit('newUser', userInput)
    }

    const handleType = (e) => {
        setUserInput(e.target.value)
    }

    const [roomNameShow, setRoomNameShow] = useState()

    const calendarUpdate = (newCal) => {
        socket.emit('updateCalendar', newCal)
    }

    useEffect(() => {
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
        socket.on('calendarParametersUpdate', (start, end, jump) => {
            setStart(start)
            setEnd(end)
            setJump(jump)
        })
        socket.emit('joinRoom', id)
        // eslint-disable-next-line
    }, [])
    return (
        <>
        <h3>{'Current Room: ' + roomNameShow}</h3>
        {userNameShow ? <h3>{'Current User: ' + userNameShow}</h3> : <></>}
        <div id="bigCont">
            <div id="personal">
                {userNameShow ? 
                    <>
                        <h3>Personal Calendar</h3>
                        <PersonalCalendar 
                        start={start} 
                        end={end} 
                        jump={jump} 
                        startCal={personalCal} 
                        update={calendarUpdate}/>
                    </> 
                    : 
                    <>
                        <input type="text" onChange={handleType} placeholder="Username"></input>
                        <button onClick={setUserName}>Sign In</button>
                    </>
                }
            </div>            
            <div id="shared">
                <h3>Group Calendar</h3>
                <SharedCalendar 
                start={start} 
                end={end} 
                jump={jump} 
                calendar={sharedCal} 
                userCount={connections}/>
            </div>
        </div>
        </>
    ) 
}