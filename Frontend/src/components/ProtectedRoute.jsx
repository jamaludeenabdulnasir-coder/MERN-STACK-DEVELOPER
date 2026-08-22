import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
import YouCantAcessPageRedirect from './YouCantAccessPageRedirect'

function ProtectedRoute({ children }) {
    if (!isLoggedIn()) {
        return <YouCantAcessPageRedirect
            message="Please sign in to view your profile."
            redirectTo="/login"
            delay={4000}
        />
    }

    return children
}

export default ProtectedRoute
