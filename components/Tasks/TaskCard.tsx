import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type CardProps = React.ComponentProps<typeof Card>;
type Props = CardProps & {
  cardId: number;
  title: string;
  description: string;
  badge: string;
  link: string;
};

export default function TaskCard({ title, description, cardId, badge, link }: Props) {
  return (
    <>
      <Card>
        <CardHeader className={cn('h-[200px] md:h-[290px]')}>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-between">
          <Badge variant={badge.toLowerCase()}>{badge}</Badge>
          <Link href={`/task/${link}`}>
            <Button variant={'outline'} className="border-2">
              Task {cardId}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
