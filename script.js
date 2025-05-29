document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Qué tipo de circuito combinacional permite transformar información binaria de una forma a otra y es fundamental en procesos de control y almacenamiento de datos?",
            options: ["Registrador", "Flip-flop", "Codificador/Decodificador", "Multiplexor"],
            answer: "Codificador/Decodificador"
        },
        {
            question: "¿Cuál es la función principal de un **Codificador**?",
            options: [
                "Activar una sola línea de salida correspondiente a una entrada binaria.",
                "Convertir múltiples señales de entrada en una representación binaria más compacta.",
                "Almacenar bits de información.",
                "Seleccionar una de varias entradas para una sola salida."
            ],
            answer: "Convertir múltiples señales de entrada en una representación binaria más compacta."
        },
        {
            question: "En un codificador 4 a 2, si la entrada activa es E2, ¿cuál sería la salida binaria?",
            options: ["00", "01", "10", "11"],
            answer: "10"
        },
        {
            question: "¿Qué característica distingue a un **Codificador con Prioridad**?",
            options: [
                "Solo funciona con dos entradas.",
                "Asigna prioridad a las entradas, generando una salida para la de mayor valor activo si varias están activas.",
                "No puede manejar múltiples entradas activas.",
                "Siempre produce una salida de 00."
            ],
            answer: "Asigna prioridad a las entradas, generando una salida para la de mayor valor activo si varias están activas."
        },
        {
            question: "¿Cuál es la función principal de un **Decodificador**?",
            options: [
                "Reducir la cantidad de líneas de comunicación.",
                "Recibir una entrada binaria y activar una sola línea de salida correspondiente.",
                "Comprimir datos antes de la transmisión.",
                "Convertir señales analógicas a digitales."
            ],
            answer: "Recibir una entrada binaria y activar una sola línea de salida correspondiente."
        },
        {
            question: "En un decodificador 2 a 4, si la entrada binaria es '11', ¿cuál salida se activaría?",
            options: ["Y0", "Y1", "Y2", "Y3"],
            answer: "Y3"
        },
        {
            question: "¿Cuál es una aplicación común de los **Codificadores**?",
            options: [
                "Activación de memorias RAM.",
                "Displays de 7 segmentos.",
                "Teclados electrónicos.",
                "Selección de líneas en un controlador."
            ],
            answer: "Teclados electrónicos."
        },
        {
            question: "¿Qué tipo de compuerta lógica se utiliza para generar las salidas en un **Codificador 4 a 2** según los diagramas lógicos presentados?",
            options: ["AND", "NAND", "OR", "XOR"],
            answer: "OR"
        },
        {
            question: "¿Qué tipo de compuertas lógicas se utilizan en un **Decodificador 2 a 4** según los diagramas lógicos presentados?",
            options: ["OR y NOR", "AND y Negadores", "XOR y XNOR", "Solo NOR"],
            answer: "AND y Negadores"
        },
        {
            question: "Si comparamos un codificador y un decodificador, ¿cuál convierte un valor binario en una señal?",
            options: ["El Codificador", "El Decodificador", "Ambos", "Ninguno"],
            answer: "El Decodificador"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    const questionNumberElem = document.getElementById('questionNumber');
    const questionTextElem = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackElem = document.getElementById('feedback');
    const checkAnswerBtn = document.getElementById('checkAnswerBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const resultSection = document.getElementById('resultSection');
    const scoreTextElem = document.getElementById('scoreText');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const questionSection = document.getElementById('questionSection');
    const controlsSection = document.querySelector('.controls');

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionNumberElem.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
            questionTextElem.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ''; // Clear previous options
            feedbackElem.textContent = '';
            feedbackElem.className = 'feedback'; // Reset feedback styling
            checkAnswerBtn.disabled = true;
            nextQuestionBtn.disabled = true;
            selectedOption = null;

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option;
                button.setAttribute('data-option', option);
                button.addEventListener('click', () => selectOption(button));
                optionsContainer.appendChild(button);
            });
        } else {
            showResults();
        }
    }

    function selectOption(button) {
        // Deselect any previously selected option
        const currentSelected = document.querySelector('.option-button.selected');
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }

        // Select the new option
        button.classList.add('selected');
        selectedOption = button.getAttribute('data-option');
        checkAnswerBtn.disabled = false; // Enable check button once an option is selected
    }

    function checkAnswer() {
        if (selectedOption === null) {
            feedbackElem.textContent = "Por favor, selecciona una opción.";
            feedbackElem.classList.remove('correct', 'incorrect'); // Clear previous states
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const allOptionButtons = document.querySelectorAll('.option-button');

        // Disable all options and check button after checking
        allOptionButtons.forEach(button => button.disabled = true);
        checkAnswerBtn.disabled = true;

        if (selectedOption === currentQuestion.answer) {
            feedbackElem.textContent = "¡Correcto!";
            feedbackElem.classList.remove('incorrect');
            feedbackElem.classList.add('correct');
            score++;
        } else {
            feedbackElem.textContent = `Incorrecto. La respuesta correcta es: ${currentQuestion.answer}`;
            feedbackElem.classList.remove('correct');
            feedbackElem.classList.add('incorrect');
        }
        nextQuestionBtn.disabled = false; // Enable next button after feedback
    }

    function nextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResults() {
        questionSection.style.display = 'none';
        controlsSection.style.display = 'none';
        resultSection.style.display = 'block';
        scoreTextElem.textContent = `Obtuviste ${score} de ${questions.length} preguntas correctas.`;
    }

    function resetGame() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        questionSection.style.display = 'block';
        controlsSection.style.display = 'flex'; // Restore flex display
        resultSection.style.display = 'none';
        loadQuestion();
    }

    // Event Listeners
    checkAnswerBtn.addEventListener('click', checkAnswer);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    playAgainBtn.addEventListener('click', resetGame);

    // Initial load
    loadQuestion();
});