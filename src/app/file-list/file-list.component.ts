import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { BucketListService } from '../bucket-list/bucket-list.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css',
})
export class FileListComponent {
  @Input() files: any[] = [];
  @Input() bucket: string = '';
  selectedFileIndex: number = -1;
  modal: bootstrap.Modal | undefined;

  constructor(private bucketListService: BucketListService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const newFile = {
        id: uuid.v4(),
        fileName: file.name,
        dateModified: file.lastModified,
        size: file.size,
      };
      this.bucketListService.addFileToBucket(this.bucket, newFile).subscribe({
        next: (response) => {
          this.files.push(newFile);
          console.log('PUT request successful:', response);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        },
      });
    }
  }

  selectFile(index: number) {
    this.selectedFileIndex = index;
  }

  deleteObject(index: number) {
    if (index !== -1) {
      this.bucketListService
        .deleteFileFromBucket(
          this.bucket,
          this.files[this.selectedFileIndex].id
        )
        .subscribe({
          next: (response) => {
            this.files.splice(this.selectedFileIndex, 1);
            this.selectedFileIndex = -1;
            console.log('DELETE request successful:', response);
          },
          error: (error) => {
            console.error('Error occurred:', error);
          },
        });
    }
  }

  openModal() {
    if (this.selectedFileIndex !== -1) {
      console.log(this.selectedFileIndex);
      const modalElement = document.getElementById(
        'deleteObjectModal'
      ) as HTMLElement;
      this.modal = new Modal(modalElement);
      this.modal.show();
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
      document.body.classList.remove('modal-open');
      const backdropElements: NodeListOf<HTMLElement> =
        document.querySelectorAll('.modal-backdrop');
      backdropElements.forEach((element) => element.remove());
    }
  }
}
