import React from 'react';
import './create-outfit.css';
import { NavLink, useNavigate } from 'react-router-dom';

const sampleClothes = [
  {
    id: 1,
    name: 'White Cardigan',
    type: 'top',
    color: 'White',
    brand: 'Example Brand',
    image: '/images/clothes/top1.jpg',
  },
  {
    id: 2,
    name: 'Blue Jeans',
    type: 'bottom',
    color: 'Blue',
    brand: '',
    image: '/images/clothes/pants2.jpg',
  },
];

export function CreateOutfit() {
  const navigate = useNavigate();

  const [clothes] = React.useState(() => {
    try {
      const savedClothes = localStorage.getItem('passarelaClothes');
      return savedClothes ? JSON.parse(savedClothes) : sampleClothes;
    } catch {
      return sampleClothes;
    }
  });

  const [selectedIds, setSelectedIds] = React.useState([]);
  const [outfitName, setOutfitName] = React.useState('');
  const [error, setError] = React.useState('');

  function handleSelection(id) {
    setSelectedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((selectedId) => selectedId !== id)
        : [...currentIds, id]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!outfitName.trim()) {
      setError('Please enter a name for your outfit.');
      return;
    }

    if (selectedIds.length === 0) {
      setError('Please select at least one clothing item.');
      return;
    }

    const selectedClothes = clothes.filter((item) =>
      selectedIds.includes(item.id)
    );

    const newOutfit = {
      id: Date.now(),
      name: outfitName.trim(),
      items: selectedClothes,
    };

    try {
      const savedOutfits = localStorage.getItem('passarelaOutfits');
      const outfits = savedOutfits ? JSON.parse(savedOutfits) : [];

      localStorage.setItem(
        'passarelaOutfits',
        JSON.stringify([...outfits, newOutfit])
      );

      setError('');
      navigate('/closet');
    } catch {
      setError('Could not save your outfit. Please try again.');
    }
  }

  return (
    <main>
      <section>
        <div className="buttons">
          <NavLink to="/clothes" className="button">
            Add clothes
          </NavLink>

          <NavLink to="/closet" className="button">
            See outfits
          </NavLink>
        </div>

        <div className="titles">
          <h1>Create Outfit</h1>
          <h3>{selectedIds.length} clothes selected</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="outfit-name">Outfit name</label>
          <input
            id="outfit-name"
            type="text"
            placeholder="Casual Day"
            value={outfitName}
            onChange={(event) => setOutfitName(event.target.value)}
            required
          />

          <div className="clothes">
            {clothes.length === 0 ? (
              <p>
                You have no clothes yet. Add some items before creating
                an outfit.
              </p>
            ) : (
              clothes.map((item) => (
                <article key={item.id}>
                  <div className="checkbox-title">
                    <input
                      type="checkbox"
                      id={`clothing-${item.id}`}
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelection(item.id)}
                    />

                    <label htmlFor={`clothing-${item.id}`}>
                      <h2>{item.name}</h2>
                    </label>
                  </div>

                  <p>
                    Type:{' '}
                    {item.type.charAt(0).toUpperCase() +
                      item.type.slice(1)}
                  </p>
                  <p>Color: {item.color}</p>

                  {item.brand && <p>Brand: {item.brand}</p>}

                  <img src={item.image} alt={item.name} />
                </article>
              ))
            )}
          </div>

          {error && <p role="alert">{error}</p>}

          <button type="submit">Save Outfit</button>
        </form>
      </section>
    </main>
  );
}
