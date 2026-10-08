import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Closet } from './closet/closet';
import { Clothes } from './clothes/clothes';
import { CreateOutfit } from './create-outfit/create-outfit';
import { Friends } from './friends/friends';
import { Login } from './login/login';
import { Planner } from './planner/planner';
import { Profile } from './profile/profile';
import { Signup } from './signup/signup';

export default function App() {
  return (
  <BrowserRouter><div className="body bg-dark text-light">
  <header>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <NavLink class="navbar-brand" to="/"> PASSARELA </NavLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NavLink class="nav-link" to="/"> Home Page ✨ </NavLink>
          </li>

          <li class="nav-item">
            <NavLink class="nav-link" to="/pages/closet/closet.html">
              Your closet ✨
            </NavLink>
          </li>

          <li class="nav-item">
            <NavLink class="nav-link" to="/pages/planner/planner.html">
              Planner ✨
            </NavLink>
          </li>

          <li class="nav-item">
            <NavLink class="nav-link" to="/pages/friends/friends.html">
              Friends ✨
            </NavLink>
          </li>

          <li class="nav-item">
            <NavLink class="nav-link" to="/pages/profile/profile.html">
              Profile ✨
            </NavLink>
          </li>
        </ul>

        <div class="welcome">
          <p>Welcome, Sofia Silva!</p>
          <NavLink to="/pages/login/login.html">Log in</NavLink>
        </div>
      </div>
    </div>
  </nav>
</header>

<Routes>
  <Route path='/' element={<Home />} exact />
  <Route path='/closet' element={<Closet />} />
  <Route path='/clothes' element={<Clothes />} />
  <Route path='/create-outfit' element={<CreateOutfit />} />
  <Route path='/friends' element={<Friends />} />
  <Route path='/login' element={<Login />} />
  <Route path='/planner' element={<Planner />} />
  <Route path='/profile' element={<Profile />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='*' element={<NotFound />} />
</Routes>

<footer>
  <div>
    <h2>Resources</h2>
    <NavLink to="https://github.com/sofiaolcs/startup">GitHub</NavLink>
    <p>Style Tips</p>
    <p>Wardrobe Guide</p>
    <p>Outfit Inspiration</p>
  </div>
  <p>© 2026 Passarela. All rights reserved.</p>
  <div>
    <h2>Contact Us</h2>
    <p>Have questions, feedback, or style suggestions?</p>
    <p>Email: hello@passarela.com</p>
    <p>Follow us for outfit inspiration and updates!</p>
  </div>
</footer>
</div>;
</BrowserRouter>
)
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}