'use client'
import React, { useState } from "react";
import ChallengeCard from "../Cards/ChallangeCard";
import { Input } from "../ui/input";

export default function Challenge2() {
    const [inputString, setInputString] = useState('');
    const [outputString, setOutputString] = useState('');

    const reverseWords = (str: string) => {
        const words = str.split(/\s+/);
        const reversedWords = words.reverse();
        return reversedWords.join(' ');
    }

    const handleChange = (e: any) => {
        const inputValue = e.target.value;
        setInputString(inputValue);

        if (inputValue.endsWith(' ')) {
            const reversedString = reverseWords(inputValue);
            setOutputString(reversedString);
        }
    }

    const clear = () => {
        setInputString('');
        setOutputString('');
    }

    return (
        <>
            <ChallengeCard
                title='#1'
                description='Write the JS function that takes given string and reverse the order of the words in the given string.'
                clear={clear}
            >
                <div className="m-1">
                    <div className="flex items-center">
                        <Input 
                            className="my-4 mr-2" 
                            type="string" 
                            placeholder="Input string" 
                            value={inputString}
                            onChange={handleChange} 
                        />
                    </div>
                    <code>
                      {`const outputString = `}
                      {outputString}
                  </code> 
                </div>
            </ChallengeCard>
        </>
    );
}
