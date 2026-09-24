import { TestBed } from '@angular/core/testing';
import { EventManager } from './event-manager';
import { OnlineEventData, OfflineEventData } from '../models/event-interfaces';

describe('EventManager', () => {
  let service: EventManager;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventManager);
    (service as any).events = [];
    (service as any).visibleEvents = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an online event correctly', () => {
    const eventData: OnlineEventData = {
      id: '1',
      title: 'Лекція з Angular',
      description: 'Вивчаємо компоненти та сервіси',
      date: '2026-06-01',
      type: 'online',
      link: 'https://meet.google.com/test-link'
    };

    service.addEvent(eventData);

    expect(service.visibleEvents.length).toBe(1);
    expect(service.visibleEvents[0].title).toBe('Лекція з Angular');
    expect(service.visibleEvents[0].type).toBe('online');
  });

  it('should filter events by search term', () => {
    const event1: OnlineEventData = {
      id: '1',
      title: 'Підготовка до математики',
      description: 'Алгебра',
      date: '2026-06-02',
      type: 'online',
      link: 'https://zoom.us/math'
    };

    const event2: OfflineEventData = {
      id: '2',
      title: 'Фізика лабораторна',
      description: 'Оптика',
      date: '2026-06-03',
      type: 'offline',
      location: 'Аудиторія 202'
    };

    service.addEvent(event1);
    service.addEvent(event2);

    expect(service.visibleEvents.length).toBe(2);

    service.search('математики');
    expect(service.visibleEvents.length).toBe(1);
    expect(service.visibleEvents[0].title).toBe('Підготовка до математики');
  });

  it('should delete an event by id', () => {
    const eventData: OnlineEventData = {
      id: '123',
      title: 'Тестова подія',
      description: 'Для видалення',
      date: '2026-06-04',
      type: 'online',
      link: 'https://meet.google.com/del'
    };

    service.addEvent(eventData);
    expect(service.visibleEvents.length).toBe(1);

    service.deleteEvent('123');
    expect(service.visibleEvents.length).toBe(0);
  });
});
