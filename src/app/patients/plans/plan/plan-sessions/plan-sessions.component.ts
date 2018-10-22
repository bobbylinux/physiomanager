import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionInterface } from './../../../../interfaces/session.interface';
import { Session } from './../../../../classes/session';
import { Utility } from 'src/app/classes/utility';

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
  }
  get sessions() {
    return this._sessions.getValue();
  }
  @Input()
  set session(value) {
    this._session.next(value);
  }
  get session() {
    return this._session.getValue();
  }
  constructor() { }

  ngOnInit() {
  }

  deleteSession(session) {
    const idx = this.sessions.indexOf(session);
    this.sessions.splice(idx, 1);
  }
}
