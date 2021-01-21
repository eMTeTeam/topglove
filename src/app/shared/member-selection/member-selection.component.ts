import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-member-selection',
  templateUrl: './member-selection.component.html',
  styleUrls: ['./member-selection.component.scss'],
})
export class MemberSelectionComponent implements OnInit {

  selectedMember: any;

  constructor(private modalController: ModalController) {
    this.selectedMember = null;
  }

  ngOnInit() {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal'
    };
    history.pushState(modalState, null);
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss(this.selectedMember);
  }

  selectMember = () => {
    this.selectedMember = { id: '324523523', name: 'somename' }; // item
    this.dismissModal();
  }

}
