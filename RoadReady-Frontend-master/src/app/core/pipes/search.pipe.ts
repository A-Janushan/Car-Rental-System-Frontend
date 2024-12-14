import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(cars:any[], location: string): any[]  {
    return cars.filter((car)=>car.carLocation.toLowerCase().includes(location.toLowerCase()));
  }

}

