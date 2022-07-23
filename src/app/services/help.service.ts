import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HelpService {
  public modal$ = new EventEmitter<boolean>();
  
  constructor() {}

  
}
