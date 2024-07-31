import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  filteredLocations: HousingLocation[] = [];
  housingLocationList:HousingLocation[] = [];


  constructor() {
    console.log("in the home component constructor")
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocations = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocationList;
      return;
    }
    this.filteredLocations = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }

}
