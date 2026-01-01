import React, { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainDialogProps } from "@/types/types";

const MainDialog = memo(
  ({
    title,
    description,
    trigger,
    children,
    isOpen,
    onOpenChange,
  }: MainDialogProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center sm:text-2xl md:text-3xl lg:text-4xl">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  },
);

MainDialog.displayName = "MainDialog";

export default MainDialog;
