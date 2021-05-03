import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destinatario } from '../../../interfaces/destinatario.interface';
import { switchMap } from "rxjs/operators";
import { UserService } from '../../../service/user.service';
import { Transferencia } from 'src/app/interfaces/transferencia.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  destinatario: Destinatario = {
    _id: '',
    nombre: '',
    rut: '',
    banco: '',
    correo: '',
    cuenta: '',
    numeroCuenta: '',
    telefono: ''
  };

  transferencia: Transferencia = {
    destinatario: this.destinatario,
    monto: 0,
    comentario: ''
  };

  private configSnackBarOK: MatSnackBarConfig = {
    panelClass: ['customOK'],  
    duration: 2000
  };

  private configSnackBar: MatSnackBarConfig = {
    panelClass: ['customErrorEmail'],  
    duration: 2000
  };

  constructor( private activatedRoute: ActivatedRoute, private usuarioService: UserService, private _snackBar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe( switchMap( ({ id }) => this.usuarioService.getDestinatarioPorID( id ) ) 
      )
      .subscribe( destinatario => {
        this.destinatario = destinatario; 
        this.transferencia.destinatario = destinatario;
      });
   
  }

  transferir() {

    if ( this.transferencia.monto <= 0 ) {
      this._snackBar.open( 'EL MONTO DEBE SER MAYOR A 0', '', this.configSnackBar );
      return;
    }

    this.usuarioService.realizarTransferencia( this.transferencia )
    this._snackBar.open( 'TRANSFERENCIA HECHA CORRECTAMENTE', '', this.configSnackBarOK );
    this.router.navigate(['dashboard/historial']);

  }

}


