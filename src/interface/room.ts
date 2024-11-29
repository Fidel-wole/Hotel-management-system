import { Category } from "./category";

export interface Room {
    number: string; // Room number
    type: "single" | "double" | "suite" | "deluxe"; // Type of room (physical layout)
    category: Category
    pricePerNight: number; // Cost per night
    isOccupied: boolean; // Whether the room is currently occupied
    features: string[]; // List of features (e.g., "WiFi", "AC", "TV")
    maxOccupancy: number; // Maximum number of guests allowed
    currentOccupants?: number; // Current number of occupants, optional
    images?: string[]; // URLs or paths to room images, optional
    floor: number; // Floor where the room is located
    notes?: string; // Additional notes about the room, optional
  }
  