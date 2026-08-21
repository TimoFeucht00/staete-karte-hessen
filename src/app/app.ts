import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityMap } from './components/city-map/city-map';

@Component({
  imports: [RouterOutlet, CityMap],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}

