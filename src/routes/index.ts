import routeConf from "../configs/routes";
import { Router } from "express";
import authenticationRouter from "./auth";
import userRouter from "./user";
import bookingRouter from "./booking";
import roleRouter from "./role";
import roomRouter from "./room";
const v1Router: Router[] = [
   authenticationRouter,
   userRouter,
   bookingRouter,
   roleRouter,
   roomRouter,
  ];
  export default v1Router;
  