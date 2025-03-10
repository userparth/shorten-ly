# 🚀 short-ly - URL Shortener Library

short-ly is a **tiny yet powerful** URL shortener library 📌 built with **Express & SQLite**!

## ✨ Features

✅ Shorten long URLs to short, shareable links 🔗  
✅ Track the number of visits for each shortened URL 📊  
✅ Uses **SQLite for persistence** 📂  
✅ Works as an **NPM library** - just install and use! 🎉

## 📦 Installation

```sh
npm install short-ly
```

## 🚀 Usage

```typescript
import { urlShortener } from "short-ly";

(async () => {
	const shortURL = await urlShortener.shortenURL(
		"https://example.com/long-url"
	);
	console.log(shortURL); // e.g., https://short.ly/abc123

	const originalURL = await urlShortener.getOriginalURL("abc123");
	console.log(originalURL); // https://example.com/long-url

	const analytics = await urlShortener.getAnalytics("abc123");
	console.log(`Visits: ${analytics}`);
})();
```

## Contributing

Feel free to contribute by submitting issues or pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by [Parth Sharma](https://getparth.com)
