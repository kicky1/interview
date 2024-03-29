import { tasksData } from '@/dataset/tasksData';
import TaskCard from './TaskCard';

import { v4 as uuidv4 } from 'uuid';
import { Badge } from '@/app/types/task.type';

export default function Tasks() {
  // const sortedTasks = [...tasksData].sort(customSort);
  return (
    <>
      {tasksData.map(item => {
        return (
          <div key={uuidv4()} className="h-auto">
            <TaskCard
              cardId={item.id}
              title={item.title}
              description={item.description}
              badge={item.badge as Badge}
              link={item.link}
            />
          </div>
        );
      })}
    </>
  );
}
