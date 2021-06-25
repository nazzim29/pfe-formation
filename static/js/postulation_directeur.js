const overlay = document.querySelector(".modal-overlay");
const openmodal = document.querySelectorAll(".modal-open");
const search = $("#search");
const closemodal = document.querySelectorAll(".modal-close");
var table = undefined;

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
table = $("#example")
	.DataTable({
		initComplete: function () {
			$("#example_filter").hide();
			var cols = [this.api().columns(1)];
			cols.forEach((col) => {
				let select = $('<select> <option value=""></option> </select>')
					.appendTo($(col.footer()).empty())
					.on("change", () => {
						var val = $.fn.dataTable.util.escapeRegex($(select).val());
						console.log(this.api().columns(1).data());
						console.log(val);
						col.search(val ? val : "", true, false).draw();
					});
				col
					.data()
					.eq(0)
					.unique()
					.sort()
					.each((value) => {
						select.append(
							'<option value="' + value + '">' + value + "</option>"
						);
					});
			});
			let select = $(
				'<select> <option value=""></option><option value="en attente">en attente</option> <option value="refusé">refusé</option><option value="accepté">accepté</option> </select>'
			)
				.appendTo($(this.api().columns(6).footer()).empty())
				.on("change", () => {
					let val = $.fn.dataTable.util.escapeRegex($(select).val());
					this.api()
						.columns(6)
						.search(val ? "^" + val + "$" : "", true, false)
						.draw();
				});
			let select1 = $(
				'<select> <option value=""></option><option value="en attente">en attente</option> <option value="refusé">refusé</option><option value="accepté">accepté</option> </select>'
			)
				.appendTo($(this.api().columns(7).footer()).empty())
				.on("change", () => {
					let val = $.fn.dataTable.util.escapeRegex($(select1).val());
					this.api()
						.columns(7)
						.search(val ? "^" + val + "$" : "", true, false)
						.draw();
				});
		},
		processing: true,
		ajax: {
			url: "/postulation?json=true",
			dataSrc: "",
		},
		columnDefs: [
			{
				targets: 0,
				data: null,
				render: function (data, type, row, meta) {
					return `
                    <img class="avatar-sm" src="${row.user.avatar}">
                    <div class="flex flex-col">
                        <a href="\\user/${row.user.id}" target="_blank">${row.user.nom} ${row.user.prenom}</a>
                        <span class="w-max inline-block px-2 py-1 leading-none bg-yellow-400 text-yellow-600 rounded-full font-semibold uppercase tracking-wide text-xs">${row.user.activite}</span>
                    </div>
                    `;
				},
			},
			{
				targets: 1,
				data: "formation.titre",
				render: function (data, type, row, meta) {
					return `
                        <div class="flex flex-col">
                            <h1>${row.formation.titre}</h1>
                            <div class="flex flex-row flex-nowrap overflow-x-auto w-full">
                            ${row.formation.activite
															.map((e) => {
																return `<span class="inline-block px-2 py-1 leading-none bg-yellow-400 text-yellow-600 rounded-full font-semibold uppercase tracking-wide text-xs">${e}</span>`;
															})
															.join(" ")}
                        </div>
                        </div>
                        `;
				},
			},
			{
				targets: 2,
				data: "formation.participant",
				render: function (data, type, row, meta) {
					return `<span class="text-semibold">${row.formation.participant}/${row.formation.place}</span>`;
				},
			},
			{
				targets: 3,
				data: "formation.date_debut",
				render: function (data, type, row, meta) {
					if (moment(row.formation.date_debut).diff(moment()) < 0)
						return `${moment(row.formation.date_debut).fromNow()}`;
					return `${moment(row.formation.date_debut).toNow()}`;
				},
			},
			{
				targets: 4,
				data: "formation.date_fin",
				render: function (data, type, row, meta) {
					return `${moment
						.duration(
							moment(row.formation.date_debut).diff(
								moment(row.formation.date_fin)
							)
						)
						.humanize()}`;
				},
			},
			{
				targets: 5,
				data: "date",
				render: function (data, type, row, meta) {
					return `${moment(row.date).format("DD/MM/YYYY")}`;
					//return `<button class="button focus:outline-none"> <svg data-toggle='modal' data-target='modifier' class="fill-current text-atgreen hover:text-atgreen-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293c-.128.128-.219.289-.263.464L3 21l5.242-1.03C8.418 19.926 8.579 19.835 8.707 19.707zM21 7.414c.781-.781.781-2.047 0-2.828L19.414 3c-.781-.781-2.047-.781-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg> </button>
					//<button class="button focus:outline-none"><svg data-toggle='modal' data-target='supprimer' class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
				},
			},
			{
				targets: 7,
				data: "valider_superieur",
				render: function (data, type, row, meta) {
					if (row.valider_superieur =="en attente") {
						return `<div class="flex flex-row justify-center items-center">
							<button class="button" ><i data-toggle="valider" data-target="validation" class="material-icons text-green-600">check</i></button>
							<button class="button" ><i data-toggle="refuser" data-target="validation" class="material-icons text-red-500">clear</i></button>
						</div>`;
					} else {
						return `${row.valider_superieur}`;
					}
					//return `<button class="button focus:outline-none"> <svg data-toggle='modal' data-target='modifier' class="fill-current text-atgreen hover:text-atgreen-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293c-.128.128-.219.289-.263.464L3 21l5.242-1.03C8.418 19.926 8.579 19.835 8.707 19.707zM21 7.414c.781-.781.781-2.047 0-2.828L19.414 3c-.781-.781-2.047-.781-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg> </button>
					//<button class="button focus:outline-none"><svg data-toggle='modal' data-target='supprimer' class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
				},
			},
			{
				targets: 6,
				data: "valider_df",
				render: function (data, type, row, meta) {
					return `${row.valider_df}`;
					//return `<button class="button focus:outline-none"> <svg data-toggle='modal' data-target='modifier' class="fill-current text-atgreen hover:text-atgreen-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293c-.128.128-.219.289-.263.464L3 21l5.242-1.03C8.418 19.926 8.579 19.835 8.707 19.707zM21 7.414c.781-.781.781-2.047 0-2.828L19.414 3c-.781-.781-2.047-.781-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg> </button>
					//<button class="button focus:outline-none"><svg data-toggle='modal' data-target='supprimer' class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
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

const valider = (id) => {
	let xhr = new XMLHttpRequest();
	xhr.open("post", "\\postulation/" + id);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
		console.log(xhr.response);
		table.ajax.reload();
		toggleModal();
	};
	xhr.send(JSON.stringify({ valider_superieur: "accepté" }));
};
const refuser = (id) => {
	let xhr = new XMLHttpRequest();
	xhr.open("post", "\\postulation/" + id);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
        table.draw();
        table.ajax.reload();
		toggleModal();
	};
	xhr.send(JSON.stringify({ valider_superieur: "refuser" }));
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
	let row = table
		.row(e.target.parentElement.parentElement.parentElement.parentElement)
		.data();
	if (data.target == "validation") {
		switch (data.toggle) {
			case "refuser":
				$(".modal-content .modal-title").text(
					"Refuser la postulation d'un utilisateur"
				);
				$(".modal-content .modal-body").html(
					`<p>etes vous sur de vouloir refuser la postulation de <span class="font-semibold user-name">${row.user.nom.toUpperCase()} ${row.user.prenom.toLowerCase()}</span> a la formation ${
						row.formation.titre
					}</p>`
				);
				$(".modal-content .modal-footer").html(`<button
        class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
    <button class="px-4  p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-700 action">Supprimer</button>`);
				$(".modal-content .action")
					.text("Refuser")
					.on("click", (e) => {
						refuser(row.id);
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "valider":
				$(".modal-content .modal-title").text(
					"etes-vous sur de valider la postulation"
				);
				$(".modal-content .modal-body").html(
					`<p>etes vous sur de vouloir valider la postulation de <span class="font-semibold user-name">${row.user.nom.toUpperCase()} ${row.user.prenom.toLowerCase()}</span> a la formation ${
						row.formation.titre
					}</p>`
				);
				$(".modal-content .modal-footer").html(`<button
        class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
    <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">Supprimer</button>`);
				$(".modal-content .action")
					.text("Valider")
					.on("click", (e) => {
						valider(row.id);
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
		}
	}
});
