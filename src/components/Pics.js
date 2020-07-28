import React, { useState, useEffect } from 'react'
import Button from './Button'
import styled from 'styled-components'
import './Pics.css'

const Img = styled.img`
        height: 200px;
        margin: 2px;
    `
const Div = styled.div`
    display: inline-block;
`
function Pics() {

    const [picsDate, setPicsDate] = useState("2019-01-01")
    const [picData, setPicData] = useState({})
    const [rover, setRover] = useState("curiosity")
    const [curiositySelected, setCuriositySelected] = useState(false)
    const [opportunitySelected, setOpportunitySelected] = useState(false)
    const [spiritSelected, setSpiritSelected] = useState(false)
    

    useEffect(() => {
        let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH`
        fetch(url)
            .then(response => response.json())
            .then(manifestData =>
                setPicsDate(manifestData.photo_manifest.max_date)
            )
    }, [rover])

    useEffect(() => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${picsDate}&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH`)
            .then(response => response.json())
            .then(data => {

                setPicData(data)
            })
    }, [picsDate, rover])



    const handleRoverButtonClick = (e) => {
        setRover(e.target.id)
        toggleSelectedButton(e.target.id)
    }

    const toggleSelectedButton = (id) => {
        switch (id) {
            case "curiosity":
                setCuriositySelected(true)
                setOpportunitySelected(false)
                setSpiritSelected(false)
                break
            case "opportunity":
                setCuriositySelected(false)
                setOpportunitySelected(true)
                setSpiritSelected(false)
                break
            case "spirit":
                setCuriositySelected(false)
                setOpportunitySelected(false)
                setSpiritSelected(true)
                break
            default:
                console.log("unknown rover error")
        }
    }

    const handleOlderButtonClick = (e) => {
        console.log(e.target.id)
        // setPicsDate(() => getPreviousDay())
        setPicsDate(() => getPreviousDay())
    }
    const getPreviousDay = () => {
        console.log(picsDate)
        let year = parseInt(picsDate.split('').slice(0,5).join(''))
        let month = parseInt(picsDate.split('').slice(6,8).join(''))
        let day = parseInt(picsDate.split('').slice(8).join(''))
        day = day - 1
        console.log(`${year}-${month}-${day}`)
        return `${year.toString()}-${month.toString()}-${day.toString()}`
    }
return (
    <div>
        <Button
            id="curiosity"
            handleClick={handleRoverButtonClick}
            text={"Curiosity"}
            selected={curiositySelected? "active" : "inactive"}
        >
            Curiosity
            </Button>
        <Button
            id="opportunity"
            handleClick={handleRoverButtonClick}
            text={"Opportunity"}
            selected={opportunitySelected? "active" : "inactive"}
        >
            Opportunity
            </Button>
        <Button
            id="spirit"
            handleClick={handleRoverButtonClick}
            text={"Spirit"}
            selected={spiritSelected? "active" : "inactive"}
        >
            Spirit
            </Button>
        <br />
        <Button 
        id="older-btn"
        handleClick={handleOlderButtonClick}
        text={"Older Pics"}
        selected={spiritSelected}
        /><br/>
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
