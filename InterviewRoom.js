
import React, { useEffect, useRef, useState } from 'react';
import { useInterview } from '../context/InterviewContext';
export const InterviewRoom: React.FC = () => {
  const {
    settings,
    activeQuestions,
    currentQuestionIndex,
    isFollowUpTurn,
    transcript,
    currentAnswer,
    setCurrentAnswer,
    isThinking,
    isSpeaking,
    isListening,
    
    // Code states
    codeContent,
    setCodeContent,
    codeLanguage,
    setCodeLanguage,
    consoleOutput,
    runCode,
    // Timers
    sessionTimer,
    questionTimer,
    // Actions
    sendAnswer,
    skipQuestion,
    endInterviewEarly,
    toggleSpeechListening,
    isSpeechSupported
  } = useInterview();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);
  // Initialize Webcam if video mode is enabled
  useEffect(() => {
    if (settings.interviewFormat === 'video') {
