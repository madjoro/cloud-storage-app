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
        lastModified: file.lastModified,
        size: file.size,
      };
      this.bucketListService.addFileToBucket(this.bucket, newFile);
    }
  }

  selectFile(index: number) {
    this.selectedFileIndex = index;
  }

  deleteObject(index: number) {
    if (index !== -1) {
      const selectedFile = this.files[this.selectedFileIndex];
      console.log('Selected File:', selectedFile);
    }
  }

  openModal() {
    const modalElement = document.getElementById(
      'deleteObjectModal'
    ) as HTMLElement;
    this.modal = new Modal(modalElement);
    this.modal.show();
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }
}
