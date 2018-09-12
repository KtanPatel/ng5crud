import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CoinService } from './../coin.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { timeout } from 'q';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  coin: any;
  angForm: FormGroup;
  title = 'Edit Coin';

  constructor(private route: ActivatedRoute, private router: Router, private service: CoinService,
    private fb: FormBuilder) {
    this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.editCoin(params['id']).subscribe(res => {
        this.coin = res;
      });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  updateCoin(name, price) {
    const self = this;
    this.route.params.subscribe(params => {
    this.service.updateCoin(name, price, params['id']);
    setTimeout(function() { self.router.navigate(['index']); }, 500);
    });
  }


}
