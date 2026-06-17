// Login, cadastro e logout de usuários

async function handleAuth(event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value.trim() || "Cliente";
  const email = document.getElementById("emailInput").value.trim().toLowerCase();
  const password = document.getElementById("passwordInput").value.trim();
  const err = document.getElementById("authError");

  err.style.display = "none";

  if (!email || !password) {
    err.style.display = "block";
    err.textContent = "Preencha e-mail e senha.";
    return;
  }

  const auth = window.firebaseAuth;
  const db = window.firebaseDb;
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    doc,
    setDoc
  } = window.firebaseFns;

  const staffUsers = {
    "cozinha@gmail.com": { profile: "cozinha", view: "kitchen", name: "Cozinha" },
    "gerente@gmail.com": { profile: "gerente", view: "dashboard", name: "Gerente" }
  };

  try {
    let userCredential;

    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (loginError) {
      if (loginError.code === "auth/user-not-found" || loginError.code === "auth/invalid-credential") {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        throw loginError;
      }
    }

    const firebaseUser = userCredential.user;
    const staff = staffUsers[email];

    const userData = {
      uid: firebaseUser.uid,
      name: staff ? staff.name : name,
      email,
      profile: staff ? staff.profile : "cliente",
      updatedAt: new Date().toISOString()
    };

    state.user = userData;
    save("bbq_user", state.user);
    state.cartOpen = false;

    if (userData.profile === "cozinha") {
      state.view = "kitchen";
      render();
    } else if (userData.profile === "gerente") {
      state.view = "dashboard";
      render();
    } else {
      setView("home");
    }

    window.scrollTo(0, 0);

    // Firestore em segundo plano, sem travar o login
    if (window.firebaseRealtimeDb) {
  window.firebaseRealtimeDb
    .ref("usuarios/" + firebaseUser.uid)
    .set(userData)
    .then(() => console.log("Usuário salvo no Realtime Database."))
    .catch(error => console.warn("Realtime falhou, mas login continuou:", error));
    } 

  } catch (error) {
    console.error("ERRO NO LOGIN FIREBASE:", error);

    err.style.display = "block";

    if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
      err.textContent = "E-mail ou senha incorretos.";
    } else if (error.code === "auth/email-already-in-use") {
      err.textContent = "Esse e-mail já está cadastrado.";
    } else if (error.code === "auth/weak-password") {
      err.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    } else if (error.code === "auth/invalid-email") {
      err.textContent = "E-mail inválido.";
    } else {
      err.textContent = "Erro ao entrar. Tente novamente.";
    }
  }
}
async function logout() {
  const auth = window.firebaseAuth;
  const { signOut } = window.firebaseFns || {};

  try {
    if (auth && signOut) {
      await signOut(auth);
    }
  } catch (error) {
    console.error("Erro ao sair do Firebase:", error);
  }

  state.user = null;
  state.cart = [];

  save("bbq_user", null);
  save("bbq_cart", []);

  setView("home");
}

async function saveProfile(event) {
  event.preventDefault();

  const profile = {
    name: document.getElementById("profileName").value.trim(),
    phone: document.getElementById("profilePhone").value.trim(),
    address: document.getElementById("profileAddress").value.trim()
  };

  state.profileData = profile;

  save("bbq_profile_data", profile);

  if (window.firebaseRealtimeDb && state.user?.uid) {
    await window.firebaseRealtimeDb
      .ref(`usuarios/${state.user.uid}/perfil`)
      .set(profile);
  }

  showToast("Perfil salvo com sucesso!");
}

window.handleAuth = handleAuth;
window.logout = logout;
window.saveProfile = saveProfile;