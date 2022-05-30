import { Injectable } from '@angular/core';
import { Entry } from '../pages/entries/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entries: Entry[] = [
    {
      id: '1',
      title: 'First journal entry',
      content: 'Content generated by the user',
      date: new Date()
    },
    {
      id: '2',
      title: 'Second journal entry',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus quis efficitur nisi. Ut sed venenatis odio. Nulla id massa a felis commodo finibus.
      Etiam ut ultricies mauris. Pellentesque condimentum efficitur erat, et tincidunt nisi elementum sed.`,
      date: new Date()
    },
    {
      id: '3',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      content: `Test`,
      date: new Date()
    }
  ];

  constructor() { }

  getEntries() {
    return [...this.entries];
  }
}
