import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import axios  from 'axios'

@Component({
  selector: 'app-lista-citados',
  templateUrl: './lista-citados.page.html',
  styleUrls: ['./lista-citados.page.scss'],
})
export class ListaCitadosPage implements OnInit {

  ngOnInit(){};
  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private alertController: AlertController, 
    private http:HttpClient)
    { this.getList();
      this.perm = this.route.snapshot.paramMap.get('data');
      this.per();
      this.crearMinutos();
    };

  nombreAprendiz: string = '';
  correoAprendiz: string = '';
  nombreInstructor: string = '';
  correoInstructor: string = '';

  idInstructor: string = '';

  sDia: string = '';
  sMes: string = '';
  sAno: string = '';
  sHora: string = '';
  sMinutos: string = '';
  selectedDateTime: string = '';
  
  dias: any[] = [];
  minutos: any[] = [];

  newId: number = 0;

  listaDB: any = [];
  asunto: string = '';
  perm: any = '';

  fechaActual = new Date();
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1.
  anio = this.fechaActual.getFullYear();
  anioSigiente = this.anio + 1;
  fechaFormateada = `${this.dia}/${this.mes}/${this.anio}`;
  

  fromData = {
    nota: '',
    aprendizFK: '',
    instructorFK: '',
    ficha: '',
    fechaCitacion: '', 
  }

  actualizarDias(mes: string) {
    if (mes.trim().toLowerCase() === 'febrero') {
      this.dias = Array.from({ length: 29 }, (_, index) => index + 1);
    } else if (mes.trim().toLowerCase() !== '') {
      this.dias = Array.from({ length: 31 }, (_, index) => index + 1);
    }
  };
  crearMinutos() {
    for (let i = 1; i < 61; i++) {
      this.minutos.push(i);
    }
  };

  omitir(){
    this.selectedDateTime = 'omitir'
  }
  
  ponerFecha(){
    let numCampo = 0;

    if (!this.sDia || !this.sMes || !this.sAno || !this.sHora || !this.sMinutos) {
      // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción.
      if (this.sAno === '' || this.sAno === null){ numCampo = numCampo + 1; }
      if (this.sMes === '' || this.sAno === null){ numCampo = numCampo + 1; }
      if (this.sDia === '' || this.sAno === null){ numCampo = numCampo + 1; }
      if (this.sHora === '' || this.sAno === null){ numCampo = numCampo + 1; }
      if (this.sMinutos === '' || this.sAno === null){ numCampo = numCampo + 1; }
      if (numCampo < 2){ this.presentAlert("Dato faltante", `Falta ${numCampo} dato para llevar a cabo esta acción.`);}else{
        this.presentAlert("Datos faltantes", `Faltan ${numCampo} datos para llevar a cabo esta acción.`) ;
      }
    } else { this.selectedDateTime =`${this.sAno}-${this.sMes}-${this.sDia}T${this.sHora}:${this.sMinutos}:00`; }
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }; 

  LimpiarFecha(){ 
    this.sDia = '';
    this.sMes = '';
    this.sAno = '';
    this.sHora = '';
    this.sMinutos = '';
    this.selectedDateTime = ''
  }
  getfromData(){
    this.fromData.instructorFK = this.idInstructor;
    this.fromData.fechaCitacion = this.selectedDateTime;
    console.log(this.fromData)
  }
  getList() {
    this.http.get('http://localhost/iumaco_db/listapeticiones.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.listaDB = response;
      },
      (error) => {
        console.error('Error al obtener datos del servidor:', error);
      }
    )
  };

  /* Aca estan los parametros para los botones de salida y paguina anterior de la paguina*/
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
    });    await alert.present();
  };   
  volver(){ this.router.navigate(['/home-coordinador', { data: this.perm }]); }

  async cancelarCitacion(l: any) {
    const alert = await this.alertController.create({
      header: 'Anular solicitud',
      message: '¿Está completamente seguro de que desea cancelar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler:()=>{}
        },
        {
          text: 'Aceptar',
          handler:()=>{ 
            this.asunto = 'Peticion denegada',
            this.newId = l.id, 
            this.correoAprendiz = l.correoAprendiz, 
            this.correoInstructor = l.correoInstructor
            this.deletePeticion();

            //envio del correo a los involucrados
            const mensajeCodificado = encodeURIComponent(this.cuerpo2 + '\n\n');
            const mailtoLink = `mailto:${this.correoInstructor}?subject=${this.asunto}&body=${mensajeCodificado}`;
            window.location.href = mailtoLink;

            this.presentAlert("Mensaje enviado", "La informacion se ha guardado y el mensaje se ha enviado con éxito");

            this.getList();
          }
        }
      ]
    });  await alert.present();
  };  
  async confirmarCitacion(l: any){
    const alert = await this.alertController.create({
      header: 'Aprobar solicitud',
      message: '¿Está completamente seguro de que desea aceptar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler:()=>{}
        },
        {
          text: 'Aceptar',
          handler:()=>{ 

            if (this.selectedDateTime === '' || this.selectedDateTime === 'omitir')
            { this.presentAlert("Fecha faltante", "Por favor, asegúrate de proporcionar una fecha para llevar a cabo esta acción.") ;}
            else{
              this.asunto = 'Citación a comite',
              this.newId = l.id, 
              this.nombreAprendiz = l.aprendiz
              this.correoAprendiz = l.correoAprendiz, 
              this.nombreInstructor = l.instructor
              this.correoInstructor = l.correoInstructor,
              this.idInstructor = l.idInstructor,

              //manda los datos al fromData
              this.fromData.aprendizFK = l.idAprendiz
              this.fromData.instructorFK = l.idInstructor
              this.fromData.nota = l.nota,
              this.fromData.ficha = l.ficha

              //activa el proceso para recuperar los datos y los envia a la tabla
              this.getfromData();
              this.insertListaPeticiones();
              this.enviarComfirmacion();

              //envio del correo a los involucrados
              const mensajeCodificado = encodeURIComponent(this.cuerpo1 + '\n\n');
              const mailtoLink = `mailto:${this.correoAprendiz +' '+ this.correoInstructor}?subject=${this.asunto}&body=${mensajeCodificado}`;
              window.location.href = mailtoLink;

              this.presentAlert("Mensaje enviado", "La informacion se ha guardado y el mensaje se ha enviado con éxito");

              //despues se borra la informacion de la lista de peticiones y vuelve a cargar las card's
              this.deletePeticion();
              this.getList();
            }
          }
        }
      ]
    });  await alert.present();
  };
  async enviarComfirmacion(){
    const alert = await this.alertController.create({
      header: 'Confirmar Acción',
      message: '¿Está completamente seguro de que desea aceptar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler:()=>{ console.log(`Mensaje enviado, confirmación exitosa para: ${this.selectedDateTime} al aprendiz con correo: ${this.correoAprendiz}`); }
        }
      ]
    });  await alert.present();
  }
  per(){
    if (this.perm === '' || this.perm === null){this.router.navigate(['/login']); }
  };

  deletePeticion(){
    const idToDelete = this.newId; // Aquí debes asignar el valor del ID que deseas enviar

    // Define los datos que deseas enviar al servidor
    const data = {id: idToDelete };
    console.log(data.id);

    // Realiza la solicitud POST al servidor PHP
    this.http.post('http://localhost/iumaco_db/deleteListapeticiones.php', data).subscribe(response => {
      // Maneja la respuesta del servidor aquí
      console.log('Respuesta del servidor:', response);
    }, error => {
      // Maneja los errores de la solicitud
      console.error('Error al enviar el ID al servidor:', error);
    });
  }

  //aca se prueba el envio de informacion a 
  insertListaPeticiones(){
    console.log(this.fromData)
    axios.post("http://localhost/iumaco_db/insertlistaCitaciones.php", this.fromData).then((response) =>{ console.log(response);})
    .catch((error) =>{console.log(error)});
  }

  get cuerpo1(): string { return `Bogotá D.C.,${this.fechaFormateada}
  
  Ingeniero GUSTAVO BELTRAN MACIAS
  Centro de Gestion de Mercados, Logística y Tecnologias de la Informacion
  SENA Distrito Capital
  Asunto: ${this.asunto},

  Nombre y apellidos del aprendiz: ${this.nombreAprendiz}
  Identificacion C.C. o T.I. No.: TI 1013
  Especialidad: Tecnologo en Implementacion de Infraestructura de Tecnologías de la Informacion y Comunicaciones.
  Jornada: Mañana
  No. Orden o Ficha: 2503816
  Correo del aprendiz: ${this.correoAprendiz}

  HECHOS: ${this.nombreAprendiz}
  ${this.fromData.nota}

  NORMA INFRINGIDA: Según el acuerdo 00007 del 2012, el citado aprendiz infringio el Artículo y numerales siguientes:
  -  Capítulo III, Artículo 9, numeral 1, Capítulo IV, Artículo 10, numeral 3, Reglamento de Aprendiz SENA
  -  Capítulo IV, Artículo 10, Numeral 4, Reglamento de Aprendiz SENA

  Tipo de Falta: Académica
  Calificacion provisional de la falta: Grave
  Por lo anterior me permito recomendar la siguiente sancion para el aprendiz:
  Llamada de atencion por escrito ___ Condicionamiento de matrícula ___ Cancelacion de matrícula   ____
  Nombre Instructor: ${this.nombreInstructor}
  Cédula: 5.826
  Grupo: 2477714
  Direccion o Email: ${this.correoInstructor}
  Adjunto: Enviar el presente Informe al Coordinador académico
  `};
  get cuerpo2(): string { return `Bogotá D.C.,${this.fechaFormateada}

  En relación a su solicitud de citación al aprendiz, lamentamos informarle que la misma ha sido denegada. La coordinación académica ha evaluado detenidamente la situación y ha decidido no proceder con la citación.
  Entendemos la importancia de su solicitud y la necesidad de mantener altos estándares académicos, pero después de un análisis minucioso, se ha determinado que la citación no es la medida más adecuada en este momento.
  Si tiene alguna pregunta adicional o requiere información adicional sobre esta decisión, no dude en ponerse en contacto con nosotros. 
  Agradecemos su comprensión y colaboración en este asunto.

  Atentamente,
  Coordinación Académica`};
}
