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

    let color = props.available >= 1 ? "green" : "white"
    if (props.personal === false) {
        color = props.available === props.userCount ? "green" : "white"
    }

    let ret = <td id="availblock" className={color} onPointerDown={sendCaptureType} onPointerMove={toggleAvailability}>{}</td>

    if (props.personal === false) {
        ret = <td id="availblock" className={color} onPointerDown={sendCaptureType} onPointerMove={toggleAvailability}>{props.available}</td>
    }

    return (
        <>{ret}</>
    )
}