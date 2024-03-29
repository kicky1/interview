'use client';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import ChallengeCard from '../Cards/ChallangeCard';
import AlertSnackbar from '../Alerts/AlertSnackbar';

export default function Challenge3() {
  const [inputInt, setInputInt] = useState<string>('');
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [answerArray, setAnswerArray] = useState<number[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const addValue = () => {
    if (!(parseFloat(inputInt) !== 0 && !isNaN(parseFloat(inputInt)))) {
      setShowAlert(true);
      return false;
    }
    if (inputInt !== '') {
      setNumberArray(prevValues => [...prevValues, parseFloat(inputInt)]);
      setInputInt('');
    }
  };

  const clear = () => {
    setInputInt('');
    setNumberArray([]);
  };

  const calculateProduct = () => {
    const n = numberArray.length;
    const product = numberArray.reduce(
      (accumulator, currentValue) => accumulator * currentValue,
      1,
    );
    const answer = new Array(n).fill(product);
    for (let i = 1; i < n; i++) {
      answer[i] = answer[i] / numberArray[i];
    }
    setAnswerArray(answer);
  };

  return (
    <>
      <ChallengeCard
        title="#2"
        description="Given an number array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]."
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
            {numberArray.length === 0
              ? '[]'
              : '[' + answerArray.join(', ') + ']'}
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
            <Button className="my-2" onClick={addValue}>
              <Plus />
            </Button>
          </div>
          <Button
            className="my-2"
            onClick={calculateProduct}
            disabled={numberArray.length === 0}
          >
            Calculate
          </Button>
        </div>
      </ChallengeCard>
      <AlertSnackbar
        title={'Incorrect value'}
        message={"You can't enter 0 because we don't divide by zero!"}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        variant={'destructive'}
      />
    </>
  );
}
