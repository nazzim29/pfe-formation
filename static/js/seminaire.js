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

const supprimer = (f) => {
	xhr = new XMLHttpRequest();
	xhr.open("delete", "\\seminaire/" + f);
	xhr.onload = () => {
		table.ajax.reload(null, false);
		toggleModal();
	};
	xhr.send();
};
const modifier = (f) => {
	if (
		!(
			$(".modal-content .modal-body #titre").val() &&
			$(".modal-content .modal-body #type").val() &&
			$(".modal-content .modal-body #description").val() &&
			$(".modal-content .modal-body #activite").val() &&
			$(".modal-content .modal-body #animateurs").val() &&
			$(".modal-content .modal-body #lieu").val() &&
			$(".modal-content .modal-body #place").val() &&
			$(".modal-content .modal-body #date_debut").val() &&
			$(".modal-content .modal-body #date_fin").val()
		)
	)
		return console.log("all field required");
	if (
		$(".modal-content .modal-body #date_debut")[0].valueAsDate >
		$(".modal-content .modal-body #date_fin")[0].valueAsDate
	)
		return alert("wrong date");
	let form = {
		titre: $(".modal-content .modal-body #titre").val(),
		type: $(".modal-content .modal-body #type").val(),
		description: $(".modal-content .modal-body #description").val(),
		activite: $(".modal-content .modal-body #activite").val(),
		animateurs: $(".modal-content .modal-body #animateurs").val(),
		lieu: $(".modal-content .modal-body #lieu").val(),
		place: $(".modal-content .modal-body #place").val(),
		date_debut: $(".modal-content .modal-body #date_debut").val(),
		date_fin: $(".modal-content .modal-body #date_fin").val(),
	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "\\seminaire/" + f);
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
			$(".modal-content .modal-body #titre").val() &&
			$(".modal-content .modal-body #type").val() &&
			$(".modal-content .modal-body #description").val() &&
			$(".modal-content .modal-body #activite").val() &&
			$(".modal-content .modal-body #animateurs").val() &&
			$(".modal-content .modal-body #lieu").val() &&
			$(".modal-content .modal-body #place").val() &&
			$(".modal-content .modal-body #date_debut").val() &&
			$(".modal-content .modal-body #date_fin").val()
		)
	)
		return alert("all field required!!");
	if (
		$(".modal-content .modal-body #date_debut")[0].valueAsDate >
		$(".modal-content .modal-body #date_fin")[0].valueAsDate
	)
		return alert("wrong date");
	let form = {
		titre: $(".modal-content .modal-body #titre").val(),
		type: $(".modal-content .modal-body #type").val(),
		description: $(".modal-content .modal-body #description").val(),
		activite: $(".modal-content .modal-body #activite").val(),
		animateurs: $(".modal-content .modal-body #animateurs").val(),
		lieu: $(".modal-content .modal-body #lieu").val(),
		place: $(".modal-content .modal-body #place").val(),
		date_debut: $(".modal-content .modal-body #date_debut").val(),
		date_fin: $(".modal-content .modal-body #date_fin").val(),
	};
	let xhr = new XMLHttpRequest();
	xhr.open("post", "\\seminaire");
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
				$(".modal-content .modal-title").text("Supprimer un partenaire");
				$(".modal-content .modal-body").html(
					`
            <p>
              etes vous sur de vouloir supprimer
              <span class="font-semibold user-name">
                ${
									row.titre.charAt(0).toUpperCase() +
									row.titre.slice(1).toLowerCase()
								} (${row.type})
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
				$(".modal-content .modal-title").text("creer un seminaire");
				$(".modal-content .modal-body").html(
					`
            <div class="flex flex-row space-x-2">                    
              <input
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              type="text" name="titre" id="titre" placeholder="titre" >
            </div>
            <div class="flex flex-row space-x-2">                    
              <select
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              name="type" id="type" placeholder="type" >
                <option value="interne">interne</option>
                <option value="externe">externe</option>
              </select>
            </div>
            <div class="flex flex-row space-x-2">
              <select
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              name="activite" id="activite" placeholder="activite" style="display:none" multiple></select>
            </div>
            <div class="flex flex-row space-x-2">
                <select
                    class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                    name="animateurs" id="animateurs" placeholder="animateurs" style="display:none" multiple></select>
            </div>
            <div class="flex flex-row space-x-2">                      
              <select
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                name="lieu" id="lieu" placeholder="lieu">
              </select>
              <button onclick='getLieu()'>a</button>
              <a href="\\lieu" target="_blank">new</a>
            </div>
            <div class="flex flex-row space-x-2">                      
              <input
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                type="number" name="place" id="place" placeholder="place" >
            </div>
            <div class="flex flex-row space-x-2">
              <label for="date_debut">date debut</label>                  
              <input
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                type="date" name="date_debut" id="date_debut" placeholder="date_debut" >
            </div>
            <div class="flex flex-row space-x-2"> 
              <label for="date_fin">date fin</label>                     
              <input
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                type="date" name="date_fin" id="date_fin" placeholder="date_fin" >
            </div>
            <div class="flex flex-row">
              <textarea
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
                name="description" id="description" placeholder="description" ></textarea>
            </div>
          `
				);
				getAnimateur();
				getActivite();
				getLieu();
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
				$(".modal-content .modal-title").text("Modifier une seminaire");
				$(".modal-content .modal-body").html(
					`
            <div class="flex flex-row space-x-2">                    
              <input
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              type="text" name="titre" id="titre" placeholder="titre" value="${
								row.titre
							}" >
            </div>
            <div class="flex flex-row space-x-2">                    
              <select
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              name="type" id="type" placeholder="type" value="${row.type}" >
                <option value="interne" ${
									row.type == "interne" ? "selected" : ""
								}>interne</option>
                <option value="externe"${
									row.type == "externe" ? "selected" : ""
								}>externe</option>
              </select>
            </div>
            <div class="flex flex-row space-x-2">
              <select
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              name="activite" id="activite" placeholder="activite" style="display:none" multiple value="${
								row.activite
							}"></select>
            </div>
            <div class="flex flex-row space-x-2">
              <select
              class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
              name="animateurs" id="animateurs" placeholder="animateurs" style="display:none" multiple value=""></select>
            </div>
            <div class="flex flex-row space-x-2">                      
              <select
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                name="lieu" id="lieu" placeholder="lieu" value="${row.lieu.id}">
              </select>
              <button onclick='getLieu()'>a</button>
              <a href="\\lieu" target="_blank">new</a>
            </div>
            <div class="flex flex-row space-x-2">                      
              <input
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                type="number" name="place" id="place" placeholder="place" value="${
									row.place
								}" >
            </div>
            <div class="flex flex-row space-x-2">
              <label for="date_debut">date debut</label>                  
              <input
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                type="date" name="date_debut" id="date_debut" placeholder="date_debut" value="${
									row.date_debut
								}" >
            </div>
            <div class="flex flex-row space-x-2"> 
              <label for="date_fin">date fin</label>                     
              <input
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                type="date" name="date_fin" id="date_fin" placeholder="date_fin" value="${
									row.date_fin
								}" >
            </div>
            <div class="flex flex-row">
              <textarea
                class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
                name="description" id="description" placeholder="description" >${
									row.description
								}</textarea>
            </div>
          `
				);
				getAnimateur(row.animateurs);
				getActivite(row.activite);
				getLieu(row.lieu);
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

const getAnimateur = (d) => {
	let xhr = new XMLHttpRequest();
	xhr.open("get", "\\animateur?json=true");
	xhr.responseType = "json";
	xhr.onload = () => {
		$("#animateurs").html(`${xhr.response.map((v) => {return `<option value="${v.id}">${v.nom.toUpperCase()} ${v.prenom.charAt(0).toUpperCase() + v.prenom.slice(1).toLowerCase()}</option>`;}).join("")}`);
        let t = $("#animateurs").tokenize2({
					placeholder: "Animateurs...",
					tokensAllowCustom: false,
					dropdownMaxItems: 3,
					searchHighlight: true,
				});
		if (d) d.forEach((e) => {
			t.trigger("tokenize:tokens:add", [e._id, e._nom.toUpperCase()+" "+e._prenom.toLowerCase(), true]);
		});
	};
	xhr.send();
};

const getActivite = (d) => {
	let xhr = new XMLHttpRequest();
	xhr.open("get", "\\user?json=true");
	xhr.responseType = "json";
	xhr.onload = () => {
		let activites = new Set(
			xhr.response.map((v) => {
				return v.activite;
			})
		);
		$("#activite").html(
			`
        ${Array.from(activites)
					.map((v) => {
						return `<option value="${v}">${v}</option>`;
					})
					.join("")}
      `
		);

		let t = $("#activite").tokenize2({
			placeholder: "Activités...",
			tokensAllowCustom: false,
			dropdownMaxItems: 3,
			searchHighlight: false,
		});
		if (d) {
			d.forEach((e) => {
				t.trigger("tokenize:tokens:add", [e, e, true]);
			});
			return;
		}
	};
	xhr.send();
};

const getLieu = () => {
	let xhr = new XMLHttpRequest();
	xhr.open("get", "\\lieu?json=true");
	xhr.responseType = "json";
	xhr.onload = () => {
		$("#lieu").html(
			`${xhr.response
				.map((v) => {
					return `<option value="${v.id}">${v.nom}</option>`;
				})
				.join("")}`
		);
	};
	xhr.send();
};
table = $("#example")
	.DataTable({
        initComplete: function () {
			$("#example_filter").hide();
			var cols = [this.api().columns(1), this.api().columns(5)];
			cols.forEach((col) => {
				let select = $('<select> <option value=""></option> </select>')
					.appendTo($(col.footer()).empty())
					.on("change", () => {
						var val = $.fn.dataTable.util.escapeRegex($(select).val());
						col.search(val ? "^" + val + "$" : "", true, false).draw();
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
			select = $('<select> <option value=""></option> </select>')
				.appendTo($(this.api().columns(4).footer()).empty())
				.on("change", () => {
					var val = $.fn.dataTable.util.escapeRegex($(select).val());
					this.api()
						.columns(4)
						.search(val ? "^" + val + "$" : "", true, false)
						.draw();
				});
			this.api()
				.columns(4)
				.data()
				.eq(0)
				.unique()
				.sort()
				.each((value) => {
					select.append(
						'<option value="' + value.nom + '">' + value.nom + "</option>"
					);
				});
		},
		processing: true,
		ajax: {
			url: "/seminaire?json=true",
			dataSrc: "",
		},
		columnDefs: [
			{
				targets: 0,
				data: "titre",
				render: function (data, type, row, meta) {
					return `
                <a class="hover:text-atgreen hover:underline" href="\\seminaire/${
									row.id
								}" target="_blank">${
						row.titre.charAt(0).toUpperCase() + row.titre.slice(1).toLowerCase()
					}</a>
            `;
				},
			},
			{
				targets: 1,
				data: "type",
				render: function (data, type, row, meta) {
					return `<span class="">${row.type}</span>`;
				},
			},
			{
				targets: 2,
				data: "activite",
				render: function (data, type, row, meta) {
					return `${row.activite
						.map((v) => {
							return `<span class="${v}">${v}</span> `;
						})
						.join("")}`;
				},
			},
			{
				targets: 3,
				data: "animateurs",
				render: function (data, type, row, meta) {
					return row.animateurs.map(animateur => {
						return `${animateur._nom.toUpperCase()} ${animateur._prenom.charAt(0).toUpperCase() + animateur._prenom.slice(1).toLowerCase()}`
					}).join(', ')
				},
			},
			{
				targets: 4,
				data: "lieu",
				render: function (data, type, row, meta) {
					return `${row.lieu._nom}`;
				},
			},
			{
				targets: 5,
				data: "place",
				render: function (data, type, row, meta) {
					return `${row.place}`;
				},
			},
			{
				targets: 6,
				data: "date_debut",
				render: function (data, type, row, meta) {
					let e = new Date(row.date_debut);
					return `${e.toLocaleDateString("fr-FR")}`;
				},
			},
			{
				targets: 7,
				data: "date_fin",
				render: function (data, type, row, meta) {
					let e = new Date(row.date_fin);
					return `${e.toLocaleDateString("fr-FR")}`;
				},
			},
			{
				targets: 8,
				data: "description",
				render: function (data, type, row, meta) {
					return `${row.description}`;
				},
			},
			{
				targets: 9,
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
