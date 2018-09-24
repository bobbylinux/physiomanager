import {ProgramInterface} from '../interfaces/program.interface';

export class Program implements ProgramInterface {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
  href: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.enabled = false;
    this.href = '';
  }
}
