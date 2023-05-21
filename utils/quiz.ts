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
      return getRandomCollectionItem(["💯💯💯", "🏆🏆🏆", "💎💎💎"]);
    case percent < 100 && percent >= 80:
      return getRandomCollectionItem(["🔥", "💃", "🕺", "🤩", "🧐", "🥇"]);
    case percent < 80 && percent >= 60:
      return getRandomCollectionItem(["👏", "🪄", "🥳", "😎", "🥈"]);
    case percent < 60 && percent >= 50:
      return getRandomCollectionItem(["😁", "🥸", "😋", "🥉"]);
    case percent < 50 && percent >= 30:
      return getRandomCollectionItem(["😟", "😵‍💫", "🥴", "😬"]);
    default:
      return getRandomCollectionItem(["💩", "💀", "🫣", "😵", "🤡"]);
  }
};

export const PERFECT_SCORE_RESPONSES = [
  "Flawless victory!",
  "You're a genius!",
  "Unbelievable performance!",
  "You aced it!",
  "Mind-blowing work!",
  "Absolutely outstanding!",
  "Perfection personified!",
  "You're on fire!",
  "Stellar job, superstar!",
  "Masterful execution!",
  "Excellence at its finest!",
  "You're unstoppable!",
  "Astounding display of skill!",
  "A perfect masterpiece!",
  "Unparalleled achievement!",
  "Pure brilliance!",
  "Unreal performance!",
  "You're a legend!",
  "Unmatched success!",
  "Incredible triumph!",
];

export const GOOD_SCORE_RESPONSES = [
  "You're rocking it!",
  "Way to go!",
  "Fantastic effort!",
  "Bravo!",
  "You're killing it!",
  "Impressive skills!",
  "Terrific job!",
  "You're a star!",
  "Keep up the amazing work!",
  "Superb performance!",
  "Outstanding display!",
  "You're nailing it!",
  "Excellent job, champ!",
  "Great work, maestro!",
  "You're crushing it!",
  "Exceptional talent!",
  "Magnificent effort!",
  "You've got what it takes!",
  "Top-notch performance!",
  "Remarkable achievement!",
];

export const OKAY_SCORE_RESPONSES = [
  "Not too shabby!",
  "Decent work!",
  "Progress is evident!",
  "You're making strides!",
  "You're on the right path!",
  "Promising performance!",
  "Keep pushing forward!",
  "You're improving!",
  "Showing potential!",
  "Good effort!",
  "Room for growth, but not bad!",
  "You're getting there!",
  "Getting better every time!",
  "Noteworthy attempt!",
  "Keep it up!",
  "You're on the rise!",
  "Moving in the right direction!",
  "You're making headway!",
  "Growing skills!",
  "Nice progress!",
];

export const POOR_SCORE_RESPONSES = [
  "Step up your game!",
  "You can do better than this!",
  "Don't give up!",
  "Disappointing effort.",
  "You're capable of more!",
  "Try harder next time!",
  "Learn from this experience!",
  "You're stronger than this!",
  "Keep practicing!",
  "Persevere and improve!",
  "Don't lose heart!",
  "Chin up and try again!",
  "Failure is a stepping stone!",
  "Don't let setbacks define you!",
  "Believe in your abilities!",
  "Don't settle for mediocrity!",
  "Challenge yourself to grow!",
  "Strive for greatness!",
  "Turn this setback into a comeback!",
  "Dust yourself off and try again!",
];

export const SCORE_RESPONSES = {
  PERFECT: PERFECT_SCORE_RESPONSES,
  GOOD: GOOD_SCORE_RESPONSES,
  OKAY: OKAY_SCORE_RESPONSES,
  POOR: POOR_SCORE_RESPONSES,
};
