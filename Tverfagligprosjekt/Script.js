document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('data-form');
    const tableBody = document.querySelector('#data-table tbody');
    const barChartCanvas = document.getElementById('wasteChart');

    let barChart, pieCharts = [];
    const dataEntries = [];
    const quizAnswerCounts = [];

    // Eksempel på eksisterende data for spørsmålene
    const existingAnswers = [
        [12, 1, 2], // Første spørsmål: 5 svarte 'Resirkulering', 4 'Avfallsbrenning', 3 'Ingenting'
        [7, 2, 6], // Andre spørsmål: 2 svarte 'Papiravfall', 7 'Spesialinnsamling', 1 'Matavfall'
        [8, 5, 1], // Tredje spørsmål: 6 svarte 'Kompostering', 2 'Plastsortering', 3 'Elektronikk'
        [2, 4, 2, 0, 7],
        [12, 2, 1],
        [7, 5, 3],
        [4, 7, 1, 2],
        [9, 4, 1],
        [7, 3, 2, 1]
    ];

    // Håndter innsendelse av skjema
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const day = document.getElementById('day').value;
        const waste = parseFloat(document.getElementById('waste').value);

        dataEntries.push({ day, waste });

        const row = document.createElement('tr');
        row.innerHTML = `<td>${day}</td><td>${waste}</td>`;
        tableBody.appendChild(row);

        updateBarChart();

        form.reset();
    });

    // Oppdater stolpediagrammet
    function updateBarChart() {
        const labels = dataEntries.map(entry => entry.day);
        const data = dataEntries.map(entry => entry.waste);

        if (barChart) {
            barChart.destroy();
        }

        barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Avfall (kg)',
                        data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        type: 'bar'
                    },
                    {
                        label: 'Trend (linje)',
                        data,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false,
                        type: 'line'
                    }
                ]
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

    // Quiz-funksjonalitet
    const quizQuestions = [
        {
            question: 'Hvilken aldersgruppe tilhører du?',
            options: ['0 - 17 År', '18 - 24 År', '25+ År']
        },
        {
            question: 'Hvor bor du?',
            options: ['Byen/By området', 'Bygd', 'Landet']
        },
        {
            question: 'Hva gjør du vanligvis med husholdningsavfall som plastemballasje, metallbokser eller papir?',
            options: ['Kaster alt i restavfall', 'Sorterer i riktige bosspann', ' Leverer til spesielle resirkuleringsstasjoner']
        },
        {
            question: 'Hvor ofte panter du?',
            options: ['Alltid', 'Ofte', 'Av og Til', 'Sjeldent','Aldri']
        },
        {
            question: 'Hva er den viktigste grunnen for at du panter?',
            options: ['Ekstra penger', 'Miljøhensyn', 'Eg Panter Aldri']
        },
        {
            question: 'Hva synes du om dagens pantbeløp?',
            options: ['For Mye', 'Akkurat Passelig', 'For lite']
        },
        {
            question: 'Hva tror du vil være de største utfordringene med et pantesystem der alt kan pantes?',
            options: ['Logistikk', 'Høyere Kostnader', 'Lav deltakelse av folk','Mangel På Kunnskap']
        },
        {
            question: 'Hva ville motivert deg mest til å ta ibruk et utvidet pantesystemet?',
            options: ['Økonomisk Gevinst', 'Miljøhensyn', 'Lettere tilgang til innsamlingsstasjoner']
        },
        {
            question: 'Om alt kunne pantes, hvor mye ville du pantet hver måned?',
            options: ['Mindre enn 10 enheter', '10-30 enheter', '30-50 enheter', '50+ Enheter']
        },
    ];

    const quizContainer = document.getElementById('quiz-container');

    // Initialiser spørsmål og diagrammer
    quizQuestions.forEach((questionData, index) => {
        const questionWrapper = document.createElement('div');
        questionWrapper.classList.add('quiz-question-wrapper');

        // Vis spørsmålet
        const questionText = document.createElement('p');
        questionText.textContent = questionData.question;
        questionWrapper.appendChild(questionText);

        // Vis alternativer
        const optionsWrapper = document.createElement('div');
        optionsWrapper.classList.add('quiz-options');

        quizAnswerCounts[index] = [...existingAnswers[index]]; // Initialiser med eksisterende data

        questionData.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('quiz-option');
            button.onclick = () => handleAnswer(index, optionIndex, pieChartWrapper);
            optionsWrapper.appendChild(button);
        });

        questionWrapper.appendChild(optionsWrapper);

        // Lag et wrapper-element for kakediagrammet
        const pieChartWrapper = document.createElement('div');
        pieChartWrapper.style.display = 'none'; // Skjuler diagrammet inntil brukeren svarer
        const pieChartCanvas = document.createElement('canvas');
        pieChartCanvas.id = `quizChart-${index}`;
        pieChartWrapper.appendChild(pieChartCanvas);
        questionWrapper.appendChild(pieChartWrapper);

        quizContainer.appendChild(questionWrapper);

        const pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
                labels: questionData.options,
                datasets: [{
                    data: quizAnswerCounts[index],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(84, 148, 70, 0.6)','rgba(210, 75, 185, 0.6)'],
                }]
            },
            options: {
                responsive: true
            }
        });

        pieCharts.push(pieChart);
    });

    // Håndter svarvalg
    function handleAnswer(questionIndex, optionIndex, pieChartWrapper) {
        quizAnswerCounts[questionIndex][optionIndex]++;
        pieCharts[questionIndex].data.datasets[0].data = quizAnswerCounts[questionIndex];
        pieCharts[questionIndex].update();

        // Vis diagrammet for dette spørsmålet
        pieChartWrapper.style.display = 'block';
    }
});
