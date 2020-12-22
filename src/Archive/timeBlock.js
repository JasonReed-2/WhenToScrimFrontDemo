import React, {useEffect, useState} from 'react'
import './timeBlock.css'

export default function TimeBlock(props) {

    const [available, setAvailable] = useState(false)

    //used to dynamically set color of the block
    const [text, setText] = useState("white")

    //used to lock the block from being rapidly toggled on/off in the same mousedown, mousehover, mouseup event
    const [selectLock, setSelectLock] = useState(false)

    const toggleAvailability = () => {
        if (props.capturing && !selectLock) {
            determineAvailability()
            setSelectLock(true)
        }
    }

    //if the select type is true and the block is not currently available: switch to available and vice-versa
    const determineAvailability = () => {
        if (!available && props.selecting) {
            setText("green")
            setAvailable(true)
        } else if (available && !props.selecting) {
            setText("white")
            setAvailable(false)
        }
    }

    //use the availbility of the block that was clicked on to determine if the rest of the blocks 
    //being hovered over will be set available or unavailable
    const sendCaptureType = () => {
        const newSelectType = !available;
        props.setType(newSelectType)

        if (newSelectType) {
            setText("green")
        } else {
            setText("white")
        }

        setAvailable(newSelectType)
        setSelectLock(true)
    }

    //release locks upon user releasing mouse button
    useEffect(() => {
        if (!props.capturing) {
            setSelectLock(false)
        }
    }, [props.capturing])

    return (
        <td id="availblock" className={text} onMouseDown={sendCaptureType} onMouseMove={toggleAvailability}>{}</td>
    )
}