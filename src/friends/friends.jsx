import React from 'react';
import './friends.css';
import { NavLink } from 'react-router-dom';

const friendsList = [
  { id: 1, name: 'Natania', username: '@natania' },
  { id: 2, name: 'Luisa', username: '@luisa' },
  { id: 3, name: 'Maria', username: '@maria' },
];

export function Friends() {
  const [search, setSearch] = React.useState('');
  const [selectedFriend, setSelectedFriend] = React.useState('Maria');
  const [message, setMessage] = React.useState('');

  const [messages, setMessages] = React.useState({
    Maria: ['Maria shared an outfit with you.'],
    Natania: [],
    Luisa: [],
  });

  const filteredFriends = friendsList.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSend(event) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setMessages((currentMessages) => ({
      ...currentMessages,
      [selectedFriend]: [
        ...currentMessages[selectedFriend],
        message.trim(),
      ],
    }));

    setMessage('');
  }

  return (
    <main className="friends-page">
      <section>
        <h2>Find Friends</h2>

        <div className="input-button">
          <input
            type="text"
            placeholder="Search for friends"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="button">Search</button>
        </div>
      </section>

      <section>
        <h2>My Friends</h2>

        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <article key={friend.id}>
              <h3>{friend.name}</h3>
              <p>{friend.username}</p>

              <button
                type="button"
                onClick={() => setSelectedFriend(friend.name)}
              >
                Message
              </button>
            </article>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </section>

      <section>
        <h2>Chat with {selectedFriend}</h2>

        {selectedFriend === 'Maria' && (
          <article>
            <h3>Maria shared an outfit</h3>

            <ul>
              <li>Casual Outfit</li>
              <li>White T-Shirt</li>
              <li>Blue Jeans</li>
              <li>Sneakers</li>
            </ul>

            <NavLink to="/closet" className="button">
              View Outfit
            </NavLink>
          </article>
        )}

        <article>
          <h3>Messages</h3>

          {messages[selectedFriend].length > 0 ? (
            messages[selectedFriend].map((text, index) => (
              <p key={index}>{text}</p>
            ))
          ) : (
            <p>No messages yet. Say hello!</p>
          )}
        </article>

        <form onSubmit={handleSend}>
          <div className="input-button">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit">Send</button>
          </div>
        </form>
      </section>
    </main>
  );
}