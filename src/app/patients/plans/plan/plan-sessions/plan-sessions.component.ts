import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionInterface } from './../../../../interfaces/session.interface';
import { Session } from './../../../../classes/session';

@Component({
  selector: 'app-plan-sessions',
  templateUrl: './plan-sessions.component.html',
  styleUrls: ['./plan-sessions.component.css']
})
export class PlanSessionsComponent implements OnInit {
  private _sessions = new BehaviorSubject<SessionInterface[]>([]);
  private _session = new BehaviorSubject<SessionInterface>(new Session());
  private _totalAmount = new BehaviorSubject<number>(0);

  @Output()
  onClickDeleteSession = new EventEmitter<Session>();

  @Input()
  set sessions(value) {
    this._sessions.next(value);

    let classes = ['table-success', 'table-primary', 'table-warning', 'table-danger', 'table-info', 'table-light'];

    if (this.sessions.length > 0) {
      this.sessions[0].class="table-success";
      let date = this.sessions[0].date;
      let index = 0;
      for(let session of this.sessions) {
        if (date != session.date) {
          index++;
          date = session.date;
        }
        session.class = classes[index%6];
      }
      console.log("sessions", this.sessions);

    }
  }
  get sessions() {
    return this._sessions.getValue();
  }
  @Input()
  set totalAmount(value) {
    this._totalAmount.next(value);
  }
  get totalAmount() {
    return this._totalAmount.getValue();
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
    this.onClickDeleteSession.emit(session);
  }
}
