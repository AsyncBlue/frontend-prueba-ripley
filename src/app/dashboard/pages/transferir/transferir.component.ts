import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Destinatario } from '../../../interfaces/destinatario.interface';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {

  ELEMENT_DATA: Destinatario[] = [];

  displayedColumns: string[] = ['Nombre', 'Correo', 'Banco', 'Tipo de Cuenta', 'Transferir'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( private usuarioService: UserService ) { }

  ngOnInit(): void {

    this.usuarioService.getDestinatarios().then( resp => {
      resp.subscribe( async (data: any) => {
        this.ELEMENT_DATA = data.destinatarios.reverse(); 
        this.dataSource = await new MatTableDataSource(this.ELEMENT_DATA);
      });
    });

  }

}
