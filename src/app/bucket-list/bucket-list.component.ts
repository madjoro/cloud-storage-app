import { Component, OnInit } from '@angular/core';
import { BucketListService } from './bucket-list.service';
import { BucketDetailsComponent } from '../bucket-details/bucket-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as uuid from 'uuid';

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
  bucketDetailed: {} = {};

  //toggles
  selectedBucket: boolean = false;
  createExpanded: boolean = false;
  createNewShown: boolean = true;

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
    this.createNewShown = !this.createNewShown;
  }

  toggleSelectedBucket(bucket: {}) {
    this.selectedBucket = !this.selectedBucket;
    this.bucketDetailed = bucket;
  }

  toggleMain() {
    this.selectedBucket = !this.selectedBucket;
  }

  createBucket() {
    const newBucket = {
      id: uuid.v4(),
      name: this.newBucketName,
      location: this.selectedLocation,
      files: [],
    };
    this.bucketListService.addBucket(newBucket).subscribe(() => {
      this.loadBuckets(); //reload
      this.newBucketName = '';
      this.selectedLocation = '';
      this.createExpanded = false;
      this.createNewShown = true;
    });
  }
}
