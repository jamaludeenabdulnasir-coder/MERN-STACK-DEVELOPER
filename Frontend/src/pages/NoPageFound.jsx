import { Link } from 'react-router-dom'

function NoPageFound() {
    return (
        <section className="access-denied">
            <span className="access-denied-icon">🧭</span>
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist or has been moved.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 12 }}>
                Back to Home
            </Link>
        </section>
    )
}

export default NoPageFound
