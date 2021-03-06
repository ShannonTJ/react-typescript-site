import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createPostlikeLoader } from "./utils/createPostlikeLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  //@ts-ignore
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  postlikeLoader: ReturnType<typeof createPostlikeLoader>;
};
