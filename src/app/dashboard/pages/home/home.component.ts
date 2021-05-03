import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private usuarioService: UserService ) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
  }

}
