import Challenge1 from "@/components/Challenges/Challenge1";
import Challenge2 from "@/components/Challenges/Challenge2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Page() {
  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 7: <code className="font-mono font-bold">"Coding Challanges"</code>
        </p>
        <div className="flex flex-col items-left justify-start mt-16 text-left">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Arrays</AccordionTrigger>
              <AccordionContent>
                <Challenge1/>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Strings</AccordionTrigger>
              <AccordionContent>
              <Challenge2/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
