import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './planner.css';
import { NavLink } from 'react-router-dom';

export function Planner() {
  return (
    <main>
      <aside>
        <h1>Select a day:</h1>
        <button>Monday</button>
        <button>Tuesday</button>
        <button>Wednesday</button>
        <button>Thursday</button>
        <button>Friday</button>
        <button>Saturday</button>
        <button>Sunday</button>
      </aside>
      <div className="day">
        <section>
          <h2>Monday's Weather</h2>

          <p id="weather-display">Weather information will appear here.</p>

          <p>72°F — Sunny</p>
        </section>
        <section>
          <h2>Outfit for Monday</h2>
          <article className="outfit-card">
            <h3>Work Outfit</h3>

            <p>White Blouse</p>
            <p>Black Pants</p>
            <p>Black Flats</p>

            <NavLink to="../closet/closet.html" className="button">View Outfit</NavLink>
          </article>
        </section>
      </div>
    </main>
  );
}