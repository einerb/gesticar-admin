import { User } from "./user.entity";

export class Workshop {
  id: number;
  nit?: string;
  name?: string;
  initials: string;
  address?: string;
  phone?: string;
  capacity?: number;
  limit?: number;
  state?: boolean;
  users?: [User];
  createdAt: string;
  updatedAt: string;

  constructor(item?: Workshop) {
    this.id = item && item.id ? item.id : 0;
    this.nit = item && item.nit ? item.nit : "";
    this.name = item && item.name ? item.name : "";
    this.address = item && item.address ? item.address : "";
    this.phone = item && item.phone ? item.phone : "";
    this.capacity = item && item.capacity ? item.capacity : 0;
    this.limit = item && item.limit ? item.limit : 0;
    this.state = item && item.state ? item.state : false;
    this.createdAt = item && item.createdAt ? item.createdAt : '';
    this.updatedAt = item && item.updatedAt ? item.updatedAt : '';
  }
}
