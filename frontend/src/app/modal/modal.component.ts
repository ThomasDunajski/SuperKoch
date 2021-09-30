import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  @Input() events: Observable<void>;
  private eventsSubscription: Subscription;
  modalName: string = 'modal';
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => this.showModal());
  }
  hideModal() {
    document.getElementById(this.modalName).style.display = 'none';
  }

  showModal() {
    document.getElementById(this.modalName).style.display = 'block';
  }
  interceptModalClose = (event) => {
    event.stopPropagation();
  };
}
