import React, { useRef, useState } from "react";
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = `${VITE_ENDPOINT}`

const Uploader = ({toggleProfile}) => {


    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    const ref = useRef()

    const id = JSON.parse(localStorage.getItem("user")).id

    async function handleProfileChange(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append("image", new Blob([JSON.stringify(image)], { 
            type: 'application/json'
          }))
        await axios.put(API_URL + `/image/update/${id}`, formData, {headers: { ...authHeader(), "Content-Type": "multipart/form-data" }})
        window.location.reload()
    }


    return (
        <>
            <div className="fixed z-[10000] top-0 left-0 w-screen h-screen flex justify-center items-center flex" >
                <div onClick={toggleProfile} className="fixed bg-black opacity-[0.5] z-[10001] top-0 left-0 w-screen h-screen flex justify-center items-center flex gap-3 flex-col"></div>
                <div className="absolute z-[10002] flex flex-col gap-3 justify-center items-center">
                    <form id="edit-profile" onClick={() => ref.current.click()} onSubmit={handleProfileChange} className="flex flex-col justify-center items-center border-[#1475cf]-2 outline-white outline-dashed h-[300px] w-[500px] rounded-[5px] cursor-pointer bg-black opacity-[0.75]"  >
                        <input hidden ref={ref} type="file" accept='image/*' onChange={({target: {files}}) => {
                            files[0] && setFileName(files[0].name)
                            if(files) {
                                setImage(URL.createObjectURL(files[0]))
                            }
                        }} />

                        {image ?
                            <img src={image} width={400} height={400} alt={fileName} />
                            :
                            <>
                                <MdCloudUpload color='white' size={60} />
                                <p className="text-white">Browse files to upload</p>
                            </>
                        }
                    </form>
                    <section className="mx-[10px] w-[500px] h-[2rem] flex justify-between items-center px-[15px] py-[20px] rounded-[5px] bg-[#e9f0ff]">
                        <AiFillFileImage color='#1475cf' className="flex items-center" />
                        <span className="flex justify-center items-center gap-3">{fileName}
                            <MdDelete onClick={() => {
                                setFileName("No selected file")
                                setImage(null)
                            }} />
                        </span>
                    </section>
                    <button type="submit" form="edit-profile" className="bg-[#1475cf] text-white w-[8rem] h-[2rem] rounded-[50px]">Submit</button>
                </div>
            </div>
        </>
    )
}

export default Uploader
