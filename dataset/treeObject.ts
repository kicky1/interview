import { TTree } from '@/app/types/tree.type';
import { v4 as uuidv4 } from 'uuid';

export const treeObject: TTree = {
    id: uuidv4(),
    name: 'root',
    depth: 0,
    children: [
      {
        id: uuidv4(),
        name: 'child1',
        depth: 1,
        children: [
          {
            id: uuidv4(),
            name: 'grandchild1',
            depth: 2,
            children: [
              {
                id: uuidv4(),
                name: 'grandgrandchild1',
                depth: 3,
                children: [],
              },
              {
                id: uuidv4(),
                name: 'grandgrandchild2',
                depth: 3,
                children: [],
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'grandchild2',
            depth: 2,
            children: [],
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'child2',
        depth: 1,
        children: [
          {
            id: uuidv4(),
            name: 'grandchild3',
            depth: 2,
            children: [],
          },
          {
            id: uuidv4(),
            name: 'grandchild4',
            depth: 2,
            children: [],
          },
        ],
      },
    ],
  };