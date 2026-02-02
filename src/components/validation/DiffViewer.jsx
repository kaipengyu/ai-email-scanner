import React from 'react';
import DiffLine from './DiffLine';
import { createSnippetDiff, getChangeStatus } from '../../utils/diffUtils';

const DiffViewer = ({
  issues,
  acceptedChanges,
  rejectedChanges,
  onAccept,
  onReject,
  onAcceptAll,
}) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="pte-diff-viewer pte-diff-viewer--empty">
        <p>No issues found. Your HTML passed all validation checks!</p>
      </div>
    );
  }

  const pendingCount = issues.filter(
    (issue) => !acceptedChanges.has(issue.id) && !rejectedChanges.has(issue.id)
  ).length;

  return (
    <div className="pte-diff-viewer">
      <div className="pte-diff-toolbar">
        <span className="pte-diff-count">
          {issues.length} issue{issues.length !== 1 ? 's' : ''} found
          {pendingCount > 0 && ` (${pendingCount} pending)`}
        </span>
        {pendingCount > 0 && (
          <button className="pte-accept-all-btn" onClick={onAcceptAll}>
            Accept All Changes
          </button>
        )}
      </div>

      <div className="pte-diff-issues">
        {issues.map((issue) => {
          const status = getChangeStatus(
            issue.id,
            acceptedChanges,
            rejectedChanges
          );
          const diffLines = createSnippetDiff(
            issue.originalCode,
            issue.suggestedCode
          );

          return (
            <div
              key={issue.id}
              className={`pte-diff-issue pte-diff-issue--${status}`}
            >
              <div className="pte-diff-issue-header">
                <span
                  className={`pte-diff-severity pte-diff-severity--${issue.severity}`}
                >
                  {issue.severity}
                </span>
                <span className="pte-diff-category">{issue.category}</span>
                {issue.lineNumber && (
                  <span className="pte-diff-line-ref">
                    Line {issue.lineNumber}
                  </span>
                )}
              </div>

              <p className="pte-diff-description">{issue.description}</p>

              <div className="pte-diff-code">
                {diffLines.map((line, idx) => (
                  <DiffLine
                    key={`${issue.id}-${idx}`}
                    line={line}
                    status={status}
                    showActions={
                      idx === diffLines.length - 1 && status === 'pending'
                    }
                    issueId={issue.id}
                    onAccept={onAccept}
                    onReject={onReject}
                  />
                ))}
              </div>

              {status !== 'pending' && (
                <div className="pte-diff-issue-actions">
                  {status === 'accepted' ? (
                    <button
                      className="pte-diff-btn-undo"
                      onClick={() => onReject(issue.id)}
                    >
                      Undo (Reject instead)
                    </button>
                  ) : (
                    <button
                      className="pte-diff-btn-undo"
                      onClick={() => onAccept(issue.id)}
                    >
                      Undo (Accept instead)
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiffViewer;
