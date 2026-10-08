import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './home.css';

export function Login() {
  return (
    <main>
      <section className="hero glossy-effect">
        <img src="../../images/banner.png" alt="banner" />
      </section>
      <section id="content">
        <section classNameName="card-section">
          <h1>Instructions</h1>
          <div className="instructions-cards">
            <div className="card">
              <h2>Add Your Clothes</h2>
              <p>
                Upload photos of your favorite pieces and build your digital
                closet. Keep track of everything you own in one organized place.
              </p>
              <img src="../../images/camera.png" alt="camera" />
            </div>
            <div className="card">
              <h2>Mix & Match</h2>
              <p>
                Experiment with different combinations and discover outfits you
                never thought of before. Your wardrobe, your creativity.
              </p>
              <img src="../../images/phone.png" alt="phone" />
            </div>
            <div className="card">
              <h2>The World Is Your Runway</h2>
              <p>Dress with confidence wherever life takes you.</p>
              <img src="../../images/cher.png" alt="cher" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}