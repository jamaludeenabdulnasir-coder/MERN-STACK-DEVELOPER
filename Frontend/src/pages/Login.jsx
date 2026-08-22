import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import api from "../utils/api"
import { saveToken, isLoggedIn } from "../utils/auth"
import CustomInputField from "../components/CustomInputField"
import CustomButton from "../components/CustomButton"

function Login() {
    const [getEmail, setEmail] = useState("")
    const [getPassword, setPassword] = useState("")
    const [remember, setRemember] = useState(true)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    if (isLoggedIn()) {
        return <Navigate to="/" replace />
    }

    const Handle_Login = async (event) => {
        event.preventDefault()
        setError("")

        if (!getEmail || !getPassword) {
            setError("All fields are required")
            return
        }

        setLoading(true)
        try {
            const login = await api.post("/user/login", {
                email: getEmail,
                password: getPassword
            })

            if (login.status === 200) {
                saveToken(login.data.token, remember)
                navigate("/")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={Handle_Login} method="post" className="Loginform">
            <h2>Welcome Back</h2>
            <p className="Login-subtitle">Sign in to continue to your account</p>
            {error ? <small className="Login-error">{error}</small> : ""}
            <CustomInputField
                label="Email"
                type="email"
                name="email"
                placeholder="Type Email Here"
                value={getEmail}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
            />
            <CustomInputField
                label="Password"
                type="password"
                name="password"
                placeholder="Type Password Here"
                value={getPassword}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.9rem' }}>
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                Keep me signed in
            </label>
            <CustomButton type="submit" disabled={loading} fullWidth>
                {loading ? "Signing in..." : "Login"}
            </CustomButton>
            <p className="Login-footer">Don&apos;t have an account? <Link to="/register">Sign up</Link></p>
        </form>
    )
}

export default Login
