import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './create-outfit.css';
import { NavLink } from 'react-router-dom';

export function CreateOutfit() {
  return (
        <main>
      <section>
        <div className="buttons">
          <NavLink to="/clothes" className="button">Add clothes</NavLink>
          <NavLink to="/closet" className="button">See outfits</NavLink>
        </div>

        <div className="titles">
          <h1>Create Outfit</h1>
          <h3>0 clothes select</h3>
        </div>

        <div className="clothes">
          <article>
            <div className="checkbox-title">
              <input type="checkbox" name="clothing" />
              <h2>White Cardigan</h2>
            </div>
            <p>Type: Top</p>
            <p>Color: White</p>
            <p>Brand: Example Brand</p>
            <img src="../../images/clothes/top1.jpg" alt="White cardigan" />
          </article>

          <article>
            <div className="checkbox-title">
              <input type="checkbox" name="clothing" />
              <h2>Blue Jeans</h2>
            </div>
            <p>Type: Bottom</p>
            <p>Color: Blue</p>
            <img src="../../images/clothes/pants2.jpg" alt="Blue jeans" />
          </article>
        </div>
      </section>
    </main>
  );
}