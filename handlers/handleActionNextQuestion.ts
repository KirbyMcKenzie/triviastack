import {
  AckFn,
  SayArguments,
  DialogValidation,
  SlackAction,
  RespondFn,
  SayFn,
} from "@slack/bolt";
import {
  getCurrentQuizByChannelId,
  updateQuiz,
  updateQuizCurrentQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import {
  buildQuizCompleteBlock,
  buildQuestionAnswersBlock,
  buildQuestionBlock,
} from "utils/blocks";

export const handleActionNextQuestion = async (
  ack: AckFn<void> | AckFn<string | SayArguments> | AckFn<DialogValidation>,
  body: SlackAction,
  say: SayFn,
  respond: RespondFn
) => {
  await ack();

  try {
    const answerValue = (body as any).actions[0].value;
    const channelId = (body as any).channel.id;

    const quiz = await getCurrentQuizByChannelId(channelId);
    const { id, currentQuestion, questions } = quiz;

    const nextQuestion = questions[currentQuestion];
    const previousQuestion = questions[currentQuestion - 1];
    const isCorrect = previousQuestion.correct_answer === answerValue;

    const updatedQuestions = questions.map((q: Question, index: number) =>
      index + 1 === currentQuestion ? { ...q, is_correct: isCorrect } : q
    );

    // TODO: finish quiz - maybe move
    if (currentQuestion === questions.length) {
      // TODO: investigate if we should map these
      //@ts-ignore
      await updateQuiz(id, { is_active: false });

      const score = updatedQuestions.filter(
        //@ts-ignore
        (q: Question) => q.is_correct
      ).length;

      const quizCompleteBlock = buildQuizCompleteBlock(score, questions.length);
      await respond(quizCompleteBlock);
      return;
    }

    await updateQuizCurrentQuestion(id, currentQuestion + 1);

    // TODO: consider merging question and answer block
    const answersBlock = buildQuestionAnswersBlock(
      nextQuestion.answers,
      nextQuestion.type
    );

    const questionBlock = buildQuestionBlock({
      text: nextQuestion.question,
      questionNumber: currentQuestion + 1,
      totalQuestions: questions.length,
      difficulty: nextQuestion.difficulty,
      category: nextQuestion.category,
      answers: answersBlock,
    });

    await respond(questionBlock);
  } catch (error) {
    await say(
      ":confused:  There was an issue processing that click. Let me fetch the logs.."
    );
    console.log(error);
    await say(`:bug:  ${(error as string).toString()}`);
  }
};
