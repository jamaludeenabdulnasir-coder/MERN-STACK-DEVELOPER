import { useState } from 'react'
import '../css/Footer.css'

function Footer() {
    const [email, setEmail] = useState('')

    const quickLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About Us', href: '#about' },
        { label: 'Programs', href: '#programs' },
        { label: 'Alumni Stories', href: '#testimonials' },
    ]

    const programs = [
        { label: 'General Arts', href: '#programs' },
        { label: 'General Science', href: '#programs' },
        { label: 'Business', href: '#programs' },
        { label: 'Visual Arts', href: '#programs' },
    ]

    function handleSubscribe(e) {
        e.preventDefault()
        setEmail('')
    }

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <a href="#home" className="logo footer-logo">
                        SHS<span>Ed</span>
                    </a>
                    <p>
                        Shaping bright minds for a better future through quality
                        education, character development and a vibrant campus community.
                    </p>
                    <div className="footer-socials">
                        <a href="#" className="social-badge" aria-label="Facebook">f</a>
                        <a href="#" className="social-badge" aria-label="X">X</a>
                        <a href="#" className="social-badge" aria-label="Instagram">in</a>
                        <a href="#" className="social-badge" aria-label="YouTube">▶</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Our Programs</h4>
                    <ul>
                        {programs.map((program) => (
                            <li key={program.label}>
                                <a href={program.href}>{program.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Stay Updated</h4>
                    <p>Get admissions news and school updates straight to your inbox.</p>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary btn-small">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 SHSEd Senior High School. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
