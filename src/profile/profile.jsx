import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  const [description, setDescription] = React.useState(
    'I love casual and feminine outfits.'
  );

  const [editing, setEditing] = React.useState(false);
  const [clothingCount, setClothingCount] = React.useState(0);
  const [outfitCount, setOutfitCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // Load clothing and outfit counts from MongoDB
  React.useEffect(() => {
    if (!user) {
      setClothingCount(0);
      setOutfitCount(0);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProfileData() {
      setLoading(true);
      setError('');

      try {
        const [clothesResponse, outfitsResponse] =
          await Promise.all([
            fetch('/api/clothes'),
            fetch('/api/outfits'),
          ]);

        if (!clothesResponse.ok || !outfitsResponse.ok) {
          throw new Error('Unable to load profile data.');
        }

        const clothes = await clothesResponse.json();
        const outfits = await outfitsResponse.json();

        if (!cancelled) {
          setClothingCount(clothes.length);
          setOutfitCount(outfits.length);
        }
      } catch (error) {
        console.error('Error loading profile:', error);

        if (!cancelled) {
          setError('Unable to load your profile statistics.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfileData();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  async function handleLogout() {
    try {
      await onLogout();
      // Navigation is handled after logout is attempted.
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <main className="profile-page">
      <h1>My Profile</h1>

      <section className="profile-main-info">
        <img src="/images/cher.png" alt="Profile picture" />

        <h2>{user?.name || 'Guest'}</h2>
        <p>{user?.email || 'Not logged in'}</p>

        {editing ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setEditing(false);
            }}
          >
            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              required
            />

            <button type="submit">Save</button>

            <button
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>{description}</p>

            <button
              type="button"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </section>

      <div className="info">
        <section>
          <h2>My Style</h2>
          <p>Favorite colors: Pink, White, Black</p>
          <p>Favorite style: Casual</p>
        </section>

        <section>
          <h2>My Passarela</h2>

          {loading ? (
            <p>Loading statistics...</p>
          ) : error ? (
            <p role="alert">{error}</p>
          ) : (
            <>
              <p>{clothingCount} clothing items</p>
              <p>{outfitCount} saved outfits</p>
            </>
          )}

          <p>5 friends</p>
        </section>
      </div>

      {user && (
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </main>
  );
}