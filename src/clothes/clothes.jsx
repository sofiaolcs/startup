import React from 'react';
import './clothes.css';
import { NavLink } from 'react-router-dom';

const initialClothes = [
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

export function Clothes() {
  const [clothes, setClothes] = React.useState(() => {
    try {
      const savedClothes = localStorage.getItem('passarelaClothes');
      return savedClothes ? JSON.parse(savedClothes) : initialClothes;
    } catch {
      return initialClothes;
    }
  });

  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [color, setColor] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('passarelaClothes', JSON.stringify(clothes));
  }, [clothes]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!imageFile) {
      setError('Please choose an image.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const newClothing = {
        id: Date.now(),
        name: name.trim(),
        type,
        color: color.trim(),
        brand: brand.trim(),
        image: reader.result,
      };

      setClothes((currentClothes) => [
        ...currentClothes,
        newClothing,
      ]);

      setName('');
      setType('');
      setColor('');
      setBrand('');
      setImageFile(null);
      event.target.reset();
      setError('');
    };

    reader.onerror = () => {
      setError('Could not read the image. Please try another one.');
    };

    reader.readAsDataURL(imageFile);
  }

  function handleRemove(id) {
    setClothes((currentClothes) =>
      currentClothes.filter((item) => item.id !== id)
    );
  }

  return (
    <main>
      <section>
        <div className="buttons">
          <NavLink to="/create-outfit" className="button">
            Create outfit
          </NavLink>

          <NavLink to="/closet" className="button">
            See outfits
          </NavLink>
        </div>

        <h1>Add Clothes</h1>

        <form className="clothes-form" onSubmit={handleSubmit}>
          <label htmlFor="clothing-name">Name</label>
          <input
            type="text"
            id="clothing-name"
            placeholder="White T-Shirt"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="clothing-type">Type</label>
          <select
            id="clothing-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            required
          >
            <option value="">Select a type</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="dress">Dress</option>
            <option value="shoes">Shoes</option>
            <option value="outerwear">Outerwear</option>
            <option value="accessory">Accessory</option>
          </select>

          <label htmlFor="clothing-color">Color</label>
          <input
            type="text"
            id="clothing-color"
            placeholder="White"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            required
          />

          <label htmlFor="clothing-brand">Brand</label>
          <input
            type="text"
            id="clothing-brand"
            placeholder="Example Brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />

          <label htmlFor="clothing-image">Image</label>
          <input
            type="file"
            id="clothing-image"
            accept="image/*"
            onChange={(event) =>
              setImageFile(event.target.files[0] || null)
            }
            required
          />

          {error && <p role="alert">{error}</p>}

          <button type="submit">Add Clothing</button>
        </form>

        <h1>My Clothes</h1>

        <div className="clothes">
          {clothes.length === 0 ? (
            <p>Your closet is empty. Add your first clothing item!</p>
          ) : (
            clothes.map((item) => (
              <article key={item.id}>
                <h2>{item.name}</h2>
                <p>
                  Type:{' '}
                  {item.type.charAt(0).toUpperCase() +
                    item.type.slice(1)}
                </p>
                <p>Color: {item.color}</p>

                {item.brand && <p>Brand: {item.brand}</p>}

                <img src={item.image} alt={item.name} />

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
