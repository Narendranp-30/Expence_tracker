const quizRoot = document.getElementById('quiz-root');

const questions = [
    {
        q: 'Which language runs in a web browser?',
        options: ['Java', 'C', 'Python', 'JavaScript'],
        answer: 3
    },
    {
        q: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Control Style Syntax'],
        answer: 1
    },
    {
        q: 'Which HTML tag is used to define an unordered list?',
        options: ['<ol>', '<ul>', '<li>', '<list>'],
        answer: 1
    }
];

let current = 0;
let score = 0;
let selectedIndex = null;

function renderQuestion() {
	const data = questions[current];
	quizRoot.innerHTML = '';

	const qEl = document.createElement('div');
	qEl.className = 'question';
	qEl.textContent = `Q${current+1}. ${data.q}`;

	const opts = document.createElement('div');
	opts.className = 'options';

	data.options.forEach((opt, idx) => {
		const o = document.createElement('div');
		o.className = 'option';
		o.textContent = opt;
		o.onclick = () => selectOption(idx, o);
		opts.appendChild(o);
	});

	quizRoot.appendChild(qEl);
	quizRoot.appendChild(opts);

	const controls = document.createElement('div');
	controls.className = 'controls';
	const nextBtn = document.createElement('button');
	nextBtn.className = 'btn btn-primary';
	nextBtn.textContent = current < questions.length - 1 ? 'Next' : 'Finish';
	nextBtn.onclick = onNext;
	controls.appendChild(nextBtn);
	quizRoot.appendChild(controls);
}

function selectOption(idx, el) {
	const opts = quizRoot.querySelectorAll('.option');
	opts.forEach(x => x.classList.remove('selected'));
	el.classList.add('selected');
	selectedIndex = idx;
}

function onNext() {
	if (selectedIndex === null) {
		alert('Please select an option.');
		return;
	}

	const correct = questions[current].answer;
	if (selectedIndex === correct) score++;

	current++;
	selectedIndex = null;

	if (current >= questions.length) {
		showSummary();
	} else {
		renderQuestion();
	}
}

function showSummary() {
	quizRoot.innerHTML = '';
	const s = document.createElement('div');
	s.className = 'summary';
	s.innerHTML = `\n<h4>Your score: ${score} / ${questions.length}</h4>\n   <p class="small-muted">You answered ${score} correct.</p>`;

	const restart = document.createElement('div');
	restart.className = 'controls';
	const btn = document.createElement('button');
	btn.className = 'btn btn-success';
	btn.textContent = 'Restart Quiz';
	btn.onclick = () => { current = 0; score = 0; selectedIndex = null; renderQuestion(); };
	restart.appendChild(btn);

	quizRoot.appendChild(s);
	quizRoot.appendChild(restart);
}

renderQuestion();
