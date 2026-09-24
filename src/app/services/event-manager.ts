import { Injectable } from '@angular/core';
import { EventData, OfflineEventData, OnlineEventData, Searchable } from '../models/event-interfaces';
import {BaseStudentEvent, OnlineEvent, OfflineEvent} from '../models/event-model';

@Injectable({
  providedIn: 'root',
})

export class EventManager {
  public visibleEvents: BaseStudentEvent[] = [];
  private events: BaseStudentEvent[] = [];
  private readonly STORAGE_KEY = 'events';

  constructor() {
    this.loadFromStorage();
  }

  private syncStorage() {
    const storageData = this.events.map(event => event.toJSON());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData));
  }

  private loadFromStorage() {
    const storedEvents = localStorage.getItem(this.STORAGE_KEY);
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents) as EventData[];
      this.events = parsedEvents.map(item => {
        if (item.type === 'online') {
          return new OnlineEvent(item as OnlineEventData);
        } else {
          return new OfflineEvent(item as OfflineEventData);
        }
      });
    }

    this.visibleEvents = [...this.events];
  }

  public search(term: string){
    if (!term.trim()){
      this.visibleEvents = [...this.events];
      return;
    }
    this.visibleEvents = this.events.filter(event => event.matchSearchTerm(term));
  }

  public addEvent(eventData: EventData) {
    const newEvent = eventData.type === 'online' ? new OnlineEvent(eventData as OnlineEventData) : new OfflineEvent(eventData as OfflineEventData);
    this.events.push(newEvent);
    this.visibleEvents = [...this.events];
    this.syncStorage();
  }

  public deleteEvent(id: string) {
    this.events = this.events.filter(event => event.id !== id);
    this.visibleEvents = [...this.events];
    this.syncStorage();
  }

  public updateEvent(id: string, newData: EventData) {
    const index = this.events.findIndex(event => event.id === id);
    if (index !== -1) {
      this.events[index] = newData.type === 'online' ? new OnlineEvent(newData as OnlineEventData) : new OfflineEvent(newData as OfflineEventData);
      this.visibleEvents = [...this.events];
      this.syncStorage();
    }
  }
}



