import React from 'react';
import './home.css';

export function Home() {
  const [instructions, setInstructions] = React.useState([]);

  React.useEffect(() => {
    setInstructions([
      {
        title: 'Add Your Clothes',
        description:
          'Upload photos of your favorite pieces and build your digital closet. Keep track of everything you own in one organized place.',
        image: '/images/camera.png',
        alt: 'camera',
      },
      {
        title: 'Mix & Match',
        description:
          'Experiment with different combinations and discover outfits you never thought of before. Your wardrobe, your creativity.',
        image: '/images/phone.png',
        alt: 'phone',
      },
      {
        title: 'The World Is Your Runway',
        description:
          'Dress with confidence wherever life takes you.',
        image: '/images/cher.png',
        alt: 'Cher',
      },
    ]);
  }, []);

  return (
    <main>
      <section className="hero">
        <img src="/images/banner.png" alt="Passarela banner" />
      </section>

      <section id="content">
        <section className="card-section">
          <h1>Instructions</h1>

          <div className="instructions-cards">
            {instructions.map((instruction) => (
              <div className="card" key={instruction.title}>
                <h2>{instruction.title}</h2>
                <p>{instruction.description}</p>
                <img
                  src={instruction.image}
                  alt={instruction.alt}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}