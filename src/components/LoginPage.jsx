import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './LoginPage.css';
import companyLogo from './company-logo.png';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Check if user is allowed
      const { data: allowedUser, error: allowedUserError } = await supabase
        .from('allowed_users')
        .select()
        .eq('email', email)
        .single();

      if (allowedUserError) {
        console.error('Error checking allowed users:', allowedUserError);
        if (allowedUserError.code === 'PGRST116') {
          console.log('No matching user found in allowed_users table');
          setError('Invalid email or password');
        } else {
          setError('An error occurred while verifying user access. Please try again.');
        }
        return;
      }

      if (!allowedUser) {
        console.log('User not found in allowed_users table');
        setError('Invalid email or password');
        return;
      }

      if (allowedUser.password !== password) {
        console.log('Password mismatch');
        setError('Invalid email or password');
        return;
      }

      // Attempt to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        console.error('Sign-in error:', signInError);
        setError('An error occurred during sign-in. Please try again.');
        return;
      }

      console.log('Sign-in successful:', signInData);
      onLogin(true); // Call the onLogin function to update the authentication state
      navigate('/dashboard');
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo-LoginForm" />
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email" className="login-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;