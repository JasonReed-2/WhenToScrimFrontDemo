import React from 'react'
import './timeBlock.css'

export default function TimeBlock(props) {

    const toggleAvailability = () => {
        if (props.capturing) {
            props.setEnd({x: props.index.x, y: props.index.y})
        }
    }

    const sendCaptureType = () => {
        props.setBegin({x: props.index.x, y: props.index.y})
        props.setType(!props.available)
    }

    const color = props.available ? "green" : "white"

    return (
        <td id="availblock" className={color} onPointerDown={sendCaptureType} onPointerMove={toggleAvailability}>{}</td>
    )
}