import { Injectable } from '@angular/core';
import { EventData } from '../models/event-interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventLocalStorage {
  private readonly key = 'events';

  public saveEvents(events: EventData[]) {
    const JSON_string = JSON.stringify(events);
    localStorage.setItem(this.key, JSON_string);
  }

  public loadEvents(): EventData[] {
    const data = localStorage.getItem(this.key);
    if (data){
      return JSON.parse(data);
    } else {
      return [];
    }
  }
}




