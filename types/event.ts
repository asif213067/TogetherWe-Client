export type CommunityEvent = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  participantCount: number;
};

export type CommunityEventDetails = CommunityEvent & {
  hasEnded: boolean;
  organizerName: string;
  organizerPhoto?: string | null;
};

export type ManagedEvent = CommunityEvent & {
  hasEnded: boolean;
};