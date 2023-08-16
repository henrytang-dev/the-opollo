import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import './components.css'
import authService from "../services/auth.service";
import AuthVerify from "../services/auth-verify";
import Logo from '../assets/logo.png'
import DropDownProfile from "./DropDownProfile";
import axios from "axios";
import Uploader from "./Uploader";

const API_URL = `${VITE_ENDPOINT}`

const Navbar = () => {

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
        if(user){
            setState({
                showWriter: (user.roles[0].name === "ROLE_USER"),
                currentUser: user
            })
        }
    }

    function toggleProfile() {
        setModal(!modal)
        if (profile) {
            setProfile(!profile)
        }
    }

    function handleDropDown() {
        setProfile(!profile)
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

    return (
        <>
            <div className="fixed z-[100] navbar-container w-screen top-0 left-0 h-[80px] flex justify-center items-center border-b-[1.5px]">
                <div className="flex justify-between items-center w-[90%]">
                    <Link to="/">
                        <img src={Logo} className="w-[50px]" />
                    </Link>
                    <div className="flex justify-center items-center gap-10 relative">
                        {showWriter && (
                            <div>
                                <Link to={`/${user.username}/write`} className="flex justify-center items-center gap-1 relative">
                                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z" stroke="#464455" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Write
                                </Link>
                            </div>
                        )}
                        {currentUser ? 
                            (profileImage ? (
                                <>
                                    <img className="w-[42px] h-[42px] object-cover rounded-[50%] cursor-pointer relative" onClick={handleDropDown} src={profileImage} />
                                    <div onClick={handleDropDown} className={`${profile ? "flex" : "hidden"} fixed left-0 top-0 w-screen h-screen`}></div>
                                    <DropDownProfile toggleDropDown={handleDropDown} toggleModal={toggleProfile} firstName={user.firstName} username={user.username} lastName={user.lastName} open={profile} logOut={logOut} />
                                </>
                                ) : (
                                <>
                                    <img className="w-[42px] h-[42px] rounded-[50%] cursor-pointer relative" onClick={handleDropDown} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                    <DropDownProfile toggleDropDown={handleDropDown} toggleModal={toggleProfile} firstName={user.firstName} username={user.username} lastName={user.lastName} open={profile} logOut={logOut} />
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

export default Navbar