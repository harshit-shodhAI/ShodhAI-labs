import { Question, Section, QuestionType } from "@/types/question.types";

export const questions: Question[] = [
  {
    type: QuestionType.Integer,
    question:
      "A sequence is defined as: 2, 6, 12, 20, 30, 42, ... What is the 10th term of this sequence?",
    correct_answer: 110,
  },
  {
    type: QuestionType.MCQ,
    question:
      "Five people A, B, C, D, and E are sitting in a row. A is not adjacent to B or C. D is not adjacent to C or E. Who must be sitting in the middle?",
    options: ["A", "B", "C", "D", "E"],
    correct_answer: "B",
  },
  {
    type: QuestionType.Integer,
    question:
      "In a certain code, if TRANSFORM is written as 863529471, and REFORM is written as 625471, what is the code for MASTER?",
    correct_answer: 439856,
  },
  {
    type: QuestionType.MCQ,
    question:
      "A is B's brother. C is A's father. D is C's sister and E is D's mother. How is B related to E?",
    options: [
      "Granddaughter",
      "Great-granddaughter",
      "Daughter",
      "Granddaughter or Grandson",
      "Cannot be determined",
    ],
    correct_answer: "Granddaughter or Grandson",
  },
  {
    type: QuestionType.Integer,
    question:
      "How many ways can you select 3 numbers from {1, 2, 3, 4, 5, 6, 7} such that their sum is divisible by 3?",
    correct_answer: 15,
  },
  {
    type: QuestionType.MCQ,
    question:
      "Consider a matrix A = [[3, 1], [0, 3]]. What are the eigenvalues of A?",
    options: ["3, 3", "3, 0", "1, 3", "3, -3", "0, 0"],
    correct_answer: "3, 3",
  },
  {
    type: QuestionType.Integer,
    question:
      "What is the rank of the matrix [[1, 2, 3], [2, 4, 6], [3, 6, 9]]?",
    correct_answer: 1,
  },
  {
    type: QuestionType.MCQ,
    question:
      "If f(x) = x³ - 3x² + 2x, what is the value of the second derivative f''(x) at x = 2?",
    options: ["0", "6", "12", "8", "4"],
    correct_answer: "6",
  },
  {
    type: QuestionType.MCQ,
    question:
      "Given vectors u = [1, 2, 3] and v = [4, 5, 6], what is the value of u^T v (dot product)?",
    options: ["28", "32", "36", "24", "30"],
    correct_answer: "32",
  },
  {
    type: QuestionType.Integer,
    question:
      "What is the trace of the matrix [[4, -2, 3], [1, 5, 2], [0, 1, 6]]?",
    correct_answer: 15,
  },
  {
    type: QuestionType.MCQ,
    question:
      "In the bias-variance tradeoff, which regularization technique can set coefficients exactly to zero, performing implicit feature selection?",
    options: [
      "L2 Regularization (Ridge)",
      "L1 Regularization (Lasso)",
      "Elastic Net",
      "Dropout",
      "Early Stopping",
    ],
    correct_answer: "L1 Regularization (Lasso)",
  },
  {
    type: QuestionType.MCQ,
    question:
      "Consider a binary classification problem with 90 negative samples and 10 positive samples. Your model achieves 90% accuracy by predicting all samples as negative. What metric best reveals this issue?",
    options: [
      "Accuracy",
      "Recall",
      "Specificity",
      "AUC-ROC",
      "Mean Squared Error",
    ],
    correct_answer: "Recall",
  },
  {
    type: QuestionType.MCQ,
    question:
      "In K-fold cross-validation with K=5, if you have 1000 samples, how many samples are used for validation in each fold?",
    options: ["100", "150", "200", "250", "500"],
    correct_answer: "200",
  },
  {
    type: QuestionType.MCQ,
    question:
      "A decision tree learns perfectly on training data but performs poorly on test data. Which statement is most accurate?",
    options: [
      "The model has high bias and high variance",
      "The model has low bias and high variance",
      "The model has high bias and low variance",
      "The model needs more training data only",
      "The model needs deeper trees",
    ],
    correct_answer: "The model has low bias and high variance",
  },
  {
    type: QuestionType.MCQ,
    question:
      "Which of the following is TRUE about gradient boosting machines (GBM)?",
    options: [
      "They build trees in parallel like Random Forest",
      "They fit new models to residual errors of previous models",
      "They always use deep trees",
      "They are less prone to overfitting than Random Forest",
      "They don't require hyperparameter tuning",
    ],
    correct_answer: "They fit new models to residual errors of previous models",
  },
  {
    type: QuestionType.MCQ,
    question:
      "In the transformer architecture's self-attention mechanism, if the dimension of queries, keys, and values is d_k=64, and we have 8 attention heads, what is the total dimension of the multi-head attention output before the final linear transformation?",
    options: ["64", "128", "256", "512", "1024"],
    correct_answer: "512",
  },
  {
    type: QuestionType.MCQ,
    question:
      "In batch normalization, what happens differently during training versus inference?",
    options: [
      "Nothing, the process is identical",
      "Training uses batch statistics; inference uses running mean/variance from training",
      "Training normalizes; inference does not",
      "Inference uses dropout but training does not",
      "Training uses L1 regularization; inference uses L2",
    ],
    correct_answer:
      "Training uses batch statistics; inference uses running mean/variance from training",
  },
  {
    type: QuestionType.Integer,
    question:
      "A convolutional layer has input size 32×32×3, uses 64 filters of size 5×5, stride 1, and padding 2. What is the number of trainable parameters in thousands (round to nearest integer)?",
    correct_answer: 5,
  },
  {
    type: QuestionType.MCQ,
    question:
      "Which mechanism was introduced in LSTM to primarily address the vanishing gradient problem in standard RNNs?",
    options: [
      "Dropout layers",
      "Batch normalization",
      "Gating mechanisms (forget, input, output gates)",
      "Residual connections",
      "Attention mechanism",
    ],
    correct_answer: "Gating mechanisms (forget, input, output gates)",
  },
  {
    type: QuestionType.MCQ,
    question:
      "In the context of deep learning optimizers, what does the Adam optimizer combine?",
    options: [
      "SGD and Dropout",
      "Momentum and RMSprop",
      "L1 and L2 regularization",
      "Batch normalization and Layer normalization",
      "Gradient clipping and Early stopping",
    ],
    correct_answer: "Momentum and RMSprop",
  },
  {
    type: QuestionType.Integer,
    question:
      "If an algorithm has nested loops where the outer loop runs n times and inner loop runs i times (where i is the outer loop counter from 1 to n), the total operations are n(n+1)/2. For n=1000, approximately how many total operations occur (in thousands)?",
    correct_answer: 500,
  },
  {
    type: QuestionType.MCQ,
    question:
      "You need to find the kth largest element in an unsorted array of size n. What is the average time complexity of the Quickselect algorithm?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(k log n)", "O(log n)"],
    correct_answer: "O(n)",
  },
  {
    type: QuestionType.Integer,
    question:
      "A hash table of size 10 uses open addressing with linear probing. Keys {23, 43, 13, 27, 37} are inserted in order using hash function h(k) = k mod 10. How many total probes (including successful insertions) occur?",
    correct_answer: 8,
  },
  {
    type: QuestionType.MCQ,
    question:
      "In dynamic programming, what is the space complexity of computing the nth Fibonacci number using memoization (top-down approach)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)", "O(2^n)"],
    correct_answer: "O(n)",
  },
  {
    type: QuestionType.Integer,
    question:
      "A binary search tree is created by inserting the following sequence: 50, 30, 70, 20, 40, 60, 80. What is the height of the tree? (Height of single node is 0)",
    correct_answer: 2,
  },
];

export const SECTIONS: Section[] = [
  { title: "Logic & Reasoning", questions: questions.slice(0, 5) },
  { title: "Linear Algebra & Calculus", questions: questions.slice(5, 10) },
  { title: "Machine Learning Concepts", questions: questions.slice(10, 15) },
  {
    title: "Deep Learning & Neural Networks",
    questions: questions.slice(15, 20),
  },
  { title: "Algorithms & Data Structures", questions: questions.slice(20, 25) },
];

export const TOTAL_SECTIONS = SECTIONS.length;
