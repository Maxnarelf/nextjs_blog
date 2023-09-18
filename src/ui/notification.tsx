import ReactDOM from 'react-dom';
import classes from './notification.module.scss';
import { INotification } from '../pages/Contact/Interfaces/IContactForm';

function Notification({ status, title, message }: INotification) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications'),
  );
}

export default Notification;
