import React from "react";
import { Card, CardBody } from "@heroui/card";

export default function BoardSection() {
  return (
    <section className="sm:col-span-3 flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Kanban Board</p>
      <Card className="h-full" radius="sm">
        <CardBody>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
            <Card shadow="sm" radius="sm" className="bg-blue-500/65">
              <CardBody>TO DO</CardBody>
            </Card>
            <Card shadow="sm" radius="sm" className="bg-yellow-500/65">
              <CardBody>PENDING</CardBody>
            </Card>
            <Card shadow="sm" radius="sm" className="bg-green-500/65">
              <CardBody>COMPLETED</CardBody>
            </Card>
          </section>
        </CardBody>
      </Card>
    </section>
  );
}
