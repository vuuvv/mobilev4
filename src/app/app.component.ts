import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  host: {
    '[class.red-theme]': 'true',
  }
})
export class AppComponent {
}
