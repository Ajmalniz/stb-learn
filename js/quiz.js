class Quiz {
  constructor(containerId, questions, courseId, chapterId) {
    this.container  = document.getElementById(containerId);
    this.questions  = questions;
    this.courseId   = courseId;
    this.chapterId  = chapterId;
    this.current    = 0;
    this.score      = 0;
    this.answered   = false;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = this.buildHTML();
    this.attachEvents();
  }

  buildHTML() {
    const q = this.questions[this.current];
    const letters = ['A', 'B', 'C', 'D'];
    const optionsHTML = q.options.map((opt, i) =>
      `<div class="option" data-index="${i}">
         <span class="option-letter">${letters[i]}</span>
         <span>${opt}</span>
       </div>`
    ).join('');

    return `
      <div class="quiz-questions-wrap">
        <div class="quiz-progress-info" style="font-size:.85rem;color:var(--muted);margin-bottom:1rem;">
          Question <strong>${this.current + 1}</strong> of <strong>${this.questions.length}</strong>
        </div>
        <div class="quiz-question">
          <div class="question-number">Q${this.current + 1}</div>
          <div class="question-text">${q.question}</div>
          <div class="options">${optionsHTML}</div>
          <div class="feedback-msg" id="feedback"></div>
        </div>
        <div class="quiz-actions">
          <button class="quiz-submit" id="quiz-submit">Submit Answer</button>
          <button class="quiz-next" id="quiz-next" style="display:none">
            ${this.current < this.questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      </div>
      <div class="quiz-score" id="quiz-score"></div>
    `;
  }

  attachEvents() {
    this.container.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (this.answered) return;
        this.container.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    const submitBtn = this.container.querySelector('#quiz-submit');
    if (submitBtn) submitBtn.addEventListener('click', () => this.submit());

    const nextBtn = this.container.querySelector('#quiz-next');
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
  }

  submit() {
    if (this.answered) return;
    const selected = this.container.querySelector('.option.selected');
    if (!selected) {
      alert('Please select an answer first!');
      return;
    }

    this.answered = true;
    const idx  = parseInt(selected.dataset.index, 10);
    const q    = this.questions[this.current];
    const fb   = this.container.querySelector('#feedback');
    const submitBtn = this.container.querySelector('#quiz-submit');
    const nextBtn   = this.container.querySelector('#quiz-next');

    this.container.querySelectorAll('.option').forEach(o => {
      const i = parseInt(o.dataset.index, 10);
      if (i === q.correct) o.classList.add('correct');
    });

    if (idx === q.correct) {
      this.score++;
      selected.classList.add('correct');
      if (fb) { fb.textContent = '✓ Correct! ' + (q.explanation || ''); fb.className = 'feedback-msg correct show'; }
    } else {
      selected.classList.add('wrong');
      if (fb) { fb.textContent = '✗ Incorrect. ' + (q.explanation || ''); fb.className = 'feedback-msg wrong show'; }
    }

    if (submitBtn) submitBtn.style.display = 'none';
    if (nextBtn)   nextBtn.style.display   = 'inline-flex';
  }

  next() {
    this.current++;
    this.answered = false;
    if (this.current < this.questions.length) {
      this.render();
    } else {
      this.showScore();
    }
  }

  showScore() {
    const wrap  = this.container.querySelector('.quiz-questions-wrap');
    const score = this.container.querySelector('#quiz-score');
    if (wrap)  wrap.style.display  = 'none';
    if (score) score.style.display = 'block';

    const pct = Math.round((this.score / this.questions.length) * 100);
    let msg, emoji;
    if (pct >= 80) { msg = 'Excellent work! You have a strong understanding.'; emoji = '🎉'; }
    else if (pct >= 60) { msg = 'Good job! Review the incorrect answers to improve.'; emoji = '👍'; }
    else { msg = "Keep practicing! Re-read the chapter and try again."; emoji = '📚'; }

    score.innerHTML = `
      <div class="score-circle">
        <span class="score-num">${this.score}</span>
        <span class="score-denom">/ ${this.questions.length}</span>
      </div>
      <h3>${emoji} You scored ${pct}%</h3>
      <p>${msg}</p>
      <button class="quiz-restart" onclick="location.reload()">Try Again</button>
    `;

    if (pct >= 60 && this.courseId && this.chapterId) {
      Progress.markDone(this.courseId, this.chapterId);
    }
  }
}
