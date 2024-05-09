import { Component, Input } from '@angular/core';
import { BucketListService } from '../bucket-list/bucket-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css'],
  standalone: true,
  imports: [CommonModule],
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
