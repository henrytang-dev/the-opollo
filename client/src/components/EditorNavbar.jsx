import React, { useState, useEffect, useMemo } from "react";
import Logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import './components.css'
import authService from "../services/auth.service";
import axios from "axios";
import DropDownProfile from "./DropDownProfile";
import AuthVerify from "../services/auth-verify";
import Uploader from './Uploader'

const API_URL = `${VITE_ENDPOINT}`

const EditorNavbar = ({handleReview}) => {

    const [user, setUser] = useState({})
    const [state, setState] = useState({
        showWriter: false,
        currentUser: undefined
    })
    const [profile, setProfile] = useState(false)
    const [modal, setModal] = useState(false)
    const [profileImage, setProfileImage] = useState()

    useEffect(() => {
        loadUserData()
        getProfileImage()
    }, [])

    const { showWriter , currentUser } = state

    function loadUserData () {
        setUser(authService.getCurrentUser())
        const user = authService.getCurrentUser()
        setState({
            showWriter: (user.roles[0].name === "ROLE_USER"),
            currentUser: user
        })
    }

    function logOut() {
        authService.logout()
        setState({
            showWriter: false,
            currentUser: undefined
        })
    }

    async function getProfileImage() {
        const id = JSON.parse(localStorage.getItem("user")).id
        const result = await axios.get(API_URL + `/image/${id}`)
        setProfileImage(result.data)
    }

    function handleDropDown() {
        setProfile(!profile)
    }

    function toggleProfile() {
        setModal(!modal)
        if (profile) {
            setProfile(!profile)
        }
    }

    return (
        <>
            <div className="fixed z-[10] navbar-container w-screen top-0 left-0 h-[80px] flex justify-center items-center border-b-[1.5px]">
                <div className="flex justify-between items-center w-[90%]">
                    <Link to="/">
                        <img src={Logo} className="w-[50px]" />
                    </Link>
                    <div className="flex justify-center items-center gap-10 relative">
                        {showWriter && (
                            <div className="flex justify-center items-center gap-3">
                                <button to={`/${user.username}/write`} onClick={handleReview} className="border-2 w-[7rem] text-center rounded-[1rem] h-[2rem]">Review</button>
                            </div>
                        )}
                        {currentUser ? 
                            (profileImage ? (
                                <>
                                    <img className="w-[42px] h-[42px] rounded-[50%] object-cover cursor-pointer relative" onClick={handleDropDown} src={profileImage} />
                                    <div onClick={handleDropDown} className={`${profile ? "flex" : "hidden"} fixed left-0 top-0 w-screen h-screen`}></div>
                                    <DropDownProfile openModal={toggleProfile} open={profile} logOut={logOut} />
                                </>
                                ) : (
                                <>
                                    <img className="w-[35px] h-[35px] rounded-[50%] cursor-pointer relative" onClick={handleDropDown} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                    <div onClick={handleDropDown} className={`${profile ? "flex" : "hidden"} fixed left-0 top-0 w-screen h-screen`}></div>
                                    <DropDownProfile openModal={toggleProfile} open={profile} logOut={logOut} />
                                </>)
                        ): (
                            <Link to="/auth" >
                                <button className="border-2 w-[7rem] text-center rounded-[1rem] h-[2rem]">Login</button>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
            {modal  && 
                <div className="absolute w-screen h-screen flex justify-center items-center">
                    <Uploader toggleProfile={toggleProfile} /> 
                </div>
            }
            <AuthVerify logOut={logOut} />
        </>
    )
}



export default EditorNavbar