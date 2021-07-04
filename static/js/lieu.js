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
	xhr.open("delete", "\\lieu/" + f);
	xhr.onload = () => {
		table.ajax.reload(null, false);
		toggleModal();
	};
	xhr.send();
};
const modifier = (f) => {
	if (
		!(
			$(".modal-content .modal-body #nom").val()
		)
	)
		return console.log("all field required");

	let form = {
		nom: $(".modal-content .modal-body #nom").val()
	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "\\lieu/" + f);
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
			$(".modal-content .modal-body #nom").val()
		)
	)
		return alert("all field required!!");
	let form = {
		nom: $(".modal-content .modal-body #nom").val()
	};
	let xhr = new XMLHttpRequest();
	xhr.open("post", "\\lieu");
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
                ${row.nom.toUpperCase()} ${row.prenom}
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
				$(".modal-content .modal-title").text("creer un lieu");
				$(".modal-content .modal-body").html(`
                    <div class="flex flex-row space-x-2">                    
                    <input
                    class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                    type="text" name="nom" id="nom" placeholder="nom" >
                    </div>
                `);
				$(".modal-content .modal-footer").html(`
                    <button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">
                    Annuler
                    </button>
                    <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">
                    Supprimer
                    </button>
                `);
				$(".modal-content .action")
					.text("Ajouter")
					.on("click", (e) => {
						creer();
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "modifier":
				$(".modal-content .modal-title").text("Modifier un lieu");
				$(".modal-content .modal-body").html(`
                    <div class="flex flex-row space-x-2">                    
                    <input
                    class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
                    type="text" name="nom" id="nom" placeholder="nom" value='${row.nom}' >
                `);

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
						console.log(row.id);
						modifier(row.id);
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
		}
	}
});

table = $("#example")
	.DataTable({
		// initComplete: function () {
		// 	$("#example_filter").hide();
		// 	var cols = [this.api().columns(1), this.api().columns(5)];
		// 	cols.forEach((col) => {
		// 		let select = $('<select> <option value=""></option> </select>')
		// 			.appendTo($(col.footer()).empty())
		// 			.on("change", () => {
		// 				var val = $.fn.dataTable.util.escapeRegex($(select).val());
		// 				col.search(val ? "^" + val + "$" : "", true, false).draw();
		// 			});
		// 		col
		// 			.data()
		// 			.eq(0)
		// 			.unique()
		// 			.sort()
		// 			.each((value) => {
		// 				select.append(
		// 					'<option value="' + value + '">' + value + "</option>"
		// 				);
		// 			});
		// 	});
		// 	let select = $('<select> <option value=""></option> </select>')
		// 		.appendTo($(this.api().columns(3).footer()).empty())
		// 		.on("change", () => {
		// 			var val = $.fn.dataTable.util.escapeRegex($(select).val());
		// 			this.api()
		// 				.columns(3)
		// 				.search(val ? "^" + val + "$" : "", true, false)
		// 				.draw();
		// 		});
		// 	this.api()
		// 		.columns(3)
		// 		.data()
		// 		.eq(0)
		// 		.unique()
		// 		.sort()
		// 		.each((value) => {
		// 			select.append(
		// 				`<option value="${value.nom.toUpperCase()} ${
		// 					value.prenom.charAt(0).toUpperCase() +
		// 					value.prenom.slice(1).toLowerCase()
		// 				}">${value.nom.toUpperCase()} ${
		// 					value.prenom.charAt(0).toUpperCase() +
		// 					value.prenom.slice(1).toLowerCase()
		// 				}</option>`
		// 			);
		// 		});
		// 	select = $('<select> <option value=""></option> </select>')
		// 		.appendTo($(this.api().columns(4).footer()).empty())
		// 		.on("change", () => {
		// 			var val = $.fn.dataTable.util.escapeRegex($(select).val());
		// 			this.api()
		// 				.columns(4)
		// 				.search(val ? "^" + val + "$" : "", true, false)
		// 				.draw();
		// 		});
		// 	this.api()
		// 		.columns(4)
		// 		.data()
		// 		.eq(0)
		// 		.unique()
		// 		.sort()
		// 		.each((value) => {
		// 			select.append(
		// 				'<option value="' + value.nom + '">' + value.nom + "</option>"
		// 			);
		// 		});
		// },
		processing: true,
		ajax: {
			url: "/lieu?json=true",
			dataSrc: "",
		},
		columnDefs: [
			{
				targets: 0,
				data: "nom",
				render: function (data, type, row, meta) {
					return `${row.nom}`;
				},
			},
			{
				targets: 1,
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
