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
}

export default function TaskCard({ title, description, id }: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Link href={`/task/${id}`}>
            <Button variant={"outline"} className="border-2">
              Task {id}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
