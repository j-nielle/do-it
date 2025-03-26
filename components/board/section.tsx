import React from "react";
import { Card, CardBody } from "@heroui/card";

export default function Board() {
  return (
    <section className="sm:col-span-2 flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Kanban Board</p>
      <Card className="h-full">
        <CardBody>Tasks</CardBody>
      </Card>
    </section>
  );
}
