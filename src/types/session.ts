export interface Session {
  id: number
  title: string;
  cover_image: string;
  date: string;
  from: string;
  till: string;
  venue: {
    id: number;
    name: string;
    capacity: number;
    image: string;
    venue_type?: number | null;
  }
}
