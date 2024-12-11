import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Observation } from 'src/app/domain/observation';

@Component({
  selector: "app-show-observation",
  templateUrl: "./show-observation.component.html",
  styleUrls: ["./show-observation.component.css"],
})
export class ShowObservationComponent implements OnInit {
  @Input() observation: Observation;

  constructor(
    private crudservice: CrudEnfantService,
    public datepipe: DatePipe
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.observation);
  }
  ngOnInit(): void {}
}
