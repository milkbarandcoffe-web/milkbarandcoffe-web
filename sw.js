const CACHE_NAME='dzdpwa-shell-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 const url=new URL(request.url);
 if(request.method==='GET' && url.origin===self.location.origin){
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).catch(()=>caches.match('./index.html')));
 }
});
