import { Section, QuestionType, MCQ, IntegerQuestion as IntQType } from "@/types/question.types";
import { Answers } from "@/features/test/test.model";


const MCQComponent = ({ q, qNum, onAnswer }: { q: MCQ, qNum: number, onAnswer: any }) => (
  <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <p className="text-lg font-semibold text-[var(--text-primary)] mb-4">
      <span className="text-[var(--text-secondary)] mr-2">{qNum}.</span>
      {q.question}
    </p>
    <div className="grid grid-cols-1 gap-3">
      {q.options.map((opt) => (
        <label
          key={opt}
          className="option_card group flex items-center p-4 border border-[var(--border-default)] rounded-lg cursor-pointer hover:bg-[var(--neutral-50)] transition-all hover:border-[var(--primary-300)]"
        >
          <div className="flex items-center justify-center shrink-0">
            <input
              type="radio"
              name={`q-${qNum}`}
              value={opt}
              onChange={() => onAnswer(qNum - 1, opt)}
              className="w-5 h-5 accent-[var(--primary-600)] cursor-pointer"
            />
          </div>
          <span className="flex-1 text-center font-medium text-[var(--text-primary)] group-hover:text-[var(--primary-700)] transition-colors">
            {opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const IntegerComponent = ({ q, qNum, val, onAnswer }: { q: IntQType, qNum: number, val: string, onAnswer: any }) => (
  <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <p className="text-lg font-semibold text-[var(--text-primary)] mb-4">
      <span className="text-[var(--text-secondary)] mr-2">{qNum}.</span>
      {q.question}
    </p>
    <input
      type="number"
      className="input-field max-w-xs"
      placeholder="Type your answer..."
      value={val}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "") onAnswer(qNum - 1, "");
        else if (!isNaN(parseInt(v))) onAnswer(qNum - 1, parseInt(v));
      }}
    />
  </div>
);

// --- Main Section Component ---

export const QuizSection: React.FC<{
  section: Section;
  sectionIndex: number;
  answers: Answers;
  onAnswerChange: (n: number, a: string | number) => void;
}> = ({ section, sectionIndex, answers, onAnswerChange }) => {

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border-default)]">
        {section.title}
      </h2>

      {section.questions.map((q, idx) => {
        const absNum = sectionIndex * 5 + idx + 1;
        const savedVal = answers[absNum - 1] !== undefined ? String(answers[absNum - 1]) : "";

        return q.type === QuestionType.MCQ ? (
          <MCQComponent key={absNum} q={q as MCQ} qNum={absNum} onAnswer={onAnswerChange} />
        ) : (
          <IntegerComponent key={absNum} q={q as IntQType} qNum={absNum} val={savedVal} onAnswer={onAnswerChange} />
        );
      })}
    </div>
  );
};