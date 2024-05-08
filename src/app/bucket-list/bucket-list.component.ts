import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [],
  templateUrl: './bucket-list.component.html',
  styleUrl: './bucket-list.component.css',
})
export class BucketListComponent implements OnInit {
  buckets: any[] = [];
  selectedBucket: any;
  createExpanded: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('src/data/buckets.json').subscribe((data) => {
      this.buckets = data;
    });
  }

  showFiles(bucket: any) {
    this.selectedBucket = bucket;
  }

  expandCreateBucket() {
    this.createExpanded = !this.createExpanded;
  }
}
