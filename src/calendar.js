import React, {useState, useEffect} from 'react'
import TimeBlock from './timeBlock'
import cloneDeep from 'lodash.clonedeep'
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
    const [beginCord, setBeginCord] = useState({})
    const [endCord, setEndCord] = useState({})
    const [calendarAr, setCalendarAr] = useState()
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

        let calendarArr = []
        for (var i = 0; i < daysOfWeekArray.length; i++) {
            calendarArr.push([])
            for (var j = 0; j < parsedStamps.length; j++) {
                calendarArr[i].push(false)
                calendarArr[i][j] = false
            }
        }
        setCalendarAr([...calendarArr])
        setTempCalAr([...calendarArr])
        // eslint-disable-next-line
    }, [])

    //maps out days of the week to the table
    const daysOfWeek = daysOfWeekArray.map((item) => {
        return (<th>{item}</th>)
    })

    //holds the timeStamps and the availability blocks
    const timeCol = parsedStamps.map((item, index) => {
        const blank = daysOfWeekArray.map((item, ind) => {
            return (<TimeBlock available={tempCalAr[ind][index]} index={{x: ind, y: index}} setType={setSelecting} capturing={capturing} setBegin={setBeginCord} setEnd={setEndCord}/>)
        })
        return (
            <tr>
                <td>{item}</td>
                {blank}
            </tr>
        )
    })

    const handleMouseDown = () => {
        setCapturing(true)
    }
    
    const handleMouseUp = () => {
        setCapturing(false)
        let tempCal = boxSelect()
        setCalendarAr([...tempCal])
    }

    const boxSelect = () => {
        let tempCal = cloneDeep(calendarAr)

        let [startX, endX] = determineStartAndEnd(beginCord.x, endCord.x)
        let [startY, endY] = determineStartAndEnd(beginCord.y, endCord.y)

        for (var i = startX; i <= endX; i++) {
            for (var j = startY; j <= endY; j++) {
                tempCal[i][j] = selecting
            }
        }
        return tempCal
    }

    const determineStartAndEnd = (num1, num2) => {
        let start, end
        if (num1 <= num2) {
            start = num1
            end = num2
        } else {
            start = num2
            end = num1
        }
        return [start, end]
    }

    useEffect(() => {
        if (endCord.x !== undefined && endCord.y !== undefined) {
            let tempCal = boxSelect()
            setTempCalAr([...tempCal])
        }
        // eslint-disable-next-line
    }, [endCord])

    return (
        <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
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