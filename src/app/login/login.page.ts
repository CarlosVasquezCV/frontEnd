import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit(){}
  constructor( private router: Router, private http:HttpClient, private alertController: AlertController){ this.getUser(); }

  username: string = '';
  password: string = '';

  id: any = '';

  usuariosDB: any = [];

  fechaActual = new Date();
  fechaFormateada = this.fechaActual.getFullYear();

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  };  

  getUser() {
    this.http.get('http://localhost/iumaco_db/usuarios.php').subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.usuariosDB = response;
      },(error) => {console.error('Error al obtener datos del servidor:', error);}
    )
  };

  login() {
    const inputUsername = this.username;
    const inputPassword = this.password;
    const user = this.usuariosDB.find((u: any) => u.nombre === inputUsername && u.credenciales === inputPassword);
  
    if (this.username === "" && this.password === ""){this.presentAlert("Campos vacíos", "Usuario y contraseña son requeridos.");} 
    else if (this.username === ""){this.presentAlert("Campo vacío", "Usuario es requerido.");} 
    else if (this.password === ""){this.presentAlert("Campo vacío", "Contraseña es requerida.");} 
    else{
      if (user) {
        // Las credenciales son correctas, verificar el valor del campo "cargo"
        if (user.cargo === 'instructor') {
          this.id = user.IdUsuario;
          this.router.navigate(['/home', { data: this.id }]);
        } else if (user.cargo === 'coordinador') {
          // Usuario coordinador
          this.id = user.IdUsuario;
          this.router.navigate(['/home-coordinador', { data: this.id }]);
        } else if (user.cargo === 'aprendiz'){
          // Cargo aprendiz
          this.presentAlert("Acceso denegado", "Los aprendices no tienen autorización para acceder a esta página");
        }
      } else { this.presentAlert("usuario inexistente", ""); }
    }
  };  
    
}