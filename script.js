console.log("Accediste al Api");

const button = document.getElementById('boton');
button.addEventListener("click", solicitudFetch);
let data = document.getElementById("content");

function solicitudFetch() {
    const users = JSON.parse(localStorage.getItem("users"));
    data.innerHTML = "";

    if (users && users.time > Date.now()) {
        fetchData(users.data);
    }
    else {
        for (let i = 0; i < 5; i++) {
            data.innerHTML += `
                <tr>
                    <td class="col-md-1 text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-info" role="status"></div>
                        </div>
                    </td>
                    <td class="col-md-3 text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-info" role="status"></div>
                        </div>
                    </td>
                    <td class="col-md-3 text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-info" role="status"></div>
                        </div>
                    </td>
                    <td class="col-md-3 text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-info" role="status"></div>
                        </div>
                    </td>
                    <td class="col-md-2 text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-info" role="status"></div>
                        </div>
                    </td>
                </tr>
            `;
        }

        fetch("https://reqres.in/api/users?delay=3")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo completar la solicitud.");
                }
                return response.json();
            })
            .then(users => {
                const usersData = {
                    data: users.data,
                    time: Date.now() + 60000,
                };
                localStorage.setItem("users", JSON.stringify(usersData));
                fetchData(users.data);
            })
            .catch(err => {
                console.error("Error en la peticion:", err);
            });
    }
}

function fetchData(users) {
    data.innerHTML = ""; // Vaciamos el contenido actual antes de agregar los nuevos datos

    users.forEach(user => {
        data.innerHTML += `
            <tr class="users container-sm text-center">
                <td class="col-md-1 table-primary">${user.id}</td>
                <td class="col-md-3 table-primary">${user.first_name}</td>
                <td class="col-md-3 table-primary">${user.last_name}</td>
                <td class="col-md-2 table-primary">${user.email}</td>
                <td class="col-md-3 table-primary"><img src="${user.avatar}" alt="${user.first_name}"></td>
            </tr>
        `;
    });
}
