export interface Video {
  id: string;
  youtubeId: string;
  title?: string;
  thumbnailUrl?: string;
}

export interface WorkCategory {
  id: string;
  title: string;
  subtitle?: string;
  videos: Video[];
}

export interface Capability {
  id: string;
  num: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
}
