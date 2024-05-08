import { Component, OnInit } from '@angular/core';
import { BucketListService } from './bucket-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
})
export class BucketListComponent implements OnInit {
  buckets: any[] = [];
  selectedBucket: any;
  createExpanded: boolean = false;
  newBucketName: string = '';
  selectedLocation: string = ''; // Add a variable to store the selected location

  constructor(private bucketListService: BucketListService) {}

  ngOnInit() {
    this.loadBuckets();
  }

  loadBuckets() {
    this.bucketListService.getBuckets().subscribe((data: any[]) => {
      this.buckets = data;
      console.log(this.buckets);
    });
  }

  toggleCreateExpanded() {
    this.createExpanded = !this.createExpanded;
  }

  createBucket() {
    // Call a service method to create a new bucket using this.newBucketName and this.selectedLocation
    // Reset input fields
    this.newBucketName = '';
    this.selectedLocation = '';
    this.createExpanded = false;
  }
}
