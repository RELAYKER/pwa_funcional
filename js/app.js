document.getElementById("crud-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    addData({ name, email });
    e.target.reset();
});
