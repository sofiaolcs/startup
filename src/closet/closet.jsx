import React from 'react';
import './closet.css';
import { NavLink } from 'react-router-dom';

export function Closet() {
const [outfits, setOutfits] = React.useState([]);
const [error, setError] = React.useState('');

React.useEffect(() => {
  async function loadOutfits() {
    try {
      const response = await fetch('/api/outfits');

      if (!response.ok) {
        throw new Error('Could not load outfits.');
      }

      const data = await response.json();
      setOutfits(data);
    } catch {
      setError('Could not load your outfits. Please try again.');
    }
  }

  loadOutfits();
}, []);

async function removeOutfit(outfitId) {
  try {
    const response = await fetch(`/api/outfits/${outfitId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setError('Could not remove outfit.');
      return;
    }

    setOutfits((currentOutfits) =>
      currentOutfits.filter((outfit) => outfit.id !== outfitId)
    );

    setError('');
  } catch {
    setError('Could not connect to the server.');
  }
}

  return (
    <main>
      <div className="buttons">
        <NavLink to="/create-outfit" className="button">
          Create outfit
        </NavLink>

        <NavLink to="/clothes" className="button">
          Add clothes
        </NavLink>
      </div>

      <section>
        <h1>My Closet</h1>

        <div className="outfits">
          {outfits.length === 0 ? (
            <p>
              Your closet is empty. Create an outfit to get started!
            </p>
          ) : (
            outfits.map((outfit) => {
              const carouselId = `outfitCarousel${outfit.id}`;

              return (
                <article className="outfit-card" key={outfit.id}>
                  <h2>{outfit.name}</h2>

                  {outfit.items.map((item) => (
                    <p key={item.name}>{item.name}</p>
                  ))}

                  <div id={carouselId} className="carousel slide">
                    <div className="carousel-inner">
                      {outfit.items.map((item, index) => (
                        <div
                          className={`carousel-item ${
                            index === 0 ? 'active' : ''
                          }`}
                          key={item.name}
                        >
                          <img
                            src={item.image}
                            className="d-block w-100"
                            alt={item.name}
                          />
                        </div>
                      ))}
                    </div>

                    {outfit.items.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target={`#${carouselId}`}
                          data-bs-slide="prev"
                          aria-label="Previous item"
                        >
                          <span className="carousel-control-prev-icon" />
                        </button>

                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target={`#${carouselId}`}
                          data-bs-slide="next"
                          aria-label="Next item"
                        >
                          <span className="carousel-control-next-icon" />
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm mt-3"
                    onClick={() => removeOutfit(outfit.id)}
                  >
                    Remove outfit
                  </button>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
