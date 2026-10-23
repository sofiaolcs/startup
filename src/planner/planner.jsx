import React from 'react';
import './planner.css';
import { NavLink } from 'react-router-dom';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function Planner() {
  const [selectedDay, setSelectedDay] = React.useState('Monday');

  const [outfits] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('passarelaOutfits')) || [];
    } catch {
      return [];
    }
  });

  const [plannedOutfits, setPlannedOutfits] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('passarelaPlanner')) || {};
    } catch {
      return {};
    }
  });

  const [chosenOutfit, setChosenOutfit] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('passarelaPlanner', JSON.stringify(plannedOutfits));
  }, [plannedOutfits]);

  React.useEffect(() => {
    setChosenOutfit(plannedOutfits[selectedDay] || '');
  }, [selectedDay, plannedOutfits]);

  const currentOutfit = outfits.find(
    (outfit) => String(outfit.id) === String(plannedOutfits[selectedDay])
  );

  function handleSave(event) {
    event.preventDefault();

    setPlannedOutfits((current) => ({
      ...current,
      [selectedDay]: chosenOutfit,
    }));
  }

  function handleRemove() {
    setPlannedOutfits((current) => {
      const updated = { ...current };
      delete updated[selectedDay];
      return updated;
    });
    setChosenOutfit('');
  }

  return (
    <main className="planner-page">
      <aside>
        <h1>Select a day:</h1>

        {days.map((day) => (
          <button
            key={day}
            type="button"
            className={selectedDay === day ? 'selected-day' : ''}
            aria-pressed={selectedDay === day}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </aside>

      <div className="day">
        <section>
          <h2>{selectedDay}'s Weather</h2>
          <p>
            Weather information will appear here. Live weather is not
            connected yet.
          </p>
        </section>

        <section>
          <h2>Outfit for {selectedDay}</h2>

          <form onSubmit={handleSave}>
            {outfits.length > 0 ? (
              <>
                <label htmlFor="outfit-select">
                  Choose an outfit
                </label>

                <select
                  id="outfit-select"
                  value={chosenOutfit}
                  onChange={(event) => setChosenOutfit(event.target.value)}
                >
                  <option value="">Select an outfit</option>

                  {outfits.map((outfit) => (
                    <option key={outfit.id} value={String(outfit.id)}>
                      {outfit.name}
                    </option>
                  ))}
                </select>

                <button type="submit">Save to {selectedDay}</button>
              </>
            ) : (
              <p>
                You haven't created any outfits yet.{' '}
                <NavLink to="/create-outfit">Create an outfit</NavLink>{' '}
                to start planning your week.
              </p>
            )}
          </form>

          {currentOutfit ? (
            <article className="outfit-card">
              <h3>{currentOutfit.name}</h3>

              {currentOutfit.items.map((item) => (
                <p key={item.id}>
                  {item.name}
                </p>
              ))}

              <NavLink to="/closet" className="button">
                View Closet
              </NavLink>

              <button type="button" onClick={handleRemove}>
                Remove from {selectedDay}
              </button>
            </article>
          ) : (
            <p>No outfit planned for {selectedDay} yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}