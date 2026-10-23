import React from 'react';
import './closet.css';
import { NavLink } from 'react-router-dom';

const initialOutfits = [
  {
    id: 1,
    name: 'Casual Day',
    items: [
      {
        name: 'White T-Shirt',
        image: '/images/clothes/top1.jpg',
      },
      {
        name: 'Blue Jeans',
        image: '/images/clothes/skirt.jpg',
      },
      {
        name: 'White Sneakers',
        image: '/images/clothes/shoe2.png',
      },
    ],
  },
  {
    id: 2,
    name: 'Work Outfit',
    items: [
      {
        name: 'White Blouse',
        image: '/images/clothes/top.png',
      },
      {
        name: 'Black Pants',
        image: '/images/clothes/pants.png',
      },
      {
        name: 'Black Flats',
        image: '/images/clothes/bag.png',
      },
    ],
  },
];

export function Closet() {
  const [outfits, setOutfits] = React.useState(() => {
    try {
      const savedOutfits = localStorage.getItem('passarelaOutfits');
      return savedOutfits ? JSON.parse(savedOutfits) : initialOutfits;
    } catch {
      return initialOutfits;
    }
  });

  React.useEffect(() => {
    localStorage.setItem('passarelaOutfits', JSON.stringify(outfits));
  }, [outfits]);

  function removeOutfit(outfitId) {
    setOutfits((currentOutfits) =>
      currentOutfits.filter((outfit) => outfit.id !== outfitId)
    );
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
