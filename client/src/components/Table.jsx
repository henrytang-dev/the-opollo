import React from "react";
import './components.css'

const Table = ({blockData}) => {

    const {content}  = blockData

    return (
        <>
            <div className="flex justify-center items-center">
                <table className="styled-table">
                    {content.map((row, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    {row.map(element => {
                                        return (
                                            <td>{element}</td>
                                        )
                                    })}
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default Table