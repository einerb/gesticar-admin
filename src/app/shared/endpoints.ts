import { environment } from "../../environments/environment";

const addPagination = (page, elements) =>
  `?pageNumber=${page}&pageElements=${elements}`;
const addPaginationWithDates = (page, elements, start, end) =>
  `${addPagination(page, elements)}&start=${start}&end=${end}`;
const addPaginationWithDatesAndState = (page, elements, start, end, state) =>
  `${addPagination(page, elements)}&start=${start}&end=${end}&state=${state}`;
const addPaginationWithDatesAndYard = (page, elements, start, end, yard) =>
  `${addPagination(page, elements)}&start=${start}&end=${end}&yard=${yard}`;

export const Endpoint = {
  AUTH: {
    LOGIN: environment.apiHost + environment.apiVersion + "auth/login",
  },
  WORKSHOP: {
    BASE: environment.apiHost + environment.apiVersion + "workshop",
    ALL: (page, elements, start, end) =>
      environment.apiHost +
      environment.apiVersion +
      "workshop" +
      addPaginationWithDates(page, elements, start, end),
  },
  USER:{
    BASE: environment.apiHost + environment.apiVersion + "user",
  }
};
