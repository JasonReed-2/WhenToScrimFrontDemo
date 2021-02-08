import React from 'react'

export default function InputForm(props) {
    const changeInput = (e) => {
        props.setInput(e.target.value)
    }
    return(<input type="text" onChange={changeInput} placeholder={props.holder}/>)
}