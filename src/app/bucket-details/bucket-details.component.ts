import { Component, Input } from '@angular/core';
import { BucketListService } from '../bucket-list/bucket-list.service';
import { FileListComponent } from '../file-list/file-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css'],
  standalone: true,
  imports: [CommonModule, FileListComponent],
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('File Name:', file.name);
      console.log('File Size:', file.size);
      console.log('Last Modified:', file.lastModified);
    }
  }
}
