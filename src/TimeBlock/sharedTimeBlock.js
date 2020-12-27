import React from 'react'
import './timeBlock.css'

export default function SharedTimeBlock(props) {
    let color = props.available === props.userCount ? "green" : "white"
    return (
        <td id="availblock" className={color}>
            {props.available}
        </td>
    )
}