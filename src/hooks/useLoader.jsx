import {useState, useCallback} from 'react';

/**
 * useLoader - Custom hook to handle loading state for async functions.
 *
 * @param {function} asyncFunction - The async function to be executed.
 * @returns {array} - An array with the loading state, the result, the error, and the wrapped function.
 */
export function useLoader(asyncFunction) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setResult(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  return [loading, result, error, execute];
}
