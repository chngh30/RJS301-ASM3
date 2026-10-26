import { useState } from 'react';
import {
  FaFacebookMessenger,
  FaPaperclip,
  FaSmile,
  FaPaperPlane,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa';
import classes from './LiveChat.module.css';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can we help you?',
      sender: 'admin',
    },
  ]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    const text = message.trim();
    if (!text) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        text,
        sender: 'user',
      },
    ]);

    setMessage('');
  };

  return (
    <div className={classes.liveChat}>
      {isOpen && (
        <section
          className={classes.chatWindow}
          aria-label="Customer support chat"
        >
          <header className={classes.chatHeader}>
            <div className={classes.headerText}>
              <h3>Customer Support</h3>
              <p>Let's Chat App</p>
            </div>

            <button
              type="button"
              className={classes.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </header>

          <div className={classes.chatBody}>
            <div className={classes.chatDate}>Let's Chat App</div>

            {messages.map((item) => (
              <div
                key={item.id}
                className={`${classes.messageRow} ${
                  item.sender === 'user'
                    ? classes.userRow
                    : classes.adminRow
                }`}
              >
                {item.sender === 'admin' && (
                  <FaUserCircle className={classes.adminAvatar} />
                )}

                <div
                  className={`${classes.messageBubble} ${
                    item.sender === 'user'
                      ? classes.userBubble
                      : classes.adminBubble
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <form
            className={classes.chatComposer}
            onSubmit={handleSendMessage}
          >
            <FaUserCircle className={classes.composerAvatar} />

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Enter Message!"
              aria-label="Enter message"
            />

            <button
              type="button"
              className={classes.toolButton}
              aria-label="Attach file"
              onClick={() => {}}
            >
              <FaPaperclip />
            </button>

            <button
              type="button"
              className={classes.toolButton}
              aria-label="Emoji"
              onClick={() => setMessage((prev) => prev + '😊')}
            >
              <FaSmile />
            </button>

            <button
              type="submit"
              className={classes.sendButton}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={classes.chatLauncher}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <FaTimes /> : <FaFacebookMessenger />}
      </button>
    </div>
  );
};

export default LiveChat;
