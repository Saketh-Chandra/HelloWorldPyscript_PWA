const staticfilesPWA = "StaticFiles_v1.0-alpha"
const assets = [
    "/",
    "/static/js/app.js",
    "/static/images/icons/hello_192.png",
    "/static/images/icons/hello_64.png",
    "/static/images/icons/hello_512.png",

    //bootstrap
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
    "https://getbootstrap.com/docs/5.1/dist/js/bootstrap.bundle.min.js",

    //pyodide
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/packages.json",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide_py.tar",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.asm.js",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.asm.data",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.asm.wasm",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/micropip-0.1-py3-none-any.whl",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyparsing-3.0.7-py3-none-any.whl",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/packaging-21.3-py3-none-any.whl",
    "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/distutils.tar",

    //pyscript
    "/static/css/pyscript.css",
    "/static/js/pyscript.js",

]


self.addEventListener("install", installEvent => {
    console.log("service worker installed")
    installEvent.waitUntil(
        caches.open(staticfilesPWA).then(cache => {
            cache.addAll(assets).then(r => {
                console.log("Cache assets downloaded");
            }).catch(err => console.log("Error caching item", err))
            console.log(`Cache ${staticfilesPWA} opened.`);
        }).catch(err => console.log("Error opening cache", err))
    )
})

// activate event
self.addEventListener('activate', evt => {
    console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticfilesPWA)
                .map(key => caches.delete(key))
            );
        })
    );
});


self.addEventListener("fetch", fetchEvent => {
    console.log("fetched", fetchEvent.request.url)
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        }).catch(err => console.log("Cache fetch error: ", err))
    )
})