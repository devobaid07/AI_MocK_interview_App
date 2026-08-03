import React from 'react';
import { useInterview } from '../context/InterviewContext';
export const History: React.FC = () => {
  const { history, setActiveReport, setScreen, deleteReport } = useInterview();
  const handleReview = (id: string) => {
    const report = history.find(h => h.id === id);
    if (report) {
      setActiveReport(report);
      setScreen('report');
    }
  };
  // Calculate some aggregate stats
  const totalInterviews = history.length;
  const avgScore = totalInterviews > 0 
    ? Math.round(history.reduce((sum, h) => sum + h.overallScore, 0) / totalInterviews)
    : 0;
  
  const recentScores = history.slice(0, 5).map(h => h.overallScore).reverse();
  const trend = recentScores.length >= 2 ? recentScores[recentScores.length - 1] - recentScores[recentScores.length - 2] : 0;
  return (
    <div className="panel-container" style={{ paddingBottom: '60px' }}>
      <div className="panel-header">
        <div>
          <h2>Interview History & Analytics</h2>
          <p>Track your progress and review past performance reports.</p>
        </div>
      </div>
      {/* High-level Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Total Interviews</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>{totalInterviews}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Average Score</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
