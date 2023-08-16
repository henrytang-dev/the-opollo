import React from 'react'
import './components.css'

const Image = ({blockData}) => {


    return (
        <div>
            <img src={blockData.url}></img>
            <p className="image-caption">{blockData.caption}</p>
        </div>
    )
}

export default Image