import React from 'react'
import './timeBlock.css'

export default function PersonalTimeBlock(props) {
    
    const toggleAvailability = () => {
        if (props.capturing) {
            props.setEnd({x: props.index.x, y: props.index.y})
        }
    }

    const sendCaptureType = () => {
        props.setBegin({x: props.index.x, y: props.index.y})
        props.setType(!props.available)
    }

    let color = props.available >= 1 ? "green" : "white"

    return (
        <td id="availblock" className={color} onPointerDown={sendCaptureType} onPointerMove={toggleAvailability}>{}</td>
    )
}