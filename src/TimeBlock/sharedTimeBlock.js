import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import './timeBlock.css'

export default function SharedTimeBlock(props) {
    return (
        <Tooltip title={props.available + '/' + props.userCount + ' Users Available'}>
            <td id="availblock" style={{backgroundColor: 'rgba(0, 153, 51,' + props.available/props.userCount + ')'}} >
                {}
            </td>
        </Tooltip>
    )
}