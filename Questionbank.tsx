import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
interface QuestionBankItem {
  id: string;
  category: 'behavioral' | 'technical' | 'hr' | 'case';
  role: string;
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
const mockQuestions: QuestionBankItem[] = [
  { id: 'q1', category: 'behavioral', role: 'Any', text: 'Tell me about a time you had to deal with a difficult coworker. How did you handle it?', difficulty: 'Medium' },
  { id: 'q2', category: 'technical', role: 'Software Engineer', text: 'Explain the difference between classical inheritance and prototypal inheritance in Javascript.', difficulty: 'Medium' },
  { id: 'q3', category: 'technical', role: 'Software Engineer', text: 'Design a scalable URL shortening service like Bitly.', difficulty: 'Hard' },
  { id: 'q4', category: 'hr', role: 'Any', text: 'Where do you see yourself in 5 years?', difficulty: 'Easy' },
  { id: 'q5', category: 'case', role: 'Product Manager', text: 'How would you improve the adoption rate of a new feature that has low engagement?', difficulty: 'Medium' },
  { id: 'q6', category: 'behavioral', role: 'Any', text: 'Describe a situation where you failed to meet a deadline. What happened and what did you learn?', difficulty: 'Medium' },
  { id: 'q7', category: 'technical', role: 'Data Scientist', text: 'Explain the bias-variance tradeoff and how it relates to model overfitting.', difficulty: 'Hard' },
  { id: 'q8', category: 'hr', role: 'Any', text: 'What is your greatest weakness?', difficulty: 'Medium' },
];
export const QuestionBank: React.FC = () => {
  const { updateSettings, startInterview } = useInterview();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const handlePractice = (question: QuestionBankItem) => {
    // We override settings temporarily to just ask this one question type/role
    // In a real app we'd pass a specific question ID to the engine
    updateSettings({
      type: question.category,
      role: question.role === 'Any' ? 'Software Engineer' : question.role, // Default to SWE if Any
      questionCount: 1 // Just one question
    });
    startInterview();
