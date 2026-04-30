import { useState, useEffect } from 'react';
import { MOCK_SUBMISSIONS } from '../../mocks/submissionData';

const STORAGE_KEY = 'lingualoop_submissions';

export const useSubmissionStore = () => {
  const [submissions, setSubmissions] = useState([]);

  // Initialize from localStorage or MOCK_SUBMISSIONS
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubmissions(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored submissions:', error);
        setSubmissions(JSON.parse(JSON.stringify(MOCK_SUBMISSIONS)));
      }
    } else {
      // First time - initialize with mock data
      setSubmissions(JSON.parse(JSON.stringify(MOCK_SUBMISSIONS)));
    }
  }, []);

  // Save to localStorage whenever submissions change
  useEffect(() => {
    if (submissions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    }
  }, [submissions]);

  // Add a review to a submission
  const addReview = (submissionId, reviewData) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === submissionId
          ? {
              ...submission,
              reviews: [
                ...submission.reviews,
                {
                  userId: reviewData.userId || 'anonymous',
                  correction: reviewData.correction,
                  notes: reviewData.notes || '',
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : submission,
      ),
    );
  };

  // Get a single submission by ID
  const getSubmissionById = (submissionId) => {
    return submissions.find((s) => s.id === submissionId);
  };

  // Add a new submission
  const addSubmission = (submissionData) => {
    const newId =
      submissions.length > 0
        ? Math.max(...submissions.map((s) => s.id)) + 1
        : 1;

    const newSubmission = {
      id: newId,
      language: submissionData.language,
      level: submissionData.level,
      postedAt: submissionData.postedAt || 'just now',
      title: submissionData.title,
      excerpt:
        submissionData.excerpt || submissionData.text.substring(0, 60) + '...',
      text: submissionData.text,
      words: submissionData.words,
      readingTime: submissionData.readingTime,
      userId: submissionData.userId || 'user-' + newId,
      reviews: [],
    };

    setSubmissions((prevSubmissions) => [newSubmission, ...prevSubmissions]);
  };

  return {
    submissions,
    addReview,
    getSubmissionById,
    addSubmission,
  };
};
