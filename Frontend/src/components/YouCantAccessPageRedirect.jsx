import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/YouCantAccessPageRedirect.css'

function YouCantAcessPageRedirect({
    message = "You don't have permission to view this page.",
    redirectTo = '/login',
    delay = 4000
}) {
    const [secondsLeft, setSecondsLeft] = useState(delay / 1000)
    const navigate = useNavigate()

    useEffect(() => {
        if (secondsLeft <= 0) {
            navigate(redirectTo, { replace: true })
            return
        }
        const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
        return () => clearTimeout(timer)
    }, [secondsLeft, navigate, redirectTo])

    return (
        <section className="access-denied">
            <span className="access-denied-icon">🔒</span>
            <h1>Access Denied</h1>
            <p>{message}</p>
            <p className="access-denied-countdown">
                Redirecting you in <strong>{secondsLeft}</strong> second{secondsLeft === 1 ? '' : 's'}...
            </p>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(redirectTo, { replace: true })}
            >
                Go Now
            </button>
        </section>
    )
}

export default YouCantAcessPageRedirect;
