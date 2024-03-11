import Challenge1 from "@/components/Challenges/Challenge1";
import Challenge2 from "@/components/Challenges/Challenge2";

export default function Page() {
  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 7: <code className="font-mono font-bold">"Coding Challanges"</code>
        </p>
        <div className="flex flex-col items-center justify-start mt-16 text-left">
          <Challenge1/>
          <div className="mt-4"/>
          <Challenge2/>
        </div>
      </div>
    </>
  );
}
