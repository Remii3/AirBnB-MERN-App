import { Dispatch, SetStateAction } from 'react';

export interface ContextTypes {
  user: { name: string; email: string; password: string; id: string } | null;
  setUser: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<null>>;
  ready: boolean;
}

export interface PlaceImgPropsTypes {
  photos: string[];
  index: number;
  className: string | null;
}
export interface PerksPropsTypes {
  selected: string[];
  onChange: (value: React.SetStateAction<string[]>) => void;
}

export type PlaceTypes = {
  title: string;
  address: string;
  description: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  extraInfo: string;
  photos: string[];
} | null;
