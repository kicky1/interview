import { useState } from 'react';
import { Card } from '../types/card.type';

export const useShuffleCards = (initialCards: Card[]) => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const shuffleCards = () => {
    for (let i = initialCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = initialCards[i];
      initialCards[i] = initialCards[j];
      initialCards[j] = temp;
    }
    setCards(initialCards);
  };
  return { cards, setCards, shuffleCards };
};
