import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Destinatario } from '../../../interfaces/destinatario.interface';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { validate, clean, format, getCheckDigit } from 'rut.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Cuenta {
  value: string;
  viewValue: string;
}

interface Banco {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.css']
})
export class NuevoDestinatarioComponent implements OnInit {

  @ViewChild('matSelectBanco') matSelectBanco!: MatSelect;
  @ViewChild('matSelectCuenta') matSelectCuenta!: MatSelect;

  private configSnackBar: MatSnackBarConfig = {
    panelClass: ['customErrorEmail'],  
    duration: 2000
  };

  private configSnackBarOK: MatSnackBarConfig = {
    panelClass: ['customOK'],  
    duration: 2000
  };

  nuevoDestinatario: Destinatario = {
    _id: '',
    nombre: '',
    correo: '',
    rut: '',
    telefono: '',
    banco: '',
    cuenta: '',
    numeroCuenta: ''
  };

  listadoBancos: Banco[] = [];

  tipoCuentas: Cuenta[] = [
    {value: 'Cuenta Corriente', viewValue: 'Cuenta Corriente'},
    {value: 'Cuenta Vista', viewValue: 'Cuenta Vista'},
    {value: 'Cuenta Ahorro', viewValue: 'Cuenta Ahorro'},
    {value: 'Cuenta RUT', viewValue: 'Cuenta RUT'},
  ];

  constructor( private usuarioService: UserService, private _snackBar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {

    this.usuarioService.getListadoBancos().subscribe( resp => {

      resp.banks.forEach( element => {
        this.listadoBancos.push( { value: element.name, viewValue: element.name } )
      });

    });

  }

   crearDestinatario( formNuevoDestinatario: NgForm ) {

    if( !this.nuevoDestinatario.correo.includes('@') ) {
      this._snackBar.open( 'CORREO INVALIDO', '', this.configSnackBar );
      return;
    }

    if( !validate(this.nuevoDestinatario.rut) ) {
      this._snackBar.open( 'RUT INVALIDO', '', this.configSnackBar );
      return;
    }

    if( !this.matSelectBanco.selected ) {
      this._snackBar.open( 'BANCO ES REQUERIDO', '', this.configSnackBar );
      return;
    }

    if( !this.matSelectCuenta.selected ) {
      this._snackBar.open( 'CUENTA ES REQUERIDO', '', this.configSnackBar );
      return;
    }

    if (formNuevoDestinatario.valid) {
      this.usuarioService.crearNuevoDestinatario( this.nuevoDestinatario );
      this.router.navigate(['dashboard/transferir']);
      this._snackBar.open( 'DESTINATARIO CREADO CORRECTAMENTE', '', this.configSnackBarOK );
    }

    /* formNuevoDestinatario.reset();
    this.matSelectBanco.options.forEach((data) => data.deselect());
    this.matSelectCuenta.options.forEach((data) => data.deselect()); */

    /* this._snackBar.open( 'DESTINATARIO CREADO CORRECTAMENTE', '', this.configSnackBarOK ); */
    
  
  }

  teclaPresionada(){
    this.nuevoDestinatario.rut = format( this.nuevoDestinatario.rut );
  }

  cuentaSelection( event: any ) {
    this.nuevoDestinatario.cuenta = event;
  }

  bancoSelection( event: any ) {
    this.nuevoDestinatario.banco = event;
  }

}
