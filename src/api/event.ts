export class Event {
  id: string = null;
  title: string = null;
  tagline?: string = null;
  posterURL?: string = null;
  place: string = null;
  startDate: string = null;
  endDate: string = null;
  description?: string = null;
  state: string = null;
  category: string = null;
  targetSkills: string[] = null;
  tags?: string[] = null;
  owner: string = null;
  website?: string = null;
  createdAt: string = null;

  constructor() {
    this.createdAt = new Date().toISOString();
  }
}

export const EventProps =  {
  state: {
    DRAFT: 'draft',
    ANNOUNCED : 'announced',
    STARTED   : 'started',
    COMPLETED : 'completed',
    CANCELLED : 'cancelled',
    POSTPONED : 'postponed'
  },
  category: {
    ART: 'art',
    SPORT: 'sport',
    TECHNICAL: 'technical',
    OTHER: 'other'
  }
};
