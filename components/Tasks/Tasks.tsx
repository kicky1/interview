import { Task, tasksData } from '@/dataset/tasksData';
import TaskCard from './TaskCard';

import { v4 as uuidv4 } from 'uuid';

type Badge = 'easy' | 'medium' | 'hard' 

const customSort = (a: Task, b: Task) => {
  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

  const difficultyA = difficultyOrder[a.badge as Badge] || 0;
  const difficultyB = difficultyOrder[b.badge as Badge] || 0;

  return difficultyA - difficultyB;
};

export default function Tasks() {
  const sortedTasks = [...tasksData].sort(customSort);
  return (
    <>
      {sortedTasks.map(item => {
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
