# **shorten-ly 🚀 - A Simple URL Shortener Library**

`shorten-ly` is a lightweight Node.js library that lets you shorten URLs, retrieve original links, and track analytics using SQLite.

## **✨ Features**

- ✅ **Shorten long URLs** into compact links
- ✅ **Retrieve the original URL** from a shortened link
- ✅ **Track visit analytics** for each short link
- ✅ **Use SQLite for persistence** (supports both file-based and in-memory storage)
- ✅ **Customize your domain** for shortened links

---

## **📦 Installation**

Install the package using `npm` or `yarn`:

```sh
npm install shorten-ly
# or
yarn add shorten-ly
```

---

## **🚀 Usage**

### **1️⃣ Import the Library**

```js
import { urlShortener } from "shorten-ly";
```

### **2️⃣ Set a Custom Domain (Optional)**

By default, `shorten-ly` uses `http://localhost:3000`, but you can **set your own domain**:

```js
urlShortener.setBaseURL("https://mycustomdomain.com");
```

If you skip this step, the default **`http://localhost:3000`** will be used.

### **3️⃣ Shorten a URL**

```js
(async () => {
	const shortURL = await urlShortener.shortenURL(
		"https://example.com/long-url"
	);
	console.log(shortURL); // e.g., https://mycustomdomain.com/abc123
})();
```

### **4️⃣ Retrieve the Original URL**

```js
const originalURL = await urlShortener.getOriginalURL("abc123");
console.log(originalURL); // https://example.com/long-url
```

### **5️⃣ Get URL Analytics (Visit Count)**

```js
const analytics = await urlShortener.getAnalytics("abc123");
console.log(`Visits: ${analytics.visits}`);
```

---

## **📌 Folder Structure**

```
shorten-ly/
│── prisma/
│   ├── schema.prisma
│   ├── prisma.db (SQLite database)
│── src/
│   ├── index.js
├── example.js
│── .gitignore
│── package.json
│── README.md
```

---

## **🛠 Database Configuration**

`shorten-ly` uses **SQLite** for storage. By default, it saves data in `prisma.db`.

**Run:**

```sh
npx prisma migrate dev --name init
```

---

## **🎯 Why Use shorten-ly?**

✔ **No external services required** - Everything runs locally  
✔ **Custom domain support** - Use your own short link domain  
✔ **Easy integration** - Works as a library in your existing projects

---

## Contributing

Feel free to contribute by submitting issues or pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by [Parth Sharma](https://getparth.com)
