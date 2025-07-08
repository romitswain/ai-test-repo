/**
 * Popup Notification System
 */

// Get the notification container element
const notificationContainer = document.getElementById('notification-container');
const notificationTitle = document.getElementById('notification-title');
const notificationMessage = document.getElementById('notification-message');
const notificationIconSymbol = document.getElementById('notification-icon-symbol');

// Variable to store the timeout ID
let notificationTimeout;

/**
 * Shows a notification with the specified type, title, and message
 * @param {string}