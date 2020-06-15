import { Component } from '@angular/core';
import { ListService } from '../services/list.service';
import { AlertController } from '@ionic/angular';
import { SellerService } from '../services/seller.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  SellerList = [];
  productsList = [];

  constructor(private listService: ListService, private alertController: AlertController, private sellerService: SellerService,
   ) {}

  refresh(event) {
    this.listService.getProducts().subscribe(
      (product: any) => {
        this.productsList = product;
        event.target.complete();
      }
    );
  }

  refreshSeller(event) {
    this.sellerService.getSellers().subscribe(
      (seller: any) => {
      this.SellerList = seller;
      event.target.complete();
      }
    );
  }

  getProductbyName(name: 'String' ){
    this.listService.getProductbyName(name).subscribe();
  }

  deleteProduct(id) {
    this.listService.deleteProduct(id).subscribe(
      () => {
        this.presentAlertDelete();
      }
    );
  }

  deleteSeller(id) {
    this.sellerService.deleteSeller(id).subscribe(
      () => {
        this.presentAlertDelete();
      }
    );
  }

  async presentAlertDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Eliminado</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Aceptar');
            this.listService.getProducts().subscribe(
              (resp: any) => {
                this.productsList = resp;
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewDidEnter() {
    this.listService.getProducts().subscribe(
      (resp: any) => {
        this.productsList = resp;
      }
    );
  }
}
