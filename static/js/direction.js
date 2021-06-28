const overlay = document.querySelector(".modal-overlay");
const openmodal = document.querySelectorAll(".modal-open");
const search = $("#search");
const closemodal = document.querySelectorAll(".modal-close");
table = $("#example")
	.DataTable({
		initComplete: function () {
			console.log(this.data());
		},
		processing: true,
		ajax: {
			url: "/direction?json=true",
			dataSrc: "",
		},
		columnDefs: [
			{
				targets: 0,
				data: "nom",
				render: function (data, type, row, meta) {
					return row.nom;
				},
			},
			{
				targets: 1,
				data: null,
				render: function (data, type, row, meta) {
					if (row.directeur)
						return `<img class="avatar-sm" src="${row.directeur.avatar}">
                    <div class="flex flex-col">
                        <a href="\\user/${row.directeur.id}" target="_blank">${
							row.directeur.nom.toUpperCase() + " " + row.directeur.prenom
						}</a>
                        <span>${row.directeur.email}</span>
                        
                    </div>`;
					return "pas de directeur";
				},
			},
			{
				targets: 2,
				data: null,
				render: function (data, type, row, meta) {
					return `<button class="button focus:outline-none" > <svg data-toggle='modal' data-target='modifier' class="fill-current text-atgreen hover:text-atgreen-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293c-.128.128-.219.289-.263.464L3 21l5.242-1.03C8.418 19.926 8.579 19.835 8.707 19.707zM21 7.414c.781-.781.781-2.047 0-2.828L19.414 3c-.781-.781-2.047-.781-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg> </button>
                  <button class="button focus:outline-none" > <svg data-toggle='modal' data-target='supprimer' class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
				},
			},
		],
		bFilter: true,
		api: true,
		responsive: true,
		autoWidth: false,
		dom: "<'h-full w-full flex flex-col'<'overflow-y-scroll flex-1 h-full't>r <'flex flex-row flex-wrap w-full space-y-2 content-center justify-center sm:justify-evenly bottom-0'il<'self-center'p>>>",
	})
	.columns.adjust()
	.responsive.recalc();
overlay.addEventListener("click", toggleModal);
for (var i = 0; i < openmodal.length; i++) {
	openmodal[i].addEventListener("click", function (event) {
		event.preventDefault();
		toggleModal();
	});
}
for (var i = 0; i < closemodal.length; i++) {
	closemodal[i].addEventListener("click", toggleModal);
}

search.on("keyup", (r) => {
	let query = search.val();
	console.log(query);
	table.search(query, false, false).draw();
});

const supprimer = (f) => {
	xhr = new XMLHttpRequest();
	xhr.open("delete", "\\direction/" + f);
	xhr.onload = () => {
		table.ajax.reload(null, false);
		toggleModal();
	};
	xhr.send();
};
const modifier = (f) => {
	if (
		!(
			$(".modal-content .modal-body #nom").val() &&
			$(".modal-content .modal-body #directeur").val()
		)
	)
		return console.log("all field required");

	let form = {
		nom: $(".modal-content .modal-body #nom").val(),
		directeur: $(".modal-content .modal-body #directeur").val(),
	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "\\direction/" + f);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
		$(".modal-content .modal-loader").addClass("hidden");
		table.ajax.reload();
		toggleModal();
	};
	xhr.send(JSON.stringify(form));
	$(".modal-content .modal-loader").removeClass("hidden");
};
const creer = (f) => {
	if (
		!(
			$(".modal-content .modal-body #nom").val() &&
			$(".modal-content .modal-body #directeur").val()
		)
	)
		return alert("all field required!!");
	let form = {
		nom: $(".modal-content .modal-body #nom").val(),
		directeur: $(".modal-content .modal-body #directeur").val(),
	};
	let xhr = new XMLHttpRequest();
	xhr.open("post", "\\direction");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
		console.log(xhr.response);
		$(".modal-content .modal-loader").addClass("hidden");
		table.ajax.reload();
		toggleModal();
	};
	console.log(form);
	xhr.send(JSON.stringify(form));
	$(".modal-content .modal-loader").removeClass("hidden");
};
document.onkeydown = function (evt) {
	evt = evt || window.event;
	var isEscape = false;
	if ("key" in evt) {
		isEscape = evt.key === "Escape" || evt.key === "Esc";
	} else {
		isEscape = evt.keyCode === 27;
	}
	if (isEscape && document.body.classList.contains("modal-active")) {
		toggleModal();
	}
};

function toggleModal() {
	const body = document.querySelector("body");
	const modal = document.querySelector(".modal");
	modal.classList.toggle("opacity-0");
	modal.classList.toggle("pointer-events-none");
	body.classList.toggle("modal-active");
}
$(document).on("click", (e) => {
	let data = $(e.target).data();
	let row = table.row(e.target.parentElement.parentElement).data();
	if (data.toggle == "modal") {
		switch (data.target) {
			case "supprimer":
				$(".modal-content .modal-title").text("Supprimer une direction");
				$(".modal-content .modal-body").html(
					`
            <p>
              etes vous sur de vouloir supprimer
              <span class="font-semibold">
                ${row.nom} (${row.directeur?.nom})
              </span>
            </p>
          `
				);
				$(".modal-content .modal-footer").html(`<button
        class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
    <button class="px-4  p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-700 action">Supprimer</button>`);
				$(".modal-content .action")
					.text("Supprimer")
					.on("click", (e) => {
						supprimer(row.id);
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "creer":
				$(".modal-content .modal-title").text("Modifier un partenaire");
				$(".modal-content .modal-body").html(
					`
                        <div class="flex flex-row space-x-2">
                            <input
                            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                            type="text" name="nom" id="nom" placeholder="nom" >
                        </div>
                        <div class="flex flex-row space-x-2">
                            <select
                            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                            name="directeur" id="directeur" placeholder="directeur" >
                            </select>
                        </div>
                    `
				);
				getUsers();
				$(".modal-content .modal-footer").html(
					`
            <button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">
              Annuler
            </button>
            <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">
              Supprimer
            </button>
          `
				);
				$(".modal-content .action")
					.text("Ajouter")
					.on("click", (e) => {
						creer();
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "modifier":
				$(".modal-content .modal-title").text("Modifier un partenaire");
				$(".modal-content .modal-body").html(
					`
                        <div class="flex flex-row space-x-2">
                            <input
                            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                            type="text" name="nom" id="nom" placeholder="nom" value="${row.nom}" >
                        </div>
                        <div class="flex flex-row space-x-2">
                            <select
                            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                            name="directeur" id="directeur" placeholder="directeur" value="${row.directeur?.id}" >
                            </select>
                        </div>
                    `
				);
				getUsers(row.formateur);
				$(".modal-content .modal-footer").html(
					`
                        <button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">
                        Annuler
                        </button>
                        <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">
                        Supprimer
                        </button>
                    `
				);
				$(".modal-content .action")
					.text("Modifier")
					.on("click", (e) => {
						modifier(row.id);
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
		}
	}
});

const getUsers = (d) => {
	let xhr = new XMLHttpRequest();
	xhr.open("get", "\\user?json=true");
	xhr.responseType = "json";
	xhr.onload = () => {
		let x = xhr.response.filter((e) => {
			return e.role != "admin";
		});
        $("#directeur").html(`
            <option value=""></option>
            ${x.map((v) => {return `<option value="${v.id}">${v.nom.toUpperCase()} ${v.prenom.charAt(0).toUpperCase() + v.prenom.slice(1).toLowerCase()}</option>`;}).join("")}`
        );
		if (d) $("#directeur").val(d.id);
	};
	xhr.send();
};
