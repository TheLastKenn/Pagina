// ANIMACION REGISTRO Y INICIO SESION
function showSuccessMessage(text) {
  let msg = document.createElement('div');
  msg.className = 'success-message';
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => {
    msg.style.opacity = '0';
    setTimeout(() => msg.remove(), 800);
  }, 1800);
}

// =====================
//        GLOBAL
// =====================

// Los mismos SVGs que usas en PERFIL2 (ajusta el tamaño a width="32" height="32")
const animalSVGs = [
  // Búho
  `<svg viewBox="0 0 64 64" width="32" height="32"><circle cx="32" cy="32" r="30" fill="#ffecb3"/><ellipse cx="22" cy="32" rx="8" ry="12" fill="#795548"/><ellipse cx="42" cy="32" rx="8" ry="12" fill="#795548"/><ellipse cx="22" cy="32" rx="4" ry="6" fill="#fff"/><ellipse cx="42" cy="32" rx="4" ry="6" fill="#fff"/><circle cx="22" cy="34" r="2" fill="#222"/><circle cx="42" cy="34" r="2" fill="#222"/><ellipse cx="32" cy="48" rx="10" ry="6" fill="#ff9800"/><ellipse cx="32" cy="48" rx="6" ry="3" fill="#fff"/><polygon points="32,20 28,28 36,28" fill="#ff9800"/></svg>`,
  // Gato
  `<svg viewBox="0 0 64 64" width="32" height="32"><circle cx="32" cy="36" r="22" fill="#ffe0b2"/><polygon points="12,24 20,8 24,28" fill="#ffe0b2"/><polygon points="52,24 44,8 40,28" fill="#ffe0b2"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#ffb300"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><rect x="29" y="46" width="6" height="2" rx="1" fill="#222"/></svg>`,
  // Perro
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#ffe0b2"/><ellipse cx="16" cy="32" rx="8" ry="12" fill="#a1887f"/><ellipse cx="48" cy="32" rx="8" ry="12" fill="#a1887f"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#ff7043"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Zorro
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#ff9800"/><polygon points="12,24 24,8 28,28" fill="#ff9800"/><polygon points="52,24 40,8 36,28" fill="#ff9800"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#fff3e0"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // León
  `<svg viewBox="0 0 64 64" width="32" height="32"><circle cx="32" cy="36" r="22" fill="#ffb300"/><ellipse cx="32" cy="36" rx="18" ry="18" fill="#ffecb3"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#ffb300"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Tigre
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#ff9800"/><ellipse cx="32" cy="38" rx="16" ry="14" fill="#ffe0b2"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#ff9800"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><rect x="28" y="30" width="2" height="8" rx="1" fill="#222"/><rect x="34" y="30" width="2" height="8" rx="1" fill="#222"/><rect x="31" y="28" width="2" height="6" rx="1" fill="#222"/></svg>`,
  // Panda
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#fff"/><ellipse cx="16" cy="28" rx="8" ry="10" fill="#222"/><ellipse cx="48" cy="28" rx="8" ry="10" fill="#222"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#bdbdbd"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Mono
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#a1887f"/><ellipse cx="32" cy="44" rx="14" ry="10" fill="#ffe0b2"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#a1887f"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Elefante
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#b0bec5"/><ellipse cx="16" cy="38" rx="6" ry="10" fill="#b0bec5"/><ellipse cx="48" cy="38" rx="6" ry="10" fill="#b0bec5"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><rect x="30" y="48" width="4" height="10" rx="2" fill="#90a4ae"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#b0bec5"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/></svg>`,
  // Oso
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#8d6e63"/><ellipse cx="16" cy="28" rx="6" ry="8" fill="#8d6e63"/><ellipse cx="48" cy="28" rx="6" ry="8" fill="#8d6e63"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#bcaaa4"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Conejo
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#fff"/><rect x="18" y="8" width="8" height="24" rx="4" fill="#fff"/><rect x="38" y="8" width="8" height="24" rx="4" fill="#fff"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#f8bbd0"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Lobo
  `<svg viewBox="0 0 64 64" width="32" height="32"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#b0bec5"/><polygon points="12,24 20,8 24,28" fill="#b0bec5"/><polygon points="52,24 44,8 40,28" fill="#b0bec5"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#cfd8dc"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`
];


// Función para actualizar el ícono del botón de perfil
function updateProfileIconBtn() {
    const idx = localStorage.getItem('wikilabs_emoji_svg');
    const span = document.getElementById('profileIconSpan');
    if (span) {
        if (idx !== null && animalSVGs[idx]) {
            span.innerHTML = animalSVGs[idx];
        } else {
            span.textContent = "👤";
        }
    }
}

// Función para renderizar la pantalla de materias con el diseño dinámico
function renderCoursesPage() {
  const coursesPage = document.getElementById('coursesPage');
  if (coursesPage) {
    coursesPage.innerHTML = `
    <header class="courses-header">
      <div style="flex:1"></div>
      <div class="courses-actions">
        <button id="perfilBtn" class="action-btn">PERFIL</button>
        <button id="estudiaBtn" class="action-btn">ESTUDIA</button>
        <button id="profileIconBtn" class="action-btn icon-btn" title="Perfil">
          <span id="profileIconSpan" style="font-size:1.3em; display:flex; align-items:center; justify-content:center; transition: transform 0.3s;"></span>
        </button>
      </div>
    </header>
    <div style="max-width: 1200px; margin: 60px auto; background: linear-gradient(120deg, #10131a 80%, #2a223a 100%); border-radius: 32px; box-shadow: 0 8px 64px #000a; padding: 60px 32px;">
      <h1 style="font-size: 3rem; font-weight: bold; text-align: center; margin-bottom: 48px; color: #fff; letter-spacing: 2px; text-shadow: 0 2px 12px #000;">Nuestros Cursos Destacados</h1>
      <div style="display: flex; gap: 40px; justify-content: center; flex-wrap: wrap;">
        <!-- Matemáticas -->
        <div style="background: #e6fbff; border-radius: 20px; box-shadow: 0 4px 32px #00d9ff22; padding: 38px 32px; width: 340px; text-align: left; position: relative;">
          <div style="background: #00d9ff; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #fff; position: absolute; top: -28px; left: 24px; box-shadow: 0 2px 12px #00d9ff55;">∑</div>
          <h2 style="color: #222; font-size: 1.7rem; margin: 36px 0 12px 0;">Matemáticas</h2>
          <p style="color: #333; margin-bottom: 12px;">Explora el fascinante mundo de los números, álgebra, geometría y cálculo.</p>
          <ul style="color: #333; margin: 12px 0 18px 18px;">
            <li>Clases interactivas y ejercicios prácticos</li>
            <li>Material descargable y videos explicativos</li>
            <li>Soporte personalizado de tutores</li>
          </ul>
          <button id="btnMath" class="animated-btn">Ponte a prueba</button>
        </div>
        <!-- Ciencias Naturales -->
        <div style="background: #eaffea; border-radius: 20px; box-shadow: 0 4px 32px #00ffb022; padding: 38px 32px; width: 340px; text-align: left; position: relative;">
          <div style="background: #00ffb0; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #fff; position: absolute; top: -28px; left: 24px; box-shadow: 0 2px 12px #00ffb055;">🔬</div>
          <h2 style="color: #222; font-size: 1.7rem; margin: 36px 0 12px 0;">Ciencias Naturales</h2>
          <p style="color: #333; margin-bottom: 12px;">Descubre los secretos de la biología, física y química con experimentos y recursos visuales.</p>
          <ul style="color: #333; margin: 12px 0 18px 18px;">
            <li>Laboratorios virtuales y simulaciones</li>
            <li>Guías de estudio y resúmenes</li>
            <li>Foros de discusión y asesoría en línea</li>
          </ul>
          <button id="btnCiencias" class="animated-btn" style="margin-top: 10px;">Ponte a prueba</button>
        </div>
        <!-- Historia -->
        <div style="background: #fffbe6; border-radius: 20px; box-shadow: 0 4px 32px #ffd90022; padding: 38px 32px; width: 340px; text-align: left; position: relative;">
          <div style="background: #ffd900; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #fff; position: absolute; top: -28px; left: 24px; box-shadow: 0 2px 12px #ffd90055;">🏛️</div>
          <h2 style="color: #222; font-size: 1.7rem; margin: 36px 0 12px 0;">Historia</h2>
          <p style="color: #333; margin-bottom: 12px;">Viaja a través del tiempo y comprende los eventos que han marcado la humanidad.</p>
          <ul style="color: #333; margin: 12px 0 18px 18px;">
            <li>Líneas de tiempo interactivas</li>
            <li>Documentales y recursos multimedia</li>
            <li>Debates y análisis de fuentes históricas</li>
          </ul>
          <button id="btnHistoria" class="animated-btn" style="margin-top: 10px;">Ponte a prueba</button>
        </div>
      </div>
    </div>
    `;
    // Eventos de los botones
    const btnCiencias = document.getElementById('btnCiencias');
    if (btnCiencias) {
      btnCiencias.addEventListener('click', function() {
        window.location.href = 'PREGUNTAS/CIENCIAP.html';
      });
    }
    const btnHistoria = document.getElementById('btnHistoria');
    if (btnHistoria) {
      btnHistoria.addEventListener('click', function() {
        window.location.href = 'PREGUNTAS/HISTORYP.html';
      });
    }
    const btnMath = document.getElementById('btnMath');
    if (btnMath) {
      btnMath.addEventListener('click', function() {
        window.location.href = 'PREGUNTAS/MATHP.html';
      });
    }
    // Evento para el botón PERFIL
    const perfilBtn = document.getElementById('perfilBtn');
    if (perfilBtn) {
      perfilBtn.addEventListener('click', function() {
        window.location.href = 'PERFIL Y DATOS/PERFIL2.html';
      });
    }
    // Evento para el botón ESTUDIA
    const estudiaBtn = document.getElementById('estudiaBtn');
    if (estudiaBtn) {
      estudiaBtn.addEventListener('click', function() {
        window.open('https://wikilabs.vercel.app/', '_blank');
      });
    }
    // --- ICONO ANIMAL EN BOTÓN PERFIL ---
    updateProfileIconBtn();
    const btn = document.getElementById('profileIconBtn');
    const span = document.getElementById('profileIconSpan');
    if (btn && span) {
      btn.onclick = function() {
        span.style.transform = 'scale(1.25) rotate(-10deg)';
        setTimeout(() => {
          span.style.transform = 'scale(1) rotate(0deg)';
        }, 220);
      };
    }
  }
}

// =====================
//        INICIO
// =====================
document.addEventListener('DOMContentLoaded', function() {
  // Mostrar pantalla de materias con diseño dinámico si la URL tiene #coursesPage
  if (window.location.hash === "#coursesPage") {
    const landingPage = document.getElementById('landingPage');
    const loginPage = document.getElementById('loginPage');
    const registerPage = document.getElementById('registerPage');
    const coursesPage = document.getElementById('coursesPage');
    if (landingPage) landingPage.style.display = 'none';
    if (loginPage) loginPage.style.display = 'none';
    if (registerPage) registerPage.style.display = 'none';
    if (coursesPage) {
      coursesPage.style.display = 'block';
      renderCoursesPage();
    }
  }

  // =====================
  //        INICIO
  // =====================
  const landingPage = document.getElementById('landingPage');
  const loginBtn = document.getElementById('loginBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');

  // =====================
  //   INICIO DE SESIÓN
  // =====================
  const loginPage = document.getElementById('loginPage');
  const backToHomeBtn = document.getElementById('backToHomeBtn');
  const goToRegister = document.getElementById('goToRegister');

  // =====================
  //       REGISTRO
  // =====================
  const registerPage = document.getElementById('registerPage');
  const backToHomeBtnRegister = document.getElementById('backToHomeBtnRegister');
  const goToLogin = document.getElementById('goToLogin');

  // =====================
  //   CURSOS DESTACADOS
  // =====================
  const coursesPage = document.getElementById('coursesPage');

  // =====================
  //   NAVEGACIÓN INICIO
  // =====================
  if (loginBtn && loginPage && landingPage) {
    loginBtn.addEventListener('click', function() {
      landingPage.style.display = 'none';
      loginPage.style.display = 'flex';
      if (registerPage) registerPage.style.display = 'none';
      if (coursesPage) coursesPage.style.display = 'none';
    });
  }

  if (getStartedBtn && registerPage && landingPage) {
    getStartedBtn.addEventListener('click', function() {
      landingPage.style.display = 'none';
      registerPage.style.display = 'flex';
      if (loginPage) loginPage.style.display = 'none';
      if (coursesPage) coursesPage.style.display = 'none';
    });
  }

  // =====================
  //   NAVEGACIÓN LOGIN
  // =====================
  if (backToHomeBtn && loginPage && landingPage) {
    backToHomeBtn.addEventListener('click', function() {
      loginPage.style.display = 'none';
      landingPage.style.display = 'flex';
      if (registerPage) registerPage.style.display = 'none';
      if (coursesPage) coursesPage.style.display = 'none';
    });
  }

  if (goToRegister && registerPage && loginPage) {
    goToRegister.addEventListener('click', function(e) {
      e.preventDefault();
      loginPage.style.display = 'none';
      registerPage.style.display = 'flex';
      if (coursesPage) coursesPage.style.display = 'none';
    });
  }

  // =====================
  //   NAVEGACIÓN REGISTRO
  // =====================
  if (backToHomeBtnRegister && registerPage && landingPage) {
    backToHomeBtnRegister.addEventListener('click', function() {
      registerPage.style.display = 'none';
      landingPage.style.display = 'flex';
      if (loginPage) loginPage.style.display = 'none';
      if (coursesPage) coursesPage.style.display = 'none';
    });
  }

  if (goToLogin && registerPage && loginPage) {
    goToLogin.addEventListener('click', function(e) {
      e.preventDefault();
      registerPage.style.display = 'none';
      loginPage.style.display = 'flex';
      if (coursesPage) coursesPage.style.display = 'none';
    });
  }

  // =====================
  //   REGISTRO DE USUARIO
  // =====================
  const registerForm = registerPage ? registerPage.querySelector('form') : null;
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim().toLowerCase();
      const password = document.getElementById('register-password').value;
      const password2 = document.getElementById('register-password2').value;

      if (password !== password2) {
        showSuccessMessage('Las contraseñas no coinciden.');
        return;
      }

      // Guardar usuario en localStorage
      let users = JSON.parse(localStorage.getItem('wikilabs_users') || '[]');
      if (users.find(u => u.email === email)) {
        showSuccessMessage('Este correo ya está registrado.');
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem('wikilabs_users', JSON.stringify(users));
      showSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
      registerPage.style.display = 'none';
      loginPage.style.display = 'flex';
    });
  }

  // =====================
  //   INICIO DE SESIÓN
  // =====================
  const loginForm = loginPage ? loginPage.querySelector('form') : null;
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;
      let users = JSON.parse(localStorage.getItem('wikilabs_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        showSuccessMessage('Correo o contraseña incorrectos.');
        return;
      }
      // Guardar sesión (opcional)
      localStorage.setItem('wikilabs_logged_user', JSON.stringify(user));
      // GUARDAR usuario y correo para el perfil
      localStorage.setItem('wikilabs_user', user.name);
      localStorage.setItem('wikilabs_email', user.email);
      showSuccessMessage('¡Bienvenido! Iniciaste sesión correctamente.');
      // Mostrar cursos destacados con el diseño de la foto
      if (coursesPage) {
        renderCoursesPage();
      }

      loginPage.style.display = 'none';
      if (landingPage) landingPage.style.display = 'none';
      if (registerPage) registerPage.style.display = 'none';
      if (coursesPage) coursesPage.style.display = 'block';
    });
  }
});