import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BucketListService {
  private baseUrl = 'http://localhost:3000/buckets';
  private bucketsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadBuckets();
  }

  private loadBuckets(): void {
    this.http.get<any[]>(this.baseUrl).subscribe((buckets: any[]) => {
      this.bucketsSubject.next(buckets);
    });
  }

  getBuckets(): Observable<any[]> {
    return this.bucketsSubject.asObservable();
  }

  addBucket(bucket: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, bucket);
  }

  deleteBucket(bucketId: string): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}`;
    return this.http.delete<any>(url);
  }

  addFileToBucket(bucketId: string, fileMetadata: any): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}/files`;
    return this.http.post<any>(url, fileMetadata);
  }

  deleteFileFromBucket(bucketId: string, fileId: string): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}/files/${fileId}`;
    return this.http.delete<any>(url);
  }

  formatFileSize(size: number): string {
    const KB = 1000;
    const MB = KB * 1000;
    const GB = MB * 1000;

    if (size < KB) {
      return size + ' B';
    } else if (size < MB) {
      return (size / KB).toFixed(2) + ' KB';
    } else if (size < GB) {
      return (size / MB).toFixed(2) + ' MB';
    } else {
      return (size / GB).toFixed(2) + ' GB';
    }
  }
}
