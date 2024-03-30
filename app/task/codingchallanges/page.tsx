import Challenge1 from '@/components/Challenges/Challenge1';
import Challenge2 from '@/components/Challenges/Challenge2';
import Challenge3 from '@/components/Challenges/Challenge3';
import Challenge4 from '@/components/Challenges/Challenge4';
import Challenge5 from '@/components/Challenges/Challenge5';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { v4 as uuidv4 } from 'uuid';


export default function Page() {

  const arrayChallengesArray = [
    <Challenge1 />,
    <Challenge3 />,
    <Challenge4 />,
    <Challenge5 />,
  ];

  const stringChallengesArray = [<Challenge2 />];

  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 7:{' '}
          <code className="font-mono font-bold">"Coding Challenges"</code>
        </p>
        <div className="flex flex-col items-left justify-start mt-16 text-left">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Arrays</AccordionTrigger>
              <AccordionContent>
                <div className="w-full">
                  {arrayChallengesArray.map((challenge) => (
                    <div key={uuidv4()}>
                      {challenge}
                      <div className="mt-3" />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Strings</AccordionTrigger>
              <AccordionContent>
                <div className="w-full">
                  {stringChallengesArray.map((challenge) => (
                    <div key={uuidv4()}>
                      {challenge}
                      <div className="mt-3" />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
