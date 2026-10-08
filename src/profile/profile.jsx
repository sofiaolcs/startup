import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './profile.css';

export function Profile() {
  return (
  <main className="profile-page">
      <h1>My Profile</h1>

      <section className="profile-main-info">
        <img src="/images/cher.png" alt="Profile picture" />

        <h2>Sofia Silva</h2>
        <p>sofia@example.com</p>
        <p>I love casual and feminine outfits.</p>
      </section>

      <div className="info">
        <section>
          <h2>My Style</h2>
          <p>Favorite colors: Pink, White, Black</p>
          <p>Favorite style: Casual</p>
        </section>

        <section>
          <h2>My Passarela</h2>
          <p>24 clothing items</p>
          <p>8 saved outfits</p>
          <p>5 friends</p>
        </section>
      </div>

      <button>Edit Profile</button>
      <button>Log Out</button>
    </main>
  );
}