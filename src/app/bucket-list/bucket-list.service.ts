import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BucketListService {
  private baseUrl = 'http://localhost:3000/buckets';

  constructor(private http: HttpClient) {}

  getBuckets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addBucket(bucket: any): Observable<any> {
    console.log(bucket);

    return this.http.post<any>(this.baseUrl, bucket);
  }

  deleteBucket(bucketId: number): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}`;
    return this.http.delete<any>(url);
  }
  addFileToBucket(bucketId: string, fileMetadata: any): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}/files`;
    return this.http.post<any>(url, JSON.stringify(fileMetadata));
  }

  deleteFileFromBucket(bucketId: string, fileId: number): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}/files/${fileId}`;
    return this.http.delete<any>(url);
  }
}
