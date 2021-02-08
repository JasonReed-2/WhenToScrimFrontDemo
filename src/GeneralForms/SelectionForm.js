import React from 'react'

export default function SelectionForm(props) {
    const changeSelection = (e) => {
        props.changeOption(e.target.value)
    }
    return (
        <select onChange={changeSelection} name={props.name} defaultValue={props.defaultValue}>
            {props.options}
        </select>
    )
}