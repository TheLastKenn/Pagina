window.addEventListener('DOMContentLoaded', () => {
    // Obtener usuario, correo y emoji reales
    const username = localStorage.getItem('wikilabs_user') || "Usuario";
    const email = localStorage.getItem('wikilabs_email') || "";
    const emoji = localStorage.getItem('wikilabs_emoji') || "🦉";
    const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');

    // Mostrar nombre, correo y emoji
    document.getElementById('username').textContent = username;
    document.getElementById('user-email').textContent = email;

    // Mostrar el SVG seleccionado o el emoji por defecto
    const idx = localStorage.getItem('wikilabs_emoji_svg');
    if (idx !== null && animalSVGs[idx]) {
      document.getElementById('profile-emoji').innerHTML = animalSVGs[idx];
    } else {
      document.getElementById('profile-emoji').textContent = emoji;
    }

    // Mostrar estadísticas de materias (correctos | equivocados)
    function showStats(materia, statId) {
        const s = stats[materia] || {};
        const correct = s.correct || 0;
        const wrong = s.wrong || 0;
        animateStat(statId, correct, wrong);
    }
    showStats('math', 'math-time');
    showStats('ciencia', 'science-time');
    showStats('history', 'history-time');

    // Gráfica de comparación correctos vs. equivocados por materia
    const materias = ['math', 'ciencia', 'history'];
    const labels = ['Matemáticas', 'Ciencias', 'Historia'];
    const correctos = materias.map(m => (stats[m]?.correct || 0));
    const equivocados = materias.map(m => (stats[m]?.wrong || 0));

    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Correctos',
                    data: correctos,
                    backgroundColor: 'rgba(67, 233, 123, 0.7)',
                    borderColor: '#43e97b',
                    borderWidth: 2,
                    borderRadius: 10
                },
                {
                    label: 'Equivocados',
                    data: equivocados,
                    backgroundColor: 'rgba(246, 54, 54, 0.7)',
                    borderColor: '#f63636',
                    borderWidth: 2,
                    borderRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: { display: true },
                tooltip: {
                    backgroundColor: 'rgba(34, 34, 34, 0.92)',
                    titleColor: '#36e2f6',
                    bodyColor: '#fff',
                    borderColor: '#43e97b',
                    borderWidth: 1,
                    padding: 12,
                    caretSize: 7,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                },
                datalabels: {
                    color: '#232526',
                    anchor: 'end',
                    align: 'start',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: function(value, context) {
                        // Calcula el total de la materia (correctos + equivocados)
                        const datasetIndex = context.datasetIndex;
                        const dataIndex = context.dataIndex;
                        const correct = correctos[dataIndex];
                        const wrong = equivocados[dataIndex];
                        const total = correct + wrong;
                        if (total === 0) return "0%";
                        const percent = datasetIndex === 0
                            ? Math.round((correct / total) * 100)
                            : Math.round((wrong / total) * 100);
                        return percent + "%";
                    }
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        modifierKey: 'ctrl',
                        threshold: 2
                    },
                    zoom: {
                        wheel: { enabled: true },
                        pinch: { enabled: true },
                        mode: 'xy'
                    },
                    limits: {
                        x: { min: 0 },
                        y: { min: 0 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#232526",
                        font: { size: 15, family: "'Montserrat', Arial, sans-serif" },
                        stepSize: 1
                    },
                    grid: {
                        color: "rgba(54,226,246,0.10)",
                        borderDash: [4, 4]
                    }
                },
                x: {
                    ticks: {
                        color: "#232526",
                        font: { size: 15, family: "'Montserrat', Arial, sans-serif" }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1100,
                easing: 'easeOutQuart'
            }
        },
        plugins: [ChartDataLabels]
    });

    // Verificar si todos los valores de correctos y equivocados son 0
    if (correctos.every(v => v === 0) && equivocados.every(v => v === 0)) {
      document.getElementById('progressChart').style.display = 'none';
      const msg = document.createElement('div');
      msg.textContent = "No hay datos para mostrar la gráfica.";
      msg.style.color = "#36e2f6";
      msg.style.textAlign = "center";
      msg.style.margin = "30px 0";
      document.querySelector('.stats-section').appendChild(msg);
    }

    // Cerrar sesión
    document.getElementById('logout-btn').addEventListener('click', () => {
        const msg = document.getElementById('logout-message');
        msg.style.display = "block";
        setTimeout(() => {
            localStorage.removeItem('wikilabs_user');
            localStorage.removeItem('wikilabs_email');
            window.location.href = "../index.html";
        }, 1800);
    });

    // Mostrar el modal al hacer clic en el ícono
    document.getElementById('profile-emoji').onclick = function() {
      document.getElementById('iconModal').style.display = 'flex';
    };

    // Cambiar el ícono al seleccionar uno nuevo
    document.querySelectorAll('.animal-icon-option').forEach(function(span) {
      span.onclick = function() {
        const idx = parseInt(this.dataset.index, 10);
        document.getElementById('profile-emoji').innerHTML = animalSVGs[idx];
        document.getElementById('iconModal').style.display = 'none';
        localStorage.setItem('wikilabs_emoji_svg', idx);
      };
    });

    // Cerrar el modal si se hace clic fuera del cuadro
    document.getElementById('iconModal').onclick = function(e) {
      if (e.target === this) this.style.display = 'none';
    };
});


// SVGs de animales (en el mismo orden que en el modal)
const animalSVGs = [
  // Zorro
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#FFB300"/><polygon points="12,24 24,8 28,28" fill="#FF9800"/><polygon points="52,24 40,8 36,28" fill="#FF9800"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#fff3e0"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Panda
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#fff"/><ellipse cx="16" cy="28" rx="8" ry="10" fill="#222"/><ellipse cx="48" cy="28" rx="8" ry="10" fill="#222"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#bdbdbd"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Gato
  `<svg viewBox="0 0 64 64" width="110" height="110"><circle cx="32" cy="36" r="22" fill="#FFD180"/><polygon points="12,24 20,8 24,28" fill="#FFD180"/><polygon points="52,24 44,8 40,28" fill="#FFD180"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#FFB300"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><rect x="29" y="46" width="6" height="2" rx="1" fill="#222"/></svg>`,
  // Perro
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#FFE0B2"/><ellipse cx="16" cy="32" rx="8" ry="12" fill="#A1887F"/><ellipse cx="48" cy="32" rx="8" ry="12" fill="#A1887F"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#FF7043"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // León
  `<svg viewBox="0 0 64 64" width="110" height="110"><circle cx="32" cy="36" r="22" fill="#FFB300"/><ellipse cx="32" cy="36" rx="18" ry="18" fill="#FFE082"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#FFB300"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Conejo
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#fff"/><rect x="18" y="8" width="8" height="24" rx="4" fill="#fff"/><rect x="38" y="8" width="8" height="24" rx="4" fill="#fff"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#F8BBD0"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Elefante
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#B0BEC5"/><ellipse cx="16" cy="38" rx="6" ry="10" fill="#B0BEC5"/><ellipse cx="48" cy="38" rx="6" ry="10" fill="#B0BEC5"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><rect x="30" y="48" width="4" height="10" rx="2" fill="#90A4AE"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#B0BEC5"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/></svg>`,
  // Mono
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#A1887F"/><ellipse cx="32" cy="44" rx="14" ry="10" fill="#FFE0B2"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#A1887F"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Oso
  `<svg viewBox="0 0 64 64" width="110" height="110"><ellipse cx="32" cy="38" rx="20" ry="18" fill="#8D6E63"/><ellipse cx="16" cy="28" rx="6" ry="8" fill="#8D6E63"/><ellipse cx="48" cy="28" rx="6" ry="8" fill="#8D6E63"/><ellipse cx="24" cy="40" rx="3" ry="5" fill="#fff"/><ellipse cx="40" cy="40" rx="3" ry="5" fill="#fff"/><circle cx="24" cy="42" r="1.2" fill="#222"/><circle cx="40" cy="42" r="1.2" fill="#222"/><ellipse cx="32" cy="52" rx="6" ry="3" fill="#BCAAA4"/><ellipse cx="32" cy="52" rx="3" ry="1.5" fill="#fff"/><ellipse cx="32" cy="46" rx="2" ry="1" fill="#222"/></svg>`,
  // Búho
  `<svg viewBox="0 0 64 64" width="110" height="110"><circle cx="32" cy="32" r="30" fill="#FFD54F"/><ellipse cx="22" cy="32" rx="8" ry="12" fill="#6D4C41"/><ellipse cx="42" cy="32" rx="8" ry="12" fill="#6D4C41"/><ellipse cx="22" cy="32" rx="4" ry="6" fill="#fff"/><ellipse cx="42" cy="32" rx="4" ry="6" fill="#fff"/><circle cx="22" cy="34" r="2" fill="#222"/><circle cx="42" cy="34" r="2" fill="#222"/><ellipse cx="32" cy="48" rx="10" ry="6" fill="#FFB300"/><ellipse cx="32" cy="48" rx="6" ry="3" fill="#fff"/><polygon points="32,20 28,28 36,28" fill="#FFB300"/></svg>`
];

function animateStat(statId, correct, wrong) {
    const el = document.getElementById(statId);
    el.style.opacity = 0;
    el.style.transform = "translateY(20px) scale(0.95)";
    let c = 0, w = 0;
    const cTarget = correct, wTarget = wrong;
    const duration = 600;
    const steps = 30;
    let frame = 0;
    function animate() {
        frame++;
        c = Math.round((cTarget / steps) * frame);
        w = Math.round((wTarget / steps) * frame);
        if (c > cTarget) c = cTarget;
        if (w > wTarget) w = wTarget;
        el.textContent = `✔️ ${c} | ❌ ${w}`;
        if (frame < steps) {
            requestAnimationFrame(animate);
        } else {
            el.textContent = `✔️ ${cTarget} | ❌ ${wTarget}`;
        }
    }
    animate();
    setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0) scale(1)";
    }, 100);
}

