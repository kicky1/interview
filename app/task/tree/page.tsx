'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

type TTree = {
  id: number;
  name: string;
  depth: number;
  children: TTree[];
};

const tree: TTree = {
  id: 1,
  name: 'root',
  depth: 0,
  children: [
    {
      id: 2,
      name: 'child1',
      depth: 1,
      children: [
        {
          id: 4,
          name: 'grandchild1',
          depth: 2,
          children: [
            {
              id: 6,
              name: 'grandgrandchild1',
              depth: 3,
              children: [],
            },
            {
              id: 7,
              name: 'grandgrandchild2',
              depth: 3,
              children: [],
            },
          ],
        },
        {
          id: 5,
          name: 'grandchild2',
          depth: 2,
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: 'child2',
      depth: 1,
      children: [
        {
          id: 8,
          name: 'grandchild3',
          depth: 2,
          children: [],
        },
        {
          id: 9,
          name: 'grandchild4',
          depth: 2,
          children: [],
        },
      ],
    },
  ],
};

type TreeStructureProps = {
  tree: TTree[];
};

function TreeStructure({ tree }: TreeStructureProps) {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);

  const toggleVisibility = (nodeId: number) => {
    if (visibleNodes.includes(nodeId)) {
      setVisibleNodes(visibleNodes.filter(id => id !== nodeId));
    } else {
      setVisibleNodes([...visibleNodes, nodeId]);
    }
  };

  return (
    <>
      {tree.map((node: TTree) => (
        <>
          <Card>
            <CardHeader>
              <CardDescription>
                <div className="flex items-center">
                  {node.name}
                  {node.children.length > 0 &&
                    (visibleNodes.includes(node.id) ? (
                      <ChevronUp
                        className="ml-1 w-4 h-4 hover:bg-gray-300 hover:rounded-sm hover:border hover:cursor-pointer"
                        onClick={() => toggleVisibility(node.id)}
                      />
                    ) : (
                      <ChevronDown
                        className="ml-1 w-4 h-4 hover:bg-gray-300 hover:rounded-sm hover:border hover:cursor-pointer"
                        onClick={() => toggleVisibility(node.id)}
                      />
                    ))}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
          {visibleNodes.includes(node.id) && node.children.length > 0 && (
            <div className="pl-5">
              <TreeStructure tree={node.children} />
            </div>
          )}
        </>
      ))}
    </>
  );
}

export default function Page() {
  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 4: <code className="font-mono font-bold">"Tree"</code>
        </p>
        <div className="flex flex-col items-center justify-start mt-16">
          <div className="w-full">
            <div className="container text-start px-4 sm:px-8">
              <TreeStructure tree={[tree]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
