import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './closet.css';

export function Closet() {
  return (
    <main>
      <div className="buttons">
        <NavLink to="../create-outfit/create-outfit.html" className="button"
          >Create outfit</NavLink>
        <NavLink to="../clothes/clothes.html" className="button">Add clothes</NavLink>
      </div>

      <section>
        <h1>My Closet</h1>

        <div className="outfits">
          <article className="outfit-card">
            <h2>Casual Day</h2>

            <p>White T-Shirt</p>
            <p>Blue Jeans</p>
            <p>White Sneakers</p>

            <div id="outfitCarousel1" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="../../images/clothes/top1.jpg"
                    className="d-block w-100"
                    alt="White T-Shirt"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="../../images/clothes/skirt.jpg"
                    className="d-block w-100"
                    alt="Blue Jeans"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="../../images/clothes/shoe2.png"
                    className="d-block w-100"
                    alt="Sneakers"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#outfitCarousel1"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#outfitCarousel1"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </article>

          <article className="outfit-card">
            <h2>Work Outfit</h2>

            <p>White Blouse</p>
            <p>Black Pants</p>
            <p>Black Flats</p>

            <div id="outfitCarousel2" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="../../images/clothes/top.png"
                    className="d-block w-100"
                    alt="White T-Shirt"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="../../images/clothes/pants.png"
                    className="d-block w-100"
                    alt="Blue Jeans"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="../../images/clothes/bag.png"
                    className="d-block w-100"
                    alt="Sneakers"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#outfitCarousel2"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#outfitCarousel2"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}