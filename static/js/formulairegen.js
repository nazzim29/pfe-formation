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
	$("#form").submit();
};
const supprimerFichier = (id) => {
	console.log("file");
	let xhr = new XMLHttpRequest();
	xhr.open("delete", window.location.href + "/files/" + id);
	xhr.onload = () => {
		console.log(xhr.response);
		window.location.reload();
	};
	xhr.send();
};
const postuler = (id) => {
	if (!id) return;
	let xhr = new XMLHttpRequest();
	xhr.open("post", "\\postulation");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
		window.location.reload();
	};
	xhr.send(
		JSON.stringify({
			id_formation: id,
		})
	);
};
function toggleModal() {
	const body = document.querySelector("body");
	const modal = document.querySelector(".modal");
	modal.classList.toggle("opacity-0");
	modal.classList.toggle("pointer-events-none");
	body.classList.toggle("modal-active");
}

const addQuestion = () => {
	let question = $("#q").val();
	if (question) {
		$("#q").val("");
		let div = $(`<div class="text-bold">${question}</div>`);
		div.on("click", () => {
			$("#q").val(div.html())
			div.remove();
		});
		$("#questions").append(div);
	}
};
const envoyerQuestion = () => {
	let c = [];
	$("#questions")
		.children("div")
		.each((i, element) => {
			c.push($(element).html());
		});
	console.log(c);
	let xhr = new XMLHttpRequest();
	xhr.open("post", window.location.href + "/formulaire");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
		window.location.reload();
	};
	xhr.send(JSON.stringify({ questions: c }));
};
const submitFormulaire = () => {
	let c = []
	$(".modal-content .modal-body>div").children('input').each((i, e) => {
		c.push($(e).val())
	})
	let xhr = new XMLHttpRequest()
	xhr.open("post", "/formulaire/" + window.location.href.split("/")[4]);
	xhr.onload = () => {
		toggleModal()
	}
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify({reponses : c}))

}
$(document).on("click", (e) => {
	let data = $(e.target).data();
	console.log(data);
	if (data.target == "postuler") {
		postuler(data.toggle);
	}
	if (data.toggle == "modal") {
		switch (data.target) {
			case "generateur":
				$(".modal-content .modal-title").text("Generateur de formulaire");
				$(".modal-content .modal-body").html(`
					<div class="flex flex-col space-y-1 ">
                        <p>introduisez votre question:</p>
                        <textarea id="q" class="p-1 border border-atblue-dark focus:border-atgreen-dark bg-blue-300 focus:bg-green-300 text-atblue focus:text-atgreen resize-none outline-none focus:outline-none"></textarea>
						<button onclick="addQuestion()" class="focus:outline-none align-middle self-end w-8 ">
							<i class="material-icons" >add</i>
						</button>
					</div>
					<div id='questions'>

					</div>
				`);
				$(".modal-content .modal-footer").html(`
					<button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
					<button class="px-4  p-1.5 rounded-lg text-white bg-atblue hover:bg-atblue-dark action">Valider</button>
				`);
				$(".modal-content .action")
					.text("Valider")
					.on("click", (e) => {
						envoyerQuestion();
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "upload":
				$(".modal-content .modal-title").text(" Uploader des fichier");
				$(".modal-content .modal-body").html(`
					<div class="flex flex-col">
						<form  id="form" action="${window.location.href}/files" method="POST" enctype="multipart/form-data">
							<input type="file" name="docs[]">
							<input class="border border-atblue-dark m-1" type="text" name='titre[]'>
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
				$('input[name="docs[]"]').on("change", () => {
					const el = $('<input type="file" name="docs[]">');
					el.on("change", () => {
						$("#form").append(el);
						$("#form").append("<input type=\"text\" name='titre[]'>");
					});
					$("#form").append(el);
					$("#form").append("<input type=\"text\" name='titre[]'>");
				});
				$(".modal-content .action")
					.text("Ajouter")
					.on("click", (e) => {
						envoyer();
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
				break;
			case "reponse":
				$(".modal-content .modal-title").text("Repondre au formulaire");
				$(".modal-content .modal-body").html(`
					${FORMULAIRE.map((e) => {
						return `
							<div class="flex flex-col my-2">
								<p class="mb-2"> ${e} </p>
								<input type="text" name="rep[]" class="border border-atblue focus:outline-none outline-none rounded-xl px-2">
							</div>
						`;
					})}
				`);
				$(".modal-content .modal-footer").html(`
			        <button class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">
			          Annuler
			        </button>
			        <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">
			          Ajouter
			        </button>
			    `);
				$(".modal-content .action")
					.text("Soumettre")
					.on("click", (e) => {
						submitFormulaire();
					});
				$(".modal-content .cancel").click(toggleModal);
				toggleModal();
			break;
		}
	}
	if (data.toggle == "delete_file") {
		supprimerFichier(data.target);
	}
});
