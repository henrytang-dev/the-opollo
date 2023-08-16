import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png'
import './components.css'
import axios from "axios";

const API_URL = `${VITE_ENDPOINT}`

const Card = ({ id, username, title, previewParagraph, previewImage, time }) => {

    const [profileImage, setProfileImage] = useState()
    const [date, setDate] = useState()

    useEffect(() => {
        loadProfileImage()
    })

    async function loadProfileImage() {
        const result = await axios.get(API_URL + `/image/${id}`)
        setProfileImage(result.data)

        const date = new Date(time)
        setDate(date.toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }))
    }

    return (
        <>
            <div className="flex flex-col items-start justify-center z-[1] h-[14rem] gap-1.5">
                <div className="flex justify-center gap-4 items-center">
                    {profileImage ? (
                        <img className="w-[30px] h-[30px] rounded-[50%] border-2 object-cover" src={profileImage} />                       
                    ): (
                        <img className="w-[30px] h-[30px] rounded-[50%] border-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    )}
                    <p className="text-[1.05rem] font-[sans-serif]">{username}</p>
                    <div className="w-[4.5px] bg-black h-[4.5px] bg-black border-[2px] border-black rounded-[50%]"></div>
                    <p className=" text-[1.05rem] font-[sans-serif]">{date}</p>
                </div>
                <h2 className="font-bold text-[2rem]">{title}</h2>
                <p className="overflow-hidden text-ellipsis h-[75px] w-[640px] line-clamp-3 font-[Merriweather] text-[1.1rem] opacity-[0.75]">{previewParagraph}</p>
            </div>
            <div>
                <img className="h-[11rem] w-[11rem] aspect-square object-cover rounded-[10px]" src={previewImage}/>
            </div>
        </>
    )
}


export default Card