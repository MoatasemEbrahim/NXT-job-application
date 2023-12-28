export interface Session {
  id: number
  title: string;
  subtitle: string
  cover_image: string;
  description: string;
  speaker_ids: number[];
  moderator_ids: number[];
  date: Date;
  from: Date;
  till: Date;
  venue: {
    id: number;
    name: string;
    capacity: number;
    image: string;
    venue_type?: number | null;
  }
}
