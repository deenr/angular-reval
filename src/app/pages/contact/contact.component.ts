import {Component} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public locations = [
    {name: 'Campus Hasselt', street: 'Martelarenlaan 42', postalCode: '3500', city: 'Hasselt'},
    {name: 'Campus Beek', street: 'Agoralaan gebouw D', postalCode: '3590', city: 'Diepenbeek'},
    {name: 'Campus Ufo', street: 'Sint-Nieuwstraat 33', postalCode: '9000', city: 'Ghent'},
    {name: 'City Campus', street: 'Sint-Annastraat 7', postalCode: '2000', city: 'Antwerpen'},
    {name: 'KU Leuven', street: 'Oude Markt 13', postalCode: '3000', city: 'Leuven'},
    {name: 'VUB Campus', street: 'Pleinlaan 2', postalCode: '1050', city: 'Elsene'}
  ];
}
