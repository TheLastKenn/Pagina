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
    });
});