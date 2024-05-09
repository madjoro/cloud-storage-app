import { Component, OnInit } from '@angular/core';
import { BucketListService } from './bucket-list.service';
import { BucketDetailsComponent } from '../bucket-details/bucket-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BucketDetailsComponent],
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
})
export class BucketListComponent implements OnInit {
  buckets: any[] = [];
  newBucketName: string = '';
  selectedLocation: string = '';
  //toggles
  selectedBucket: boolean = false;
  createExpanded: boolean = false;

  constructor(private bucketListService: BucketListService) {}

  ngOnInit() {
    this.loadBuckets();
  }

  loadBuckets() {
    this.bucketListService.getBuckets().subscribe((data: any[]) => {
      this.buckets = data;
    });
  }

  toggleCreateExpanded() {
    this.createExpanded = !this.createExpanded;
  }

  toggleSelectedBucket() {
    this.selectedBucket = !this.selectedBucket;
  }

  createBucket() {
    const newBucket = {
      name: this.newBucketName,
      location: this.selectedLocation,
    };
    this.bucketListService.addBucket(newBucket).subscribe(() => {
      this.loadBuckets(); //reload
      this.newBucketName = '';
      this.selectedLocation = '';
      this.createExpanded = false;
    });
  }
}
