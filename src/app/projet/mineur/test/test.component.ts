import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  name = 'sellaouti';
  firstname = 'aymen';
  age = 36;
  cin = 7075595;
  job = 'Enseignant';
  path = 'as.jpg';
  constructor() { }

  ngOnInit(): void {
  }

}
