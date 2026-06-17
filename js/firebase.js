// Configuração do Firebase
// Usando SDK compat para funcionar com os arquivos JS normais do projeto.

const firebaseConfig = {
  apiKey: "AIzaSyCEEEL9s2MvMB1u1amHBI6BAqOjPxsLves",
  authDomain: "bbq-parrila.firebaseapp.com",
  databaseURL: "https://bbq-parilla-default-rtdb.firebaseio.com/",
  projectId: "bbq-parrila",
  storageBucket: "bbq-parrila.firebasestorage.app",
  messagingSenderId: "7867389447",
  appId: "1:7867389447:web:5afaaa9503d49833767ca2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const realtimeDb = firebase.database();

window.firebaseAuth = auth;
window.firebaseRealtimeDb = realtimeDb;
window.firebaseConfig = firebaseConfig;

window.firebaseFns = {
  signInWithEmailAndPassword: (auth, email, password) =>
    auth.signInWithEmailAndPassword(email, password),

  createUserWithEmailAndPassword: (auth, email, password) =>
    auth.createUserWithEmailAndPassword(email, password),

  signOut: auth => auth.signOut()
};

console.log("Firebase Auth + Realtime Database conectado.");