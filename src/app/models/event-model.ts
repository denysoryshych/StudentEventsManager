import {Searchable, EventData, OfflineEventData, OnlineEventData} from './event-interfaces';

export abstract class BaseStudentEvent implements Searchable{
  public id: string;
  public title: string;
  public description: string;
  public date: string;
  public type: 'online' | 'offline';

  constructor(data: EventData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.date = data.date;
    this.type = data.type;
  }

  public matchSearchTerm(term: string): boolean {
    return this.title.toLowerCase().includes(term.toLowerCase());
  }

  public abstract getEventDetails(): string;
  public abstract toJSON(): EventData;
}

export class OfflineEvent extends BaseStudentEvent {
  public location: string;

  constructor(data: OfflineEventData) {
    super(data);
    this.location = data.location;
  }

  public override getEventDetails() : string {
    return `Location: ${this.location}`;
  }

  public override toJSON() : OfflineEventData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      type: this.type,
      location: this.location
    };
  }
}

export class OnlineEvent extends BaseStudentEvent {
  public link: string;
  constructor(data: OnlineEventData) {
    super(data);
    this.link = data.link;
  }

  public override getEventDetails(): string {
    return `Link: ${this.link}`;
  }

  public override toJSON(): OnlineEventData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      type: this.type,
      link: this.link
    };
  }
}
