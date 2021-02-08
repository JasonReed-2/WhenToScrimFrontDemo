import React, {useState, useEffect} from 'react'
import InputForm from './GeneralForms/InputForm'
import SelectionForm from './GeneralForms/SelectionForm'
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

    const createEvent = () => {
        socket.emit('newRoom', title, start, end, jump)
    }

    const clearServer = () => {
        socket.emit('clear')
    }
    
    return (
        <div>
            {title !== '' ? <h3>{"Title: " + title}</h3> : <></>}
            <InputForm setInput={setTitle} holder={"Title Of Event"} />
            <h3>Earliest Start</h3>
            <SelectionForm changeOption={setStart} name="start" options={options} defaultValue="0"/>
            <h3>Latest End</h3>
            <SelectionForm changeOption={setEnd} name="end" options={options} defaultValue="1440"/>
            {/* eslint-disable-next-line */}
            <h3></h3>
            <button onClick={createEvent}>Create Room</button>
            <button onClick={clearServer}>Clear Server</button>
        </div>
    )
}