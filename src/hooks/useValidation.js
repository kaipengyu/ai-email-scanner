import { useState, useMemo, useCallback } from 'react';
import { validateHtmlWithGemini } from '../utils/geminiApi';
import { applyAcceptedChanges } from '../utils/diffUtils';

/**
 * Custom hook for managing HTML validation state
 * @param {string} apiKey - Gemini API key
 * @returns {Object} Validation state and methods
 */
export const useValidation = (apiKey) => {
  const [originalHtml, setOriginalHtml] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [acceptedChanges, setAcceptedChanges] = useState(new Set());
  const [rejectedChanges, setRejectedChanges] = useState(new Set());
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(null);

  // Compute final HTML based on accepted changes
  const finalHtml = useMemo(() => {
    if (!validationResult?.issues || acceptedChanges.size === 0) {
      return originalHtml;
    }
    return applyAcceptedChanges(originalHtml, validationResult.issues, acceptedChanges);
  }, [originalHtml, validationResult, acceptedChanges]);

  // Compute pending changes (not yet accepted or rejected)
  const pendingChanges = useMemo(() => {
    if (!validationResult?.issues) return [];
    return validationResult.issues.filter(
      (issue) => !acceptedChanges.has(issue.id) && !rejectedChanges.has(issue.id)
    );
  }, [validationResult, acceptedChanges, rejectedChanges]);

  // Validate HTML content
  const validate = useCallback(async (htmlContent) => {
    if (!htmlContent) {
      setError('Please provide HTML content to validate');
      return;
    }

    setIsValidating(true);
    setError(null);
    setOriginalHtml(htmlContent);
    setAcceptedChanges(new Set());
    setRejectedChanges(new Set());

    try {
      const result = await validateHtmlWithGemini(htmlContent, apiKey);
      setValidationResult(result);
    } catch (err) {
      setError(err.message || 'Failed to validate HTML');
      setValidationResult(null);
    } finally {
      setIsValidating(false);
    }
  }, [apiKey]);

  // Accept a specific change
  const acceptChange = useCallback((issueId) => {
    setAcceptedChanges((prev) => {
      const next = new Set(prev);
      next.add(issueId);
      return next;
    });
    setRejectedChanges((prev) => {
      const next = new Set(prev);
      next.delete(issueId);
      return next;
    });
  }, []);

  // Reject a specific change
  const rejectChange = useCallback((issueId) => {
    setRejectedChanges((prev) => {
      const next = new Set(prev);
      next.add(issueId);
      return next;
    });
    setAcceptedChanges((prev) => {
      const next = new Set(prev);
      next.delete(issueId);
      return next;
    });
  }, []);

  // Accept all pending changes
  const acceptAll = useCallback(() => {
    if (!validationResult?.issues) return;

    const allIds = validationResult.issues.map((issue) => issue.id);
    setAcceptedChanges(new Set(allIds));
    setRejectedChanges(new Set());
  }, [validationResult]);

  // Reject all pending changes
  const rejectAll = useCallback(() => {
    if (!validationResult?.issues) return;

    const allIds = validationResult.issues.map((issue) => issue.id);
    setRejectedChanges(new Set(allIds));
    setAcceptedChanges(new Set());
  }, [validationResult]);

  // Reset all state
  const reset = useCallback(() => {
    setOriginalHtml('');
    setValidationResult(null);
    setAcceptedChanges(new Set());
    setRejectedChanges(new Set());
    setError(null);
  }, []);

  // Get the final HTML with accepted changes applied
  const getExportHtml = useCallback(() => {
    if (!validationResult) return originalHtml;
    return finalHtml;
  }, [validationResult, finalHtml, originalHtml]);

  return {
    originalHtml,
    validationResult,
    acceptedChanges,
    rejectedChanges,
    pendingChanges,
    finalHtml,
    isValidating,
    error,
    validate,
    acceptChange,
    rejectChange,
    acceptAll,
    rejectAll,
    reset,
    getExportHtml,
  };
};

export default useValidation;
