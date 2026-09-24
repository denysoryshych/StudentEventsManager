export interface Searchable {
  matchSearchTerm(term: string) : boolean;
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'online' | 'offline';
}

export interface OnlineEventData extends EventData {
  link: string;
}

export interface OfflineEventData extends EventData {
  location: string;
}


