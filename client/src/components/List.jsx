import React from "react";

const List = ({blockData}) => {
            switch (blockData.style) {
                case "ordered":
                    return (
                        <ol>
                            {blockData.items.map(item => {
                                return (
                                    <li>{item}</li>
                                )
                            })}
                        </ol>
                    )
                case "unordered":
                    return (
                        <ul>
                            {blockData.items.map(item => {
                                return (
                                    <li>{item}</li>
                                )
                            })}
                        </ul>
                    )
            }
}

export default List