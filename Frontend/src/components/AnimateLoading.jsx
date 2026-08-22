import '../css/AnimateLoading.css'

function AnimatedLoading({ message = 'Loading...' }) {
    return (
        <div className="animated-loading" role="status" aria-live="polite">
            <span className="loading-spinner" />
            <p>{message}</p>
        </div>
    )
}

export default AnimatedLoading
