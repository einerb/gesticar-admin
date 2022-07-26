export class Car {
  id?: number;
  plate?: string;
  color: string;
  brand: string;
  line: string;
  enrollmentDate: string;
  typeVehicle: string;
  typeService: string;
  model: string;
  countryOrigin: string;
  noSerie: string;
  noMotor: string;
  noChasis: string;
  noVin: string;
  tonnage: string;
  divipola: number;
  cylinder: string;
  pbv: string;
  occupant: string;
  bodywork: string;
  fuel: string;
  transitAgency: string;
  soatNumber: string;
  identificationOwner: number;
  expeditionDateSoat: string;
  dueDateSoat: string;
  techReview: boolean;
  requireTechReview: boolean;
  isShielding: boolean;
  levelShielding: string;
  dateShielding: string;
  statusVehicle: string;
  state: boolean;
  createdAt?: string;

  constructor(item?: Car) {
    this.id = item && item.id ? item.id : 0;
    this.plate = item && item.plate ? item.plate : "";
    this.color = item && item.color ? item.color : "";
    this.brand = item && item.brand ? item.brand : "";
    this.line = item && item.line ? item.line : "";
    this.enrollmentDate =
      item && item.enrollmentDate ? item.enrollmentDate : "";
    this.typeVehicle = item && item.typeVehicle ? item.typeVehicle : "";
    this.typeService = item && item.typeService ? item.typeService : "";
    this.model = item && item.model ? item.model : "";
    this.countryOrigin = item && item.countryOrigin ? item.countryOrigin : "";
    this.noSerie = item && item.noSerie ? item.noSerie : "";
    this.noMotor = item && item.noMotor ? item.noMotor : "";
    this.noChasis = item && item.noChasis ? item.noChasis : "";
    this.noVin = item && item.noVin ? item.noVin : "";
    this.tonnage = item && item.tonnage ? item.tonnage : "";
    this.divipola = item && item.divipola ? item.divipola : 0;
    this.cylinder = item && item.cylinder ? item.cylinder : "";
    this.pbv = item && item.pbv ? item.pbv : "";
    this.occupant = item && item.occupant ? item.occupant : "";
    this.bodywork = item && item.bodywork ? item.bodywork : "";
    this.fuel = item && item.fuel ? item.fuel : "";
    this.transitAgency = item && item.transitAgency ? item.transitAgency : "";
    this.soatNumber = item && item.soatNumber ? item.soatNumber : "";
    this.expeditionDateSoat =
      item && item.expeditionDateSoat ? item.expeditionDateSoat : "";
    this.dueDateSoat = item && item.dueDateSoat ? item.dueDateSoat : "";
    this.techReview = item && item.techReview ? item.techReview : true;
    this.requireTechReview =
      item && item.requireTechReview ? item.requireTechReview : true;
    this.isShielding = item && item.isShielding ? item.isShielding : true;
    this.levelShielding =
      item && item.levelShielding ? item.levelShielding : "";
    this.dateShielding = item && item.dateShielding ? item.dateShielding : "";
    this.statusVehicle = item && item.statusVehicle ? item.statusVehicle : "";
    this.state = item && item.state ? item.state : true;
    this.createdAt = item && item.createdAt ? item.createdAt : "";
  }
}
