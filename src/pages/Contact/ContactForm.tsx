import { FormEvent, useEffect, useState } from 'react';

import classes from './sass/ContactForm.module.scss';
import Notification from '../../ui/notification';
import { IContactsDetails, INotification } from './Interfaces/IContactForm';

const sendContactData = async (constactDetails:IContactsDetails) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(constactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
};

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredMessage, setEnteredMessage] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [requestError, setRequesError] = useState<string | null>(null);

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequesError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [requestStatus]);

  const sendMessageHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error) {
      setRequesError(error.message);
      setRequestStatus('error');
    }
  };

  let notification:INotification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you ?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">
              Your Email
              <input
                type="email"
                id="email"
                name="email"
                required
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
            </label>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">
              Your Name
              <input
                type="text"
                id="name"
                name="name"
                required
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">
            Your Message
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={(e) => setEnteredMessage(e.target.value)}
            />
          </label>
        </div>

        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
