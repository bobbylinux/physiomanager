import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TherapyInterface } from "./../../../../interfaces/therapy.interface";
import { Therapy } from "./../../../../classes/therapy";
import { PhysiotherapistInterface } from "./../../../../interfaces/physiotherapist.interface";
import { Physiotherapist } from "./../../../../classes/physiotherapist";
import { Session } from "../../../../classes/session";

@Component({
  selector: "app-add-plan-session",
  templateUrl: "./add-plan-session.component.html",
  styleUrls: ["./add-plan-session.component.css"]
})
export class AddPlanSessionComponent implements OnInit {
  private loading: boolean = false;
  public _therapies = new BehaviorSubject<TherapyInterface[]>([]);
  public _physiotherapists = new BehaviorSubject<PhysiotherapistInterface[]>(
    []
  );
  public date: string = "01/01/1900";
  public price: number = 0;
  public note: string = null;
  public physiotherapist: number = 0;
  public therapy: number = 0;
  public units: number = 1;
  public selectedPhisiotherapist: PhysiotherapistInterface;
  public selectedTherapy: TherapyInterface;

  @Input()
  set therapies(value) {
    this._therapies.next(value);
  }
  get therapies() {
    return this._therapies.getValue();
  }
  @Input()
  set physiotherapists(value) {
    this._physiotherapists.next(value);
  }
  get physiotherapists() {
    return this._physiotherapists.getValue();
  }

  @Output() clickOnAddTherapy = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.date = this.getTodayDate();
  }

  getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  updatePrice(event) {
    const selectedId = event.target.value;
    const therapy = this.therapies.find(x => x.id == selectedId);
    this.price = therapy.price;
  }

  selectPhysiotherapist(event) {
    const selectedId = event.target.value;
    this.selectedPhisiotherapist = this.physiotherapists.find(
      x => x.id == selectedId
    );
  }

  selectTherapy(event) {
    const selectedId = event.target.value;
    this.selectedTherapy = this.therapies.find(x => x.id == selectedId);
    this.updatePrice(event);
  }

  addTherapyToSessions() {
    let session = new Session();
    session.physiotherapist_id = this.physiotherapist;
    session.physiotherapist = this.selectedPhisiotherapist;
    session.physiotherapist.id = this.physiotherapist;
    session.therapy_id = this.therapy;
    session.date = this.date;
    session.therapy = this.selectedTherapy;
    session.units = this.units;
    session.note = this.note;
    session.price = this.price;
    this.physiotherapist = 0;
    this.therapy = 0;
    this.units = 1;
    this.date = this.getTodayDate();
    this.note = "";
    this.price = 0;

    this.clickOnAddTherapy.emit(session);
  }
}
