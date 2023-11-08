import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios  from 'axios'

@Component({
  selector: 'app-llamado-atencion',
  templateUrl: './llamado-atencion.page.html',
  styleUrls: ['./llamado-atencion.page.scss'],
})
export class LlamadoAtencionPage implements OnInit {

  constructor(private router: Router, 
    private http:HttpClient, 
    private alertController: AlertController, 
    private route: ActivatedRoute)
  {
    this.obtenerFichasUnicas(); 
    this.getUser();
    this.getInstructor();
    this.informacionInstructor();
    this.idInstructorRecived = this.route.snapshot.paramMap.get('data');
    this.permiso();
  }; 

  ngOnInit(){ this.filtrarDestinatarios(); };

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  };

  volver(){ this.router.navigate(['/home', { data: this.idInstructorRecived }]); }
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

  destinatario: string = '';
  destinatarios: any = [];

  usuariosDB: any = [];
  InfoAprendiz: any =[];
  instructorDB: any = [];
  idInstructorRecived: any = [];
  
  fichasUnicas: any = [];
  fichaSeleccionada: any;

  fechaActual = new Date();
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1.
  anio = this.fechaActual.getFullYear();

  fechaFormateada = `${this.dia}/${this.mes}/${this.anio}`;

  asunto = 'llamado de atención';
  nota: string = '';

  newId: number= 0;
  nombreAprediz: string = '';
  emailAprendiz: string = '';
  cargoAprendiz: string = '';

  nombreInstructor:string = '';
  correoInstructor: string = '';

  get cuerpo(): string { return `${this.fechaFormateada}
  Bogotá,
  Señor ${this.nombreAprediz}
  ${this.emailAprendiz}
  ${this.cargoAprendiz}
  Bogotá
  Asunto: ${this.asunto}

  Respetado Señor ${this.nombreAprediz},

  El Instructor ${this.nombreInstructor}, cuyo correo es ${this.correoInstructor}, Desea llamar su atención acerca de las observaciones y comentarios que el instructor ha compartido, los cuales se relacionan con:

  ${this.nota}

  Cordialmente,
  Jaime García Di - Motoli
  Subdirector
  Proyecto: Tatiana Díaz
  Cargo: Apoyo Administrativo Coordinación Académica
  Revisó: Gustavo Beltrán Macías
  Cargo: Coordinador Académico
  VB: Lorena Salas
  Cargo: Abogada Despacho Subdirector
  Regional Distrito Capital - Centro de Gestión de Mercados, Logística y Tecnologías de la Información
  Calle 52 No. 13-65, Bogotá D.C. - PBX 57 601 5461500

  Nota: ${this.nota}
  `};

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
      if (usuario.ficha === this.fichaSeleccionada) { // Verifica si fichaSeleccionada coincide
        const ficha = usuario.nombre;
        userFiltered.add(ficha);
      }
    }
  
    this.destinatarios = Array.from(userFiltered);
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
  getInstructor() {
    this.http.get('http://localhost/iumaco_db/getInstructor.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.instructorDB = response;
        this.obtenerFichasUnicas();
      },
      (error) => {
        console.error('Error al obtener datos del servidor:', error);
      }
    )
  };

  permiso(){
    if (this.idInstructorRecived === '' || this.idInstructorRecived === null){this.router.navigate(['/login']); }
  };

  informacionAprendiz() {
    const infoAprendiz = new Set<string>();
    for (const usuario of this.usuariosDB) { // Recorre los datos en usuariosDB y agrega las fichas al conjunto
      if (usuario.nombre === this.destinatario) { // Verifica si fichaSeleccionada coincide
        const ficha = usuario.ficha;
        const nombre = usuario.nombre;
        const cargo = usuario.cargo;
        const correo = usuario.correo;
        infoAprendiz.add('Nombre:'+nombre +' Ficha: '+ ficha +' Cargo: '+ cargo +' Correo: '+correo);

        this.nombreAprediz = nombre;
        this.emailAprendiz= correo;
        this.cargoAprendiz= cargo;

        this.fromData.ficha = ficha;
        this.fromData.nota = this.nota;
        this.fromData.aprendizFK = usuario.IdUsuario;
      }
    }
    this.InfoAprendiz = Array.from(infoAprendiz);
  };
  informacionInstructor() {
    // Buscar el instructor en la matriz instructorDB
    const instructor = this.instructorDB.find((instructor: any) => instructor.idUsuario === this.idInstructorRecived);
  
    if (instructor) {
      // Almacenar los datos del instructor en variables de Ionic
      const nombre = instructor.nombre;
      const correo = instructor.correo;
  
      // Ahora puedes usar estas variables en tu aplicación Ionic
      this.nombreInstructor = nombre;
      this.correoInstructor = correo;
    } else {
      console.error('Instructor no encontrado');
    }
  };

  /* Aca se prueba la funcionalidad del Envio del correo */
  enviarCorreo() {
    if (this.destinatario === ""){
      this.presentAlert("Campo vacío", "Por favor escoga un aprendiz.");
    }else if (this.nota === ''){ 
      this.presentAlert("Campo vacío", "Por escriba un mensaje en el espacio de nota.");
    }else{
      /*const mensajeCodificado = encodeURIComponent(this.cuerpo);
      const mailtoLink = `mailto:${this.emailAprendiz}?subject=${this.asunto}&body=${mensajeCodificado}&attachment=${''}`;
      window.location.href = mailtoLink;*/
      this.insertListaFelicitaciones();
    }
  };

  fromData = {
    nota: '',
    ficha: 0,
    aprendizFK: 0,
  }

  insertListaFelicitaciones() {
    this.informacionAprendiz();
    console.log(this.fromData); 

    // Ajusta la URL y anexa los datos como parámetros GET
    const url = `http://localhost/iumaco_db/insertListaLlamadoAtencion.php?ficha=${this.fromData.ficha}&aprendizFK=${this.fromData.aprendizFK}&nota=${this.fromData.nota}`;
    axios.get(url)
      .then((response) => {
        console.log(response.data);

        if(response.data === 1){
          this.presentAlert("Subida exitosa", "");
          
        }else{
          this.presentAlert("Subida fallida", "");
          
        }
      })
      .catch((error) => {
        console.error(error);
        // Maneja errores aquí
      }
    );
  }
}
