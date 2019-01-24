import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../../../classes/program';
import { ProgramService } from '../../../services/registers/program.service';
import { ProgramInterface } from '../../../interfaces/program.interface';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  public newProgram = false;

  enabledOptions = [
    { id: true, text: 'Sì' },
    { id: false, text: 'No' }
  ];

  public program: ProgramInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    enabled: new FormControl()
  });

  constructor(private programService: ProgramService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.program = new Program();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.newProgram = true;
          return;
        }
        this.programService.get(params.id, '').subscribe(
          response => {
            if (response['data'].length > 0) {
              this.program = response['data'][0];
              this.formGroup = new FormGroup({
                id: new FormControl(this.program.id),
                title: new FormControl(this.program.title),
                description: new FormControl(this.program.description),
                enabled: new FormControl(this.program.enabled)
              });
            }
          }
        );
      }
    );
  }

  get id() {
    return this.formGroup.get('id');
  }

  get title() {
    return this.formGroup.get('title');
  }

  get description() {
    return this.formGroup.get('description');
  }

  get enabled() {
    return this.formGroup.get('enabled');
  }

  addProgram() {
    const title = this.title.value;
    const description = this.description.value;
    const enabled = this.enabled.value.toString() == 'true' ? true : false;
    const program = new Program();
    program.title = title;
    program.description = description;
    program.enabled = enabled;

    this.programService.create(program).subscribe(
      response => {
        this.router.navigate(['programs']);
      }
    );
  }

  updateProgram() {
    const id = this.id.value;
    const title = this.title.value;
    const description = this.description.value;
    const enabled = this.enabled.value.toString() == 'true' ? true : false;
    const program = new Program();
    program.id = id;
    program.title = title;
    program.description = description;
    program.enabled = enabled;

    this.programService.update(program).subscribe(
      response => {
        this.router.navigate(['programs']);
      }
    );
  }

  submitForm() {
    if (this.newProgram) {
      this.addProgram();
    } else {
      this.updateProgram();
    }
  }
}
