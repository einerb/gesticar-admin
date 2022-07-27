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
  USER: {
    BASE: environment.apiHost + environment.apiVersion + "user",
    ALL: (page, elements, start, end) =>
      environment.apiHost +
      environment.apiVersion +
      "user" +
      addPaginationWithDates(page, elements, start, end),
  },
  CAR: {
    BASE: environment.apiHost + environment.apiVersion + "vehicle",
    BASEAPI: (documentType, documentNumber, plate) =>
      `https://api.verifik.co/v2/co/runt/consultarVehiculo?documentType=${documentType}&documentNumber=${documentNumber}&plate=${plate}`,
    BASEAPICOMPLETE: (plate) =>
      `https://api.verifik.co/v2/co/runt/consultarVehiculoCompleto?plate=${plate}`,
    OWNER: (plate) =>
      `https://api.verifik.co/v2/co/soat/consultarVehiculo?plate=${plate}`,
    PENALTY: (documentType, documentNumber) =>
      `https://api.verifik.co/v2/co/simit/consultarComparendos?documentType=${documentType}&documentNumber=${documentNumber}`,
  },
  LICENSE: {
    BASE: environment.apiHost + environment.apiVersion + "license",
  },
  SERVICE: {
    BASE: environment.apiHost + environment.apiVersion + "service",
  },
  NEWS: {
    BASE: environment.apiHost + environment.apiVersion + "news",
  },
};
