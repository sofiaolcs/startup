import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './signup.css';
import { NavLink } from 'react-router-dom';

export function Signup() {
  return (
    <main>
      <p>Sign up to create your Passarela closet.</p>

      <section>
        <h2>Sign up</h2>

        <form>
          <label for="Name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />

          <label for="email">Email</label>
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

          <button type="submit">Sign up</button>
        </form>

        <p>
          Already have an account?
          <NavLink to="/login" className="button">Log in</NavLink>
        </p>
      </section>
    </main>
  );
}