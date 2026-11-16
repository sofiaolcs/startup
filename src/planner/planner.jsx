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
  const [weather, setWeather] = React.useState(null);

  const [outfits, setOutfits] = React.useState([]);
  const [plannedOutfits, setPlannedOutfits] = React.useState({});
  const [chosenOutfit, setChosenOutfit] = React.useState('');

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  // Load weather
  React.useEffect(() => {
    fetch(
      '/api/weather'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load weather.');
        }
        return response.json();
      })
      .then((data) => setWeather(data.current))
      .catch((error) =>
        console.error('Error fetching weather:', error)
      );
  }, []);

  // Load saved outfits and weekly plans from MongoDB
  React.useEffect(() => {
    let cancelled = false;

    async function loadPlanner() {
      try {
        const [outfitsResponse, plansResponse] =
          await Promise.all([
            fetch('/api/outfits'),
            fetch('/api/planned-outfits'),
          ]);

        if (!outfitsResponse.ok || !plansResponse.ok) {
          throw new Error('Unable to load planner data.');
        }

        const savedOutfits = await outfitsResponse.json();
        const savedPlans = await plansResponse.json();

        if (!cancelled) {
          setOutfits(savedOutfits);
          setPlannedOutfits(savedPlans);
        }
      } catch (error) {
        console.error('Error loading planner:', error);

        if (!cancelled) {
          setError('Unable to load your planner.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlanner();

    return () => {
      cancelled = true;
    };
  }, []);

  // Update selected outfit when the day changes
  React.useEffect(() => {
    setChosenOutfit(plannedOutfits[selectedDay] || '');
  }, [selectedDay, plannedOutfits]);

  // Find the outfit assigned to the selected day
  const currentOutfit = outfits.find(
    (outfit) =>
      String(outfit.id) ===
      String(plannedOutfits[selectedDay])
  );

  // Save weekly plans to MongoDB
  async function savePlans(updatedPlans) {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/planned-outfits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plans: updatedPlans,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to save planned outfits.');
      }

      setPlannedOutfits(updatedPlans);
      return true;
    } catch (error) {
      console.error('Error saving planner:', error);
      setError(
        'Unable to save your changes. Please try again.'
      );
      return false;
    } finally {
      setSaving(false);
    }
  }

  // Assign an outfit to a day
  async function handleSave(event) {
    event.preventDefault();

    if (saving || loading || !chosenOutfit) {
      return;
    }

    const updatedPlans = {
      ...plannedOutfits,
      [selectedDay]: chosenOutfit,
    };

    await savePlans(updatedPlans);
  }

  // Remove an outfit from a day
  async function handleRemove() {
    if (saving || loading) {
      return;
    }

    const updatedPlans = {
      ...plannedOutfits,
    };

    delete updatedPlans[selectedDay];

    const success = await savePlans(updatedPlans);

    if (success) {
      setChosenOutfit('');
    }
  }

  return (
    <main className="planner-page">
      {loading && <p>Loading your planner...</p>}

      {error && <p role="alert">{error}</p>}

      {saving && <p>Saving your planner...</p>}

      <aside>
        <h1>Select a day:</h1>

        {days.map((day) => (
          <button
            key={day}
            type="button"
            className={
              selectedDay === day ? 'selected-day' : ''
            }
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

          {weather ? (
            <>
              <p>
                Temperature: {weather.temperature_2m}°C
              </p>
              <p>
                Humidity: {weather.relative_humidity_2m}%
              </p>
              <p>
                Weather code: {weather.weather_code}
              </p>
            </>
          ) : (
            <p>Loading weather...</p>
          )}
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
                  disabled={saving || loading}
                  onChange={(event) =>
                    setChosenOutfit(event.target.value)
                  }
                >
                  <option value="">
                    Select an outfit
                  </option>

                  {outfits.map((outfit) => (
                    <option
                      key={outfit.id}
                      value={String(outfit.id)}
                    >
                      {outfit.name}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={
                    saving || loading || !chosenOutfit
                  }
                >
                  {saving
                    ? 'Saving...'
                    : `Save to ${selectedDay}`}
                </button>
              </>
            ) : (
              <p>
                {loading
                  ? 'Loading outfits...'
                  : (
                    <>
                      You haven't created any outfits yet.{' '}
                      <NavLink to="/create-outfit">
                        Create an outfit
                      </NavLink>{' '}
                      to start planning your week.
                    </>
                  )}
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

              <NavLink
                to="/closet"
                className="button"
              >
                View Closet
              </NavLink>

              <button
                type="button"
                onClick={handleRemove}
                disabled={saving || loading}
              >
                Remove from {selectedDay}
              </button>
            </article>
          ) : (
            <p>
              No outfit planned for {selectedDay} yet.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}