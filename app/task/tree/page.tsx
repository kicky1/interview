import { treeObject } from '@/dataset/treeObject';
import TreeStructure from '@/components/Tree/Tree';

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
