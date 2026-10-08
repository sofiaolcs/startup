import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

export function Login() {
  return (
    <main className="login-page">
      <p>Log in to access your Passarela closet.</p>

      <section>
        <h2>Log In</h2>

        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />

          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />

          <button type="submit">Log In</button>
        </form>

        <p>
          Don't have an account?
          <NavLink to="/signup" className="button">Create an account</NavLink>
        </p>
      </section>
    </main>
  );
}