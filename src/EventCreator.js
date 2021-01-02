import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

let options = []
for (let i = 0; i <= 1440; i += 60) {
    let beforeMidday = i < 720;
    let hour = i / 60
    let meridiem = 'AM'
    if (!beforeMidday) {
        meridiem = 'PM'
        if (hour !== 12) hour = hour - 12
    }
    let ret = hour + ":00 " + meridiem
    if (i === 0 || i === 1440) {
        ret = 'Midnight'
    }

    options.push(<option value={i}>{ret}</option>)
}

export default function EventCreator(props) {
    const socket = props.socket
    const history = useHistory();
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(1440)
    // eslint-disable-next-line
    const [jump, setJump] = useState(30)

    useEffect(() => {
        socket.on('retrieveID', (id) => {
            history.push('/' + id)
        })
        // eslint-disable-next-line
    }, [])

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeStart = (e) => {
        setStart(e.target.value)
    }

    const changeEnd = (e) => {
        setEnd(e.target.value)
    }

    const createEvent = () => {
        socket.emit('newRoom', title, start, end, jump)
    }

    const clearServer = () => {
        socket.emit('clear')
    }
    
    return (
        <div>
            {title !== '' ? <h3>{"Title: " + title}</h3> : <></>}
            <input type="text" onChange={changeTitle} placeholder="Title Of Event" />
            <h3>Earliest Start</h3>
            <select onChange={changeStart} name="start">
                {options}
            </select>
            <h3>Latest End</h3>
            <select name="end" onChange={changeEnd} defaultValue="1440">
                {options}
            </select>
            {/*eslint-disable-next-line*/}
            <h3></h3>
            <button onClick={createEvent}>Create Room</button>
            <button onClick={clearServer}>Clear Server</button>
        </div>
    )
}