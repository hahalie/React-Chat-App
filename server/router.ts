import express, { Router, Request, Response, NextFunction } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`Server is up and running`);
});

module.exports = router;