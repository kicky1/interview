import { tasksData } from "@/dataset/tasksData";
import TaskCard from "./TaskCard";
import QuestionCard from "./TaskCard";

const { v4: uuidv4 } = require("uuid");

export default function Tasks() {
  return (
    <>
      {tasksData.map((item) => {
        return (
          <div key={uuidv4()} className="h-auto">
            <TaskCard
              id={item.id}
              title={item.title}
              description={item.description}
            />
          </div>
        );
      })}
    </>
  );
}
