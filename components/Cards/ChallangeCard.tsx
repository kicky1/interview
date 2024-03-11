import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';

type Props = {
    title: string,
    description: string,
    children: React.ReactNode,
    clear: () => void
}

export default function ChallengeCard({title, description, children, clear} : Props) {
    return (
        <Card className="max-w-screen-sm">
            <CardHeader className="text-left">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={clear}>Clear</Button>
            </CardFooter>
        </Card>
    );
}
