'use client';

import { createFreshCards } from '@/app/hooks/useCreateCards';
import { useShuffleCards } from '@/app/hooks/useShuffleCards';
import { Card } from '@/app/types/card.type';
import MemoCard from '@/components/Cards/MemoCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useState, useEffect, useRef } from 'react';

export default function Page() {
  const isAnimation = useRef(false);
  const [pickedFirstCard, setPickedFirstCard] = useState<Card | undefined>(
    undefined,
  );
  const [pickedSecondCard, setPickedSecondCard] = useState<Card | undefined>(
    undefined,
  );
  const [started, setStarted] = useState(false);

  const { cards, setCards, shuffleCards } = useShuffleCards(createFreshCards());

  const handleCardClick = (index: number) => {
    if (isAnimation.current) {
      return;
    }
    cards[index].visible = true;

    if (!pickedFirstCard) {
      setPickedFirstCard(cards[index]);
    } else {
      setPickedSecondCard(cards[index]);
    }
  };

  const handleStart = () => {
    shuffleCards();
    setStarted(true);
  };

  useEffect(() => {
    if (pickedFirstCard && pickedSecondCard) {
      if (
        pickedFirstCard.value === pickedSecondCard.value &&
        pickedFirstCard !== pickedSecondCard
      ) {
        const updatedCards = cards.map(card =>
          card.value === pickedFirstCard.value
            ? { ...card, visible: true }
            : card,
        );
        setCards(updatedCards);
      } else {
        isAnimation.current = true;
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            card === pickedFirstCard || card === pickedSecondCard
              ? { ...card, visible: false }
              : card,
          );
          isAnimation.current = false;
          setCards(updatedCards);
        }, 1000);
      }
      setPickedFirstCard(undefined);
      setPickedSecondCard(undefined);
    }
  }, [cards, pickedFirstCard, pickedSecondCard]);

  useEffect(() => {
    if (cards.every(card => card.visible == true)) {
      toast({
        title: 'Congratulations!',
        description: 'You won!',
      });
      setStarted(false);
    }
  }, [cards]);

  return (
    <>
      <div className="my-8 text-center">
        <p className="text-2xl">
          Task 5: <code className="font-mono font-bold">"Memo"</code>
        </p>
        <div className="h-fit w-fit p-4 mt-8 border-2 border-slate-200 bg-slate-50 rounded">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {cards.map((card, index) => (
              <MemoCard
                key={index}
                card={card}
                index={index}
                started={started}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleStart} disabled={started}>
            Start
          </Button>
        </div>
      </div>
    </>
  );
}
