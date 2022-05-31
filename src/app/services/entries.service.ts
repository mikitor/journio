import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Entry } from '../pages/entries/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  entries$ = new BehaviorSubject<Entry[]>([]);

  constructor(private firestore: Firestore) {
    const entriesCollectionReference = collection(this.firestore, 'entries');
    collectionData(entriesCollectionReference, { idField: 'id' })
      .pipe(tap(entries => this.entries$.next(entries as Entry[])))
      .subscribe();
  }

  getEntries() {
    return this.entries$.asObservable();
  }

  getEntryById(id: string) {
    const entryDocReference = doc(this.firestore, 'entries', id);
    return docData(entryDocReference, { idField: 'id' });
  }

  setEntryById(id: string, data: Partial<Entry>) {
    const entryDocumentReference = doc(this.firestore, 'entries', id);
    return setDoc(entryDocumentReference, data);
  }

  addEntry(data: Partial<Entry>) {
    const entriesCollectionReference = collection(this.firestore, 'entries');
    return addDoc(entriesCollectionReference, data);
  }
}
