import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Bucket, File } from '../../interfaces/buckets';

@Injectable({
  providedIn: 'root',
})
export class BucketListService {
  private baseUrl = 'http://localhost:3000/buckets';
  private bucketsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadBuckets();
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Network error occurred.'));
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      return throwError(() => new Error('Something went wrong on the server.'));
    }
  }

  // data file related methods
  loadBuckets(): void {
    this.http
      .get<Bucket[]>(this.baseUrl)
      .pipe(catchError(this.handleError))
      .subscribe((buckets: Bucket[]) => {
        this.bucketsSubject.next(buckets);
      });
  }

  getBuckets(): Observable<Bucket[]> {
    return this.bucketsSubject.asObservable();
  }

  addBucket(bucket: Bucket): Observable<any> {
    return this.http
      .post<Bucket>(this.baseUrl, bucket)
      .pipe(catchError(this.handleError));
  }

  deleteBucket(bucketId: string): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  addFileToBucket(bucketId: string, fileMetadata: File): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}/files`;
    return this.http
      .post<any>(url, fileMetadata)
      .pipe(catchError(this.handleError));
  }

  deleteFileFromBucket(bucketId: string, fileId: string): Observable<any> {
    const url = `${this.baseUrl}/${bucketId}/files/${fileId}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  // formatting and shortening file sizes
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
