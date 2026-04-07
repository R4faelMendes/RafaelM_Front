import { Navigate } from "react-router-dom";
import DefaultLayout from "../defaultLayout/DefaultLayout";

const ProtectedRoute = ({children})=> {

    const isAuthenticated = localStorage.getItem("auth");;
    return isAuthenticated ? (<DefaultLayout>{children}</DefaultLayout>) : <Navigate to="/" />
};

export default ProtectedRoute;