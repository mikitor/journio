import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntriesService } from 'src/app/services/entries.service';

import { Entry } from './entry.model';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {
  entries$: Observable<Entry[]>;

  constructor(private entriesService: EntriesService) { }

  ngOnInit() {
    this.entries$ = this.entriesService.getEntries();
  }
}
