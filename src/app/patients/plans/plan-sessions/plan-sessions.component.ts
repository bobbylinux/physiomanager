import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionInterface } from './../../../interfaces/session.interface';
import { Session } from './../../../classes/session';

@Component({
  selector: 'app-plan-sessions',
  templateUrl: './plan-sessions.component.html',
  styleUrls: ['./plan-sessions.component.css']
})
export class PlanSessionsComponent implements OnInit {

  private _sessions = new BehaviorSubject<SessionInterface[]>([]);
  private _session = new BehaviorSubject<SessionInterface>(new Session());

  @Input()
  set sessions(value) {
    this._sessions.next(value);
    if (!this.sessions) {
      this.sessions = [];
    }
    console.log(value);
  }
  get sessions() {
    return this._sessions.getValue();
  }
  @Input()
  set session(value) {
    this._session.next(value);
    if (this.session) {
      this.sessions.push(this.session);
    } 
  }
  get session() {
    return this._session.getValue();
  }
  constructor() { }

  ngOnInit() {
  }

  formatDate(date: string) {
    let day = date.substr(8, 2);
    let month = date.substr(5, 2);
    let year = date.substr(0, 4);
    return day + "-" + month + "-" + year;
  }

  deleteSession(session) {
    const idx = this.sessions.indexOf(session);
    this.sessions.splice(idx, 1);
  }
}
