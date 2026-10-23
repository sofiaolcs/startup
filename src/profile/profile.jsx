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

  React.useEffect(() => {
    const clothes = JSON.parse(
      localStorage.getItem('passarelaClothes') || '[]'
    );
    const outfits = JSON.parse(
      localStorage.getItem('passarelaOutfits') || '[]'
    );

    setClothingCount(clothes.length);
    setOutfitCount(outfits.length);
  }, []);

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  return (
    <main className="profile-page">
      <h1>My Profile</h1>

      <section className="profile-main-info">
        <img src="/images/cher.png" alt="Profile picture" />

        <h2>{user?.name || 'Sofia Silva'}</h2>
        <p>{user?.email || 'sofia@example.com'}</p>

        {editing ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setEditing(false);
            }}
          >
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
          <p>{clothingCount} clothing items</p>
          <p>{outfitCount} saved outfits</p>
          <p>5 friends</p>
        </section>
      </div>

      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </main>
  );
}