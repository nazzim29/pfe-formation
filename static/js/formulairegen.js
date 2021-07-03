const overlay = document.querySelector(".modal-overlay");
const openmodal = document.querySelectorAll(".modal-open");
const closemodal = document.querySelectorAll(".modal-close");
overlay.addEventListener("click", toggleModal);

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
const envoyer = () => {
	$('#form').submit()
}
const supprimerFichier = (id) => {
	console.log('file')
	let xhr = new XMLHttpRequest()
	xhr.open('delete', window.location.href +"/files/"+ id)
	xhr.onload = () => {
		console.log(xhr.response)
		window.location.reload();
	}
	xhr.send()
}

function toggleModal() {
	const body = document.querySelector("body");
	const modal = document.querySelector(".modal");
	modal.classList.toggle("opacity-0");
	modal.classList.toggle("pointer-events-none");
	body.classList.toggle("modal-active");
}


$(document).on("click", (e) => {
	let data = $(e.target).data();
	console.log(data)
	if (data.toggle == "modal") {
		switch (data.target) {
			case "generateur":
				$(".modal-content .modal-title").text("Generateur de formulaire");
				// 			$(".modal-content .modal-body").html();
				// 			$(".modal-content .modal-footer").html(`<button
				//     class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
				// <button class="px-4  p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-700 action">Supprimer</button>`);
				// 			$(".modal-content .action")
				// 				.text("Supprimer")
				// 				.on("click", (e) => {
				// 					supprimer(row.id);
				// 				});
				// 			$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "upload":
				$(".modal-content .modal-title").text(" Uploader des fichier");
				$(".modal-content .modal-body").html(`
					<div class="flex flex-col">
						<form  id="form" action="${window.location.href}/files" method="POST" enctype="multipart/form-data">
							<input type="file" name="docs[]">
							<input type="text" name='titre[]'>
						</form>
					</div>
				`);
				$(".modal-content .modal-footer").html(`
			        <button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">
			          Annuler
			        </button>
			        <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">
			          Ajouter
			        </button>
			    `);
				$('input[name="docs[]"]').on('change', () => {
					const el = $('<input type="file" name="docs[]">');
					el.on('change', () => {
						$('#form').append(el)
						$('#form').append('<input type="text" name=\'titre[]\'>')
					})
					$("#form").append(el);
					$("#form").append("<input type=\"text\" name='titre[]'>");
				})
				$(".modal-content .action")
					.text("Ajouter")
					.on("click", (e) => {
						envoyer();
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			// 		case "modifier":
			// 			$(".modal-content .modal-title").text("Modifier un partenaire");
			// 			$(".modal-content .modal-body").html(
			// 				`
			//         <div class="flex flex-row space-x-2">
			//           <input
			//           class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//           type="text" name="titre" id="titre" placeholder="titre" value="${
			// 							row.titre
			// 						}" >
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <select
			//           class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//           name="type" id="type" placeholder="type" value="${row.type}" >
			//             <option value="interne" ${
			// 								row.type == "interne" ? "selected" : ""
			// 							}>interne</option>
			//             <option value="externe"${
			// 								row.type == "externe" ? "selected" : ""
			// 							}>externe</option>
			//           </select>
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <select
			//           class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//           name="activite" id="activite" placeholder="activite" style="display:none" multiple value="${
			// 							row.activite
			// 						}"></select>
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <select
			//             class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//             name="formateur" id="formateur" placeholder="formateur" value="">
			//           </select>
			//           <button onclick='getFormateur()'>a</button>
			//           <a href="\\formateur" target="_blank">new</a>
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <select
			//             class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//             name="lieu" id="lieu" placeholder="lieu" value="${row.lieu.id}">
			//           </select>
			//           <button onclick='getLieu()'>a</button>
			//           <a href="\\lieu" target="_blank">new</a>
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <input
			//             class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//             type="number" name="place" id="place" placeholder="place" value="${
			// 								row.place
			// 							}" >
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <label for="date_debut">date debut</label>
			//           <input
			//             class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//             type="date" name="date_debut" id="date_debut" placeholder="date_debut" value="${
			// 								row.date_debut
			// 							}" >
			//         </div>
			//         <div class="flex flex-row space-x-2">
			//           <label for="date_fin">date fin</label>
			//           <input
			//             class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
			//             type="date" name="date_fin" id="date_fin" placeholder="date_fin" value="${
			// 								row.date_fin
			// 							}" >
			//         </div>
			//         <div class="flex flex-row">
			//           <textarea
			//             class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
			//             name="description" id="description" placeholder="description" >${
			// 								row.description
			// 							}</textarea>
			//         </div>
			//       `
			// 			);
			// 			getFormateur(row.formateur);
			// 			getActivite(row.activite);
			// 			getLieu(row.lieu);
			// 			$(".modal-content .modal-footer").html(
			// 				`
			//         <button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">
			//           Annuler
			//         </button>
			//         <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">
			//           Supprimer
			//         </button>
			//       `
			// 			);
			// 			$(".modal-content .action")
			// 				.text("Modifier")
			// 				.on("click", (e) => {
			// 					console.log(row.id);
			// 					modifier(row.id);
			// 				});
			// 			$(".modal-content .cancel").click(toggleModal);
			// 			toggleModal();
			// 			break;
		}
	}
	if (data.toggle == 'delete_file') {
		supprimerFichier(data.target)
	}
});
