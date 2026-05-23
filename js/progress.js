const Progress = {
  key: 'stb_progress',

  load() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch { return {}; }
  },

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },

  markDone(courseId, chapterId) {
    const d = this.load();
    if (!d[courseId]) d[courseId] = { done: [] };
    if (!d[courseId].done.includes(chapterId)) {
      d[courseId].done.push(chapterId);
    }
    this.save(d);
  },

  isDone(courseId, chapterId) {
    const d = this.load();
    return !!(d[courseId] && d[courseId].done.includes(chapterId));
  },

  getCoursePercent(courseId, totalChapters) {
    const d = this.load();
    if (!d[courseId]) return 0;
    return Math.round((d[courseId].done.length / totalChapters) * 100);
  },

  applyToCards() {
    document.querySelectorAll('.course-card[data-course]').forEach(card => {
      const cid = card.dataset.course;
      const total = parseInt(card.dataset.chapters || '1', 10);
      const pct = this.getCoursePercent(cid, total);
      const fill = card.querySelector('.course-progress-fill');
      if (fill) fill.style.width = pct + '%';
    });
  },

  applyToChapterList(courseId) {
    document.querySelectorAll('.chapter-item[data-chapter]').forEach(item => {
      const cid = item.dataset.chapter;
      const status = item.querySelector('.chapter-status');
      if (status && this.isDone(courseId, cid)) {
        status.textContent = 'Done';
        status.classList.add('done');
      }
    });
  }
};
