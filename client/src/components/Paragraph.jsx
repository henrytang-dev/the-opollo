import React from "react";
import './components.css'

const Paragraph = ({blockData}) => {
    return (
        <p className={`paragraph ${blockData.alignment == "left" ? "text-left" : "none"} ${blockData.alignment == "right" ? "text-right" : "none"} ${blockData.alignment == "center" ? "text-center" : "none"}`}>{blockData.text}</p>
    )
}

export default Paragraph