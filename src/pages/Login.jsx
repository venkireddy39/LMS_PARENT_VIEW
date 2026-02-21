import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleMockLogin = (email) => {
        console.log('Activating Offline Demo Mode for:', email);
        const mockToken = `mock_token_${btoa(email || 'demo')}`;
        const mockUser = {
            email: email || 'parent@example.com',
            parentName: (email && email.split('@')[0]) || 'Parent',
            role: 'PARENT',
            studentName: 'Rohan Sharma',
            studentGrade: '10th Grade'
        };
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            console.log('--- Auth Debug ---');
            console.log('Fetching: /auth/login');

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            console.log('Status:', response.status);

            if (!response.ok) {
                let errorData = '';
                try {
                    const clonedRes = response.clone();
                    errorData = await clonedRes.text();
                    const json = JSON.parse(errorData);
                    errorData = json.message || json.error || errorData;
                } catch (e) {
                    // Not JSON or empty
                }

                const statusInfo = response.status === 404 ? ' (Not Found - Check Route)' :
                    response.status === 401 ? ' (Invalid Credentials)' :
                        response.status === 500 ? ' (Server Error)' : '';

                setError(`Login Failed [${response.status}]${statusInfo}: ${errorData || 'No response from server'}`);
                setIsLoading(false);
                return;
            }

            const contentType = response.headers.get("content-type");
            let token = '';
            let apiData = null;

            if (contentType && contentType.includes("application/json")) {
                apiData = await response.json();
                token = apiData.token || apiData.accessToken || apiData.jwt;
            } else {
                token = await response.text();
            }

            if (token) {
                console.log('Success: Token obtained');
                processLoginSuccess(token, email, apiData);
            } else {
                setError('Success status received, but no token found in response body.');
            }
        } catch (err) {
            console.error('Fetch Fatal Error:', err);
            setError(`Network Error: ${err.message}. Ensure backend is running at http://192.168.1.46:8081/auth/login`);
        } finally {
            setIsLoading(false);
            console.log('--- Auth Debug End ---');
        }
    };

    const processLoginSuccess = async (token, email, apiData = null) => {
        localStorage.setItem('token', token);

        // Priority 1: Use parentName from direct login response
        // Priority 2: Use apiData object properties
        // Priority 3: Fallback to email prefix
        const parentNameFromApi = apiData?.parentName || apiData?.user?.parentName;

        const initialUser = {
            email,
            parentName: parentNameFromApi || email.split('@')[0]
        };

        localStorage.setItem('user', JSON.stringify(initialUser));

        // Fetch detailed profile from /parent/me for extra metadata
        try {
            console.log('Fetching profile from /parent/me...');
            const parentRes = await fetch('/parent/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (parentRes.ok) {
                let parentData = await parentRes.json();
                if (Array.isArray(parentData) && parentData.length > 0) parentData = parentData[0];

                // Merge and update
                const updatedUser = { ...initialUser, ...parentData };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                console.log('User profile updated with details:', updatedUser);
            }
        } catch (err) {
            console.error('Non-blocking profile fetch error:', err);
        }

        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">EduParent</div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Please enter your details to sign in</p>
                </div>

                {error && (
                    <div className="error-container" style={{ marginBottom: '20px' }}>
                        <div className="error-message">{error}</div>
                        {(error.toLowerCase().includes('network') || error.toLowerCase().includes('fail')) && (
                            <button
                                type="button"
                                className="demo-button"
                                onClick={() => handleMockLogin(email)}
                                style={{
                                    width: '100%',
                                    marginTop: '10px',
                                    padding: '10px',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '1px dashed #6366f1',
                                    color: '#818cf8',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                Use Offline Demo Mode
                            </button>
                        )}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address / Student ID</label>
                        <div className="input-wrapper">
                            <FiMail className="input-icon" />
                            <input
                                id="email"
                                type="text"
                                placeholder="parent@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                            <span className="forgot-password">Forgot password?</span>
                        </Link>
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    Don't have an account?
                    <Link to="/register" className="register-link">Contact School</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
