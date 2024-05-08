import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BucketListComponent } from './bucket-list/bucket-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BucketListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cloud-storage-app';
}
