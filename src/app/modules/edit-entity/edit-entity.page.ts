import { Component, OnInit } from '@angular/core';
import { Defetcs, Factory, FiringOrRework, Size, TypeOfFormers } from 'src/app/entities/topglove.domain.model';
import { TopGlovEntity } from 'src/app/entities/topglove.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.page.html',
  styleUrls: ['./edit-entity.page.scss'],
})
export class EditEntityPage implements OnInit {

  public item: TopGlovEntity = null;

  _typeOfFormers: string[] = TypeOfFormers.data;
  _factory: string[] = Factory.data;
  _firingOrRework: string[] = FiringOrRework.data;
  _Size: string[] = Size.data;
  _defetcs: string[] = Defetcs.data;

  constructor(private apiService: ApiService) {
    const { item } = window.history.state;

    this.item = item;
  }

  ngOnInit() {
  }

  reject = () => {

  }

  accept = () => {

  }

  save = () => {
    this.apiService.saveEntity({}).subscribe((result: any) => {

    }, (error: any) => {

    });
  }

}
