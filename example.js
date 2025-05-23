import { urlShortener } from "./src/index.js";

urlShortener.setBaseURL("https://mycustomdomain.com");

(async () => {
	const shortURL = await urlShortener.shortenURL(
		"https://example.com/long-url"
	);
	console.log(shortURL); // e.g., https://mycustomdomain.com/abc123
})();
