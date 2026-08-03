
import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import { simulateResumeParsing } from '../services/interviewerEngine';
export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings, startInterview, setScreen } = useInterview();
  const [resumeFileName, setResumeFileName] = useState(settings.resumeFileName);
  const [isDragOver, setIsDragOver] = useState(false);
  // Resume Upload Simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processSimulatedFile(files[0].name);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processSimulatedFile(files[0].name);
    }
  };
  const processSimulatedFile = (name: string) => {
    // Generate simulated resume keywords based on name/file structure
    const parsed = simulateResumeParsing(name, "React Node Python SQL AWS Docker Kubernetes");
    setResumeFileName(name);
    updateSettings({
      resumeFileName: name,
      resumeParsedData: parsed
    });
  };
