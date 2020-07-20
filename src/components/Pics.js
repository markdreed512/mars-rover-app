import React, { useState, useEffect } from 'react'
import Button from './Button'
import styled from 'styled-components'

const Img = styled.img`
        height: 200px;
    `
const Div = styled.div`
    display: inline-block;
`
function Pics() {

    const [mostRecentDate, setMostRecentDate] = useState("2019-1-1")
    const [picData, setPicData] = useState({})
    const [rover, setRover] = useState("curiosity")

    useEffect(() => {
        let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH`
        fetch(url)
            .then(response => response.json())
            .then(manifestData =>
                setMostRecentDate(manifestData.photo_manifest.max_date)
            )
    }, [rover])

    useEffect(() => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${mostRecentDate}&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH`)
            .then(response => response.json())
            .then(data => {
                setPicData(data)
            })
    }, [mostRecentDate, rover])

    const handleRoverButtonClick = (e) => {
        setRover(e.target.id)
    }

    return (
        <div>
            <Button
                id="curiosity"
                handleClick={handleRoverButtonClick}
                text={"Curiosity"}
            >
                Curiosity
            </Button>
            <Button
                id="opportunity"
                handleClick={handleRoverButtonClick}
                text={"Opportunity"}
            >
                Opportunity
            </Button>
            <Button
                id="spirit"
                handleClick={handleRoverButtonClick}
                text={"Spirit"}
            >
                Spirit
            </Button>
            <br />
            {picData.photos ?
                picData.photos.map((item, i) => {
                    return (
                        <Div key={i}>
                            <Img src={item.img_src} alt="mars rover pic" /><br />
                            <span >{item.earth_date}</span><br />
                        </Div>
                    )
                }) : ""
            }
        </div>
    )
}

export default Pics
