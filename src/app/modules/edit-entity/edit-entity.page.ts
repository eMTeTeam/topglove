import { Component, OnInit } from '@angular/core';
import { TopGlovEntity } from 'src/app/entities/topglove.model';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.page.html',
  styleUrls: ['./edit-entity.page.scss'],
})
export class EditEntityPage implements OnInit {

  public item: TopGlovEntity = null;

  constructor() {
    const { item } = window.history.state;

    this.item = item;
  }

  ngOnInit() {
  }

}
