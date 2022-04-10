import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formularioLogin = this.fb.group({
      'Email': new FormControl("",Validators.required),
      'Contraseña': new FormControl("",Validators.required),
    })

  }

  ngOnInit() {
  }
  
  async login() {
    var Formulario = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('user'));

    if (usuario.Email == Formulario.Email  && usuario.Contraseña == Formulario.Contraseña) {
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('inicio');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos no coinciden',
        message: 'Ingresa los datos correctos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
