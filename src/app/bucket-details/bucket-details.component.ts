import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BucketListService } from '../bucket-list/bucket-list.service';
import { FileListComponent } from '../file-list/file-list.component';
import { DetailsComponent } from '../details-tab/details.component';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css'],
  standalone: true,
  imports: [CommonModule, FileListComponent, DetailsComponent],
})
export class BucketDetailsComponent {
  @Input() bucket: any;
  @Output() toggleEvent = new EventEmitter<void>();

  emitToggleEvent(): void {
    this.toggleEvent.emit();
  }

  activeTab: string = 'files';

  toggleTab(tab: string) {
    this.activeTab = tab;
  }
}
