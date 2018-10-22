import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NoteComponent } from '../note/note.component';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/classes/session';
import { SessionInterface } from 'src/app/interfaces/session.interface';
import { Utility } from 'src/app/classes/utility';


@Component({
  selector: 'tr[app-plan-session]',
  templateUrl: './plan-session.component.html',
  styleUrls: ['./plan-session.component.css']
})
export class PlanSessionComponent implements OnInit {

  private _session = new BehaviorSubject<SessionInterface>(new Session());

  @Input()
  set session(value) {
    this._session.next(value);
  }
  get session() {
    return this._session.getValue();
  }

  @Output()
  onClickDeleteSession = new EventEmitter<Session>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  showNote() {
    this.dialog.open(NoteComponent, {
      height: '400px',
      width: '600px',
      data: {
        note: this.session.note
      }
    });
  }

  deleteSession(session) {
    this.onClickDeleteSession.emit(session);
  }

  formatDate(date: string) {
    return Utility.formatDateForUser(date);
  }
}
