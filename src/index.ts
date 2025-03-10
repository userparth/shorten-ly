import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config();

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
const DATABASE_PATH = process.env.DATABASE_URL || "file:./data/database.db";
const prisma = new PrismaClient({ datasources: { db: { url: DATABASE_PATH } } });

const app = express();
app.use(express.json());

class URLShortener {
  async shortenURL(originalURL: string): Promise<string> {
    const shortCode = nanoid();
    await prisma.uRL.create({ data: { original: originalURL, shortCode } });
    return `https://short.ly/${shortCode}`;
  }

  async getOriginalURL(shortCode: string): Promise<string | null> {
    const urlData = await prisma.uRL.findUnique({ where: { shortCode } });
    if (urlData) {
      await prisma.uRL.update({ where: { shortCode }, data: { visits: urlData.visits + 1 } });
      return urlData.original;
    }
    return null;
  }

  async getAnalytics(shortCode: string): Promise<number> {
    const urlData = await prisma.uRL.findUnique({ where: { shortCode }, select: { visits: true } });
    return urlData ? urlData.visits : 0;
  }
}

const urlShortener = new URLShortener();

app.post("/shorten", async (req: Request, res: Response) => {
  const { originalURL } = req.body;
  const shortURL = await urlShortener.shortenURL(originalURL);
  res.json({ shortURL });
});

app.get("/:shortCode", async (req: Request, res: Response) => {
  const originalURL = await urlShortener.getOriginalURL(req.params.shortCode);
  originalURL ? res.redirect(originalURL) : res.status(404).json({ error: "Not found" });
});

app.get("/analytics/:shortCode", async (req: Request, res: Response) => {
  const visits = await urlShortener.getAnalytics(req.params.shortCode);
  res.json({ visits });
});

export { urlShortener, app };
    