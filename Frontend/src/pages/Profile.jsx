import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { clearToken } from '../utils/auth'

function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/user/profile')
            .then((res) => setUser(res.data.user))
            .catch((err) => setError(err.response?.data?.message || 'Could not load profile'))
            .finally(() => setLoading(false))
    }, [])

    function handleLogout() {
        clearToken()
        navigate('/login')
    }

    if (loading) return <p style={{ padding: '80px 24px', textAlign: 'center' }}>Loading profile...</p>

    if (error) return <p style={{ padding: '80px 24px', textAlign: 'center' }}>{error}</p>

    return (
        <section style={{ maxWidth: 640, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
            <h1>My Profile</h1>
            {user && (
                <>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {[user.firstname, user.surname].filter(Boolean).join(' ') || '—'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Status:</strong> {user.active ? 'Active' : 'Inactive'}</p>
                    <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </>
            )}
            <button onClick={handleLogout} className="btn btn-primary" style={{ marginTop: 16 }}>
                Logout
            </button>
        </section>
    )
}

export default Profile
