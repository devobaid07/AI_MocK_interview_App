import React from 'react';
import { useInterview } from '../context/InterviewContext';
export const Dashboard: React.FC = () => {
  const { history, setScreen, setActiveReport, deleteReport } = useInterview();
  // Metrics calculations
  const totalSessions = history.length;
  const avgScore = totalSessions > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.overallScore, 0) / totalSessions) 
    : 0;
  // Streak simulation: count consecutive sessions or mock days
  const practiceStreak = totalSessions > 0 ? Math.min(10, totalSessions * 2 + 1) : 0;
  
  // Calculate average category metrics
  const avgComm = totalSessions > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.scores.communication, 0) / totalSessions)
    : 0;
  // Handler: Review past session
  const viewSession = (session: any) => {
    setActiveReport(session);
    setScreen('report');
  };
  // Render a custom SVG Area/Line Chart of scores over time
  const renderTrendChart = () => {
    if (totalSessions === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', color: 'var(--text-muted)' }}>
          No session history available to chart. Complete your first mock session!
        </div>
      );
    }
    // Chart points calculation
    const height = 140;
    const width = 500;
    const padding = 20;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
