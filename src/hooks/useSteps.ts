// src/hooks/useSteps.ts

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export function useSteps(username: string) {
  const [steps, setSteps] = useState<number>(() => {
    const saved = localStorage.getItem('steps');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('steps', steps.toString());
  }, [steps]);

  const addSteps = async (count: number) => {
    const newSteps = steps + count;
    setSteps(newSteps);
    localStorage.setItem('steps', newSteps.toString());

    // Sync to supabase
    await supabase.from('steps').insert([
      { username, steps: newSteps }
    ]);
  };

  return { steps, addSteps };
}

