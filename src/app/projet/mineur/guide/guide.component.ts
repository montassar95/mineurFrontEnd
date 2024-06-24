import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Document } from 'src/app/domain/document';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  @Input()
  idEnfant: any;

  @Input()
  idArrestation: any;



  documents:Document[]=[];
  constructor(private crudservice: CrudEnfantService,    public datepipe: DatePipe) {
              
 }
   
  ngOnInit(): void {
    this.crudservice.findDocumentByArrestation(this.idEnfant,this.idArrestation)
    .subscribe(data => {
      if (data.result == null) {
        console.log(data.result);
    

      } else {
        console.log("***************************************************************************************************");
    
        console.log(data.result);
        this.documents = data.result;

      }



    });
  }

}
