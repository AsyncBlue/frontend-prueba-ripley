import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { validate, clean, format, getCheckDigit } from 'rut.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  datosUsuario = {
    nombre: '',
    rut: '',
    password: ''
  };

  private configSnackBarRUT: MatSnackBarConfig = {
    panelClass: ['customErrorRUT'],  
    duration: 2000
  };

  private configSnackBarOK: MatSnackBarConfig = {
    panelClass: ['customOK'],  
    duration: 2000
  };

  constructor( private _snackBar: MatSnackBar, private usuarioService: UserService, private router: Router ) { }

  ngOnInit(): void {
  }

  crearUsuario( formNuevoDestinatario: NgForm ) {

    if( !validate(this.datosUsuario.rut) ) {
      this._snackBar.open( 'RUT INVALIDO', '', this.configSnackBarRUT );
      return;
    }

    if( this.datosUsuario.nombre.length <= 0 ) {
      this._snackBar.open( 'EL NOMBRE ES NECESARIO', '', this.configSnackBarRUT );
      return;
    }

    if( this.datosUsuario.password.length <= 0 ) {
      this._snackBar.open( 'LA CONTRASEÑA ES NECESARIA', '', this.configSnackBarRUT );
      return;
    }

    this.usuarioService.crearNuevoUsuario( this.datosUsuario ).subscribe( ok => {

      if(ok) {
        this.router.navigate(['dashboard']);
        this._snackBar.open( 'Bienvenido :)', '', this.configSnackBarOK );
      } 

    });
    

  }

  teclaPresionada(){
    this.datosUsuario.rut = format( this.datosUsuario.rut );
  }

}
