import React, { useState, useContext } from 'react';
import { AppContext } from '../index';

function EmailVerification() {
  const {
    user,
    handleLogout,
    resendVerificationEmail,
    checkEmailVerification,
    error,
    clearError
  } = useContext(AppContext);

  const [resent, setResent] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleResend = async () => {
    clearError();
    await resendVerificationEmail();
    setResent(true);
    setTimeout(() => setResent(false), 5000);
  };

  const handleCheck = async () => {
    clearError();
    setChecking(true);
    await checkEmailVerification();
    setChecking(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      fontFamily: "'Roboto', sans-serif",
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '3rem 2.5rem',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>

        <h1 style={{
          fontSize: '1.4rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          Verify Your Email
        </h1>

        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
          We sent a verification link to:
        </p>
        <p style={{
          color: '#374151',
          fontWeight: '600',
          fontSize: '0.95rem',
          marginBottom: '1.25rem'
        }}>
          {user?.email || 'your email address'}
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: '1.5' }}>
          Click the link in your email to activate your account, then come back and press the button below.
        </p>

        {error && (
          <div style={{
            color: '#dc2626',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            padding: '0.5rem',
            background: '#fef2f2',
            borderRadius: '4px',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={checking}
          style={{
            width: '100%',
            padding: '0.65rem',
            background: '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: checking ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            marginBottom: '0.75rem',
            opacity: checking ? 0.7 : 1
          }}
        >
          {checking ? 'Checking…' : "I've Verified My Email ✓"}
        </button>

        <button
          onClick={handleResend}
          disabled={resent}
          style={{
            width: '100%',
            padding: '0.65rem',
            background: 'white',
            color: '#374151',
            border: '1.5px solid #d1d5db',
            borderRadius: '4px',
            cursor: resent ? 'default' : 'pointer',
            fontSize: '0.9rem',
            marginBottom: '1.25rem',
            opacity: resent ? 0.7 : 1
          }}
        >
          {resent ? '✓ Email Sent!' : 'Resend Verification Email'}
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af',
            fontSize: '0.85rem',
            textDecoration: 'underline'
          }}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}

export default EmailVerification;
