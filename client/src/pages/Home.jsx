import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import blogService from "../services/blog-service";
import Navbar from "../components/Navbar";
import './pages.css'
// import Logo from '../assets/logo.svg'

function Home() {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        loadBlogs()
    }, [])

    async function loadBlogs() {
        const listOfBlogs = await blogService.loadRandomBlogs()
        setBlogs(listOfBlogs.data)
    }

    return (
        <>
            <Navbar />
            <div className="mt-[200px] w-screen flex flex-col items-center mb-[300px]">
                    <div className="w-[73%] mb-12">
                        <h2 className="text-[2.5rem] font-bold">Today's Featured</h2>
                    </div>            
                    <div className="flex flex-col justify-start items-center relative w-[73%] gap-10">
                        {
                            blogs.map((blog, index) => {
                                return (
                                    <>
                                            <Link key={index} className="card bg-white w-[100%] justify-between border-2 items-center flex rounded-[10px] px-10 z-[1]" to={`/${blog.user.username}/${blog.url}`}>
                                                <Card key={index} username={blog.user.username} title={blog.title} previewParagraph={blog.paragraph} previewImage={blog.previewImage} id={blog.user.id} time={blog.blogData.time} />
                                            </Link>
                                    </>
                                )
                            })
                        }
                    </div>
            </div>
        </>
    )
}

export default Home