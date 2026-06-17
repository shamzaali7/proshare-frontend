import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index';

function AuthModal({ isOpen, onClose }) {
  const {
    handleGoogleLogin,
    handleEmailSignUp,
    handleEmailSignIn,
    loading,
    error,
    clearError
  } = useContext(AppContext);

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [localError, setLocalError] = useState('');

  // Clear errors when switching modes or closing
  useEffect(() => {
    setLocalError('');
    clearError();
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setLocalError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!form.email || !form.password) {
      setLocalError('Please enter your email and password.');
      return;
    }
    await handleEmailSignIn(form.email, form.password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setLocalError('Please enter your first and last name.');
      return;
    }
    if (!form.email) {
      setLocalError('Please enter your email address.');
      return;
    }
    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    await handleEmailSignUp(form.firstName.trim(), form.lastName.trim(), form.email, form.password);
  };

  const handleGoogleClick = async () => {
    await handleGoogleLogin();
    onClose();
  };

  const displayError = localError || error;

  const inputStyle = {
    width: '100%',
    padding: '0.55rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '0.6rem',
    color: '#374151',
    background: 'white'
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div
        className="modal-content"
        style={{ maxWidth: '380px', minWidth: '320px', padding: '2rem' }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.25rem',
          fontSize: '1.15rem',
          fontWeight: '700',
          color: '#1f2937'
        }}>
          {mode === 'signin' ? 'Sign In to ProShare' : 'Create Your Account'}
        </h2>

        {displayError && (
          <div style={{
            color: '#dc2626',
            fontSize: '0.85rem',
            textAlign: 'center',
            marginBottom: '0.75rem',
            padding: '0.5rem',
            background: '#fef2f2',
            borderRadius: '4px',
            border: '1px solid #fecaca'
          }}>
            {displayError}
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={handleGoogleClick}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.6rem',
            marginBottom: '1rem',
            border: '1.5px solid #d1d5db',
            borderRadius: '4px',
            background: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            color: '#374151',
            fontWeight: '500'
          }}
        >
          Continue with&nbsp;
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
          <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
        </div>

        {/* Email Form */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              style={inputStyle}
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
            <input
              type="password"
              style={inputStyle}
              placeholder="Password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '0.85rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', textDecoration: 'underline', fontSize: '0.85rem', padding: 0 }}
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                style={{ ...inputStyle, flex: 1 }}
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
                disabled={loading}
                autoFocus
              />
              <input
                type="text"
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <input
              type="email"
              style={inputStyle}
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              style={inputStyle}
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              style={inputStyle}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '0.85rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', textDecoration: 'underline', fontSize: '0.85rem', padding: 0 }}
              >
                Sign in
              </button>
            </p>
          </form>
        )}

        <button
          onClick={onClose}
          className="close-modal"
          disabled={loading}
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
