import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  constructor(private router:Router, 
    private route: ActivatedRoute,
    private alertController: AlertController, 
    private http:HttpClient,
    private navCtrl: NavController
    ) 
    { 
      this.getList();
      this.idCoordinador = this.route.snapshot.paramMap.get('data');
      this.perm();
    };

  ngOnInit(){}
  listaDB: any = [];
  idCoordinador: any = ''; 

  updateDecision(dat:any) {
    this.router.navigate(['documentos-edit', { 
      d: dat.decisionComite, 
      idX: dat.idCita, 
      ca: dat.correoAprendiz, 
      ci: dat.correoInstructor,
      aprendiz: dat.aprendiz,
      td: dat.tipoDocumento,
      nt: dat.numeroTI,
      fc: dat.fechaCitacion,
      f: dat.ficha,
      j: dat.jornada,
      p: dat.programa,
      i: dat.instructor,
      n: dat.nota,
      idCoor: this.idCoordinador}]);
  }
  
  /* Aca estan los parametros para los botones de salida y paguina anterior de la paguina actual*/
  async salirPagina(){ const alert = await this.alertController.create({
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
      }]
    });
    await alert.present();
  };

  perm(){
    if (this.idCoordinador === '' || this.idCoordinador === null){this.router.navigate(['/login']); }
  };

  async iumaco(){ const alert = await this.alertController.create({ header:'IUMACO'}); await alert.present(); }
  volver(){ this.router.navigate(['/home-coordinador', { data: this.idCoordinador}]); }

  getList(){
    this.http.get('http://localhost/iumaco_db/getListaCitaciones.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.listaDB = response;
      },
      (error) => {
        console.error('Error al obtener datos del servidor:', error);
      }
    )
  };
}
