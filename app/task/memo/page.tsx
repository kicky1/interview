'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { useState, useEffect, useRef } from 'react';

type Card = {
  value: number;
  visible: boolean;
}

type Cards = Card[][];

const createFreshCards = (): Cards => [
  [{ value: 1, visible: false }, { value: 1, visible: false }],
  [{ value: 2, visible: false }, { value: 2, visible: false }],
  [{ value: 3, visible: false }, { value: 3, visible: false }]
];


export default function Page() {
  const [cards, setCards] = useState<Cards>(createFreshCards);
  const [started, setStarted] = useState(false)
  const [pickedFirstCard, setPickedFirstCard] = useState<Card | undefined>(undefined);
  const [pickedSecondCard, setPickedSecondCard] = useState<Card | undefined>(undefined);


  const convertTo2DArray = (card: Card[]) => {
    let result = [];
    for (var i = 0; i < card.length; i += 2) {
        result.push(card.slice(i, i + 2));
    }
    return result;
  }

  // Real shuffle Fisher-Yates
  // const shuffleArray = (card: Card[]) => {
  //   for (let i = card.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = card[i];
  //     card[i] = card[j];
  //     card[j] = temp;
  //   }
  // }

  const shuffleCards = () => {
    const shuffledArray = createFreshCards().flat().sort((a, b) => 0.5 - Math.random());
    setCards(convertTo2DArray(shuffledArray))
  };

  const handleStart = () => {
    setStarted(true),
    shuffleCards();
  }

  const handleCardClick = (indexX: number, indexY: number) => {
    cards[indexX][indexY].visible = true;

    if (!pickedFirstCard) {
      setPickedFirstCard(cards[indexX][indexY]);
    } else {
      setPickedSecondCard(cards[indexX][indexY]);
    }
  };

  useEffect(() => {
    if (pickedFirstCard && pickedSecondCard) {
      if ((pickedFirstCard.value === pickedSecondCard.value) && (pickedFirstCard !== pickedSecondCard)) {
        const updatedCards = cards.map(row =>
          row.map(card =>
            card.value === pickedFirstCard.value ? { ...card, visible: true } : card
          )
        );
        setCards(updatedCards);
      } else {
        setTimeout(() => {
          const updatedCards = cards.map(row =>
            row.map(card =>
              card === pickedFirstCard || card === pickedSecondCard
                ? { ...card, visible: false }
                : card
            )
          );
          setCards(updatedCards);
        }, 1000);
      }
      setPickedFirstCard(undefined);
      setPickedSecondCard(undefined);
    }
  }, [cards, pickedFirstCard, pickedSecondCard]);


  useEffect(() => { 
    if (cards.every(row => row.every(card => card.visible))) {
      toast({
        title: "Congratulations!",
        description: "You won!",
      })
      setStarted(false)
    }
  }, [cards])

  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 5: <code className="font-mono font-bold">"Memo"</code>
        </p>
        <div className="flex flex-wrap justify-center items-center box-content  h-96 w-96 p-4 my-16 border-2 border-slate-200 bg-slate-50 rounded">
          {cards.map((cardX, indexX) => (
            <div key={indexX}>
              {cardX.map((cardY, indexY) => (
                <span key={indexY}>
                  <Button
                    disabled={cardY.visible || !started}
                    className={"w-24 h-24 m-2"}
                    onClick={() => handleCardClick(indexX, indexY)}
                  >
                    {cardY.visible ? cardY.value : '-'}
                  </Button>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div>
            <Button onClick={handleStart} disabled={started}>Start</Button>
          </div>
      </div>
    </>
  );
}
