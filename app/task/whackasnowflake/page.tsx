'use client';

import React, { useState } from 'react';
import { Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [arrayOfHoles, setArrayOfHoles] = useState(new Array(9).fill(0));
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  const handleCardClick = (index: number) => {
    if (arrayOfHoles[index] === 1) {
      setArrayOfHoles(prevArray => {
        const newArrayOfHoles = [...prevArray];
        newArrayOfHoles[index] = 0;
        return newArrayOfHoles;
      });
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleStartGame = () => {
    setArrayOfHoles(new Array(9).fill(0));
    setScore(0);
    setStarted(true);
    const interval = setInterval(() => {
      setArrayOfHoles(prevArray => {
        const newArrayOfHoles = [...prevArray];
        const randomHole = Math.floor(Math.random() * newArrayOfHoles.length);
        newArrayOfHoles[randomHole] = newArrayOfHoles[randomHole] === 1 ? 0 : 1;
        return newArrayOfHoles;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
    <>
      <div className="my-8 text-center">
        <p className="text-2xl">
          Task 6:{' '}
          <code className="font-mono font-bold">"Whack a snowflake"</code>
        </p>
        <p className="mt-8 text-2xl">Score: {score}</p>
        <div className="h-fit w-fit p-4 mt-8 border-2 border-slate-200 bg-slate-50 rounded">
          <div className="grid grid-cols-3 gap-4">
            {arrayOfHoles.map((hole, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-24 h-24 bg-slate-200 rounded cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                {hole === 1 && <Snowflake size={48} />}
              </div>
            ))}
          </div>
        </div>
        <Button className="mt-4" onClick={handleStartGame}>
          {started ? 'Restart Game' : 'Start Game'}
        </Button>
      </div>
    </>
  );
}
