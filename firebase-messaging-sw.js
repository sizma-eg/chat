importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC3gozRr19Dq9Gsg1GLHyEgjztOd9GE03A",
  authDomain: "admin-d6942.firebaseapp.com",
  projectId: "admin-d6942",
  storageBucket: "admin-d6942.firebasestorage.app",
  messagingSenderId: "460674472375",
  appId: "1:460674472375:web:fd97ff4e9dfc16afcff032"
});

const messaging = firebase.messaging();

// رسائل الـ push وقت ما الموقع مقفول (بتيجي من Cloud Function)
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || 'chat+', {
    body: d.body || '',
    tag: d.chatId || 'chat',
    icon: 'icon.svg',
    badge: 'icon.svg',
    lang: 'ar',
    dir: 'rtl',
    data: { chatId: d.chatId }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});
