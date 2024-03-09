'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SpadeIcon } from 'lucide-react';

type Props = {
    card: Card
    index: number
    started: boolean
    handleCardClick:  (index: number) => void
}


export default function MemoCard({card, index, started, handleCardClick} : Props) {
    return (
        <div
            key={index}
            className={cn(card.visible && 'flipped', 'flip-card')}
        >
            <Button
                className={`w-24 h-24`}
                onClick={() => handleCardClick(index)}
                disabled={card.visible || !started}
            >
                {card.visible ? (
                <span
                    style={{ transform: 'scaleX(-1)' }}
                    className={'text-lg'}
                >
                    {card.value}
                </span>
                ) : (
                <SpadeIcon />
                )}
            </Button>
        </div>
    );
}
