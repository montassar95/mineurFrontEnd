import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Opposition } from 'src/app/domain/opposition';

@Component({
  selector: "app-show-opposition",
  templateUrl: "./show-opposition.component.html",
  styleUrls: ["./show-opposition.component.css"],
})
export class ShowOppositionComponent implements OnInit {
  @Input() opposition: Opposition;

  constructor(
    private crudservice: CrudEnfantService,
    public datepipe: DatePipe
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.opposition);
  }
  ngOnInit(): void {}
}
