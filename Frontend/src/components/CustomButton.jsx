import { Link } from 'react-router-dom'

function CustomButton({ children, variant = 'btn-primary', href, to, type = 'button', onClick, disabled = false, fullWidth = false }) {
    const className = `btn ${variant} ${fullWidth ? 'btn-block' : ''}`.trim()

    if (to) {
        return (
            <Link to={to} className={className}>
                {children}
            </Link>
        )
    }

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        )
    }

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default CustomButton
