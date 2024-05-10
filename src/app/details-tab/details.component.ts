import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BucketListService } from '../bucket-list/bucket-list.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() bucket: any;
  modal: bootstrap.Modal | undefined;

  @Output() toggleEvent = new EventEmitter<void>();

  emitToggleEvent(): void {
    console.log('asdasdasd');
    this.toggleEvent.emit();
  }

  constructor(private bucketListService: BucketListService) {}

  calcBucketSize(bucket: any) {
    const totalSize = bucket.files.reduce(
      (acc: number, file: any) => acc + file.size,
      0
    );

    const remaining = 5_000_000_000 - totalSize;

    return this.bucketListService.formatFileSize(remaining);
  }

  deleteBucket(id: string) {
    this.bucketListService.deleteBucket(id).subscribe({
      next: (response) => {
        console.log('DELETE request successful:', response);
        this.emitToggleEvent(); // Emit event after successful deletion
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
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
      document.body.classList.remove('modal-open');
      const backdropElements: NodeListOf<HTMLElement> =
        document.querySelectorAll('.modal-backdrop');
      backdropElements.forEach((element) => element.remove());
    }
  }
}
