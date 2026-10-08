import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './clothes.css';

export function Closet() {
  return (
        <main>
      <section>
        <div className="buttons">
          <NavLink to="../create-outfit/create-outfit.html" className="button"
            >Create outfit</NavLink>
          <NavLink to="../closet/closet.html" className="button">See outfits</NavLink>
        </div>

        <form className="clothes-form">
          <label for="clothing-name">Name</label>
          <input
            type="text"
            id="clothing-name"
            name="clothing-name"
            placeholder="White T-Shirt"
            required
          />

          <label for="clothing-type">Type</label>
          <select id="clothing-type" name="clothing-type" required>
            <option value="">Select a type</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="dress">Dress</option>
            <option value="shoes">Shoes</option>
            <option value="outerwear">Outerwear</option>
            <option value="accessory">Accessory</option>
          </select>

          <label for="clothing-color">Color</label>
          <input
            type="text"
            id="clothing-color"
            name="clothing-color"
            placeholder="White"
            required
          />

          <label for="clothing-brand">Brand</label>
          <input
            type="text"
            id="clothing-brand"
            name="clothing-brand"
            placeholder="Example Brand"
          />

          <label for="clothing-image">Image</label>
          <input
            type="file"
            id="clothing-image"
            name="clothing-image"
            accept="image/*"
            required
          />

          <button type="submit">Add Clothing</button>
        </form>

        <h1>My Clothes</h1>

        <div className="clothes">
          <article>
            <h2>White Cardigan</h2>
            <p>Type: Top</p>
            <p>Color: White</p>
            <p>Brand: Example Brand</p>
            <img src="../../images/clothes/top1.jpg" alt="White cardigan" />
          </article>

          <article>
            <h2>Blue Jeans</h2>
            <p>Type: Bottom</p>
            <p>Color: Blue</p>
            <img src="../../images/clothes/pants2.jpg" alt="Blue jeans" />
          </article>
        </div>
      </section>
    </main>
  );
}