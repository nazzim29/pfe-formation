const search = $("#search");
const cardContainer = $("#card-container");
const card = (f) => {
	return `<div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
            <div class="p-4">
                <h2 class="mt-2 mb-2  font-bold">${f.titre}</h2>
                ${f.activite
									.map((e) => {
										return `<span
                    class="inline-block mx-1 px-2 py-1 leading-none bg-yellow-400 text-yellow-600 rounded-full font-semibold uppercase tracking-wide text-xs">${e}</span>`;
									})
									.join("")}
                <p class="mt-1.5 text-sm">${f.description}</p>
                <div class="mt-3 flex items-center justify-start flex-row">

                    <div class="flex flex-row items-center space-x-2">
                        <span class="material-icons ">people_alt </span>
                        <span class="">${f.place}</span>
                    </div>
                </div>
            </div>
            <div class="p-4 border-t border-b text-xs text-gray-700">
                <span class="flex items-center mb-1">
                    <i class="material-icons mr-2 text-gray-900"><span class="material-icons-outlined">
                            visibility
                        </span></i> ${f.views}
                </span>
                <span class="flex items-center mb-1">
                    <i class="material-icons text-gray-900 mr-2">home</i> ${
											f.lieu.nom
										}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.lieu.note >= 1 ? "text-yellow-500" : "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.lieu.note >= 2 ? "text-yellow-500" : "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.lieu.note >= 3 ? "text-yellow-500" : "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.lieu.note >= 4 ? "text-yellow-500" : "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 fill-current ${
											f.lieu.note >= 5 ? "text-yellow-500" : "text-gray-400"
										}">
                    <path
                        d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                    </path>
                </svg>
                </span>
                <span class="flex items-center">
                    <i class="material-icons text-gray-900 mr-2">school</i> ${
											f.formateur.nom
										}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.formateur.note >= 1
														? "text-yellow-500"
														: "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.formateur.note >= 2
														? "text-yellow-500"
														: "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.formateur.note >= 3
														? "text-yellow-500"
														: "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 fill-current ${
													f.formateur.note >= 4
														? "text-yellow-500"
														: "text-gray-400"
												}">
                        <path
                            d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                        </path>
                    </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 fill-current ${
											f.formateur.note >= 5
												? "text-yellow-500"
												: "text-gray-400"
										}">
                    <path
                        d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
                    </path>
                </svg>
                </span>
            </div>
            <div class="flex items-center justify-center">
                <button  ${f.postuled?"disabled":`data-target='postuler' data-toggle='${f.id}'`} class="btn-postuler w-full h-full text-bold hover:bg-atblue-light focus:bg-atblue outline-none focus:outline-none px-2 py-1">${f.postuled?'Postulé':'Postuler'}</button>
            </div>
        </div>
    </div>`;
};

const getFormation = () => {
	let q = search.val();
	console.log("haja");
	let xhr = new XMLHttpRequest();
	xhr.open("get", "\\formation?json=true");
	xhr.responseType = "json";
	xhr.onload = () => {
		console.log(xhr.response);
		let formations = xhr.response;
		if (q) {
			let patt = new RegExp(q);
			formations.filter((o) => {
				patt.test(o.titre) ||
					patt.test(o.description) ||
					patt.test(o.lieu.nom) ||
					patt.test(o.formateur.nom) ||
					patt.test(o.formateur.prenom) ||
					patt.test(o.activite.join(","));
			});
		}
		afficher(formations);
	};
	xhr.send();
};

const afficher = (e) => {
	if (!e || e.length == 0)
		return cardContainer.html(`
    <div class="bg-white rounded-lg p-1 shadow-xl flex flex-col">
      <p class="text-sm">Pas de formation pour l'instant veuillez visiter cette page ultérieurement</p>
      <div class="flex flex-row justify-end p-1">
        <button><i class="material-icons text-gray-400">autorenew</i></button>
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

getFormation();

const postuler = (id) => {
    if(!id) return 
	let xhr = new XMLHttpRequest();
  xhr.open("post", "\\postulation");
  xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        console.log(xhr.response)
        getFormation()
    };
	xhr.send(
		JSON.stringify({
			id_formation: id,
		})
	);
};

$(document).on("click", (e) => {
	let c = $(e.target).data();
	if ((c.target = "postuler")) {
		postuler(c.toggle);
	}
});
