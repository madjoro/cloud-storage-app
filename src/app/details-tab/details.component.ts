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

  @Output() deleteEvent = new EventEmitter<string>();

  emitDeleteEvent(id: string) {
    this.deleteEvent.emit(id);
  }

  constructor(private bucketListService: BucketListService) {}

  // assumes max bucket size of 5GB, subtracts sum of current file sizes
  calcBucketSize(bucket: any) {
    const totalSize = bucket.files.reduce(
      (acc: number, file: any) => acc + file.size,
      0
    );
    const remaining = 5_000_000_000 - totalSize;
    return this.bucketListService.formatFileSize(remaining);
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
