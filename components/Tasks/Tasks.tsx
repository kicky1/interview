import { tasksData } from '@/dataset/tasksData'
import TaskCard from './TaskCard'

import { v4 as uuidv4 } from 'uuid'

export default function Tasks () {
  return (
    <>
      {tasksData.map((item) => {
        return (
          <div key={uuidv4()} className="h-auto">
            <TaskCard
              cardId={item.id}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          </div>
        )
      })}
    </>
  )
}
