import routeConf from "../configs/routes";
import { Router } from "express";
import authenticationRouter from "./user";
const v1Router: Router[] = [
   authenticationRouter
  ];
  export default v1Router;
  