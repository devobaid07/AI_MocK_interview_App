
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { 
  Question, 
  AnswerEvaluation, 
  InterviewSessionSummary
} from '../services/interviewerEngine';
import {
  generateSessionQuestions,
  generateFollowUpQuestion,
  evaluateAnswer,
  compileSessionReport
} from '../services/interviewerEngine';
export interface UserSettings {
  role: string;
  level: string;
  industry: string;
  type: 'behavioral' | 'technical' | 'case' | 'hr';
  persona: 'friendly' | 'neutral' | 'strict';
  interviewFormat: 'text' | 'voice' | 'video';
  voiceGender: 'male' | 'female';
  questionCount: number;
  resumeFileName: string;
  resumeParsedData?: { skills: string[]; experience: string[]; projects: string[] };
  jobDescription: string;
  customQuestionsText: string;
}
interface InterviewContextType {
  screen: 'dashboard' | 'settings' | 'room' | 'report' | 'questionBank' | 'resumes' | 'history';
  setScreen: (screen: 'dashboard' | 'settings' | 'room' | 'report' | 'questionBank' | 'resumes' | 'history') => void;
  
  // Settings & History
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  history: InterviewSessionSummary[];
  activeReport: InterviewSessionSummary | null;
  setActiveReport: (report: InterviewSessionSummary | null) => void;
  deleteReport: (id: string) => void;
  
  // Active Room State
  activeQuestions: Question[];
  currentQuestionIndex: number;
  isFollowUpTurn: boolean;
  transcript: { sender: 'ai' | 'user'; text: string; timestamp: string }[];
  currentAnswer: string;
  setCurrentAnswer: (ans: string) => void;
  isThinking: boolean;
