import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  FLASHCARD_PROGRESS: 'flashcard_progress',
  QUIZ_SCORES: 'quiz_scores',
  STUDY_STREAK: 'study_streak',
  ORAL_SCORES: 'oral_scores',
  GLOSSARY_SCORES: 'glossary_scores',
  NT_MATCHER_SCORES: 'nt_matcher_scores',
  LAST_STUDY_DATE: 'last_study_date',
  TOTAL_STUDY_TIME: 'total_study_time',
  TOTAL_QUESTIONS: 'total_questions',
  DAILY_ACTIVITY: 'daily_activity',
};

export const storage = {
  async get(key) {
    try {
      const val = await AsyncStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) { console.warn('Storage set error:', e); }
  },

  async getFlashcardProgress() {
    return (await this.get(KEYS.FLASHCARD_PROGRESS)) || {};
  },

  async updateFlashcardProgress(deckId, cardId, result) {
    const progress = await this.getFlashcardProgress();
    if (!progress[deckId]) progress[deckId] = {};
    if (!progress[deckId][cardId]) progress[deckId][cardId] = { easy: 0, hard: 0, missed: 0 };
    progress[deckId][cardId][result]++;
    await this.set(KEYS.FLASHCARD_PROGRESS, progress);
    return progress;
  },

  async getQuizScores() {
    return (await this.get(KEYS.QUIZ_SCORES)) || {};
  },

  async saveQuizScore(chapterId, score, total) {
    const scores = await this.getQuizScores();
    if (!scores[chapterId]) scores[chapterId] = [];
    scores[chapterId].push({ score, total, date: new Date().toISOString() });
    await this.set(KEYS.QUIZ_SCORES, scores);
  },

  async getOralScores() {
    return (await this.get(KEYS.ORAL_SCORES)) || [];
  },

  async saveOralScore(sessionData) {
    const scores = await this.getOralScores();
    scores.push({ ...sessionData, date: new Date().toISOString() });
    await this.set(KEYS.ORAL_SCORES, scores);
  },

  async updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = await this.get(KEYS.LAST_STUDY_DATE);
    let streak = (await this.get(KEYS.STUDY_STREAK)) || 0;

    if (lastDate === today) return streak;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    streak = lastDate === yesterday ? streak + 1 : 1;

    await this.set(KEYS.STUDY_STREAK, streak);
    await this.set(KEYS.LAST_STUDY_DATE, today);

    // Update daily activity
    const activity = (await this.get(KEYS.DAILY_ACTIVITY)) || {};
    activity[today] = (activity[today] || 0) + 1;
    await this.set(KEYS.DAILY_ACTIVITY, activity);

    return streak;
  },

  async getStreak() {
    const lastDate = await this.get(KEYS.LAST_STUDY_DATE);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (lastDate !== today && lastDate !== yesterday) return 0;
    return (await this.get(KEYS.STUDY_STREAK)) || 0;
  },

  async incrementQuestions(count = 1) {
    const total = ((await this.get(KEYS.TOTAL_QUESTIONS)) || 0) + count;
    await this.set(KEYS.TOTAL_QUESTIONS, total);
    return total;
  },

  async getTotalQuestions() {
    return (await this.get(KEYS.TOTAL_QUESTIONS)) || 0;
  },

  async getDailyActivity() {
    return (await this.get(KEYS.DAILY_ACTIVITY)) || {};
  },

  async addStudyTime(minutes) {
    const total = ((await this.get(KEYS.TOTAL_STUDY_TIME)) || 0) + minutes;
    await this.set(KEYS.TOTAL_STUDY_TIME, total);
    return total;
  },

  async getTotalStudyTime() {
    return (await this.get(KEYS.TOTAL_STUDY_TIME)) || 0;
  },

  async getMasteredCards() {
    const progress = await this.getFlashcardProgress();
    let mastered = 0;
    Object.values(progress).forEach(deck => {
      Object.values(deck).forEach(card => {
        if (card.easy >= 3) mastered++;
      });
    });
    return mastered;
  },
};

export default storage;
