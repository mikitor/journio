import { Timestamp } from '@angular/fire/firestore';

export class Entry {
  constructor(
    public id: string,
    public content: string,
    public description: string,
    public timestamp: Timestamp
  ) { }
}
