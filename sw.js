const CACHE='dzdpwa-launcher-v5';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method==='GET'&&u.origin===self.location.origin)e.respondWith(caches.match(r).then(c=>c||fetch(r).catch(()=>caches.match('./index.html'))));});
