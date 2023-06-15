import {Component} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public locations = [
    {name: 'Elysian Academy', street: '123 Elysian Street', postalCode: '12345', city: 'Cityville'},
    {name: 'Exemplar College', street: '456 Exemplar Avenue', postalCode: '23456', city: 'Townsville'},
    {name: 'Synthesis University', street: '789 Synthesis Road', postalCode: '34567', city: 'Metropolis'},
    {name: 'Nexus Institute', street: '101 Nexus Lane', postalCode: '45678', city: 'Innovation City'},
    {name: 'Innovus Polytechnic', street: '222 Innovus Boulevard', postalCode: '56789', city: 'Technoville'},
    {name: 'Luminary University', street: '333 Luminary Drive', postalCode: '67890', city: 'Illuminaria'}
  ];
}
