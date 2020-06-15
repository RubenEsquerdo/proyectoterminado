import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.page.html',
  styleUrls: ['./seller.page.scss'],
})
export class SellerPage implements OnInit {
  SellerList = [];
  seller = {
    nombre : '',
    edad : '',
  };


  constructor(private sellerService: SellerService, private alertController: AlertController, private router: Router,
              private location: Location) { }

  ngOnInit() {
  }

  refreshSeller(event) {
    this.sellerService.getSellers().subscribe(
      (seller: any) => {
      this.SellerList = seller;
      event.target.complete();
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  deleteSeller(id) {
    this.sellerService.deleteSeller(id).subscribe(
    );
  }


  sendForm() {
    this.sellerService.postSeller(this.seller).subscribe(
      () => {
        this.presentAlertConfirm();
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Fue creado correctamente',
      buttons: [
        {
          text: 'creado correctamente',
          handler: () => {
            console.log('creado correctamente');
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}

