import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.page.html',
  styleUrls: ['./reg-user.page.scss'],
})
export class RegUserPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formularioRegistro = this.fb.group({
      'Nombre': new FormControl("",Validators.required),
      'Email': new FormControl("",Validators.required),
      'Contraseña': new FormControl("",Validators.required),
    });
  }

  ngOnInit() {
  }
  async registrar() {
    //console.log('registrar');
    var formulario = this.formularioRegistro.value;
    
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Rellena todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    var user = {
      Nombre: formulario.Nombre,
      Email: formulario.Email,
      Contraseña: formulario.Contraseña,
    }

    localStorage.setItem('user',JSON.stringify(user));

    localStorage.setItem('registrado','true');
    this.navCtrl.navigateRoot('login');

  }
}
