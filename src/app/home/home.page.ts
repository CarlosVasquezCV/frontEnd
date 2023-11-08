import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id: any = '';
  ngOnInit(){}
  constructor(private router: Router, private alertController: AlertController,private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('data');
    this.permiso();
  }    

  /* Aca estan los parametros para los botones de navegacion hacia los formularios que envian los correos*/
  felicitarAprendiz() { this.router.navigate(['felicitar-aprendiz', { data: this.id }]); }
  llamadoAtencion() { this.router.navigate(['/llamado-atencion', { data: this.id }]); }
  citacionComite() { this.router.navigate(['/citacion-comite', { data: this.id }]); }

  async confirmarSalida() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Está seguro de que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => { this.router.navigate(['/login']); }
        }
      ]
    });
  
    await alert.present();
  };  
  permiso(){
    if (this.id === '' || this.id === null){this.router.navigate(['/login']); }
  }
}
