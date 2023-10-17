import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props: any) => {
    const { token, children, redirect} = props
    return token ? children : <Navigate to={redirect}/>
}

export default ProtectedRoutes