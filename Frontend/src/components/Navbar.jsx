import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

function Navbar() {
    const [open, setOpen] = useState(false)
    const token = localStorage.getItem('token')

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Contact', to: '/contact' },
        token
            ? { label: 'My Profile', to: '/profile' }
            : { label: 'Login', to: '/login' },
    ]

    return (
        <header className="site-header">
            <div className="header-inner">
                <Link to="/" className="logo" onClick={() => setOpen(false)}>
                    SHS<span>Ed</span>
                </Link>

                <nav className={`nav-links ${open ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="header-actions">
                    <Link to="/register" className="btn btn-primary btn-small" onClick={() => setOpen(false)}>
                        Apply Now
                    </Link>
                    <button
                        className="menu-toggle"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className="menu-bar"></span>
                        <span className="menu-bar"></span>
                        <span className="menu-bar"></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
