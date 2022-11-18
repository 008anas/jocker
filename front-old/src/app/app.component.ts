import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Joke {
  id!: number;
  type!: string;
  punchline!: string;
  setup!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentJoke!: Joke;
  showPunchline = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRandomJoke();
  }

  getRandomJoke() {
    this.showPunchline = false;
    this.http.get(`http://localhost:6868/api/jokes/${Math.floor(Math.random() * 400)}`)
      .subscribe((joke: any) => this.currentJoke = joke);
  }
}
