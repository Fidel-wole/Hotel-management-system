import routeConf from "../configs/routes";
import { Router } from "express";
import authenticationRouter from "./auth";
import userRouter from "./user";
import bookingRouter from "./booking";
const v1Router: Router[] = [
   authenticationRouter,
   userRouter,
   bookingRouter,
  ];
  export default v1Router;
  