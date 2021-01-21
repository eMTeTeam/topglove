import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.page.html',
  styleUrls: ['./generate-report.page.scss'],
})
export class GenerateReportPage implements OnInit {

  newReportForm: FormGroup;

  groups: Array<any> = [];

  constructor(private fb: FormBuilder,
    private apiService: ApiService) {
    this.generateReportForm();
    this.loadGroups();
  }

  ngOnInit() {
  }

  generateReportForm = () => {
    this.newReportForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  loadGroups = () => {
    this.apiService.getGroups().subscribe((res: any) => {
      this.groups = res;
    });
  }

  generateReport = () => {
    if (this.newReportForm.dirty && this.newReportForm.valid) {
      const teamId = this.newReportForm.value.group.teamId;
      const sDate = this.newReportForm.value.startDate;
      const eDate = this.newReportForm.value.endDate;

      const payload = {
        'TeamId': teamId,
        'StartDate': sDate,
        'EndDate': eDate
      };

      this.apiService.getExcelReport(payload).subscribe((response) => {
        const file = new Blob([response.body], { type: 'application/xlsx' });
        const fileName = `${moment().format('YYYY-MM-DDTHH:mm')}_Health_Tracker.xlsx`;
        saveAs(file, fileName);
      });
    }
  }

}
