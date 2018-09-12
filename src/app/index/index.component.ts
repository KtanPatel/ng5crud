import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  coins: any;

  constructor(private http: HttpClient, private service: CoinService) {
  }

  ngOnInit() {
    this.getCoin();
  }

  getCoin() {
    this.service.getCoins().subscribe(res => {
      this.coins = res;
    });
  }

  deleteCoin(id) {
    this.service.deleteCoin(id).subscribe(res => {
      console.log('Deleted');
      this.getCoin();
    });
  }
}
