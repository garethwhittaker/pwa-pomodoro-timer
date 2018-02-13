const hasSWSupport = 'serviceWorker' in navigator;
const hasNotificationSupport = 'Notification' in window;

const registerServiceWorker = () => {
    if (hasSWSupport) {
        const load = () => {
            window.removeEventListener('load', load);
            navigator.serviceWorker.register('./sw.js');
        };

        window.addEventListener('load', load);
    }
};

const requestNotificationPermission = () => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'default') {
        Notification.requestPermission();
    }
};

const showNotification = () => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'granted') {
        navigator.serviceWorker.ready
            .then(registration => registration.showNotification('Pomodoro Timer', {
                body: `It's time to take a break!`,
                icon: './assets/icon_256x256.png',
                tag: 'pomodoroTimer',
                renotify: true,
                requireInteraction: true
            }));
    }
};

export { registerServiceWorker, requestNotificationPermission, showNotification };
