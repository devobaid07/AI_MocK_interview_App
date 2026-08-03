  transcript: { sender: 'ai' | 'user'; text: string; timestamp: string }[]
): InterviewSessionSummary {
  const avgScore = evaluations.reduce((acc, curr) => acc + curr.score, 0) / Math.max(1, evaluations.length);
  
  // Rubric scores derivation
  const structureScore = Math.round(
    evaluations.reduce((acc, curr) => {
      const starCount = Object.values(curr.starStructure).filter(Boolean).length;
      return acc + (starCount / 4) * 100;
    }, 0) / Math.max(1, evaluations.length)
  );
  const fillerCount = evaluations.reduce((acc, curr) => acc + curr.totalFillerCount, 0);
  const wordsCount = evaluations.reduce((acc, curr) => acc + curr.userAnswer.split(/\s+/).length, 0);
  const fillerDensity = fillerCount / Math.max(1, wordsCount);
  const communicationScore = Math.max(45, Math.min(98, Math.round(100 - fillerDensity * 200)));
  const contentScore = Math.round(avgScore * 1.05); // dynamic booster
  const confidenceScore = Math.max(40, Math.min(95, Math.round(avgScore - (persona === 'strict' ? 5 : 0))));
  const overallScore = Math.round((contentScore * 0.3) + (structureScore * 0.25) + (communicationScore * 0.25) + (confidenceScore * 0.2));
  return {
    id: `session_${Date.now()}`,
    role,
    level,
    industry,
    type,
    format,
    persona,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    durationMinutes: Math.round(transcript.length * 0.8), // simulated
    overallScore,
    scores: {
      content: Math.min(99, contentScore),
      structure: Math.min(99, structureScore),
      communication: Math.min(99, communicationScore),
      confidence: Math.min(99, confidenceScore),
      ...(format === 'video' ? { bodyLanguage: Math.max(50, Math.min(99, Math.round(avgScore * 0.95 + Math.random() * 10))) } : {})
    },
    evaluations,
    transcript
  };
}
