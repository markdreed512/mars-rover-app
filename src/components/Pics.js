import React, { useState } from 'react'
import styled from 'styled-components'

const Img = styled.img`
        height: 200px;
    `
const Div = styled.div`
    display: inline-block;
`
function Pics() {

    const [date, setDate] = useState("test")
    const [picData, setPicData] = useState({})
    const displayPics = () => {
        console.log("hi")
        fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-05-1&api_key=6cwPKDw2dwUyxJbFgml1JUuHYRfCegYLtZtkBVdH')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPicData(data)
                console.group(data)
            })

    }
    return (
        <div>
            <button onClick={displayPics}>Most Recent Pics</button><br />
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
