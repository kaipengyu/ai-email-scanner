import { diffLines } from 'diff';

/**
 * Compute line-by-line diff between original and modified HTML
 * @param {string} original - Original HTML content
 * @param {string} modified - Modified HTML content
 * @returns {Array} Array of diff line objects
 */
export const computeDiff = (original, modified) => {
  const changes = diffLines(original, modified);
  const result = [];
  let lineNumber = 1;

  changes.forEach((change) => {
    const lines = change.value.split('\n');
    // Remove last empty string from split if the value ends with newline
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }

    lines.forEach((line) => {
      if (change.added) {
        result.push({
          type: 'addition',
          content: line,
          lineNumber: null, // New lines don't have original line numbers
        });
      } else if (change.removed) {
        result.push({
          type: 'deletion',
          content: line,
          lineNumber: lineNumber,
        });
        lineNumber++;
      } else {
        result.push({
          type: 'unchanged',
          content: line,
          lineNumber: lineNumber,
        });
        lineNumber++;
      }
    });
  });

  return result;
};

/**
 * Group diff lines by change context (for showing related additions/deletions together)
 * @param {Array} diffLines - Array of diff line objects
 * @returns {Array} Array of change groups
 */
export const groupDiffChanges = (diffLines) => {
  const groups = [];
  let currentGroup = null;

  diffLines.forEach((line, index) => {
    if (line.type === 'unchanged') {
      if (currentGroup) {
        groups.push(currentGroup);
        currentGroup = null;
      }
      groups.push({ type: 'context', lines: [line], index });
    } else {
      if (!currentGroup) {
        currentGroup = { type: 'change', lines: [], startIndex: index };
      }
      currentGroup.lines.push(line);
    }
  });

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
};

/**
 * Apply accepted changes to original HTML
 * @param {string} originalHtml - Original HTML content
 * @param {Array} issues - Array of validation issues
 * @param {Set} acceptedIds - Set of accepted change IDs
 * @returns {string} HTML with accepted changes applied
 */
export const applyAcceptedChanges = (originalHtml, issues, acceptedIds) => {
  if (!issues || acceptedIds.size === 0) {
    return originalHtml;
  }

  let result = originalHtml;

  // Sort issues by line number in reverse to apply from bottom to top
  // This prevents line number shifts from affecting earlier replacements
  const sortedIssues = [...issues]
    .filter((issue) => acceptedIds.has(issue.id))
    .sort((a, b) => b.lineNumber - a.lineNumber);

  sortedIssues.forEach((issue) => {
    if (issue.originalCode && issue.suggestedCode) {
      // Escape special regex characters in the original code
      const escapedOriginal = issue.originalCode.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      );
      const regex = new RegExp(escapedOriginal, 'g');
      result = result.replace(regex, issue.suggestedCode);
    }
  });

  return result;
};

/**
 * Get change status for an issue
 * @param {string} issueId - Issue ID
 * @param {Set} acceptedChanges - Set of accepted change IDs
 * @param {Set} rejectedChanges - Set of rejected change IDs
 * @returns {'pending' | 'accepted' | 'rejected'}
 */
export const getChangeStatus = (issueId, acceptedChanges, rejectedChanges) => {
  if (acceptedChanges.has(issueId)) return 'accepted';
  if (rejectedChanges.has(issueId)) return 'rejected';
  return 'pending';
};

/**
 * Create a diff between original code snippet and suggested fix
 * @param {string} original - Original code snippet
 * @param {string} suggested - Suggested fix
 * @returns {Array} Array of diff line objects
 */
export const createSnippetDiff = (original, suggested) => {
  return computeDiff(original, suggested);
};

export default {
  computeDiff,
  groupDiffChanges,
  applyAcceptedChanges,
  getChangeStatus,
  createSnippetDiff,
};
