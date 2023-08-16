import React, { useRef, useEffect, useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import authService from '../services/auth.service';
import { withRouter } from '../common/with-router';
import { useForm } from 'react-hook-form';

const Login = (props) => {

    const [rightPanelActive, setRightPanelActive] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("")

    const { register, handleSubmit, formState: {errors} } = useForm()

    function togglePanel () {
        setRightPanelActive(!rightPanelActive);
    }

    function onRegistrationInputchange (e) {
        setUser({ ...user, [e.target.name]:e.target.value })
    }

    function onSignInInputChange (e) {
        setCredentials({ ...credentials, [e.target.name]:e.target.value})
    }

    async function handleRegistration(e) {
        authService.register(user.firstName, user.lastName, user.email, user.username, user.password).then(() => window.location.reload()).catch((err) => console.log(err))
    }

    async function handleLogin(e) {
        e.preventDefault()
        await authService.login(credentials.username, credentials.password).then(() => props.router.navigate('/')).catch(() => setError("Incorrect username or password"))
    }

    const firstname = {
            required: {
                value: true,
                message: 'Required field'
            },
            maxLength: {
                value: 20,
                message: 'Character limit exceeded'
            },
            pattern: {
                value: /[A-Za-z]/,
                message: 'Invalid characters'
            }
    }

    const lastname = {
        required: 'Required field',
        maxLength: {
            value: 20,
            message: 'Character limit exceeded'
        },
        pattern: {
            value: /[A-Za-z]/,
            message: 'Invalid characters' 
        }
    }

    const email = {
        required: 'Required field',
        maxLength: {
            value: 30,
            message: 'Character limit exceeded'
        },
        pattern: {
            value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            message: 'Invalid email'
        }
    }

    const username = {
        required: 'Required field',
        maxLength: {
            value: 30,
            message: 'Character limit exceeded'
        },
        pattern: {
            value: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            message: 'Invalid characters'
        }
    }

    const password = {
        required: 'Required field',
        minLength: {
            value: 8,
            message: 'Password is too short'
        },
        maxLength: {
            value: 30,
            message: 'Character limit exceeded'
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: 'Invalid charaters'
        }
    }


    return (
        <>
            <div className="body">
                <div className={`login-container ${rightPanelActive ? 'right-panel-active' : "extra"}`}>
                    <div className="form-container sign-up-container">
                        <form noValidate onSubmit={handleSubmit(handleRegistration)}>
                            <h1>Create An Account</h1>
                            <span>Fill out the information below!</span>
                            <div className="relative w-full h-[50px] flex flex-col mb-2">
                                <input {...register("firstName", {...firstname})} type="text" name="firstName" placeholder="First name" onChange={onRegistrationInputchange} />
                                {errors.firstName && (
                                    <p style={{fontSize: '10px'}} className="text-red-400 w-full text-right py-0 mt-[0px] absolute translate-y-[30px] text-[1px]">{errors.firstName.message}</p>)}
                            </div>
                            <div className="relative w-full h-[50px] mb-2 flex flex-col">
                                <input {...register("lastName", {...lastname})} type="text" name="lastName" placeholder="Last name" onChange={onRegistrationInputchange}/>
                                {errors.lastName && (
                                    <p style={{fontSize: '10px'}} className="text-red-400 w-full text-right py-0 mt-[0px] absolute translate-y-[30px] text-[1px]">{errors.lastName.message}</p>)}
                            </div>
                            <div className="relative w-full h-[50px] mb-2 flex flex-col">
                                <input {...register("email", {...email})} type="email" name="email" placeholder="Email" onChange={onRegistrationInputchange}/>
                                {errors.email && (
                                    <p style={{fontSize: '10px'}} className="text-red-400 w-full text-right py-0 mt-[0px] absolute translate-y-[30px] text-[1px]">{errors.email.message}</p>)}
                            </div>
                            <div className="relative w-full h-[50px] mb-2 flex flex-col">
                                <input {...register("username", {...username})} type="text" name="username" placeholder="Username" onChange={onRegistrationInputchange}/>
                                {errors.username && (
                                    <p style={{fontSize: '10px'}} className="text-red-400 w-full text-right py-0 mt-[0px] absolute translate-y-[30px] text-[1px]">{errors.username.message}</p>)}
                            </div>
                            <div className="relative w-full h-[50px] mb-2 flex flex-col">
                                <input {...register("password", {...password})} type="password" name="password" placeholder="Password" onChange={onRegistrationInputchange}/>
                                {errors.password && (
                                    <p style={{fontSize: '10px'}} className="text-red-400 w-full text-right py-0 mt-[0px] absolute translate-y-[30px] text-[1px]">{errors.password.message}</p>)}
                            </div>
                            <br />
                            <button >Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLogin} >
                            <h1>Sign in</h1>
                            <span>Login to your account</span>
                            <input type="text" name="username" placeholder="Username" onChange={onSignInInputChange} />
                            <input type="password" name="password" placeholder="Password" onChange={onSignInInputChange} />
                            {error && (
                                <p style={{fontSize: '10px'}} className="text-red-400 w-[300px] text-left py-0 mt-[0px] absolute translate-y-[50px] text-[1px]">{error}</p>
                            )}
                            {/* <a href="#">Forgot your password?</a> */}
                            <button className="mt-[1rem]">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Have an Account Already?</h1>
                                <p>Sign into your account here!</p>
                                <button className="ghost" onClick={togglePanel}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Create an Account</h1>
                                <p>Register and begin creating in minutes!</p>
                                <button className="ghost" onClick={togglePanel}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Login)