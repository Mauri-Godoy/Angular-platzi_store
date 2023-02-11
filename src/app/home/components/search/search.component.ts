import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField: FormControl = new FormControl("");
  results: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.searchField.valueChanges
      // debounceTime: tiempo requerido de inactividad para suscribirse los cambios.
      // Normalmente se setea en 300 milisegundos
      .pipe(debounceTime(300)).subscribe(value => this.getData(value));
  }

  private getData(query: string) {
    const API = "fRqE7Z6ywo5g4G7H6cM7nhFsyAka2hJw";
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
      .pipe(
        map((response: any) => response.data.map(item => item.images.downsized))
      )
      .subscribe(data => {
        console.log(data)
        this.results = data;
      })
  }
}
