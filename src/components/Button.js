import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`

`

function Button(props) {
    return (
        <StyledButton id={props.id}onClick={props.handleClick}
        >
            {props.text}
        </StyledButton>
    )
}

export default Button
