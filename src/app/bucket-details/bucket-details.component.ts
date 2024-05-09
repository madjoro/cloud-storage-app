import { Component, Input } from '@angular/core';
import { BucketListService } from '../bucket-list/bucket-list.service';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css'],
  standalone: true,
})
export class BucketDetailsComponent {
  @Input() bucket: any;

  constructor(private bucketListService: BucketListService) {}

  deleteBucket() {
    this.bucketListService.deleteBucket(this.bucket.id).subscribe(() => {});
  }
}
