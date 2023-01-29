import { getRandomCollectionItem } from "./random";

export const getGameOverResponse = (score: number, max: number): string => {
  const percent = (100 * score) / max;

  switch (true) {
    case percent >= 100:
      return getRandomCollectionItem(SCORE_RESPONSES["PERFECT"]);
    case percent < 100 && percent >= 80:
      return getRandomCollectionItem(SCORE_RESPONSES["GOOD"]);
    case percent < 80 && percent >= 60:
      return getRandomCollectionItem(SCORE_RESPONSES["OKAY"]);
    default:
      return getRandomCollectionItem(SCORE_RESPONSES["POOR"]);
  }
};

export const getGameOverEmoji = (score: number, max: number): string => {
  const percent = (100 * score) / max;

  switch (true) {
    case percent >= 100:
      return "😎";
    case percent < 100 && percent >= 80:
      return "🔥";
    case percent < 80 && percent >= 60:
      return "👏";
    default:
      return "💩";
  }
};

export const PERFECT_SCORE_RESPONSES = [
  "Amazing job!",
  "Perfect score, well done!",
  "Outstanding performance!",
  "You nailed it!",
  "Incredible work!",
];

export const GOOD_SCORE_RESPONSES = [
  "Great job!",
  "Well done!",
  "Nice work!",
  "Keep up the good work!",
  "Impressive score!",
];

export const OKAY_SCORE_RESPONSES = [
  "Not bad!",
  "You did okay.",
  "Could be better, but not bad.",
  "You're on the right track.",
  "You have room for improvement.",
];

export const POOR_SCORE_RESPONSES = [
  "You need to work harder.",
  "Not your best effort.",
  "Disappointing..",
  "You can do better than that.",
  "Try harder next time.",
];

export const SCORE_RESPONSES = {
  PERFECT: PERFECT_SCORE_RESPONSES,
  GOOD: GOOD_SCORE_RESPONSES,
  OKAY: OKAY_SCORE_RESPONSES,
  POOR: POOR_SCORE_RESPONSES,
};
