'use client';

import { useState, useEffect } from 'react';

export interface UserProgress {
  vocabulary: number[]; // Array of completed topic IDs
  grammar: string[]; // Array of completed grammar topics
  listening: number; // Percent completed
  reading: number; // Percent completed
  speaking: number; // Percent completed
  writing: number; // Percent completed
  streak: number;
  lastActive: string | null;
}

const defaultProgress: UserProgress = {
  vocabulary: [],
  grammar: [],
  listening: 0,
  reading: 0,
  speaking: 0,
  writing: 0,
  streak: 0,
  lastActive: null,
};

export function useProgress(certType: string) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage
    const storageKey = `engmastery_progress_${certType}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        
        // Handle streak calculation
        const today = new Date().toDateString();
        let newStreak = parsed.streak || 0;
        
        if (parsed.lastActive) {
          const lastDate = new Date(parsed.lastActive);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (parsed.lastActive !== today) {
            if (lastDate.toDateString() === yesterday.toDateString()) {
              // Consecutive day
              newStreak += 1;
            } else if (lastDate.toDateString() !== today) {
              // Streak broken
              newStreak = 1;
            }
          }
        } else {
          newStreak = 1;
        }

        const updatedProgress = {
          ...defaultProgress,
          ...parsed,
          streak: newStreak,
          lastActive: today,
        };
        
        setProgress(updatedProgress);
        localStorage.setItem(storageKey, JSON.stringify(updatedProgress));
      } catch (e) {
        console.error('Failed to parse progress', e);
        setProgress(defaultProgress);
      }
    } else {
      // First time initialization
      const initProgress = {
        ...defaultProgress,
        streak: 1,
        lastActive: new Date().toDateString(),
      };
      setProgress(initProgress);
      localStorage.setItem(storageKey, JSON.stringify(initProgress));
    }
    
    setIsLoaded(true);
  }, [certType]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    const storageKey = `engmastery_progress_${certType}`;
    setProgress(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const completeVocabularyTopic = (topicId: number) => {
    setProgress(prev => {
      if (prev.vocabulary.includes(topicId)) return prev;
      const next = { ...prev, vocabulary: [...prev.vocabulary, topicId] };
      localStorage.setItem(`engmastery_progress_${certType}`, JSON.stringify(next));
      return next;
    });
  };

  return { progress, isLoaded, updateProgress, completeVocabularyTopic };
}
