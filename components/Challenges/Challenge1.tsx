'use client'

import { useState } from "react";
import ChallengeCard from "../Cards/ChallangeCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function Challenge1() {
    const [inputString, setInputString] = useState('');
    const [strings, setStrings] = useState<string[]>([]);
    const [countStrings, setCountStrings] = useState<{ [key: string]: number }>({});

    const addValue = () => {
        if (inputString.trim() !== '') {
            setStrings(prevValues => [...prevValues, inputString]);
            setInputString('');
        }
    };

    const countFunc = () => {
        const counts: { [key: string]: number } = {};
        strings.forEach(str => {
            counts[str] = (counts[str] || 0) + 1;
        });
        setCountStrings(counts);
    };

    const clear = () => {
        setInputString(''),
        setStrings([]),
        setCountStrings({})
    }

    return (
        <>
            <ChallengeCard
                title='#1'
                description='Write a JS function that takes the inputData array and returns an object with the number of occurrences of a given string in the table.'
                clear={clear}
            >
                <div className="m-1">
                    <code>
                        {`const strings = `}
                        {strings.length === 0 ? '[]' : '[' + strings.map((string) => JSON.stringify(string)).join(', ') + ']'}
                    </code> 
                    <div>
                        <code>
                            {`const countStrings = `}
                            {
                                countStrings === undefined ? '{}' : (
                                    <>
                                        <span>{'{'}</span>
                                        <ul className="ml-6">
                                            {Object.entries(countStrings).map(([key, value]) => (
                                                <li key={key}>
                                                    {`${key}: ${value}`}
                                                </li>
                                            ))}
                                        </ul>
                                        <span>{'}'}</span>
                                    </>
                                )
                            }
                        </code>
                    </div>
                    <div className="flex items-center">
                        <Input 
                            className="my-2 mr-2" 
                            type="string" 
                            placeholder="Input string" 
                            value={inputString}
                            onChange={(e) => setInputString(e.target.value)} 
                        />
                        <Button 
                            className="my-2" 
                            onClick={addValue}
                            disabled={inputString.trim() === ''}
                        >
                            <Plus/>
                        </Button>
                    </div>
                    <Button 
                        className="my-2" 
                        onClick={countFunc}
                        disabled={strings.length === 0}
                    >
                        Calculate                
                    </Button>
                </div>
            </ChallengeCard>
        </>
    );
}
