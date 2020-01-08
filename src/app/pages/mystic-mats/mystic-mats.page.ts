import { Component } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'mystic-mats.page.html',
  styleUrls: ['mystic-mats.page.scss']
})
export class MysticMatsPage {

  // Promotion probability except platinum ore
  // https://wiki.guildwars2.com/wiki/Mystic_Forge/Material_Promotion
  public PROMOTION_1_4: number = 86.34;
  public PROMOTION_5: number = 18.92;

  constructor(public api: ApiService) {}

}
