import React from "react";

const Header = ({blockData}) => {

    switch (blockData.level) {
        case 1:
            return (
                <h1 className="text-[3rem] font-bold header">{blockData.text}</h1>
            )
        case 2:
            return (
                <h2 className="text-[2.75rem] font-bold header">{blockData.text}</h2>
            )
        case 3:
            return (
                <h3 className="text-[2.5rem] font-bold header">{blockData.text}</h3>
            )
        case 4:
            return (
                <h4 className="text-[2.25rem] font-bold header">{blockData.text}</h4>
            )
        case 5:
            return (
                <h5 className="text-[2rem] font-bold header">{blockData.text}</h5>
            )
        case 6:
            return (
                <h6 className="text-[1.75rem] font-bold header">{blockData.text}</h6>
            )
    }
}

export default Header