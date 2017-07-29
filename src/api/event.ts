export class Event {
  title: string;
  tagline?: string;
  posterURL?: string;
  place: string;
  startDate: string;
  endDate: string;
  description?: string;
  state: string;
  category: string;
  targetSkills: string[];
  tags?: string[];
  owner: string;
  website?: string;
  createdAt: string;

  constructor() {
    this.createdAt = new Date().toISOString();
  }
}

export const eventStates =  {
  DRAFT: 'draft',
  ANNOUNCED : 'announced',
  STARTED   : 'started',
  COMPLETED : 'completed',
  CANCELLED : 'cancelled',
  POSTPONED : 'postponed'
};
