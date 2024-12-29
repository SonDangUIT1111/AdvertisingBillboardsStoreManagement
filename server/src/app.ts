import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import decalBillsRoutes from "./routes/billDecal";
import bangRonBillsRoutes from "./routes/billBangRon";
import bangHieuBillsRoutes from "./routes/billBangHieu";
import otherBillsRoutes from "./routes/billOther";
import servicePriceRoutes from "./routes/priceService";
import customerRoutes from "./routes/customer";
import revenueRoutes from "./routes/revenue";
import importMaterialRecordRoutes from "./routes/importMaterialRecord";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
declare module "express-session" {
  interface SessionData {
    user: string;
  }
}
app.use(
  express.urlencoded({
    extended: true,
  })
);

// disable cors policy
const allowedOrigins = ["*"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "subscribe",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24,
    },
  })
);

app.use(cookieParser());

app.use("/api/servicePrices", servicePriceRoutes);

app.use("/api/decalBills", decalBillsRoutes);

app.use("/api/bangRonBills", bangRonBillsRoutes);

app.use("/api/bangHieuBills", bangHieuBillsRoutes);

app.use("/api/otherBills", otherBillsRoutes);

app.use("/api/importMaterialRecords", importMaterialRecordRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/revenues", revenueRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
