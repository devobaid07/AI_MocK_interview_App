              </div>
              {ev.quoteCorrection && ev.quoteCorrection !== 'N/A' && (
                <div className="qa-quote-highlight">
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', fontStyle: 'normal', color: 'var(--warning)', fontWeight: 700, marginBottom: '4px' }}>
                    🎙️ AI Delivery Coaching Note
                  </div>
                  {ev.quoteCorrection}
                </div>
              )}
              <div className="qa-model-answer">
                <div className="qa-label" style={{ color: 'var(--success)' }}>Model Exemplary Answer</div>
                <div className="qa-text" style={{ color: 'var(--text-primary)' }}>{ev.modelAnswer}</div>
              </div>
              <div className="qa-metrics-row">
                <span className={`qa-metric-badge ${ev.score >= 80 ? 'green' : ev.score >= 60 ? 'orange' : ''}`}>
                  Score: {ev.score}%
                </span>
                
                {ev.totalFillerCount > 0 && (
                  <span className="qa-metric-badge orange">
                    Filler Words: {ev.totalFillerCount}
                  </span>
                )}
                
                {/* STAR structures badge check */}
                {Object.entries(ev.starStructure).map(([star, present]) => (
                  <span 
                    key={star} 
                    className={`qa-metric-badge ${present ? 'green' : ''}`}
                    style={{ textTransform: 'uppercase', fontSize: '10px' }}
                  >
                    {star.charAt(0)}: {present ? '✓' : '✗'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
