import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RespuestaLogin, User } from '../interfaces/login.interface';
import { ListadoBancos } from '../interfaces/listadoBancos';
import { Destinatario } from '../interfaces/destinatario.interface';
import { RespuestaCrearUsuario } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Transferencia } from '../interfaces/transferencia.interface';
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string | null = '';

  constructor( private http: HttpClient, private router: Router ) { }

  validarToken(): Observable<boolean> {

    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.get<RespuestaLogin>(`${URL}/api/auth`, {headers})
      .pipe(
        map( resp => {
          return resp.ok
        }),
        catchError( err => of(false))
      );

  }

  login( rut: string, password: string ) {

    return this.http.post<RespuestaLogin>( `${URL}/api/auth/login`, { rut, password } )
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            this.guardarToken( resp.token );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(false) )
      );

  }

  async guardarToken( token: string ){
    
    this.token = token;

    await localStorage.setItem('token', token);

    await this.validaToken();

  }

  async validaToken() {
    await this.cargarToken();
  }

  async cargarToken() {
    this.token = await localStorage.getItem('token');
  }

  cerrarSesion() {
    this.token = null;
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  getListadoBancos() {
    return this.http.get<ListadoBancos>( `https://bast.dev/api/banks.php` );
  }

  async crearNuevoDestinatario( destinatario: Destinatario ) {
    
    await this.cargarToken();

    const headers = new HttpHeaders({
      'x-token': this.token!
    });

    return this.http.post( `${URL}/api/destinatario`, destinatario, { headers } ).subscribe( resp => {
      console.log(resp);
    });

  }

  crearNuevoUsuario( usuario: any ) {

    const { nombre, rut, password } = usuario;

    return this.http.post<RespuestaCrearUsuario>( `${URL}/api/user`, { nombre, rut, password} )
    .pipe(
      tap( resp => {
        if( resp.ok ) {
          this.guardarToken( resp.token );
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(false) )
    );

  }

  async getDestinatarios() {

    await this.cargarToken();

    const headers = new HttpHeaders({
      'x-token': this.token!
    });

    return this.http.get( `${URL}/api/destinatario`, { headers } );

  }

  getDestinatarioPorID( id: string ): Observable<Destinatario> {

    const url = `${ URL }/api/destinatario/${ id }`;

    return this.http.get<Destinatario>( url );

  }

  async realizarTransferencia( transferencia: Transferencia ) {
    
    await this.cargarToken();

    const headers = new HttpHeaders({
      'x-token': this.token!
    });

    return this.http.post( `${URL}/api/transferencia`, transferencia, { headers } ).subscribe( resp => {
      console.log(resp);
    });

  }

  async getTransferencias() {

    await this.cargarToken();

    const headers = new HttpHeaders({
      'x-token': this.token!
    });

    return this.http.get( `${URL}/api/transferencia`, { headers } );

  }
  
}
