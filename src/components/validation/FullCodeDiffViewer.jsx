import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';

const FullCodeDiffViewer = ({
  originalHtml,
  issues,
  acceptedChanges,
  rejectedChanges,
  onAccept,
  onReject,
  onAcceptAll,
  viewMode,
  onViewModeChange,
  previewComponent,
  onCopy,
  onDownload,
}) => {
  const [activeIssue, setActiveIssue] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const lineRefs = useRef({});
  const containerRef = useRef(null);

  // Only update active issue when hovering a different issue (sticky sidebar)
  const handleIssueHover = (issue) => {
    if (!activeIssue || activeIssue.id !== issue.id) {
      setActiveIssue(issue);
    }
  };

  // Split original HTML into lines
  const lines = useMemo(() => {
    return originalHtml.split('\n');
  }, [originalHtml]);

  // Build a map of line numbers to issues by finding actual line containing originalCode
  const issuesByLine = useMemo(() => {
    const map = new Map();
    if (!issues || !lines.length) return map;

    // Track which lines have been assigned to avoid duplicates
    const assignedLines = new Set();

    issues.forEach((issue) => {
      // Find the actual line that contains the originalCode
      // Search starting from the AI's suggested line number (expanding outward)
      let actualLineNumber = null;
      const aiLine = issue.lineNumber - 1; // Convert to 0-indexed

      // Search in expanding radius from AI's suggested line
      for (let radius = 0; radius < lines.length; radius++) {
        // Check line at aiLine + radius
        const forwardIdx = aiLine + radius;
        if (forwardIdx < lines.length && forwardIdx >= 0) {
          if (lines[forwardIdx].includes(issue.originalCode) && !assignedLines.has(forwardIdx + 1)) {
            actualLineNumber = forwardIdx + 1;
            break;
          }
        }

        // Check line at aiLine - radius (skip if radius is 0 to avoid checking same line twice)
        if (radius > 0) {
          const backwardIdx = aiLine - radius;
          if (backwardIdx >= 0 && backwardIdx < lines.length) {
            if (lines[backwardIdx].includes(issue.originalCode) && !assignedLines.has(backwardIdx + 1)) {
              actualLineNumber = backwardIdx + 1;
              break;
            }
          }
        }
      }

      // If still not found, use the AI's suggested line number
      if (actualLineNumber === null) {
        actualLineNumber = issue.lineNumber;
      }

      // Mark this line as assigned
      assignedLines.add(actualLineNumber);

      // Store the corrected line number on the issue for display
      issue._actualLine = actualLineNumber;

      if (!map.has(actualLineNumber)) {
        map.set(actualLineNumber, []);
      }
      map.get(actualLineNumber).push(issue);
    });
    return map;
  }, [issues, lines]);

  const pendingCount = issues?.filter(
    (issue) => !acceptedChanges.has(issue.id) && !rejectedChanges.has(issue.id)
  ).length || 0;

  // Count pending issues by category
  const pendingByCategory = useMemo(() => {
    if (!issues) return {};
    const counts = {};
    issues.forEach((issue) => {
      if (!acceptedChanges.has(issue.id) && !rejectedChanges.has(issue.id)) {
        counts[issue.category] = (counts[issue.category] || 0) + 1;
      }
    });
    return counts;
  }, [issues, acceptedChanges, rejectedChanges]);

  const categoryLabels = {
    'broken-links': 'Links',
    'alt-tags': 'Alt Tags',
    'brand-colors': 'Colors',
    'fonts': 'Fonts',
    'broken-code': 'Code',
    'w3c-requirements': 'W3C',
  };

  const getIssueStatus = (issueId) => {
    if (acceptedChanges.has(issueId)) return 'accepted';
    if (rejectedChanges.has(issueId)) return 'rejected';
    return 'pending';
  };

  // Get sorted list of pending issues by line number
  const sortedPendingIssues = useMemo(() => {
    if (!issues) return [];
    return issues
      .filter(issue => !acceptedChanges.has(issue.id) && !rejectedChanges.has(issue.id))
      .sort((a, b) => (a._actualLine || a.lineNumber) - (b._actualLine || b.lineNumber));
  }, [issues, acceptedChanges, rejectedChanges]);

  // Scroll to the next pending issue after current one
  const scrollToNextPending = useCallback((currentIssueId) => {
    // Find current issue index in sorted pending list
    const currentIndex = sortedPendingIssues.findIndex(i => i.id === currentIssueId);

    // After accept/reject, this issue will be removed, so next is at same index
    // But we need to look at issues that will still be pending after this action
    const remainingPending = sortedPendingIssues.filter(i => i.id !== currentIssueId);

    if (remainingPending.length > 0) {
      // Find the next issue (same index or first if we were at end)
      const nextIssue = remainingPending[Math.min(currentIndex, remainingPending.length - 1)];
      const lineNum = nextIssue._actualLine || nextIssue.lineNumber;

      // Scroll to that line after a brief delay to let state update
      setTimeout(() => {
        const lineElement = lineRefs.current[lineNum];
        if (lineElement && containerRef.current) {
          lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setActiveIssue(nextIssue);
        }
      }, 100);
    } else {
      // No more pending issues, clear the active issue
      setActiveIssue(null);
    }
  }, [sortedPendingIssues]);

  // Wrapped handlers that scroll after action
  const handleAccept = useCallback((issueId) => {
    scrollToNextPending(issueId);
    onAccept(issueId);
  }, [onAccept, scrollToNextPending]);

  const handleReject = useCallback((issueId) => {
    scrollToNextPending(issueId);
    onReject(issueId);
  }, [onReject, scrollToNextPending]);

  // Auto-scroll to first pending issue on load
  useEffect(() => {
    if (sortedPendingIssues.length > 0 && Object.keys(lineRefs.current).length > 0) {
      const firstIssue = sortedPendingIssues[0];
      const lineNum = firstIssue._actualLine || firstIssue.lineNumber;

      setTimeout(() => {
        const lineElement = lineRefs.current[lineNum];
        if (lineElement) {
          lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setActiveIssue(firstIssue);
        }
      }, 300);
    }
  }, [issues]); // Only run when issues change (new validation)

  // Apply fix to a line
  const getFixedLine = (line, issue) => {
    if (line.includes(issue.originalCode)) {
      return line.replace(issue.originalCode, issue.suggestedCode);
    }
    // If exact match fails, return the suggested code
    return issue.suggestedCode;
  };

  if (!originalHtml) {
    return null;
  }

  return (
    <div className="pte-fullcode-viewer">
      <div className="pte-fullcode-toolbar">
        <div className="pte-fullcode-toolbar-left">
          <span className="pte-diff-count">
            {pendingCount > 0 ? (
              <><strong>{pendingCount}</strong> issue{pendingCount !== 1 ? 's' : ''} remaining</>
            ) : (
              <span className="pte-diff-count--done">All issues resolved</span>
            )}
          </span>
          <div className="pte-category-badges">
            {Object.entries(pendingByCategory).map(([category, count]) => (
              <span key={category} className="pte-category-badge">
                <strong>{count}</strong> {categoryLabels[category] || category}
              </span>
            ))}
          </div>
        </div>
        {pendingCount > 0 && (
          <button className="pte-accept-all-btn" onClick={onAcceptAll}>
            Accept All
          </button>
        )}
      </div>

      <div className="pte-view-toggle-row">
        <div className="pte-view-toggle">
          <button
            className={`pte-toggle-btn ${viewMode === 'code' ? 'active' : ''}`}
            onClick={() => onViewModeChange('code')}
          >
            Code View
          </button>
          <button
            className={`pte-toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => onViewModeChange('preview')}
          >
            Preview
          </button>
        </div>
        <div className="pte-view-toggle-actions">
          <button className="pte-btn pte-download-btn" onClick={onDownload}>
            Download Current HTML
          </button>
        </div>
      </div>

      {viewMode === 'code' ? (
      <div className="pte-fullcode-container">
        <div className="pte-fullcode-main" ref={containerRef}>
          <button className="pte-code-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <div className="pte-fullcode-code">
            {lines.map((line, idx) => {
              const lineNumber = idx + 1;
              const lineIssues = issuesByLine.get(lineNumber) || [];
              const hasIssues = lineIssues.length > 0;

              // Check status of all issues for this line
              const allAccepted = hasIssues && lineIssues.every(i => getIssueStatus(i.id) === 'accepted');
              const allRejected = hasIssues && lineIssues.every(i => getIssueStatus(i.id) === 'rejected');
              const hasPending = hasIssues && lineIssues.some(i => getIssueStatus(i.id) === 'pending');

              // Get the first pending issue for this line
              const pendingIssue = lineIssues.find(i => getIssueStatus(i.id) === 'pending');
              const acceptedIssue = lineIssues.find(i => getIssueStatus(i.id) === 'accepted');

              // Check if this line's issue is the active one
              const isActive = activeIssue && lineIssues.some(i => i.id === activeIssue.id);

              return (
                <div key={idx} className="pte-fullcode-line-group">
                  {/* Show deletion line for pending changes */}
                  {hasPending && (
                    <div
                      className={`pte-fullcode-line pte-fullcode-line--deletion ${isActive ? 'pte-fullcode-line--active' : ''}`}
                      onMouseEnter={() => handleIssueHover(pendingIssue)}
                    >
                      <span className="pte-fullcode-gutter">
                        <span className="pte-fullcode-linenum">{lineNumber}</span>
                        <span className="pte-fullcode-symbol">-</span>
                      </span>
                      <span className="pte-fullcode-content">
                        <code>{line || ' '}</code>
                      </span>
                    </div>
                  )}

                  {/* Show addition line with accept/reject for pending */}
                  {hasPending && pendingIssue && (
                    <div
                      ref={el => lineRefs.current[lineNumber] = el}
                      className={`pte-fullcode-line pte-fullcode-line--addition ${isActive ? 'pte-fullcode-line--active' : ''}`}
                      onMouseEnter={() => handleIssueHover(pendingIssue)}
                    >
                      <span className="pte-fullcode-gutter">
                        <span className="pte-fullcode-linenum"></span>
                        <span className="pte-fullcode-symbol">+</span>
                      </span>
                      <span className="pte-fullcode-content">
                        <code>{getFixedLine(line, pendingIssue)}</code>
                      </span>
                      <span className="pte-fullcode-actions">
                        <button
                          className="pte-fullcode-btn pte-fullcode-btn--accept"
                          onClick={() => handleAccept(pendingIssue.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="pte-fullcode-btn pte-fullcode-btn--reject"
                          onClick={() => handleReject(pendingIssue.id)}
                        >
                          Reject
                        </button>
                      </span>
                    </div>
                  )}

                  {/* Show accepted line (green) */}
                  {allAccepted && acceptedIssue && (
                    <div
                      className="pte-fullcode-line pte-fullcode-line--accepted"
                      onMouseEnter={() => handleIssueHover(acceptedIssue)}
                    >
                      <span className="pte-fullcode-gutter">
                        <span className="pte-fullcode-linenum">{lineNumber}</span>
                        <span className="pte-fullcode-symbol">+</span>
                      </span>
                      <span className="pte-fullcode-content">
                        <code>{getFixedLine(line, acceptedIssue)}</code>
                      </span>
                      <span className="pte-fullcode-status pte-fullcode-status--accepted">
                        Accepted
                      </span>
                    </div>
                  )}

                  {/* Show rejected - original line kept */}
                  {allRejected && (
                    <div
                      className="pte-fullcode-line pte-fullcode-line--rejected-kept"
                      onMouseEnter={() => handleIssueHover(lineIssues[0])}
                    >
                      <span className="pte-fullcode-gutter">
                        <span className="pte-fullcode-linenum">{lineNumber}</span>
                        <span className="pte-fullcode-symbol"></span>
                      </span>
                      <span className="pte-fullcode-content">
                        <code>{line || ' '}</code>
                      </span>
                      <span className="pte-fullcode-status pte-fullcode-status--rejected">
                        Kept original
                      </span>
                    </div>
                  )}

                  {/* Regular line without issues */}
                  {!hasIssues && (
                    <div className="pte-fullcode-line">
                      <span className="pte-fullcode-gutter">
                        <span className="pte-fullcode-linenum">{lineNumber}</span>
                        <span className="pte-fullcode-symbol"></span>
                      </span>
                      <span className="pte-fullcode-content">
                        <code>{line || ' '}</code>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Issue details sidebar */}
        <div className="pte-fullcode-sidebar">
          {activeIssue ? (
            <div className="pte-fullcode-issue-detail">
              <div className="pte-fullcode-issue-header">
                <span className={`pte-fullcode-severity pte-fullcode-severity--${activeIssue.severity}`}>
                  {activeIssue.severity}
                </span>
                <span className="pte-fullcode-category">
                  {activeIssue.category}
                </span>
                <span className="pte-fullcode-line-ref">
                  Line {activeIssue._actualLine || activeIssue.lineNumber}
                </span>
              </div>
              <p className="pte-fullcode-description">
                {activeIssue.description}
              </p>
              <div className="pte-fullcode-issue-code">
                <div className="pte-fullcode-issue-original">
                  <span className="pte-fullcode-issue-label">Original:</span>
                  <code>{activeIssue.originalCode}</code>
                </div>
                <div className="pte-fullcode-issue-suggested">
                  <span className="pte-fullcode-issue-label">Suggested fix:</span>
                  <code>{activeIssue.suggestedCode}</code>
                </div>
              </div>
              {getIssueStatus(activeIssue.id) === 'pending' && (
                <div className="pte-fullcode-sidebar-actions">
                  <button
                    className="pte-fullcode-sidebar-btn pte-fullcode-sidebar-btn--accept"
                    onClick={() => handleAccept(activeIssue.id)}
                  >
                    Accept Change
                  </button>
                  <button
                    className="pte-fullcode-sidebar-btn pte-fullcode-sidebar-btn--reject"
                    onClick={() => handleReject(activeIssue.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
              {getIssueStatus(activeIssue.id) === 'accepted' && (
                <div className="pte-fullcode-sidebar-status">
                  <span className="pte-fullcode-sidebar-badge pte-fullcode-sidebar-badge--accepted">
                    Change Accepted
                  </span>
                  <button
                    className="pte-fullcode-sidebar-revert"
                    onClick={() => onReject(activeIssue.id)}
                  >
                    Undo
                  </button>
                </div>
              )}
              {getIssueStatus(activeIssue.id) === 'rejected' && (
                <div className="pte-fullcode-sidebar-status">
                  <span className="pte-fullcode-sidebar-badge pte-fullcode-sidebar-badge--rejected">
                    Change Rejected
                  </span>
                  <button
                    className="pte-fullcode-sidebar-revert"
                    onClick={() => onAccept(activeIssue.id)}
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="pte-fullcode-sidebar-hint">
              <p>Hover over a highlighted line to see issue details</p>
              <div className="pte-fullcode-legend">
                <div className="pte-fullcode-legend-item">
                  <span className="pte-fullcode-legend-color pte-fullcode-legend-color--deletion"></span>
                  <span>Line to be removed</span>
                </div>
                <div className="pte-fullcode-legend-item">
                  <span className="pte-fullcode-legend-color pte-fullcode-legend-color--addition"></span>
                  <span>Suggested change</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      ) : (
        previewComponent
      )}
    </div>
  );
};

export default FullCodeDiffViewer;
