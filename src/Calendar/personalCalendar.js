import React, {useState, useEffect} from 'react'
import PersonalTimeBlock from '../TimeBlock/personalTimeBlock'
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

//maps out days of the week to the table
const daysOfWeek = daysOfWeekArray.map((item) => {
    return (<th>{item}</th>)
})

export default function PersonalCalendar(props) {
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
                calendarArr[i].push(0)
                calendarArr[i][j] = 0
            }
        }
        
        setCalendarAr([...calendarArr])
        setTempCalAr([...calendarArr])
        // eslint-disable-next-line
    }, [props.start, props.end, props.jump])

    useEffect(() => {
        if (props.startCal !== undefined && props.startCal !== null) {
            setCalendarAr([...props.startCal])
            setTempCalAr([...props.startCal])
        }
        // eslint-disable-next-line
    }, [props.startCal])

    //holds the timeStamps and the availability blocks
    const timeCol = parsedStamps.map((item, index) => {
        const blank = daysOfWeekArray.map((item, ind) => {
            return (<PersonalTimeBlock 
                    available={tempCalAr[ind][index]} 
                    index={{x: ind, y: index}} 
                    setType={setSelecting} 
                    capturing={capturing} 
                    setBegin={setBeginCord} 
                    setEnd={setEndCord}
                />)
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
        props.update([...tempCal])
    }

    const boxSelect = () => {
        let setter = 0
        if (selecting) {
            setter = 1
        }
        let tempCal = cloneDeep(calendarAr)

        let [startX, endX] = determineStartAndEnd(beginCord.x, endCord.x)
        let [startY, endY] = determineStartAndEnd(beginCord.y, endCord.y)

        for (var i = startX; i <= endX; i++) {
            for (var j = startY; j <= endY; j++) {
                tempCal[i][j] = setter
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
        <div className="cont" onPointerDown={handleMouseDown} onPointerUp={handleMouseUp}>
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