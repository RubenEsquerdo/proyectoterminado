import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import {AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  product = {
    nombre : '',
    descripcion : '',
    precio : ''
  };

  constructor(
    private listService: ListService,
    private alertController: AlertController,
    private router: Router) {}

  ngOnInit() {

  }

  sendForm() {
    this.listService.postProduct(this.product).subscribe(
      () => {
        this.presentAlertConfirm();
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'El producto fue introducido correctamente',
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
