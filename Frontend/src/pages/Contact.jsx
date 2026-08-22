import { useState } from "react"
import api from "../utils/api"
import CustomInputField from "../components/CustomInputField"
import CustomButton from "../components/CustomButton"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Contact() {
    const [getName, setName] = useState("")
    const [getEmail, setEmail] = useState("")
    const [getSubject, setSubject] = useState("")
    const [getMessage, setMessage] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const Handle_Contact = async (event) => {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (!getName || !getEmail || !getMessage) {
            setError("Name, email and message are required")
            return
        }

        setLoading(true)
        try {
            const response = await api.post("/user/contact", {
                name: getName,
                email: getEmail,
                subject: getSubject,
                message: getMessage
            })

            if (response.status === 201) {
                setSuccess(response.data.message)
                setName("")
                setEmail("")
                setSubject("")
                setMessage("")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Could not send your message. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            <section style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px' }}>
                <form onSubmit={Handle_Contact} method="post" className="Contactform">
                    <h2>Get In Touch</h2>
                    <p className="Contact-subtitle">We would love to hear from you</p>
                    {error ? <small className="Register-error">{error}</small> : ""}
                    {success ? <small className="Register-success">{success}</small> : ""}
                    <CustomInputField
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Type Your Name Here"
                        value={getName}
                        onChange={(e) => setName(e.target.value)}
                        required
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
                        label="Subject"
                        type="text"
                        name="subject"
                        placeholder="What is it about?"
                        value={getSubject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <div className="custom-input-field">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Type Your Message Here"
                            value={getMessage}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <CustomButton type="submit" disabled={loading} fullWidth>
                        {loading ? "Sending..." : "Send Message"}
                    </CustomButton>
                </form>
            </section>
            <Footer />
        </>
    )
}

export default Contact
