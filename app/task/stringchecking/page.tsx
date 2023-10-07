'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


export default function Page() {

  const [input, setInput] = useState('')
  const [longestSubstring, setLongestSubstring] = useState('')

  const getLongestNotRepeatedSubstring = (text: string) => {
    const textArray = text.split('')
    const arrayOfSubstrings: string[] = []
    let substring = ''

    textArray.map((char, index) => {
      if(char == textArray[index+1]) {
        substring += char
        arrayOfSubstrings.push(substring)  
        substring = ''
      }else{
        substring += char
      }
    })
    arrayOfSubstrings.push(substring) 
    arrayOfSubstrings.sort((a, b) => b.length - a.length)
    setLongestSubstring(arrayOfSubstrings[0].toString())
  }    

  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 5: <code className="font-mono font-bold">"String checking"</code>
        </p>
        <div className="flex flex-col items-center justify-start mt-16">
            <p className="text-xl">Longest not repeated substring: {longestSubstring}</p>
            <div className="flex mt-4">
            <Input className="mr-4" value={input} onChange={(e) => setInput(e.target.value)}/>
            <Button onClick={() => getLongestNotRepeatedSubstring(input)}>Check</Button>
          </div>
        </div>
      </div>
    </>
  );
}
