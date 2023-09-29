import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  id: number;
  title: string;
  description: string;
  link: string;
}

export default function TaskCard({ title, description, id, link }: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Link href={`/task/${link}`}>
            <Button variant={"outline"} className="border-2">
              Task {id}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
