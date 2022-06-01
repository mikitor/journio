import { Doc, applyUpdate, encodeStateAsUpdate } from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { fromUint8Array, toUint8Array } from 'js-base64';
import { EntriesService } from './entries.service';

export class FirestoreProvider {
  awareness;

  constructor(
    public ydoc: Doc,
    private firestore: Firestore,
    private entriesService: EntriesService,
    private entryId?: string
  ) {
    this.awareness = new awarenessProtocol.Awareness(ydoc);
    if (!entryId) {
      this.entriesService.addEntry({}).then(docRef => this.syncEntryChanges(ydoc, docRef.id));
    } else {
      this.syncEntryChanges(ydoc, entryId);
    }
  }

  disconnect() { }
  destroy() { }

  private syncEntryChanges(ydoc: Doc, entryId: string) {
    onSnapshot(doc(this.firestore, 'entries', entryId), (document) => {
      const incomingUpdate = toUint8Array(document.data().content);
      applyUpdate(ydoc, incomingUpdate);
    });

    ydoc.on('update', (updatedDoc) => {
      const outgoingUpdate = encodeStateAsUpdate(ydoc);
      this.entriesService.setEntryById(entryId, {
        description: ydoc.getText('quill').toString(),
        content: fromUint8Array(outgoingUpdate)
      });
    });
  }
}
