'use client';

import { Multiselect } from '@/components/ui/multiselect';
import { useState } from 'react';

export default function Page() {
  const [values, setValues] = useState<string[]>([]);
  return (
    <>
      <div className="my-8 text-center">
        <p className="text-2xl">
          Task.7:{' '}
          <code className="font-mono font-bold">
            "Components created with shadcn"
          </code>
        </p>
        <div className="h-fit w-fit p-4 mt-8 border-2 border-slate-200 bg-slate-50 rounded">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            <div className="col-span-2">
              <div className="relative">
                <p className="text-md mb-2 text-left">Multiselect</p>
                <Multiselect
                  items={[
                    { label: 'English', value: 'en' },
                    { label: 'French', value: 'fr' },
                    { label: 'German', value: 'de' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'Portuguese', value: 'pt' },
                    { label: 'Russian', value: 'ru' },
                    { label: 'Japanese', value: 'ja' },
                    { label: 'Korean', value: 'ko' },
                    { label: 'Chinese', value: 'zh' },
                  ]}
                  searchable
                  values={values}
                  setValues={setValues}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
