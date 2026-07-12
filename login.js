const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data =
            await response.json();

        if (response.ok) {

            localStorage.setItem(
                "token",
                data.token
            );

            document.getElementById(
                "message"
            ).innerText =
            "Login Successful";

            setTimeout(() => {
                window.location.href =
                "/dashboard.html";
            }, 1000);

        } else {

            document.getElementById(
                "message"
            ).innerText =
            data.message;
        }

    } catch (error) {

        document.getElementById(
            "message"
        ).innerText =
        "Server Error";
    }
});