'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { SpadeIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type Card = {
  value: string;
  visible: boolean;
};

type Cards = Card[];

const createFreshCards = (): Cards => [
  { value: '1', visible: false },
  { value: '1', visible: false },
  { value: '2', visible: false },
  { value: '2', visible: false },
  { value: '3', visible: false },
  { value: '3', visible: false },
  { value: '4', visible: false },
  { value: '4', visible: false },
  { value: '5', visible: false },
  { value: '5', visible: false },
  { value: '6', visible: false },
  { value: '6', visible: false },
];

const shuffleCards = (cards: Card[]) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
};

export default function Page() {
  const [cards, setCards] = useState<Cards>(shuffleCards(createFreshCards()));
  const [pickedFirstCard, setPickedFirstCard] = useState<Card | undefined>(
    undefined,
  );
  const [pickedSecondCard, setPickedSecondCard] = useState<Card | undefined>(
    undefined,
  );
  const [started, setStarted] = useState(false);
  const isAnimation = useRef(false);

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
    setCards(shuffleCards(createFreshCards()));
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
              <div
                key={index}
                className={cn(card.visible && 'flipped', 'flip-card')}
              >
                <Button
                  key={index}
                  className={`w-24 h-24`}
                  onClick={() => handleCardClick(index)}
                  disabled={card.visible || !started}
                >
                  {card.visible ? (
                    <span
                      style={{ transform: 'scaleX(-1)' }}
                      className={'text-lg'}
                    >
                      {card.value}
                    </span>
                  ) : (
                    <SpadeIcon />
                  )}
                </Button>
              </div>
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
