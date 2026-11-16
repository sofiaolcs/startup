import React from 'react';
import './friends.css';

export function Friends() {
  const [search, setSearch] = React.useState('');
  const [selectedFriend, setSelectedFriend] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');

  // Load current user and messages
  React.useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const [userResponse, messagesResponse] =
          await Promise.all([
            fetch('/api/auth/me'),
            fetch('/api/messages'),
          ]);

        if (!userResponse.ok || !messagesResponse.ok) {
          throw new Error('Unable to load messages.');
        }

        const userData = await userResponse.json();
        const messageData = await messagesResponse.json();

        if (!cancelled) {
          setCurrentUser(userData);
          setMessages(messageData);
        }
      } catch (error) {
        console.error('Error loading messages:', error);

        if (!cancelled) {
          setError('Unable to load your messages.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, []);

  // Find users who have exchanged messages
  const friendEmails = [
    ...new Set(
      messages.map((msg) =>
        msg.senderEmail === currentUser?.email
          ? msg.recipientEmail
          : msg.senderEmail
      )
    ),
  ];

  const filteredFriends = friendEmails.filter((email) =>
    email.toLowerCase().includes(search.toLowerCase())
  );

  // Display messages between the current user and friend
  const conversation = messages.filter(
    (msg) =>
      (msg.senderEmail === currentUser?.email &&
        msg.recipientEmail === selectedFriend) ||
      (msg.senderEmail === selectedFriend &&
        msg.recipientEmail === currentUser?.email)
  );

  // Send a message to MongoDB
  async function handleSend(event) {
    event.preventDefault();

    if (!message.trim() || !selectedFriend || sending) {
      return;
    }

    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: selectedFriend,
          text: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send message.');
      }

      setMessages((current) => [...current, data]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
    } finally {
      setSending(false);
    }
  }

  // Start a conversation using an email address
  function handleSearch(event) {
    event.preventDefault();

    const email = search.trim().toLowerCase();

    if (!email) {
      return;
    }

    if (email === currentUser?.email) {
      setError('You cannot message yourself.');
      return;
    }

    setSelectedFriend(email);
    setError('');
  }

  return (
    <main className="friends-page">
      <section>
        <h2>Find Friends</h2>

        <form className="input-button" onSubmit={handleSearch}>
          <input
            type="email"
            placeholder="Enter a friend's email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        <p>Enter the email of a registered Passarela user.</p>
      </section>

      <section>
        <h2>My Conversations</h2>

        {loading ? (
          <p>Loading conversations...</p>
        ) : filteredFriends.length > 0 ? (
          filteredFriends.map((email) => (
            <article key={email}>
              <h3>{email}</h3>

              <button
                type="button"
                onClick={() => {
                  setSelectedFriend(email);
                  setError('');
                }}
              >
                Message
              </button>
            </article>
          ))
        ) : (
          <p>No conversations found.</p>
        )}
      </section>

      <section>
        <h2>
          {selectedFriend
            ? `Chat with ${selectedFriend}`
            : 'Select a conversation'}
        </h2>

        {error && <p role="alert">{error}</p>}

        {selectedFriend ? (
          <>
            <article>
              <h3>Messages</h3>

              {conversation.length > 0 ? (
                conversation.map((msg) => (
                  <p key={msg.id}>
                    <strong>
                      {msg.senderEmail === currentUser?.email
                        ? 'You'
                        : msg.senderEmail}
                      :
                    </strong>{' '}
                    {msg.text}
                  </p>
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
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  disabled={sending || loading}
                />

                <button
                  type="submit"
                  disabled={
                    sending ||
                    loading ||
                    !message.trim()
                  }
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <p>Enter a friend's email to start chatting.</p>
        )}
      </section>
    </main>
  );
}
