import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";

const prisma = new PrismaClient();
const nanoid = customAlphabet(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	6
);

let BASE_URL = "http://localhost:3000"; // Default domain, users can override it

// Function to allow users to set their own domain
function setBaseURL(url) {
	BASE_URL = url;
}

// Function to shorten a URL
async function shortenURL(longUrl) {
	const shortCode = nanoid();
	await prisma.url.create({ data: { shortCode, longUrl, visitCount: 0 } });
	return `${BASE_URL}/${shortCode}`; // Uses the user-defined domain
}

// Function to retrieve the original URL
async function getOriginalURL(shortCode) {
	const urlEntry = await prisma.url.findUnique({ where: { shortCode } });
	return urlEntry ? urlEntry.longUrl : null;
}

// Function to get analytics (visit count)
async function getAnalytics(shortCode) {
	const urlEntry = await prisma.url.findUnique({ where: { shortCode } });
	return urlEntry ? { visits: urlEntry.visitCount } : null;
}

// Export functions for use as a library
export const urlShortener = {
	setBaseURL,
	shortenURL,
	getOriginalURL,
	getAnalytics,
};
