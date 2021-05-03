import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Transferencia } from '../../../interfaces/transferencia.interface';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit, OnDestroy, OnChanges  {

  ELEMENT_DATA: Transferencia[] = [];

  displayedColumns: string[] = ['Nombre Destinatario', 'RUT', 'Banco', 'Tipo de Cuenta', 'Monto', 'Comentario'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor( private usuarioService: UserService ) { }

  ngOnChanges() {

    this.usuarioService.getTransferencias().then( resp => {
      resp.subscribe( async (data: any) => {
        this.ELEMENT_DATA = data.transferencias.reverse(); 
        this.dataSource = await new MatTableDataSource(this.ELEMENT_DATA);
      });
    });

  }

  ngOnInit(): void {

    this.usuarioService.getTransferencias().then( resp => {
      resp.subscribe( async (data: any) => {
        this.ELEMENT_DATA = data.transferencias.reverse(); 
        this.dataSource = await new MatTableDataSource(this.ELEMENT_DATA);
      });
    });

  }

  ngOnDestroy(): void {
    this.ELEMENT_DATA = [];
  }

}
