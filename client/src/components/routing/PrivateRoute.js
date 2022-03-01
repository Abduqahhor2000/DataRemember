import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
    const State_User = useSelector(state=>state.user.user)
    return (
        State_User.token ? (children) : (<Navigate to="/login" replace/>)
    )
}

export default PrivateRoute;