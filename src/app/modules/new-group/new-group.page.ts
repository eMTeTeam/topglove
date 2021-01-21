import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MemberSelectionComponent } from '../../shared/member-selection/member-selection.component';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit {

  newGroupForm: FormGroup;

  selectedMember: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    public modalController: ModalController,
    private notify: NotificationService,
    private apiService: ApiService,
    private loadingService: LoadingService) {
    this.generateNewGroupForm();
  }

  ngOnInit() { }

  generateNewGroupForm = () => {
    this.newGroupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  saveNewGroup = () => {
    if (this.newGroupForm.dirty && this.newGroupForm.valid) {

      this.loadingService.show();

      // save & dismiss
      const newGroup = {
        Name: this.newGroupForm.value.name,
        TeamDescription: this.newGroupForm.value.description
      }

      this.apiService.saveGroup(newGroup).subscribe(async res => {
        this.loadingService.hide();

        this.router.navigate(['/tabs'], { replaceUrl: true });
        this.notify.success("Whoa!!, Group created successfully");
      },
        err => {
          this.notify.error("Huh!, Please try again!");
          this.loadingService.hide();
        });
    }
  }

  selectMember = async () => {
    const modal = await this.modalController.create({
      component: MemberSelectionComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.selectedMember = data;
      const memberName = data ? data.name : '';
      this.newGroupForm.patchValue({ memberName });
    }
  }
}
