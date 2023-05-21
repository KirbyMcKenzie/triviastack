import { getRandomCollectionItem } from "./random";

export const getGameOverResponse = (score: number, max: number): string => {
  const percent = (100 * score) / max;

  switch (true) {
    case percent >= 100:
      return getRandomCollectionItem(SCORE_RESPONSES["PERFECT"]);
    case percent < 100 && percent >= 80:
      return getRandomCollectionItem(SCORE_RESPONSES["GREAT"]);
    case percent < 80 && percent >= 60:
      return getRandomCollectionItem(SCORE_RESPONSES["GOOD"]);
    case percent < 60 && percent >= 50:
      return getRandomCollectionItem(SCORE_RESPONSES["OKAY"]);
    case percent < 50 && percent >= 30:
      return getRandomCollectionItem(SCORE_RESPONSES["POOR"]);
    default:
      return getRandomCollectionItem(SCORE_RESPONSES["AWFUL"]);
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
  "Great job! Perfect score!",
  "Incredible! Couldn't be better!",
  "Flawless! You're a pro!",
  "Wow! You nailed it!",
  "Amazing work! You're unstoppable!",
  "Outstanding! Perfect score!",
  "Impressive! You're a natural!",
  "Brilliant! Flawless victory!",
  "Excellent! You aced it!",
  "Perfection! Well done!",
];

export const GREAT_SCORE_RESPONSES = [
  "Nice work! You're mastering this!",
  "Fantastic! You're on fire!",
  "Impressive! Keep it up!",
  "Well done! Great score!",
  "Terrific effort! Keep going!",
  "Bravo! You're doing amazing!",
  "Awesome job! Great score!",
  "Superb performance! Keep it up!",
  "You're crushing it! Great score!",
  "Fantastic work! You're unstoppable!",
];

export const GOOD_SCORE_RESPONSES = [
  "Good job! Excellent progress!",
  "Well done! You're getting the hang of it!",
  "Nice work! Getting better!",
  "Keep it up! Good score!",
  "Solid effort! You're improving!",
  "Thumbs up! Good job!",
  "You're doing great! Good score!",
  "Well played! Good job!",
  "You're on the right track! Good score!",
  "Impressive! You're making progress!",
];

export const OKAY_SCORE_RESPONSES = [
  "Okay, not bad! You're getting there!",
  "Decent effort! Keep practicing!",
  "Not too shabby! Keep it up!",
  "Nice try! Keep going!",
  "You're making progress! Okay score!",
  "Not bad at all! Keep it up!",
  "You're on the right path! Okay score!",
  "Good effort! Okay score!",
  "Well done! You're improving! Okay score!",
  "You're getting better! Okay score!",
];

export const POOR_SCORE_RESPONSES = [
  "Hmm, a little off this time.",
  "Keep trying! You'll improve!",
  "Don't worry! You'll get better!",
  "You can do it! Poor score!",
  "Mistakes happen! Keep going!",
  "Don't give up! Poor score!",
  "Keep practicing! Poor score!",
  "It's okay! You'll bounce back!",
  "Stay positive! Poor score!",
  "You're learning! Poor score!",
];

export const AWFUL_SCORE_RESPONSES = [
  "Oh damn, didn't even get one correct",
  "Thats embarrassing",
  "oof",
  "Yikes",
  "What a train wreck!",
  "Did you forget how to play?",
  "Better luck next time!",
  "(╯°□°)╯︵ ┻━┻",
];

export const SCORE_RESPONSES = {
  PERFECT: PERFECT_SCORE_RESPONSES,
  GREAT: GREAT_SCORE_RESPONSES,
  GOOD: GOOD_SCORE_RESPONSES,
  OKAY: OKAY_SCORE_RESPONSES,
  POOR: POOR_SCORE_RESPONSES,
  AWFUL: AWFUL_SCORE_RESPONSES,
};
