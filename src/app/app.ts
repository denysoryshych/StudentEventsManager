import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventManager } from './services/event-manager';
import { EventLocalStorage } from './models/event-local-storage';
import { EventData, OfflineEventData, OnlineEventData } from './models/event-interfaces';
import { BaseStudentEvent, OnlineEvent, OfflineEvent } from './models/event-model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('EVENT MANAGER');
  public eventManager = inject(EventManager);
  public eventLocalStorage = inject(EventLocalStorage);

  public newTitle: string = '';
  public newDescription: string = '';
  public newDate: string = '';
  public newLocation: string = '';
  public newLink: string = '';
  public newType: 'online' | 'offline' = 'offline';
  public editingEventId: string | null = null;

  addNewEvent() {
    if (!this.newTitle || !this.newDate) {
      alert('Please fill in fields correctly');
      return;
    }

    const targetId = this.editingEventId ? this.editingEventId : crypto.randomUUID();

    const baseData = {
      id: targetId,
      title: this.newTitle,
      description: this.newDescription,
      date: this.newDate,
      type: this.newType
    };

    let finalData: EventData;

    if (this.newType === 'online') {
      finalData = { ...baseData, type: 'online', link: this.newLink } as OnlineEventData;
    } else {
      finalData = { ...baseData, type: 'offline', location: this.newLocation } as OfflineEventData;
    }

    if (this.editingEventId) {
      this.eventManager.updateEvent(this.editingEventId, finalData);
    } else {
      this.eventManager.addEvent(finalData);
    }

    this.resetForm();
  }

  onSearch(term: string) {
    this.eventManager.search(term);
  }

  editEvent(event: BaseStudentEvent) {
    this.editingEventId = event.id;
    this.newTitle = event.title;
    this.newDescription = event.description;
    this.newDate = event.date;
    this.newType = event.type;

    if (event.type === 'online') {
      this.newLink = (event as OnlineEvent).link;
      this.newLocation = '';
    } else {
      this.newLocation = (event as OfflineEvent).location;
      this.newLink = '';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm() {
    this.editingEventId = null;
    this.newTitle = '';
    this.newDescription = '';
    this.newDate = '';
    this.newLink = '';
    this.newLocation = '';
  }
}
