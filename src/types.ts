export type GateScreen = 'question' | 'otp' | 'reveal';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}
