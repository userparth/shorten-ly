import express from "express";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";

const app = express();
const prisma = new PrismaClient();
const nanoid = customAlphabet(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	8
);

app.use(express.json());

// ✅ Shorten URL
// npx prisma migrate dev --name init
app.post("/shorten", async (req, res) => {
	const { longUrl } = req.body;
	if (!longUrl) return res.status(400).json({ error: "URL is required" });

	const shortCode = nanoid();
	await prisma.url.create({ data: { shortCode, longUrl, visitCount: 0 } });

	res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});

// ✅ Redirect to Original URL & Track Visits
app.get("/:shortCode", async (req, res) => {
	const { shortCode } = req.params;
	const url = await prisma.url.findUnique({ where: { shortCode } });

	if (!url) return res.status(404).json({ error: "URL not found" });

	await prisma.url.update({
		where: { shortCode },
		data: { visitCount: url.visitCount + 1 },
	});

	res.redirect(url.longUrl);
});

// ✅ Get URL Analytics
app.get("/analytics/:shortCode", async (req, res) => {
	const { shortCode } = req.params;
	const url = await prisma.url.findUnique({ where: { shortCode } });

	if (!url) return res.status(404).json({ error: "URL not found" });

	res.json({ shortCode, longUrl: url.longUrl, visits: url.visitCount });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
);
