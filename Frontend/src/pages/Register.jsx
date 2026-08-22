import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../utils/api"
import CustomInputField from "../components/CustomInputField"
import CustomButton from "../components/CustomButton"

function Register() {
    const [getFirstname, setFirstname] = useState("")
    const [getSurname, setSurname] = useState("")
    const [getEmail, setEmail] = useState("")
    const [getUsername, setUsername] = useState("")
    const [getPassword, setPassword] = useState("")
    const [getConfirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const Handle_registration = async (event) => {
        event.preventDefault()
        setError("")

        if (!getUsername || !getEmail || !getPassword || !getConfirmPassword) {
            setError("All fields are required")
            return
        }

        if (getPassword !== getConfirmPassword) {
            setError("Passwords do not match")
            return
        }

        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

        if (!PASSWORD_REGEX.test(getPassword)) {
            setError("Password must be at least 8 characters and include an uppercase letter, a number, and a special character.")
            return
        }

        setLoading(true)
        try {
            const register = await api.post("/user/register", {
                firstname: getFirstname,
                surname: getSurname,
                email: getEmail,
                username: getUsername,
                password: getPassword
            })

            if (register.status === 201) {
                navigate("/login")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={Handle_registration} method="post" className="Registrationform">
            <h2>Create Account</h2>
            <p className="Register-subtitle">Join us and get started</p>
            {error ? <small className="Register-error">{error}</small> : ""}
            <CustomInputField
                label="First Name"
                type="text"
                name="firstname"
                placeholder="Type First Name Here"
                value={getFirstname}
                onChange={(e) => setFirstname(e.target.value)}
                autoComplete="given-name"
            />
            <CustomInputField
                label="Surname"
                type="text"
                name="surname"
                placeholder="Type Surname Here"
                value={getSurname}
                onChange={(e) => setSurname(e.target.value)}
                autoComplete="family-name"
            />
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
                label="Username"
                type="text"
                name="username"
                placeholder="Type Username Here"
                value={getUsername}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
            />
            <CustomInputField
                label="Password"
                type="password"
                name="password"
                placeholder="Type Password Here"
                value={getPassword}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
            />
            <CustomInputField
                label="Confirm Password"
                type="password"
                name="confirmpassword"
                placeholder="Type Confirm Password Here"
                value={getConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
            />
            <CustomButton type="submit" disabled={loading} fullWidth>
                {loading ? "Creating account..." : "Register"}
            </CustomButton>
            <p className="Register-footer">Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
    )
}

export default Register
