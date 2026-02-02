import React from 'react';
import { VALIDATION_CATEGORIES } from '../../constants/validationSchema';

const CATEGORY_LABELS = {
  [VALIDATION_CATEGORIES.BROKEN_LINKS]: 'Broken Links',
  [VALIDATION_CATEGORIES.ALT_TAGS]: 'Alt Tags',
  [VALIDATION_CATEGORIES.BRAND_COLORS]: 'Brand Colors',
  [VALIDATION_CATEGORIES.FONTS]: 'Font Validation',
  [VALIDATION_CATEGORIES.BROKEN_CODE]: 'Broken Code',
  [VALIDATION_CATEGORIES.W3C_REQUIREMENTS]: 'W3C Requirements',
};

const ValidationResults = ({ summary }) => {
  if (!summary) {
    return null;
  }

  const { totalIssues, byCategory, bySeverity } = summary;

  return (
    <div className="pte-validation-summary">
      <div className="pte-validation-summary-header">
        <h3>Validation Summary</h3>
        <span
          className={`pte-validation-total ${
            totalIssues === 0 ? 'pte-validation-total--success' : ''
          }`}
        >
          {totalIssues === 0
            ? 'All checks passed!'
            : `${totalIssues} issue${totalIssues !== 1 ? 's' : ''} found`}
        </span>
      </div>

      {totalIssues > 0 && (
        <>
          <div className="pte-validation-severity-grid">
            <div className="pte-validation-severity pte-validation-severity--error">
              <span className="pte-validation-severity-count">
                {bySeverity?.error || 0}
              </span>
              <span className="pte-validation-severity-label">Errors</span>
            </div>
            <div className="pte-validation-severity pte-validation-severity--warning">
              <span className="pte-validation-severity-count">
                {bySeverity?.warning || 0}
              </span>
              <span className="pte-validation-severity-label">Warnings</span>
            </div>
            <div className="pte-validation-severity pte-validation-severity--info">
              <span className="pte-validation-severity-count">
                {bySeverity?.info || 0}
              </span>
              <span className="pte-validation-severity-label">Info</span>
            </div>
          </div>

          <div className="pte-validation-categories">
            <h4>Issues by Category</h4>
            <div className="pte-validation-category-grid">
              {Object.entries(byCategory || {}).map(([category, count]) => (
                <div
                  key={category}
                  className={`pte-validation-category ${
                    count > 0 ? 'pte-validation-category--has-issues' : ''
                  }`}
                >
                  <span className="pte-validation-category-count">{count}</span>
                  <span className="pte-validation-category-label">
                    {CATEGORY_LABELS[category] || category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ValidationResults;
