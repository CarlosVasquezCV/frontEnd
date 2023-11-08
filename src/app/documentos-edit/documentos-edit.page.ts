import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import axios  from 'axios'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-documentos-edit',
  templateUrl: './documentos-edit.page.html',
  styleUrls: ['./documentos-edit.page.scss'],
})
export class DocumentosEditPage implements OnInit {

  ngOnInit() {}
  constructor(private router:Router, 
    private route: ActivatedRoute, 
    private http: HttpClient,
    private alertController: AlertController) 
  { 
    this.idCita = this.route.snapshot.paramMap.get('idX');
    this.d = this.route.snapshot.paramMap.get('d');
    this.ca = this.route.snapshot.paramMap.get('ca');
    this.ci = this.route.snapshot.paramMap.get('ci');
    this.a = this.route.snapshot.paramMap.get('aprendiz');
    this.td = this.route.snapshot.paramMap.get('td');
    this.nt = this.route.snapshot.paramMap.get('nt');
    this.fc = this.route.snapshot.paramMap.get('fc');
    this.f = this.route.snapshot.paramMap.get('f');
    this.j = this.route.snapshot.paramMap.get('j');
    this.p = this.route.snapshot.paramMap.get('p');
    this.i = this.route.snapshot.paramMap.get('i');
    this.n = this.route.snapshot.paramMap.get('n');
    this.idCoor = this.route.snapshot.paramMap.get('idCoor');
    this.perm();
  }

  volver(){ this.router.navigate(['/documentos', {data: this.idCoor}]); }

  idCita: any ='';
  d: any = '';
  ca: any = '';
  ci: any = '';
  a: any = '';
  td: any = '';
  nt: any = '';
  fc: any = '';
  f: any = '';
  j: any = '';
  p: any = '';
  i: any = '';
  n: any = '';

  selectedOption: string = '';
  sDia: string = '';
  sMes: string = '';
  sAno: string = '';
  dias: any[] = [];
  descargosV: any ='';
  descargosE: any ='';

  data = {
    newId: '',
    newDecision: '',
  };

  idCoor: any = '';

  fechaActual = new Date();
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1.
  anio = this.fechaActual.getFullYear();
  anioSigiente = this.anio + 1;
  fechaFormateada = `${this.dia}/${this.mes}/${this.anio}`;

  actualizarDias(mes: string) {
    if (mes.trim().toLowerCase() === 'febrero') {
      this.dias = Array.from({ length: 29 }, (_, index) => index + 1);
    } else if (mes.trim().toLowerCase() !== '') {
      this.dias = Array.from({ length: 31 }, (_, index) => index + 1);
    }
  }

  onOptionSelected(event:any) {
    console.log('Opción seleccionada:', this.selectedOption);
    this.d = this.selectedOption;
  }
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }; 

  enviarDatos() {
    
    if (this.sAno === '' || this.sMes === '' || this.sDia === '') {
      // Al menos uno de los campos está vacío
      let camposVacios = '';
    
      if (this.sAno === '') {
        camposVacios += 'Año, ';
      }
    
      if (this.sMes === '') {
        camposVacios += 'Mes, ';
      }
    
      if (this.sDia === '') {
        camposVacios += 'Día, ';
      }
    
      camposVacios = camposVacios.slice(0, -2); // Eliminar la coma y el espacio al final
    
      this.presentAlert("Campos Vacíos", "Los siguientes campos están vacíos: " + camposVacios);
    } else {
      this.data.newId = this.idCita;
    this.data.newDecision = this.d;
    // Ajusta la URL y anexa los datos como parámetros GET
    const url = `http://localhost/iumaco_db/updateListaCitaciones.php?newId=${this.data.newId}&newDecision="${this.data.newDecision}"`;
    axios.get(url)
      .then((response) => {
        console.log(response.data);

        if(response.data == 1){
          this.presentAlert("Actualización exitosa", "");
          this.router.navigate(['/documentos', {data: this.idCoor}]);
        }else{
          this.presentAlert("Actualizacion fallida", "");
          this.router.navigate(['/documentos', {data: this.idCoor}]);
        }
        // Maneja la respuesta del servidor aquí
      })
      .catch((error) => {
        console.error(error);
        // Maneja errores aquí
      }
    );
    }
    
  }

  enviarCorreo(){
    if(this.selectedOption === 'Cancelar Matricula'){ 
      this.presentAlert("Cancelar Matricula", "Mensaje enviado exitosamente");
      const mensajeCodificado = encodeURIComponent(this.cuerpoCancelar);
      const mailtoLink = `mailto:${this.ca+' '+this.ci}?subject=${'Acto académico-Cancelación registro de Matrícula'}&body=${mensajeCodificado}&attachment=${''}`;
      window.location.href = mailtoLink;
    }
    else if(this.selectedOption === 'Acta de condicionamiento'){
      this.presentAlert("Acta de condicionamiento", "Mensaje enviado exitosamente");
      const mensajeCodificado = encodeURIComponent(this.cuerpoActa);
      const mailtoLink = `mailto:${this.ca+' '+this.ci}?subject=${'Acto académico-Condicionamiento de Matrícula'}&body=${mensajeCodificado}&attachment=${''}`;
      window.location.href = mailtoLink;
    }
  };

  perm(){
    if (this.a === '' || this.a === null){this.router.navigate(['/login']); }
  };
  
  get cuerpoActa(): string { return `${this.fechaFormateada}
  Bogotá,
  Señor/a ${this.a}
  ${this.ca}
  ${this.p} - ${this.f}
  Bogotá D.C.

  Respetado aprendiz:
  De conformidad con el Acuerdo 7 de 2012 “Por el cual se adopta el reglamento del Aprendiz SENA” artículo 2 y siguientes, este Despacho procede a proferir acto académico conforme al procedimiento normativo y la recomendación del Comité de Evaluación y Seguimiento:

  1.  CARGOS
    ${this.n}

  2.  DESCARGOS 
    El aprendiz puede ejercer el derecho de contradicción y de defensa; razón por la cual el coordinador le envió mediante correo electrónico la citación a Comité de Evaluación y Seguimiento y le informa que debe presentar los descargos escritos en el formato correspondiente así también el derecho que tiene de allegar pruebas y controvertir las que obren en el proceso.
    El aprendiz realizó los siguientes descargos por escrito al comité: ${this.descargosE}

    El aprendiz realizó los siguientes descargos verbales al comité en donde manifestó que: ${this.descargosV}

  3. PRUEBAS
    El aprendiz tiene el derecho de aportar documentos que le permitan controvertir el informe o queja presentada por instructor.
    Documentales | Informe o queja | Citación a comité | Soportes del área | Descargos

  4. NORMAS DEL REGLAMENTO INFRINGIDAS
    - CAPITULO III: DEBERES DEL APRENDIZ SENA, ARTÍCULO 9: Se entiende por deber, la obligación legal, social y moral que compromete a la persona a cumplir con determinada actuación, asumiendo con responsabilidad todos sus actos, para propiciar la armonía, el respeto, la integración, el bienestar común, la sana convivencia, el servicio a los demás, la seguridad de las personas y de los bienes de la institución. Son deberes del aprendiz SENA durante el proceso de ejecución de la formación, los siguientes:
      NUMERAL 1: Cumplir con todas las actividades propias de su proceso de aprendizaje o del plan de mejoramiento, definidas durante su etapa lectiva y productiva.
    - CAPITULO IV: PROHIBICIONES, ARTÍCULO 10: Se considerarán prohibiciones para los aprendices del SENA, las siguientes:
      NUMERAL 3: Incumplir con las actividades de aprendizaje acordadas y los compromisos adquiridos como aprendiz SENA, sin justa causa.

  5.  ANÁLISIS DEL CASO
    El SENA, como institución entre cuyas funciones está la de “Impulsar la promoción social del trabajador a través de su formación profesional integral para hacer de él un ciudadano útil y responsable…” (Art 4 ley 119/94).
    El aprendiz SENA, al ingresar a la institución es conocedor de las reglas de comportamiento, es el de cumplir con las actividades y compromisos que adquiere una vez ingresa a la institución; e igualmente es consciente que el no cumplimiento de éstos y la no justificación en caso de infringirlos acarrea sanciones: ya que, al ingresar al SENA, el aprendiz firmó el compromiso de cumplir y hacer cumplir el reglamento del aprendiz SENA.
    Efectuado el anterior estudio y teniendo en cuenta lo preceptuado por el artículo 34 del Acuerdo 0007 de 2012 “Reglamento del Aprendiz SENA” Los miembros del Comité de Evaluación y Seguimiento integrado por el responsable del Área de Teleinformática, Instructores, Abogada Subdirección, Trabajadora Social, y Representante de ficha recomiendan hacer un condicionamiento de la matrícula sujeto a un plan de mejoramiento el cual debe ser entregado al instructor ${this.i} máximo el día ${this.sDia} de ${this.sMes} de ${this.sAno}.

    a.	El aprendiz ${this.a} identificado con documento de identidad No. ${this.nt} residente en la ciudad de Bogotá, D.C., es el autor de los hechos.
    b.	Grado de responsabilidad: El grado de responsabilidad del aprendiz como autor de la conducta se evidencia porque comete una falta académica, infringiendo así el reglamento del aprendiz SENA. 
    c.	El tipo de falta es: ACADÉMICA, ya que el aprendiz presenta un bajo rendimiento académico, incumpliendo con los deberes del aprendiz SENA, durante su proceso de formación.
    d.	Calificación de la falta: Una vez analizados los juicios de valor, las pruebas que se aportan, el derecho a presentar los descargos para desvirtuar, controvertir o aceptar la falta, y el análisis de la falta, permitió calificar la falta como grave.
    e.	Razones de la decisión adoptada: Las razones por la cuales se impone el condicionamiento del Registro de Matrícula es porque presenta un bajo rendimiento académico y la no entrega de evidencias, como aprendiz del Sena desconoció que los derechos y los deberes son correlativos e inseparables en la formación del aprendiz SENA.
    Por lo anteriormente expuesto y de conformidad con las facultades otorgadas por el Acuerdo 0007 de 2012 este Despacho decide: 
  
  PRIMERO: CONDICIONAR el registro de matrícula del aprendiz ${this.a} identificado con documento de identidad No. ${this.nt}.
  SEGUNDO: DESIGNAR al instructor Luis Humberto González, para que el aprendiz ${this.a} identificado con documento de identidad No. ${this.nt}, concerté plan de mejoramiento con nuevas actividades de acuerdo con el art. 27 numeral 2, del reglamento del aprendiz.
  TERCERO: NOTIFICAR el presente Acto Académico al aprendiz ${this.a} identificado con documento de identidad No. ${this.nt}, de acuerdo con lo establecido en la Ley 1437 de 2011 y contra la presente determinación procede el recurso reposición, el cual podrá ser interpuesto dentro de los 10 días siguientes a la notificación, mediante escrito dirigido al subdirector del Centro de Gestión de Mercados, Logística y Tecnologías de la Información.
  
  Atentamente,  
  Jaime García Di - Motoli    
  Subdirector Centro Gestión de Mercados 
  Logística y Tecnologías de la Información
  Proyecto: Tatiana Díaz
  Cargo: Apoyo Administrativo Coordinación Académica
  Revisó: Gustavo Beltrán Macías
  Cargo: Coordinador Académico
  VB: Lorena Salas
  Cargo: Abogada Despacho Subdirector `};

  get cuerpoCancelar(): string { return `${this.fechaFormateada}
  Bogotá,
  Señor/a ${this.a}
  ${this.ca}
  ${this.p}
  Ficha: ${this.f} Bogotá, D.C.
  Respetado aprendiz:
  De conformidad con las facultades conferidas por el Acuerdo 7 de 2012 “Por el cual se adopta el reglamento del Aprendiz SENA” y la recomendación del Comité de Evaluación y Seguimiento, este Despacho procede a revisar su caso de acuerdo con los siguientes:
  1.	HECHOS
  ${this.a}
  
  El aprendiz no presenta la evidencia relacionada con, Actividad 6: taller 4 configuración de los servicios de voz utilizando dispositivos activos se le realiza un llamado de atención por instructor con su respectivo plan de mejoramiento el día 16 de mayo de 2022.
  El aprendiz no cumple con el plan de mejoramiento estipulado en el llamado de atención por instructor de la Actividad 6: taller 4 configuración de los servicios de voz utilizando dispositivos activos se le realiza un llamado de atención por coordinación con su respectivo plan de mejoramiento el día 18 de mayo de 2022.
  El aprendiz no cumple con el plan de mejoramiento estipulado en el llamado de atención por coordinación, de la Actividad 6: taller 4 configuración de los servicios de voz utilizando dispositivos activos.
  El aprendiz fue citado a comité disciplinario el día 20 de mayo de 2022, el comité se realizó ${this.fc}, donde tras escuchar los descargos respectivos el comité condiciono al aprendiz por su falta académica y se estableció un plan de mejoramiento el cual se envió el mismo día 25 de mayo donde se estipulaba la fecha de presentación para el día 6 de junio de 2022.
  El día 6 de junio de 2022 en la sesión de la noche ambiente 410 se realizó la presentación del plan de mejoramiento por parte del aprendiz al instructor, donde se estableció que no cumplía con los ítems solicitados, adicional al realizar preguntas sobre requerimientos y parámetros de configuración de la actividad no tuvo el conocimiento para desarrollarlos, lo que concluyo en la NO aprobación del plan de mejoramiento.
  Como complemento se indica que el aprendiz tiene llamado de atención por instructor realizado el día 06 de junio de 2022 y por coordinación el día 8 de junio de 2022 de la temática de VOIP Actividad 7: taller 5 configuración de funcionalidades central pbx VoIP.
  Se cita al comité disciplinario del 15 de junio de 2022, para seguir el debido proceso al aprendiz por NO aprobar el plan de mejoramiento y su bajo rendimiento académico.
  
  El instructor Nino Alexander Arias menciona que, el aprendiz fue citado al comité de evaluación y seguimiento: ${this.fc} debido a la no entrega de evidencias, se le estableció un plan de mejoramiento para presentarlo el 6 de junio en el ambiente de formación, jornada noche. El aprendiz no cumplió con la presentación del plan de mejoramiento debido a que presentó el trabajo incompleto y no respondió a las preguntas cuestionadas por el instructor respecto al trabajo realizado.
  El coordinador Gustavo Beltrán llama al aprendiz ${this.a}, quien se encuentra presente en el comité a través de Teams, el aprendiz manifiesta que, viene con conocimientos pendientes por reforzar debido a su trabajo ya que tiene turnos rotativos y se le dificulta poder cumplir a cabalidad con los trabajos y las fechas establecidas. Así mismo menciona que, quiere continuar con su formación y cumplir con los trabajos pendientes por entregar.

  2.	DESCARGOS
  Es el derecho que le asiste al aprendiz de poder ejercer el derecho de contradicción y de defensa; razón por la cual la coordinación le envió mediante correo electrónico la citación a Comité de Evaluación y Seguimiento y le informa que debe presentar los descargos escritos en el formato correspondiente así también el derecho que tiene de allegar pruebas y controvertir las que obren en el proceso.
  El aprendiz realizó los siguientes descargos por escrito al comité donde manifestó:
  ${this.descargosE}

  3.	PRUEBAS.
  
  El aprendiz tiene el derecho de aportar documentos que le permitan controvertir el informe o queja presentada por el instructor.
  Nota aclaratoria: El aprendiz no presenta soportes o prueba alguna que controviertan los hechos académicos relacionados por la instructora en su informe.
  Adicional a esto en el informe presentado por el instructor se relacionaron las siguientes pruebas dadas a conocer en su momento al aprendiz:
  
  TESTIGOS Y/ PRUEBAS: Incumplimiento Plan de Mejoramiento 10 de junio de 2022.

  4.	NORMAS DEL REGLAMENTO INFRINGIDAS
  
    Reglamento del aprendiz:
    - Capitulo III - DEBERES DEL APRENDIZ SENA - Artículo 9:
    Numeral 1: Cumplir con todas las actividades propias de su proceso de aprendizaje o del plan de mejoramiento, definidas durante su etapa lectiva y productiva.
    - Capítulo IV - PROHIBICIONES artículo 10: 
    Numeral 3: Incumplir con las actividades de aprendizaje acordadas y los compromisos adquiridos como aprendiz SENA, sin justa causa.
  
  5.	ANÁLISIS DEL CASO.
  El SENA, como institución entre cuyas funciones está la de “Impulsar la promoción social del trabajador a través de su formación profesional integral para hacer de él un ciudadano útil y responsable…” (Art 4 ley 119/94).
  El aprendiz SENA, al ingresar a la institución es conocedor de las reglas de comportamiento, es el de cumplir con las actividades y compromisos que adquiere una vez ingresa a la institución; e igualmente es consciente que el no cumplimiento de éstos y la no justificación en caso de infringirlos acarrea sanciones: ya que, al ingresar al SENA, EL APRENDIZ firmó el compromiso de cumplir y hacer cumplir el Reglamento del Aprendiz SENA.
  A continuación, se transcribe lo debatido por los integrantes del Comité concluyendo en los siguientes aspectos:
  El aprendiz Jairo Andrés Molina Rodríguez identificado con documento de identidad Cédula No. C.C - 1019053281 residente en la ciudad de Bogotá, D.C., es autor de los hechos.
  El tipo de falta es: ACADEMICA , ya que el aprendiz con su comportamiento y actuación incurrió en el incumplimiento de los deberes y/o prohibiciones, durante su proceso de formación Capítulo III - DEBERES DEL APRENDIZ SENA artículo 9, numeral 1; Capítulo IV - PROHIBICIONES artículo 10: numeral 3 y Capítulo IX - MEDIDAS FORMATIVAS Y SANCIONES, Artículo 28, Literal B.
  Calificación de la falta: Una vez analizados los juicios de valor, las pruebas que se aportan, el derecho a presentar los descargos para desvirtuar, controvertir o aceptar la falta, y el análisis de la falta, permitió al comité calificar la falta como grave, razón por la cual el comité recomienda al señor SUBDIRECTOR AVALAR LA CANCELACION DEL REGISTRO DE MATRICULA CON UNA SANCION DE 06 MESES.
  Razones de la decisión adoptada: Una vez revisadas todas las evidencias, el comité de evaluación y seguimiento informa que está de acuerdo con aplicar medida sancionatoria al aprendiz, toda vez que el mismo reincidió en la causal que ocasiono el condicionamiento evidenciado en la persistencia del bajo rendimiento y la no aprobación de los planes de mejoramiento concertados en su momento.

  Por lo anteriormente expuesto y de conformidad con las facultades otorgadas por el Acuerdo 0007 de 2012 este Despacho decide: 
  PRIMERO: CANCELAR el registro de matrícula por deserción al aprendiz Jairo Andrés Molina Rodríguez identificado con documento de identidad Cédula No. C.C – 1019053281 por reincidir en la causal que ocasiono el condicionamiento.
  SEGUNDO: SANCIONAR por el término de seis (06) meses al aprendiz Jairo Andrés Molina Rodríguez identificado con documento de identidad Cédula No. C.C – 1019053281 de conformidad con lo establecido en el Acuerdo 007 de 2012. Tiempo durante el cual, la persona sancionada pierde la condición de aprendiz y no puede participar en procesos de ingreso a la institución.
  TERCERO: AVALAR la terminación de contrato del aprendiz Jairo Andrés Molina Rodríguez identificado con documento de identidad Cédula No. C.C – 1019053281, por lo cual una vez se surta el debido proceso se procederá con el registro de la cancelación en el sistema respectivamente.
  CUARTO: NOTIFICAR el presente Acto Académico al aprendiz Jairo Andrés Molina Rodríguez identificado con documento de identidad Cédula No. C.C – 1019053281 de acuerdo a lo establecido en la Ley 1437 de 2011 y contra la presente decisión procede el recurso reposición, el cual podrá ser interpuesto dentro de los 10 días siguientes a la notificación, mediante escrito dirigido al Subdirector del Centro de Gestión de Mercados, Logística y Tecnologías de la Información.
  QUINTO: Una vez en firme la sanción, el aprendiz debe entregar de manera inmediata el carné institucional y ponerse a paz y salvo por todo concepto. 
  Atentamente,

  Jaime García Di - Motoli    
  Cargo: Subdirector Centro Gestión de Mercados Logística y Tecnologías de la Información
  Proyecto: Tatiana Díaz
  Cargo: Apoyo Administrativo Coordinación Académica
  Revisó: Gustavo Beltrán Macías
  Cargo: Coordinador Académico
  VB: Lorena Salas
  Cargo: Abogada Despacho Subdirector  `};
}