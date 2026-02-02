import React from 'react';

const DiffLine = ({
  line,
  status = 'pending',
  onAccept,
  onReject,
  showActions = false,
  issueId,
}) => {
  const getLineClass = () => {
    const baseClass = 'pte-diff-line';
    const typeClass = `pte-diff-line--${line.type}`;
    const statusClass = status !== 'pending' ? `pte-diff-line--${status}` : '';
    return `${baseClass} ${typeClass} ${statusClass}`.trim();
  };

  const getGutterSymbol = () => {
    if (line.type === 'addition') return '+';
    if (line.type === 'deletion') return '-';
    return '';
  };

  return (
    <div className={getLineClass()}>
      <span className="pte-diff-gutter">
        {line.lineNumber !== null && (
          <span className="pte-diff-line-number">{line.lineNumber}</span>
        )}
        <span className="pte-diff-symbol">{getGutterSymbol()}</span>
      </span>
      <span className="pte-diff-content">
        <code>{line.content || ' '}</code>
      </span>
      {showActions && status === 'pending' && (
        <span className="pte-diff-actions">
          <button
            className="pte-diff-btn-accept"
            onClick={() => onAccept(issueId)}
            title="Accept this change"
          >
            Accept
          </button>
          <button
            className="pte-diff-btn-reject"
            onClick={() => onReject(issueId)}
            title="Reject this change"
          >
            Reject
          </button>
        </span>
      )}
      {status === 'accepted' && (
        <span className="pte-diff-status pte-diff-status--accepted">
          Accepted
        </span>
      )}
      {status === 'rejected' && (
        <span className="pte-diff-status pte-diff-status--rejected">
          Rejected
        </span>
      )}
    </div>
  );
};

export default DiffLine;
