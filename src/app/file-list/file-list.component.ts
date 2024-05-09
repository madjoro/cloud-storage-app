import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css',
})
export class FileListComponent {
  @Input() files: any[] = [];
  selectedFileIndex: number = -1;
  modalName: bootstrap.Modal | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('File Name:', file.name);
      console.log('File Size:', file.size);
      console.log('Last Modified:', file.lastModified);
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
    const modal = new Modal(modalElement);
    modal.show();
  }
}
