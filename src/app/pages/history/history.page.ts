import { EntriesService } from 'src/app/services/entries.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../entries/entry.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  entryId: string;
  entryHistory: Entry[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private entriesService: EntriesService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('entryId')) {
        this.entryId = paramMap.get('entryId');
        this.entriesService.getEntryHistory(this.entryId)
          .then(entryHistory => {
            const history = [];
            entryHistory.forEach(entry => history.push(entry.data()));
            this.entryHistory = history;
          });
      } else {
        this.navController.navigateBack(['/', 'entries']);
      }
    });
  }
}
