import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.page.html',
  styleUrls: ['./reg-user.page.scss'],
})
export class RegUserPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder) {

    this.formularioRegistro = this.fb.group({
      'Nombre': new FormControl("",Validators.required),
      'Email': new FormControl("",Validators.required),
      'Contraseña': new FormControl("",Validators.required),
    });
   }

  ngOnInit() {
  }
  registrar() {
    //console.log('registrar');
  }
}
