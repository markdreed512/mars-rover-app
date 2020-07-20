import React, { useState, useEffect } from 'react'
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
   
    const fetchManifestAndSetMostRecentDate = () => {
        let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH`
        fetch(url)
        .then(response => response.json())
        .then(manifestData => 
            setMostRecentDate(manifestData.photo_manifest.max_date)    
        )
    }
    useEffect(()=>{
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${mostRecentDate}&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH`)
            .then(response => response.json())
            .then(data => {
                setPicData(data)
                console.group(data)
            })
    },[mostRecentDate, rover])
    return (
        <div>
            {/* <button onClick={handleCurio}>get manifest</button> */}
            <button onClick={fetchManifestAndSetMostRecentDate}>Most Recent Pics</button><br />
            {/* <h2>Pics for {date}</h2> */}
            {picData.photos ?
                picData.photos.map((item, i) => {
                    return (
                        <Div key={i}>
                            <Img src={item.img_src} alt="mars rover pic" /><br/>
                            <span >{item.earth_date}</span><br/>
                        </Div>
                    )
                }) : ""
            }
        </div>
    )
}

export default Pics
