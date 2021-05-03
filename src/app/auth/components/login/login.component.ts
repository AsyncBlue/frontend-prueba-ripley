import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { validate, clean, format, getCheckDigit } from 'rut.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loged: boolean = false;

  private configSnackBar: MatSnackBarConfig = {
    panelClass: ['customErrorEmail'],  
    duration: 2000
  };

  private configSnackBarOK: MatSnackBarConfig = {
    panelClass: ['customOK'],  
    duration: 2000
  };

  datosLogin = {
    rut: '',
    password: ''
  };

  constructor( private usuarioService: UserService, private _snackBar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {
  }

  login() {

    if( !validate(this.datosLogin.rut) || this.datosLogin.rut.length < 0 ) {
      this._snackBar.open( 'RUT INVALIDO', '', this.configSnackBar );
      return;
    }

    this.usuarioService.login( this.datosLogin.rut, this.datosLogin.password ).subscribe ( ok => {
      
      if(ok) {
        this.router.navigate(['dashboard']);
        this._snackBar.open( 'Bienvenido :)', '', this.configSnackBarOK );
      } else {
        this._snackBar.open( 'RUT O CONTRASEÑA INVALIDOS', '', this.configSnackBar );
      }

    })

  }

  teclaPresionada(){
    this.datosLogin.rut = format( this.datosLogin.rut );
  }

}
