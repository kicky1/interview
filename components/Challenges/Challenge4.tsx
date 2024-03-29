'use client'
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ChallengeCard from "../Cards/ChallangeCard";

export default function Challenge4() {
    const [inputInt, setInputInt] = useState<string>('');
    const [numberArray, setNumberArray] = useState<number[]>([]);
    const [answerArray, setAnswerArray] = useState<number[]>([]);

    const handleAdd = () => {
        if (inputInt !== '') {
            setNumberArray(prevValues => [...prevValues, parseFloat(inputInt)]);
            setInputInt('');
        }
    };

    const clear = () => {
        setInputInt('');
        setNumberArray([]);
        setAnswerArray([]);
    }

    const handleCalculate = () => {
        let currentIndex = 0;
        let array: number[] = [...numberArray]
        let countZeros = 0

        for (let i = 0; i < array.length; i++) {
            if (array[i] !== 0) {
                array[currentIndex] = array[i];
                currentIndex++;
            }else{
                countZeros++
            }
        }

        array.splice(-countZeros);
        array.sort()
        array = array.concat(Array(countZeros).fill(0));

        setAnswerArray([...array])
    }

    return (
        <>
            <ChallengeCard
                title='#3'
                description="Given an integer array nums, move all 0's to the end if it while maintaining the relative order of the non-zero elements. Note that you must do this inplace without making copy of the array."
                clear={clear}
            >
                <div className="m-1">
                    <code>
                        {`const numbers = `}
                        {numberArray.length === 0 ? '[]' : '[' + numberArray.join(', ') + ']'}
                    </code>
                    <div/>
                    <code>
                        {`const answer = `}
                        {numberArray.length === 0 ? '[]' : '[' + answerArray.join(', ') + ']'}
                    </code>
                    <div className="flex items-center">
                        <Input
                            className="my-2 mr-2"
                            type="number"
                            placeholder="Input integer"
                            value={inputInt}
                            onChange={(e) => {
                                setInputInt(e.target.value)
                            }}
                        />
                        <Button
                            className="my-2"
                            onClick={handleAdd}
                        >
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
