import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Your app name'; // You can modify it ...
  todolist; // My todolist...
  // ...

  addTask(){
    // Add task to todolist...
  }

  removeTask(){
    // Remove task from todolist...
  }

  doneTask(){
    // Set task to done...
  }
}
