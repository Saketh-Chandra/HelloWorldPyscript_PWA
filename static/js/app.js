if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/HelloWorldPyscript_PWA/serviceWorker.js", {scope: '/HelloWorldPyscript_PWA/'})
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}