'use client';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import ChallengeCard from '../Cards/ChallangeCard';

export default function Challenge5() {
  const [inputInt, setInputInt] = useState<string>('');
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>(0);

  const handleAdd = () => {
    if (inputInt !== '') {
      setNumberArray(prevValues => [...prevValues, parseFloat(inputInt)]);
      setInputInt('');
    }
  };

  const clear = () => {
    setInputInt('');
    setNumberArray([]);
    setAnswer(0);
  };

  const handleCalculate = () => {
    const prices = [...numberArray];
    let maxProfit = 0;
    let minPrice = prices[0];
    let buyDay = 0;
    let sellDay = 0;

    for (let i = 1; i < prices.length; i++) {
      const currentPrice = prices[i];
      const potentialProfit = currentPrice - minPrice;
      if (potentialProfit > maxProfit) {
        maxProfit = potentialProfit;
        sellDay = i;
      }
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
      }
      if (currentPrice < minPrice && potentialProfit > maxProfit) {
        buyDay = i;
      }
    }
    console.log(buyDay, sellDay);
    setAnswer(maxProfit);
  };

  return (
    <>
      <ChallengeCard
        title="#4"
        description="You are given array of prices where prices[i] is the price of a given stock on an ith day. You want to maximise your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
                Return the maximum profit you can achive from this transaction. If you cannot achieve any profit, return 0."
        clear={clear}
      >
        <div className="m-1">
          <code>
            {`const numbers = `}
            {numberArray.length === 0
              ? '[]'
              : '[' + numberArray.join(', ') + ']'}
          </code>
          <div />
          <code>
            {`const answer = `}
            {answer}
          </code>
          <div className="flex items-center">
            <Input
              className="my-2 mr-2"
              type="number"
              placeholder="Input integer"
              value={inputInt}
              onChange={e => {
                setInputInt(e.target.value);
              }}
            />
            <Button className="my-2" onClick={handleAdd}>
              <Plus />
            </Button>
          </div>
          <Button
            className="my-2"
            onClick={handleCalculate}
            disabled={numberArray.length === 0}
          >
            Calculate
          </Button>
        </div>
      </ChallengeCard>
    </>
  );
}
