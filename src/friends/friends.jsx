import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './friends.css';
import { NavLink } from 'react-router-dom';

export function Friends() {
  return (
      <main>
      <section>
        <h2>Find Friends</h2>
        <div className="input-button">
          <input type="text" placeholder="Search for friends" />
          <button>Search</button>
        </div>
      </section>

      <section>
        <h2>My Friends</h2>

        <article>
          <h3>Natania</h3>
          <p>@natania</p>
          <button>Message</button>
        </article>

        <article>
          <h3>Luisa</h3>
          <p>@luisa</p>
          <button>Message</button>
        </article>
      </section>

      <section>
        <h2>Chat with Maria</h2>

        <article className>
          <h3>Maria shared an outfit</h3>
          <ul>
            <li>Casual Outfit</li>
            <li>White T-Shirt</li>
            <li>Blue Jeans</li>
            <li>Sneakers</li>
          </ul>

          <NavLink to="../closet/closet.html" className="button">View Outfit</NavLink>
        </article>

        <form>
          <div className="input-button">
            <input type="text" placeholder="Type a message..." />
            <button type="submit">Send</button>
          </div>
        </form>
      </section>
    </main>
  );
}