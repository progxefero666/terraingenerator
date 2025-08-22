
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button";

export default function AdvancedSidebar() {
  return (
    <div className="flex flex-col h-full bg-sidebar">
        <div className="p-4 border-b-2 border-sidebar-border">
            <h2 className="text-xl font-semibold text-sidebar-primary">Advanced Controls</h2>
        </div>

      <div className="p-2 flex-1 overflow-y-auto">
          <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold px-2 py-3 hover:no-underline text-sidebar-primary">
                Advanced Section 1
              </AccordionTrigger>
              <AccordionContent className="px-2 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Advanced controls and options will be available here in a future update.
                </p>
                <Button disabled className="w-full">Future Feature</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      </div>
    </div>
  );
}
