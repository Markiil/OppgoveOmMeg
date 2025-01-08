document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('data-form');
    const tableBody = document.querySelector('#data-table tbody');
    const chartCanvas = document.getElementById('wasteChart');

    let chart;
    const dataEntries = [];

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const day = document.getElementById('day').value;
        const waste = parseFloat(document.getElementById('waste').value);

        dataEntries.push({ day, waste });

        const row = document.createElement('tr');
        row.innerHTML = `<td>${day}</td><td>${waste}</td>`;
        tableBody.appendChild(row);

        updateChart();

        form.reset();
    });

    // Update chart
    function updateChart() {
        const labels = dataEntries.map(entry => entry.day);
        const data = dataEntries.map(entry => entry.waste);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Waste (kg)',
                    data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Quiz functionality
   // Quiz functionality
const quizQuestions = [
    {
        question: 'Where should you sort plastic bottles?',
        correct: 'true'
    },
    {
        question: 'Is glass sorted with paper waste?',
        correct: 'false'
    },
    {
        question: 'Can food waste go in the regular trash?',
        correct: 'false'
    },
    {
        question: 'Should batteries be recycled at special collection points?',
        correct: 'true'
    },
    {
        question: 'Is it okay to mix paper and cardboard?',
        correct: 'true'
    },
    {
        question: 'Can electronics be disposed of in the regular trash?',
        correct: 'false'
    },
    {
        question: 'Are plastic bags recyclable?',
        correct: 'true'
    },
    {
        question: 'Should food containers be rinsed before recycling?',
        correct: 'true'
    }
];


    let currentQuestionIndex = 0;

    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizFeedback = document.getElementById('quiz-feedback');

    function loadQuizQuestion() {
        const questionData = quizQuestions[currentQuestionIndex];
        quizQuestion.textContent = questionData.question;
    }

    quizContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-option')) {
            const isCorrect = e.target.dataset.answer === quizQuestions[currentQuestionIndex].correct;

            quizFeedback.textContent = isCorrect ? 'Correct!' : 'Wrong!';

            currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
            loadQuizQuestion();
        }
    });

    loadQuizQuestion();
});
