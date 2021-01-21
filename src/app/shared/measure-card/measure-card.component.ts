import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { SlotTime } from '../../entities/measure-card';

@Component({
  selector: 'app-measure-card',
  templateUrl: './measure-card.component.html',
  styleUrls: ['./measure-card.component.scss'],
})
export class MeasureCardComponent implements OnInit {

  @Input() slots: Array<SlotTime>;

  constructor() { }

  ngOnInit() { }

  getFormatTime = (date: Date): string => {
    return `${moment.utc(date).local().format('hh:mm A')} (${moment.utc(date).local().fromNow()})`;
  }

  hasSymptoms = (slot: SlotTime) => {

    let temp = false;

    if (slot.temperatureUnit.toUpperCase() === 'C' && slot.temperature > 38) {
      temp = true;
    }

    if (slot.temperatureUnit.toUpperCase() === 'F' && slot.temperature > 99) {
      temp = true;
    }

    return slot.cough || slot.runnyNose || slot.shortnessBreath || slot.sneezing || temp;
  }

}
