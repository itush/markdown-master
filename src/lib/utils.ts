import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function to merge Tailwind CSS classes using clsx 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

