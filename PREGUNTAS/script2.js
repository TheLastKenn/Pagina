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

    // Gráficos ilustrativos
    // Tipos de seres vivos
    const seresCtx = document.getElementById('seresChart').getContext('2d');
    new Chart(seresCtx, {
        type: 'pie',
        data: {
            labels: ['Animales', 'Plantas', 'Hongos', 'Bacterias', 'Protistas'],
            datasets: [{
                data: [30, 25, 15, 15, 15],
                backgroundColor: ['#43e97b', '#36e2f6', '#f6c736', '#e0f7fa', '#1a7f4e']
            }]
        },
        options: { plugins: { legend: { display: true } } }
    });

    // Cadena alimenticia
    const cadenaCtx = document.getElementById('cadenaChart').getContext('2d');
    new Chart(cadenaCtx, {
        type: 'bar',
        data: {
            labels: ['Productores', 'Consumidores', 'Descomponedores'],
            datasets: [{
                data: [10, 7, 3],
                backgroundColor: ['#43e97b', '#36e2f6', '#f6c736']
            }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });

    // Estados de la materia
    const materiaCtx = document.getElementById('materiaChart').getContext('2d');
    new Chart(materiaCtx, {
        type: 'doughnut',
        data: {
            labels: ['Sólido', 'Líquido', 'Gaseoso'],
            datasets: [{
                data: [33, 33, 34],
                backgroundColor: ['#43e97b', '#36e2f6', '#f6c736']
            }]
        },
        options: { plugins: { legend: { display: true } }, cutout: '60%' }
    });

    // Evaluación del quiz
    const correctAnswers = {
        q1: 'B',
        q2: 'B',
        q3: 'A',
        q4: 'B',
        q5: 'B',
        q6: 'B',
        q7: 'A',
        q8: 'A',
        q9: 'B',
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
        stats.ciencia = {
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
                    backgroundColor: ['#43e97b', '#f6c736']
                }]
            },
            options: {
                plugins: { legend: { display: true } }
            }
        });
        window.scrollTo({ top: resultDiv.offsetTop - 60, behavior: 'smooth' });

        // Mostrar selección y resaltar correctas si no se respondió
        for (let i = 1; i <= total; i++) {
            const radios = document.querySelectorAll(`input[name="q${i}"]`);
            let answered = false;
            radios.forEach(radio => {
                const label = radio.parentElement;
                label.classList.remove('correct-answer', 'wrong-answer', 'answer-animate', 'selected');
                if (radio.checked) {
                    answered = true;
                    label.classList.add('selected');
                    if (radio.value === correctAnswers[`q${i}`]) {
                        label.classList.add('correct-answer', 'answer-animate');
                    } else {
                        label.classList.add('wrong-answer', 'answer-animate');
                    }
                }
            });
            // Si no se respondió, resalta la correcta
            if (!answered) {
                radios.forEach(radio => {
                    if (radio.value === correctAnswers[`q${i}`]) {
                        const label = radio.parentElement;
                        label.classList.add('correct-answer', 'answer-animate');
                    }
                });
            }
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