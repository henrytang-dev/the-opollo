import React, { useEffect } from "react";
import { withRouter } from "../common/with-router";
import authService from "./auth.service";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const AuthVerify = (props) => {
    let location = props.router.location;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if(user) {
            const decodedJwt = parseJwt(user.token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                authService.logout();
                props.router.navigate("/auth")
                window.location.reload()
            }
        }
    }, [location])

    return (
        <div></div>
    )
}

export default withRouter(AuthVerify)