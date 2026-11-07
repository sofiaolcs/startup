import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

export function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

async function handleSubmit(event) {
  event.preventDefault();

  if (!email.trim() || !password) {
    setError('Please enter your email and password.');
    return;
  }

  setError('');

  try {
    await onLogin({
      email: email.trim(),
      password: password,
    });
  } catch (error) {
    setError(error.message || 'Invalid email or password.');
  }
}

  return (
    <main className="login-page">
      <p>Log in to access your Passarela closet.</p>

      <section>
        <h2>Log In</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p role="alert">{error}</p>}

          <button type="submit">Log In</button>
        </form>

        <p>
          Don't have an account?{' '}
          <NavLink to="/signup" className="button">
            Create an account
          </NavLink>
        </p>
      </section>
    </main>
  );
}
