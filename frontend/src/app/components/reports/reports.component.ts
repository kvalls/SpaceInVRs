import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  allReportsClick() {
    window.location.replace('http://localhost:5488/templates/g-UQf7YbRO');
  }

  allUsersClick() {
    window.location.replace('http://localhost:5488/templates/VBoeQ25pc');
  }

}
