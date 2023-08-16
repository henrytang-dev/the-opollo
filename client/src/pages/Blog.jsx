import { Sandpack, SandpackProvider } from "@codesandbox/sandpack-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import SandpackComp from "../components/SandpackComp";
import Paragraph from "../components/Paragraph";
import Header from "../components/Header";
import Table from "../components/Table";
import List from "../components/List";
// import Embed from "../components/Embed";
import blogService from "../services/blog-service";
import Navbar from "../components/Navbar";

const API_URL = `${VITE_ENDPOINT}`

function Blog () {

    const [data, setData] = useState({})
    const [metadata, setMetadata] = useState({})
    const [profileImage, setProfileImage] = useState()
    const [time, setTime] = useState()

    const {username, url} = useParams()

    useEffect(() => {
        loadBlogData()
    }, [])
    

    const loadBlogData = async () => {
        const result = await axios.get(API_URL + `/${username}/${url}`)
        setData(result.data.blogData)
        setMetadata(result.data)

        const id = result.data.user.id
        const profile = await axios.get(API_URL + `/image/${id}`)
        setProfileImage(profile.data)

        const time = new Date(result.data.blogData.time)
        setTime(time.toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }))
    }


    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-[200px] mb-[300px]">
                <div className="w-[700px] flex flex-col items-center">
                    {metadata && (
                        <>
                            <h1 className="font-[600] text-[4.2rem] leading-[5rem] mb-[1.6rem] w-full">{metadata.title}</h1>
                            <div className="flex items-center mb-[1.5rem] w-full gap-4">
                                {profileImage && (profileImage ? (
                                    <>
                                        <img className="w-[35px] h-[35px] rounded-[50%] cursor-pointer relative object-cover"  src={profileImage} />
                                    </>
                                    ) : (
                                    <>
                                        <img className="w-[35px] h-[35px] rounded-[50%] cursor-pointer relative" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                    </>)
                                )}
                                <p className="text-[1.2rem]">{username}</p>
                                <div className="w-[5px] bg-black h-[5px] bg-black border-[2px] border-black rounded-[50%]"></div>
                                <p className=" text-[1.1rem]">{time}</p>
                            </div>
                        </>
                        
                    )}
                    <div className="border-y-[2px] w-full h-[1rem] border-black-400 mb-[20px]"></div>
                    {
                        data.blocks && data.blocks.map((block, index) => {
                            switch (block.type) {
                                case "image":
                                    return (
                                        <div key={index} className="block">
                                            <Image key={index} blockData={block.data}/>
                                        </div>
                                    )
                                case "sandbox":
                                    return (
                                        <div key={index} className="block">
                                            <SandpackProvider template="react" files={block.data}>
                                                <SandpackComp blockData={block.data} />
                                            </SandpackProvider>
                                        </div>
                                    )
                                case "header": 
                                    return (
                                        <div key={index} className="block">
                                            <Header blockData={block.data} />
                                        </div>
                                    )
                                case "list":
                                    return (
                                        <div key={index} className="block">
                                            <List blockData={block.data}/>
                                        </div>
                                    )
                                case "paragraph":
                                    return (
                                        <div key={index} className="block">
                                            <Paragraph blockData={block.data} />
                                        </div>
                                    )
                                case "quote":
                                    return (
                                        <div>
                                            <p>""</p>
                                        </div>
                                    )
                                // case "embed":
                                //     return (
                                //         <div key={index} className="block">
                                //             <Embed blockData={block.data} />
                                //         </div>
                                //     )
                                case "code":
                                    return (
                                        <p></p>
                                    )
                                case "table":
                                    return (
                                        <div key={index} className="block">
                                            <Table blockData={block.data} />
                                        </div>
                                    )
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Blog