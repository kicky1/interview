'use client';

import { useState } from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Pencil,
  X,
  Check,
  Trash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';

type TTree = {
  id: string;
  name: string;
  depth: number;
  children: TTree[];
};

const treeObject: TTree = {
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

type TreeStructureProps = {
  treeObject: TTree[];
};

function TreeStructure({ treeObject }: TreeStructureProps) {
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [tree, setTree] = useState<TTree[]>(treeObject);
  const [editName, setEditName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleVisibility = (nodeId: string) => {
    if (visibleNodes.includes(nodeId)) {
      setVisibleNodes(visibleNodes.filter(id => id !== nodeId));
    } else {
      setVisibleNodes([...visibleNodes, nodeId]);
    }
  };

  const handleAcceptChange = (nodeId: string) => {
    const newTree = tree.map((node: TTree) => {
      if (node.id === nodeId) {
        return {
          ...node,
          name: editName,
        };
      }
      return node;
    });
    setTree(newTree);
    setIsEditing(false);
  };

  const handleAddNode = (newNode: TTree) => {
    const childNode = {
      id: uuidv4(),
      name: 'new node',
      depth: newNode.depth + 1,
      children: [],
    };

    const newTree = tree.map((node: TTree) => {
      if (node.id === newNode.id) {
        return {
          ...node,
          children: [...node.children, childNode],
        };
      }
      return node;
    });
    setTree([...newTree]);
  };

  const handleDeleteNode = (nodeToDelete: TTree) => {
    const newTree = tree.filter((node: TTree) => node.id !== nodeToDelete.id);
    setTree([...newTree]);
  };

  return (
    <>
      {tree.map((node: TTree) => (
        <>
          <Card className="max-w-xs sm:max-w-4xl">
            <div className="p-1 sm:p-4">
              <CardDescription>
                <div className="flex items-center">
                  {node.children.length > 0 &&
                    (visibleNodes.includes(node.id) ? (
                      <Button
                        className="mr-2"
                        variant="ghost"
                        onClick={() => toggleVisibility(node.id)}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        className="mr-2"
                        variant="ghost"
                        onClick={() => toggleVisibility(node.id)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    ))}
                  {isEditing ? (
                    <Input
                      type="text"
                      value={editName}
                      className="w-1/2"
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleAcceptChange(node.id);
                        } else if (e.key === 'Escape') {
                          setIsEditing(false);
                        }
                      }}
                    />
                  ) : (
                    <span className="ml-4 truncate ">{node.name}</span>
                  )}
                  <div className="flex grow"></div>
                  {isEditing ? (
                    <>
                      <Button
                        className="ml-8"
                        variant="ghost"
                        onClick={() => handleAcceptChange(node.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="ml-8"
                        variant="ghost"
                        onClick={() => {
                          setEditName(node.name);
                          setIsEditing(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleAddNode(node)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      {node.depth > 0 && (
                        <>
                          <Button
                            className="pl-1"
                            variant="ghost"
                            onClick={() => handleDeleteNode(node)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </CardDescription>
            </div>
          </Card>
          {visibleNodes.includes(node.id) && node.children.length > 0 && (
            <div className="pl-2 sm:pl-5">
              {node.children.map(childNode => (
                <TreeStructure key={childNode.id} treeObject={[childNode]} />
              ))}
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
      <div className="my-8 text-center">
        <p className="text-2xl">
          Task 4: <code className="font-mono font-bold">"Tree"</code>
        </p>
        <div className="flex flex-col items-center justify-start mt-16">
          <div className="w-full">
            <TreeStructure key={treeObject.id} treeObject={[treeObject]} />
          </div>
        </div>
      </div>
    </>
  );
}
