import { Injectable } from '@angular/core';
import {
  addDoc, collection, collectionData, doc, docData,
  Firestore, Timestamp, updateDoc, query, orderBy, getDocs
} from '@angular/fire/firestore';
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

  getEntryHistory(entryId: string) {
    const q = query(collection(this.firestore, 'entries', entryId, 'history'), orderBy('timestamp', 'desc'));
    return getDocs(q);
  }

  getEntryById(id: string) {
    const entryDocReference = doc(this.firestore, 'entries', id);
    return docData(entryDocReference, { idField: 'id' });
  }

  setEntryById(id: string, data: Partial<Entry>) {
    const entryDocumentReference = doc(this.firestore, 'entries', id);
    const entryHistoryCollectionReference = collection(this.firestore, 'entries', id, 'history');
    addDoc(entryHistoryCollectionReference, { ...data, timestamp: Timestamp.now() });
    return updateDoc(entryDocumentReference, data);
  }

  addEntry(data: Partial<Entry>) {
    const entriesCollectionReference = collection(this.firestore, 'entries');
    return addDoc(entriesCollectionReference, { ...data, timestamp: Timestamp.now() });
  }
}
