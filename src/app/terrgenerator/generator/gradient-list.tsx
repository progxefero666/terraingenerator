"use client";

import type { Gradient } from "@/lib/terraintypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Trash2, GripVertical } from "lucide-react";

type GradientListProps = {
  gradients: Gradient[];
  selectedGradientId: string | null;
  onSelectGradient: (id: string) => void;
  onRemoveGradient: (id:string) => void;
};

export default function GradientList({
  gradients,
  selectedGradientId,
  onSelectGradient,
  onRemoveGradient,
}: GradientListProps) {
  
  return (
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-2">
          <ScrollArea className="h-48">
            <div className="space-y-2 pr-2">
              {gradients.map((gradient, index) => (
                <div
                  key={gradient.id}
                  onClick={() => onSelectGradient(gradient.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md border p-2 cursor-pointer transition-colors",
                    selectedGradientId === gradient.id
                      ? "bg-accent/80 text-accent-foreground border-accent"
                      : "hover:bg-muted/50"
                  )}
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 truncate">Gradient {index + 1}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {e.stopPropagation(); onRemoveGradient(gradient.id)}}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {gradients.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No gradients added.</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
  );
}
