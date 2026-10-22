import React from 'react';
import './signup.css';
import { NavLink } from 'react-router-dom';

export function Signup({ onSignup }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Your password must be at least 8 characters.');
      return;
    }

    setError('');

    // Mock signup: notify App.jsx that the account was created.
    onSignup({
      name: name.trim(),
      email: email.trim(),
    });
  }

  return (
    <main className="signup-page">
      <p>Sign up to create your Passarela closet.</p>

      <section>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

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
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />

          {error && <p role="alert">{error}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{' '}
          <NavLink to="/login" className="button">
            Log In
          </NavLink>
        </p>
      </section>
    </main>
  );
}
