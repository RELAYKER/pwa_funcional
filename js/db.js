const dbName = "pwa_crud";
const dbVersion = 1;
let db;

const openDB = () => {
    const request = indexedDB.open(dbName, dbVersion);
    request.onupgradeneeded = (e) => {
        db = e.target.result;
        if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        }
    };
    request.onsuccess = (e) => {
        db = e.target.result;
        fetchData();
    };
    request.onerror = (e) => console.error("Database error:", e.target.errorCode);
};

const addData = (data) => {
    const transaction = db.transaction("users", "readwrite");
    const store = transaction.objectStore("users");
    store.add(data);
    transaction.oncomplete = () => fetchData();
};

const fetchData = () => {
    const transaction = db.transaction("users", "readonly");
    const store = transaction.objectStore("users");
    const request = store.getAll();
    request.onsuccess = (e) => {
        const list = e.target.result;
        const dataList = document.getElementById("data-list");
        dataList.innerHTML = "";
        list.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ${item.email}`;
            dataList.appendChild(li);
        });
    };
};

openDB();
