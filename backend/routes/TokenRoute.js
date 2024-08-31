import express from "express";
import {
  exchangeToken,
  refreshToken,
  revokeToken,
} from "../controller/TokenController.js";
const TokenRouter = express.Router();

TokenRouter.post("/token", exchangeToken);
TokenRouter.post("/token/refresh", refreshToken);
TokenRouter.post("/token/revoke", revokeToken);

export default TokenRouter;
