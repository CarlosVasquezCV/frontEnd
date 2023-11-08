import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-coordinador',
  templateUrl: './home-coordinador.page.html',
  styleUrls: ['./home-coordinador.page.scss'],
})
export class HomeCoordinadorPage implements OnInit {

  ngOnInit() {} 
  constructor(private router: Router, 
    private alertController: AlertController,
    private route: ActivatedRoute,
    )
    {
      this.idCoordinador = this.route.snapshot.paramMap.get('data');
      this.permiso();
    }

  idCoordinador: any = ''; 

  /* Aca estan los parametros para los botones de salida*/
  async salirPagina() {
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
    if (this.idCoordinador === '' || this.idCoordinador === null){this.router.navigate(['/login']); }
  };

  /* Aca estan los parametros para los botones que envian a la paguina donde se encuentra la lista de aprendices citados o por citar a comite*/
  CitarComite(){ this.router.navigate(['/lista-citados', {data: this.idCoordinador}]); }
  
  /* Aca estan los parametros para los botones que envian a la paguina donde se encuentran los documentos con las listas de aprendices citados a comite*/
  Documentos(){ this.router.navigate(['/documentos', {data: this.idCoordinador}]); }
  
}
