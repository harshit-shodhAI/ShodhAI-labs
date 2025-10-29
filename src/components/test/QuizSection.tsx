import { Section, QuestionType } from "../../types/question.types";
import MCQQuestion from "./MCQQuestion";
import IntegerQuestion from "./IntegerQuestion";
import { Answers } from "@/features/test/test.model";

interface QuizSectionProps {
  section: Section;
  sectionIndex: number;
  answers: Answers;
  onAnswerChange: (questionNumber: number, answer: string | number) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  section,
  sectionIndex,
  answers,
  onAnswerChange,
}) => {
  const absoluteQuestionNumber = (index: number) =>
    sectionIndex * 5 + index + 1;

  return (
    <>
      <h2 className="px-2 text-2xl font-bold tracking-[-0.015em]">{`Section ${
        sectionIndex + 1
      }: ${section.title}`}</h2>
      <div className="space-y-6">
        {section.questions.map((question, index) => {
          const questionNum = absoluteQuestionNumber(index);
          switch (question.type) {
            case QuestionType.MCQ:
              return (
                <MCQQuestion
                  key={questionNum}
                  question={question}
                  questionNumber={questionNum}
                  onAnswerChange={onAnswerChange}
                />
              );
            case QuestionType.Integer:
              return (
                <IntegerQuestion
                  key={questionNum}
                  question={question}
                  questionNumber={questionNum}
                  value={
                    answers[questionNum - 1] !== undefined
                      ? String(answers[questionNum - 1])
                      : ""
                  }
                  onAnswerChange={onAnswerChange}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </>
  );
};

export default QuizSection;
