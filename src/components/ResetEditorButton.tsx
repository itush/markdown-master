// src/components/ResetEditorButton.tsx
"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from 'lucide-react';

interface ResetEditorButtonProps {
  onReset: () => void; // Callback to reset the editor
}

export default function ResetEditorButton({ onReset }: ResetEditorButtonProps) {
  return (
    <AlertDialog>
      {/* Trigger button */}
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"          
          className="cursor-pointer flex items-center gap-1"
        >
          <RotateCcw size={16} />
          <span>Reset Editor</span>
        </Button>
      </AlertDialogTrigger>

      {/* Dialog content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to reset?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will reset your editor content to the default markdown. Your current work will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Cancel button */}
          <AlertDialogCancel
          className="cursor-pointer">
            Cancel
            </AlertDialogCancel>
          {/* Reset action button */}
          <AlertDialogAction 
          className="cursor-pointer bg-red-400"
          onClick={onReset}>
            Reset
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
