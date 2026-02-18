import React from "react";
import "../styles/NotificationPanel.css";

const NotificationPanel = ({ notifications, onClose, onMarkAllRead }) => {
  return (
    <div className="notification-backdrop" onClick={onClose}>
      <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h3>Notifications</h3>
          <button className="mark-read-button" onClick={onMarkAllRead}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Mark all read
          </button>
        </div>
        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? "read" : "unread"}`}
              >
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {notification.timeAgo}
                  </span>
                </div>
                {!notification.read && <div className="unread-indicator"></div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
