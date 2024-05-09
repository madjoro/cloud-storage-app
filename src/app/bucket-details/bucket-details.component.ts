import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BucketListService } from '../bucket-list/bucket-list.service';
import { FileListComponent } from '../file-list/file-list.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css'],
  standalone: true,
  imports: [CommonModule, FileListComponent, DetailsComponent],
})
export class BucketDetailsComponent {
  @Input() bucket: any;
  activeTab: string = 'files';

  constructor(private bucketListService: BucketListService) {}

  deleteBucket() {
    this.bucketListService.deleteBucket(this.bucket.id).subscribe(() => {});
  }

  toggleTab(tab: string) {
    this.activeTab = tab;
  }
}
