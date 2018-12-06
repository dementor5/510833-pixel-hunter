const Rule = {
  INITIAL_LIVE_COUNT: 4,
  CORRECT_ANSWER_AWARD: 100,
  PER_LIVE_AWARD: 50,
  FAST_ANSWER_AWARD: 50,
  SLOW_ANSWER_PENALTY: 50,
  FAST_ANSWER_TIME: 10,
  SLOW_ANSWER_TIME: 20,
};

export const INITIAL_GAME = Object.freeze({
  rules: Rule,
  games: [],
});
