import { Component, OnInit } from '@angular/core';
import { BucketListService } from './bucket-list.service';
import { BucketDetailsComponent } from '../bucket-details/bucket-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as uuid from 'uuid';
import { Bucket } from '../../interfaces/buckets';

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BucketDetailsComponent],
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
})
export class BucketListComponent implements OnInit {
  buckets: Bucket[] = [];
  newBucketName: string = '';
  selectedLocation: string = '';
  bucketDetailed: Bucket | {} = {};

  //toggles
  selectedBucket: boolean = false;
  createExpanded: boolean = false;
  createNewShown: boolean = true;
  createErrorShown: boolean = false;

  constructor(private bucketListService: BucketListService) {}

  ngOnInit() {
    this.loadBuckets();
  }

  private loadBuckets(): void {
    this.bucketListService.getBuckets().subscribe({
      next: (data: Bucket[]) => {
        this.buckets = data;
      },
      error: (error) => {
        console.error('Error loading buckets:', error);
      },
    });
  }

  createBucket() {
    if (this.newBucketName && this.selectedLocation) {
      const newBucket = {
        id: uuid.v4(),
        name: this.newBucketName,
        location: this.selectedLocation,
        files: [],
      };
      this.bucketListService.addBucket(newBucket).subscribe(() => {
        this.loadBuckets();
      });
      this.buckets.push(newBucket);
      this.toggleDefault();
    } else {
      this.createErrorShown = true;
    }
  }

  deleteBucket(id: string) {
    this.bucketListService.deleteBucket(id).subscribe({
      next: (response) => {
        console.log('DELETE request successful:', response);
        const index = this.buckets.findIndex((bucket) => bucket.id === id);
        if (index !== -1) {
          this.buckets.splice(index, 1);
        }
        this.toggleMain();
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
  }

  // toggle switches to show/hide UI elements
  toggleDefault() {
    this.createErrorShown = false;
    this.createExpanded = false;
    this.createNewShown = true;
    this.newBucketName = '';
    this.selectedLocation = '';
  }

  toggleCreateExpanded() {
    this.createExpanded = !this.createExpanded;
    this.createNewShown = !this.createNewShown;
  }

  toggleSelectedBucket(bucket: {}) {
    this.selectedBucket = !this.selectedBucket;
    this.bucketDetailed = bucket;
    this.toggleDefault();
  }

  toggleMain() {
    this.selectedBucket = !this.selectedBucket;
  }
}
