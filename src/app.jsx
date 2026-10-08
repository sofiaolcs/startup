import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
  <header>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> PASSARELA </a>

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
            <a class="nav-link" href="/"> Home Page ✨ </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/pages/closet/closet.html">
              Your closet ✨
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/pages/planner/planner.html">
              Planner ✨
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/pages/friends/friends.html">
              Friends ✨
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/pages/profile/profile.html">
              Profile ✨
            </a>
          </li>
        </ul>

        <div class="welcome">
          <p>Welcome, Sofia Silva!</p>
          <a href="/pages/login/login.html">Log in</a>
        </div>
      </div>
    </div>
  </nav>
</header>

<footer>
  <div>
    <h2>Resources</h2>
    <a href="https://github.com/sofiaolcs/startup">GitHub</a>
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
}