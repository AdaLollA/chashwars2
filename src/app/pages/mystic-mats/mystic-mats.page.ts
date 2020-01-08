import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'mystic-mats.page.html',
  styleUrls: ['mystic-mats.page.scss']
})
export class MysticMatsPage {

  MATERIAL_IDS = [

  ];

  constructor(private api: ApiService) {}

}
