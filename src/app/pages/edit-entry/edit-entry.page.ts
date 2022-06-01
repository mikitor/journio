import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { EntriesService } from 'src/app/services/entries.service';

import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';

import * as Y from 'yjs';
Quill.register('modules/cursors', QuillCursors);

import { FirestoreProvider } from '../../services/firebaseprovider';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.page.html',
  styleUrls: ['./edit-entry.page.scss'],
})
export class EditEntryPage implements OnInit, OnDestroy {
  modules = {};
  ydoc = new Y.Doc(); // document containing the changes
  ytext = this.ydoc.getText('quill');
  firestoreProvider: FirestoreProvider;
  routeSubscription: Subscription;
  entryId: string;

  constructor(
    private firestore: Firestore,
    private entriesService: EntriesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeSubscription = this.activatedRoute.paramMap
      .pipe(tap(paramMap => {
        if (paramMap.has('entryId')) {
          this.entryId = paramMap.get('entryId');
          this.firestoreProvider = new FirestoreProvider(this.ydoc, this.firestore, this.entriesService, this.entryId);
        } else {
          this.firestoreProvider = new FirestoreProvider(this.ydoc, this.firestore, entriesService);
        }
        this.modules = {
          cursors: {
            hideDelayMs: 5000,
            hideSpeedMs: 0,
            selectionChangeSource: null,
            transformOnTextChange: true,
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ['clean'], // remove formatting button
            ['link']
          ]
        };
      })).subscribe();
  }

  ngOnInit() {
  }

  onEditorCreated(quill: Quill) {
    new QuillBinding(this.ytext, quill, this.firestoreProvider.awareness);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
