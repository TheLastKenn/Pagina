window.addEventListener('DOMContentLoaded', () => {
    // Animación de header y contenedor principal
    const header = document.querySelector('.header');
    const container = document.querySelector('.container.quiz-container');
    if (header) header.style.animation = 'fadeDown 1s ease forwards';
    if (container) setTimeout(() => { container.style.opacity = '1'; }, 200);

    // Animación escalonada de preguntas
    const questions = document.querySelectorAll('.question-block');
    questions.forEach((q, i) => {
        setTimeout(() => {
            q.style.opacity = '1';
            q.style.transform = 'translateY(0)';
        }, 400 + i * 200);
    });

    // Evaluación del quiz
    const correctAnswers = {
        q1: 'B',
        q2: 'C',
        q3: 'C',
        q4: 'B',
        q5: 'B',
        q6: 'B',
        q7: 'B',
        q8: 'B',
        q9: 'C',
        q10: 'B'
    };

    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let total = 10;
        let correct = 0;
        for (let i = 1; i <= total; i++) {
            const answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (answer && answer.value === correctAnswers[`q${i}`]) correct++;
        }
        const percent = Math.round((correct / total) * 100);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `Respuestas correctas: <b>${correct}</b> de <b>${total}</b> (<b>${percent}%</b>)`;
        resultDiv.style.display = 'block';
// Guardar estadísticas en localStorage para el perfil
let stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');
stats.history = {
    correct: correct,
    wrong: total - correct
};
localStorage.setItem('wikilabs_stats', JSON.stringify(stats));
        // Mostrar gráfico de resultados
        const resultChart = document.getElementById('resultChart');
        resultChart.style.display = 'block';
        new Chart(resultChart.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Correctas', 'Incorrectas'],
                datasets: [{
                    data: [correct, total - correct],
                    backgroundColor: ['#f6c736', '#43e97b']
                }]
            },
            options: {
                plugins: { legend: { display: true } }
            }
        });
        window.scrollTo({ top: resultDiv.offsetTop - 60, behavior: 'smooth' });
        // Dentro del evento submit del formulario
        for (let i = 1; i <= total; i++) {
            const radios = document.querySelectorAll(`input[name="q${i}"]`);
            radios.forEach(radio => {
                const label = radio.parentElement;
                label.classList.remove('correct-answer', 'wrong-answer', 'answer-animate');
                if (radio.checked) {
                    if (radio.value === correctAnswers[`q${i}`]) {
                        label.classList.add('correct-answer', 'answer-animate');
                    } else {
                        label.classList.add('wrong-answer', 'answer-animate');
                    }
                } else if (radio.value === correctAnswers[`q${i}`]) {
                    // Opcional: resalta la correcta si el usuario falló
                    label.classList.add('correct-answer');
                }
            });
        }
    });
});

// Animación visual de selección de respuesta
document.querySelectorAll('.question-block ul li input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Quitar la clase 'selected' y 'answer-animate' de todos los labels de la misma pregunta
        const siblings = this.closest('ul').querySelectorAll('label');
        siblings.forEach(lab => {
            lab.classList.remove('selected', 'answer-animate');
        });
        // Agregar la clase 'selected' y animación al label padre de este input
        this.parentElement.classList.add('selected', 'answer-animate');
    });
});

// Mezclar aleatoriamente las opciones de cada pregunta
document.querySelectorAll('.question-block ul').forEach(ul => {
    // Obtener los <li> hijos
    const lis = Array.from(ul.children);
    // Algoritmo Fisher-Yates para mezclar
    for (let i = lis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        ul.appendChild(lis[j]);
        lis.splice(j, 1);
    }
});