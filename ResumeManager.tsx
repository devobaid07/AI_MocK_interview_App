import React, { useState, useRef } from 'react';
import { useInterview } from '../context/InterviewContext';
interface ParsedResume {
  id: string;
  fileName: string;
  uploadDate: string;
  data: {
    skills: string[];
    experience: string[];
    projects: string[];
  };
}
const mockResumes: ParsedResume[] = [
  {
    id: 'res_1',
    fileName: 'Software_Engineer_Resume_2026.pdf',
    uploadDate: '2026-06-28',
    data: {
      skills: ['React', 'TypeScript', 'Node.js', 'Python'],
      experience: ['Senior Frontend Developer at TechCorp (2023-Present)', 'Web Developer at StartUp Inc (2020-2023)'],
      projects: ['E-commerce Dashboard Redesign', 'Real-time Chat App']
    }
  }
];
export const ResumeManager: React.FC = () => {
  const { settings, updateSettings } = useInterview();
  const [resumes, setResumes] = useState<ParsedResume[]>(mockResumes);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    
    // Simulate parsing delay
    setTimeout(() => {
      const newResume: ParsedResume = {
        id: `res_${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
