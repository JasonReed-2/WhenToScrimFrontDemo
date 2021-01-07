import React, {useState, useEffect} from 'react'
import SharedTimeBlock from '../TimeBlock/sharedTimeBlock'
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

//maps out days of the week to the table
const daysOfWeek = daysOfWeekArray.map((item) => {
    return (<th>{item}</th>)
})

export default function Calender(props) {
    // eslint-disable-next-line
    const [timeStamps, setTimeStamps] = useState([])
    const [parsedStamps, setParsedStamps] = useState([])
    const [tempCalAr, setTempCalAr] = useState()

    //set up table by the given parameters
    useEffect(() => {
        var timeStampTemp = []
        var parsedStamps = []
        for (var k = props.start; k <= props.end; k += props.jump) {
            timeStampTemp.push(k)
            let hour = Math.floor(k / 60);
            let minute = k % 60;
            if (minute < 10) {
                minute = "0" + minute
            }
            parsedStamps.push(hour + ":" + minute)
        }
        setTimeStamps([...timeStampTemp])
        setParsedStamps([...parsedStamps])
        if (props.calendar !== undefined) setTempCalAr([...props.calendar])
        // eslint-disable-next-line
    }, [props.start, props.end, props.jump])

    useEffect(() => {
        console.log(props.calendar)
        if (props.calendar !== undefined && props.calendar !== null) {
            setTempCalAr([...props.calendar])
        }
        // eslint-disable-next-line
    }, [props.calendar])

    //holds the timeStamps and the availability blocks
    const timeCol = parsedStamps.map((item, index) => {
        const blank = daysOfWeekArray.map((item, ind) => {
            let avail = 0
            if (tempCalAr) avail = tempCalAr[ind][index]
            return (<SharedTimeBlock available={avail} userCount={props.userCount}/>)

        })
        return (
            <tr>
                <td>{item}</td>
                {blank}
            </tr>
        )
    })

    return (
        <div className="cont">
        <table cellSpacing="0" className="unselectable" border="1">
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