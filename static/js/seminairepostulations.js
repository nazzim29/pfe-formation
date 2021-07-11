const search = $("#search");
const cardContainer = $("#card-container");
const card = (f) => {
	return `<div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
                    <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div class="p-4">
                            <a href="formation/${
															f.id.split("_")[1]
														}"><h2 class="mt-2 mb-2  font-bold">${
		f.seminaire.titre
	}</h2></a>
                           <p class="text-sm">${
															f.valider_df == "accepté"
																? "la DF a acceptée votre condidature"
																: f.valider_df == "refusé"
																? "la DF a refusée votre condidature"
																: "la DF n'as pas emit d'avis sur votre condidature"
														},${
		f.valider_superieur == "accepté"
			? "votre superieur a accepté votre condidature"
			: f.valider_superieur == "refusé"
			? "votre superieur a refusée votre condidature"
			: "votre superieur n'as pas emit d'avis sur votre condidature"
	}</p>
                            <div class="mt-3 flex items-center justify-start flex-row">

                                <div class="flex flex-row items-center space-x-2">
                                    <span class="material-icons ">people_alt </span>
                                    <span class="">${f.seminaire.participant}/${
		f.seminaire.place
	}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-center">
                            <button data-target='${f.id}' data-toggle='retirer'
                            class="w-full h-full text-bold hover:bg-atblue-light focus:bg-atblue outline-none focus:outline-none px-2 py-1">Retirer</button>
                        </div>
                    </div>
                </div>`;
};

const getPostulation = () => {
	let xhr = new XMLHttpRequest();
	xhr.open("get", "\\seminaire/postulation?json=true");
	xhr.responseType = "json";
	xhr.onload = () => {
		console.log(xhr.response);
		afficher(xhr.response);
	};
	xhr.send();
};

const afficher = (e) => {
	if (!e || e.length == 0)
		return cardContainer.html(`
    <div class="bg-white rounded-lg shadow-xl flex flex-col p-5">
      <p class="text-sm">vous n'avez postuler a aucun seminaire </p>
      <div class="flex flex-row justify-end p-1">
      </div>
    </div>
  `);
	cardContainer.html(`
        ${e
					.map((a) => {
						return card(a);
					})
					.join("")}
    `);
};

getPostulation();

const postuler = (id) => {
	let xhr = new XMLHttpRequest();
	xhr.open("delete", "\\seminaire/postulation/" + id);
	xhr.onload = () => {
		console.log(xhr.response);
		getPostulation();
	};
	xhr.send();
};

$(document).on("click", (e) => {
	let c = $(e.target).data();
	if ((c.toggle = "retirer")) {
		postuler(c.target);
	}
});
