import React from 'react'
// import styled from 'styled-components'
import './Pics.css'


function Button(props) {
    const buttonStyle = {
        padding: "10px",
        margin: "20px 4px",
        border: "none"
    }
    return (
        <button
            id={props.id}
            onClick={props.handleClick}
            style={buttonStyle}
            className={props.selected}
        >
            {props.text}
        </button>
    )
}

export default Button
