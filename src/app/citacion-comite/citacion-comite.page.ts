import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios  from 'axios'

@Component({
  selector: 'app-citacion-comite',
  templateUrl: './citacion-comite.page.html',
  styleUrls: ['./citacion-comite.page.scss'],
})
export class CitacionComitePage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient, 
    private alertController: AlertController)
    { 
    this.idInstructor = this.route.snapshot.paramMap.get('data');
    this.obtenerFichasUnicas(); 
    this.getUser(); 
    this.getfromData();
    this.permiso();
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  };  

  /* Aca estan los parametros para los botones de salida y paguina anterior de la paguina*/
  volver(){ this.router.navigate(['/home', { data: this.idInstructor }]); }
  async confirmarSalida() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Está seguro de que desea cerrar sesion?',
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

  idInstructor: any = '';

  newId: string = '';
  newNombre: string = '';
  newEmail: string = '';
  newCargo: string = '';
  newFicha: string = '';
  
  destinatarios: any = [];
  destinatario: string = '';

  usuariosDB: any = [];
  InfoAprendiz: any =[];

  nota: string = '';
  
  fichaSeleccionada: string = '';
  fichasUnicas: any = [];

  fechaActual = new Date();
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1.
  anio = this.fechaActual.getFullYear();
  fechaFormateada = `${this.dia}/${this.mes}/${this.anio}`;

  asunto = 'Citación a comité';

  fromData = {
    nota: '',
    aprendizFK: '',
    instructorFK: '',
    linkEvidencias: '',
  }

  ngOnInit(){}

  permiso(){
    if (this.idInstructor === '' || this.idInstructor === null){this.router.navigate(['/login']); }
  }

  obtenerFichasUnicas() {
    const fichasUnicas = new Set<string>();
    for (const usuario of this.usuariosDB) { // Recorre los datos en usuariosDB y agrega las fichas al conjunto
      const ficha = usuario.ficha;
      if (ficha === '0'){}
      else{ fichasUnicas.add(ficha);}      
    }
    this.fichasUnicas = Array.from(fichasUnicas); // Convierte el conjunto de fichas únicas en un array
  };

  filtrarDestinatarios() {
    const userFiltered = new Set<string>();
    
    for (const usuario of this.usuariosDB) {
      if (usuario.ficha === this.fichaSeleccionada) {
        const ficha = usuario.nombre;
        userFiltered.add(ficha);
      }
    }
  
    this.destinatarios = Array.from(userFiltered);
  };

  informacionAprendiz() {
    const infoAprendiz = new Set<string>();
    for (const usuario of this.usuariosDB) { // Recorre los datos en usuariosDB y agrega las fichas al conjunto
      if (usuario.nombre === this.destinatario) { // Verifica si fichaSeleccionada coincide

        this.fromData.instructorFK = this.idInstructor; //  <--- aca se llama el id del instructor

        this.fromData.aprendizFK = usuario.IdUsuario; // <--- aca se carga el id del aprendiz para ponerlo en la base de datos.
        this.newEmail = usuario.correo;  // <--- aca se guarda el correo del aprendiz para en envio de correo.
        this.newCargo = usuario.cargo;  // <--- aca se guarda el cargo del aprendiz para en envio de correo.
        this.newNombre = usuario.nombre;  // <--- aca se guarda el nombre del aprendiz para en envio de correo.
        this.newFicha = usuario.ficha;  // <--- aca se guarda el nombre del aprendiz para en envio de correo.
        
        infoAprendiz.add('Id:'+this.fromData.aprendizFK +' Nombre:'+this.newNombre+' Ficha: '+this.newFicha+' Cargo: '+this.newCargo+' Correo: '+this.newEmail);
      }
    }
    this.InfoAprendiz = Array.from(infoAprendiz);
  };

  getUser() {
    this.http.get('http://localhost/iumaco_db/usuarios.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.usuariosDB = response;
        this.obtenerFichasUnicas();
      },
      (error) => {
        console.error('Error al obtener datos del servidor:', error);
      }
    )
  };

  /* Aca se prueba la funcionalidad del formulario*/
  enviarCorreo(){
    if (this.destinatario === "") {
      this.presentAlert("Campo vacío", "Por favor escoga un aprendiz.");
    } else {
      if (this.fromData.linkEvidencias.trim() === '') {
        this.presentAlert("Requerimiento", "Para esta accion es requerido un link donde se encuentré la evidencia.");
      } else {
        this.getfromData(); //aca se resive el valor del instructor
        this.insertListaPeticiones(); //aca se guardan los datos, si los campos son completados
        this.presentAlert("Mensaje enviado", "La informacion se ha guardado y el mensaje se ha enviado con éxito, recibirá una respuesta de la coordinación por correo electrónico una vez que se tome una decisión");
        this.limpiarCampos();
      }
    }
  };  

  insertListaPeticiones(){
    console.log(this.fromData)
    axios.post("http://localhost/iumaco_db/insertlistapeticiones.php", this.fromData).then((response) =>{ console.log(response);})
    .catch((error) =>{console.log(error)});
  }

  getfromData(){
    this.fromData.nota = this.fromData.nota;
    this.fromData.linkEvidencias = this.fromData.linkEvidencias;
    this.fromData.instructorFK = this.idInstructor;
    console.log(this.fromData)
  }

  limpiarCampos(){
    this.fichaSeleccionada = '';
    this.destinatario = '';
    this.fromData.nota = '';
    this.fromData.linkEvidencias = '';
    console.log("campos limpiados correctamente");
  }
  
}
