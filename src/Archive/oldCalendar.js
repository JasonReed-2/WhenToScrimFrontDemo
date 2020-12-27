import React, {useState, useEffect} from 'react'
import TimeBlock from './timeBlock'
import './calendar.css'

const daysOfWeekArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

export default function Calender(props) {
    // eslint-disable-next-line
    const [timeStamps, setTimeStamps] = useState([])
    const [parsedStamps, setParsedStamps] = useState([])
    const [capturing, setCapturing] = useState(false)
    const [selecting, setSelecting] = useState(true)

    //set up table by the given parameters
    useEffect(() => {
        var timeStampTemp = []
        var parsedStamps = []
        for (var i = props.start; i <= props.end; i += props.jump) {
            timeStampTemp.push(i)
            let hour = Math.floor(i / 60);
            let minute = i % 60;
            if (minute < 10) {
                minute = "0" + minute
            }
            parsedStamps.push(hour + ":" + minute)
        }
        setTimeStamps([...timeStampTemp])
        setParsedStamps([...parsedStamps])
        // eslint-disable-next-line
    }, [])

    //function used to determine if the user is currently setting times as available or unavailable
    const setCaptureType = (selecting) => {
        setSelecting(selecting)
    }

    //maps out days of the week to the table
    const daysOfWeek = daysOfWeekArray.map((item) => {
        return (<th>{item}</th>)
    })

    //holds the timeStamps and the availability blocks
    const timeCol = parsedStamps.map((item) => {
        const blank = daysOfWeekArray.map((item) => {
            return (<TimeBlock selecting={selecting} setType={setCaptureType} capturing={capturing}/>)
        })
        return (
            <tr>
                <td>{item}</td>
                {blank}
            </tr>
        )
    })

    return (
        <div onMouseDown={() => setCapturing(true)} onMouseUp={() => setCapturing(false)}>
        <table className="unselectable" border="1">
            <thead>
                <th>Time</th>
                {daysOfWeek}
            </thead>
            <tbody>
                {timeCol}
            </tbody>
        </table>
        </div>
    )
}