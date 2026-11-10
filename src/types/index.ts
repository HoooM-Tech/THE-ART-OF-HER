export interface Celebrant {
  fullName: string;
  preferredName: string;
  age: number;
  birthday: string;
  publicationDate: string;
  shortBiography: string;
  heroPhotograph: string;
  openingPhotograph: string;
  closingPhotograph: string;
  publicationTitle: string;
  issueNumber: string;
  tagline: string;
  supportingStatement: string;
  spotifyPlaylistUrl?: string;
}

export interface ChapterMeta {
  number: string; // e.g. "01"
  total: string;  // e.g. "08"
  id: string;     // anchor id, e.g. "cover"
  title: string;
  navTitle: string;
  subtitle?: string;
  headline?: string;
  supportingLine?: string;
}

export interface EditorialPhotograph {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date?: string;
  category?: 'unposed' | 'adventures' | 'people' | 'celebrations' | 'portraits' | 'archive';
  chapter?: string;
  contributor?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  focalPoint?: string;
  width?: number;
  height?: number;
}

export interface Contributor {
  id: string;
  name: string;
  relationship: string;
  category: 'raised' | 'grew' | 'chose' | 'admire';
  categoryLabel: string;
  photo?: string;
}

export interface EditorialLetter {
  id: string;
  contributorId: string;
  contributorName: string;
  relationship: string;
  categoryLabel: string;
  title: string;
  body: string[];
  signature: string;
  type: 'feature' | 'standard' | 'pull-quote';
  image?: string;
  editorialPriority: number;
  dateOrMemory?: string;
}

export interface PersonalityDetail {
  id: string;
  prompt: string;
  response: string;
  image?: string;
  detailType?: string;
}

export interface TimelineAct {
  act: string;
  title: string;
  era: string;
  description: string;
  photos: EditorialPhotograph[];
}

export interface BirthdayReason {
  number: string; // "01" to "32"
  headline: string;
  description: string;
  contributor?: string;
  photo?: string;
}

export interface ClosingLetter {
  title: string;
  headline: string;
  body: string[];
  signature: string;
  closingPhotograph: string;
  statement: string;
  subStatement: string;
}

