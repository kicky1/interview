import { tasksData } from '@/dataset/tasksData';
import TaskCard from './TaskCard';

import { v4 as uuidv4 } from 'uuid';

type Badge = 'default' | 'secondary' | 'easy' | 'medium' | 'hard' | 'destructive' | 'outline' | null | undefined;

export default function Tasks() {
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
