import { MCQ as MCQType } from "@/types/question.types";

interface MCQQuestionProps {
  question: MCQType;
  questionNumber: number;
  onAnswerChange: (questionNumber: number, answer: string) => void;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({
  question,
  questionNumber,
  onAnswerChange,
}) => (
  <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-5 shadow-sm sm:p-6">
    <p className="mb-4 text-base font-medium">
      <span className="font-bold">{questionNumber}.</span> {question.question}
    </p>
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <label
          key={index}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:ring-2 has-[:checked]:ring-primary/50 dark:has-[:checked]:bg-primary/20"
        >
          <input
            className="h-5 w-5 border-border-light text-primary focus:ring-primary/50"
            name={`question-${questionNumber}`}
            type="radio"
            value={option}
            onChange={() => onAnswerChange(questionNumber - 1, option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default MCQQuestion;
