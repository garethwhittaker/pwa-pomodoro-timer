export default () => {
    if ('serviceWorker' in navigator) {
        const load = () => {
            window.removeEventListener('load', load);

            navigator.serviceWorker.register('./service-worker.js')
                .then(() => console.log('Service worker registered.'))
                .catch(error => console.error('Service worker registration failed.', error));
        };

        window.addEventListener('load', load);
        return;
    }

    console.log('Service workers are not supported.');
}
