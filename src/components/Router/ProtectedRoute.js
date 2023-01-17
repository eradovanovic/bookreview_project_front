import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const ProtectedRoute = ({ children, types, redirectPath = '/notFound' }) => {
    const user = useSelector(state => state.authReducer.user)

    if (!user || types.findIndex(type => user.type === type) === -1) {
        return <Navigate to={redirectPath} replace />
    }

    return children || <Outlet />
}

ProtectedRoute.propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    redirectPath: PropTypes.string,
}

export default ProtectedRoute
