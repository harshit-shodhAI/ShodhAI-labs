import { IntegerQuestion as IntegerQuestionType } from "../../types/question.types";
import { FormInput } from "../common/FormInput";

interface IntegerQuestionProps {
  question: IntegerQuestionType;
  questionNumber: number;
  value?: string;
  onAnswerChange: (questionNumber: number, answer: string | number) => void;
}

const IntegerQuestion: React.FC<IntegerQuestionProps> = ({
  question,
  questionNumber,
  value,
  onAnswerChange,
}) => {
  const questionIndex = questionNumber - 1;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value;
    if (stringValue === "") {
      onAnswerChange(questionIndex, "");
    } else {
      const numberValue = parseInt(stringValue, 10);
      if (!isNaN(numberValue)) {
        onAnswerChange(questionIndex, numberValue);
      }
    }
  };

  return (
    <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-5 shadow-sm sm:p-6">
      <p className="mb-4 text-base font-medium">
        <span className="font-bold">{questionNumber}.</span> {question.question}
      </p>
      <div>
        <FormInput
          label=""
          name={`question-${questionNumber}`}
          value={value || ""}
          onChange={handleChange}
          type="number"
          placeholder="Enter your answer"
        />
      </div>
    </div>
  );
};

export default IntegerQuestion;
