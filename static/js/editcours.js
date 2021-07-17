const keywordsEl = $('#keywords')
const courId = document.head.querySelector('[name=courid]').content
console.log(courId)
const closemodal = document.querySelectorAll(".modal-close");
for (var i = 0; i < closemodal.length; i++) {
	closemodal[i].addEventListener("click", toggleModal);
}
const deleteFile = (event, i) => {
    event.preventDefault()
    let xhr = new XMLHttpRequest()
    xhr.open('delete', `\\cours/${courId}/files/${i}`)
    xhr.onload = () => window.location.reload()
    xhr.send()
}

$('#chk_video').on('change', (e) => {
    if ($(e.target).is(':checked')) {
        $('#video').removeAttr('disabled')
    } else {
        $('#video').attr('disabled',true)
    }
})

var tokens =  keywordsEl.tokenize2({
	placeholder: "Mots-clés",
	tokensMaxitems: 10,
	tokensAllowCustom: true,
	dorpdownMaxLength: 5,
	displayNoResultsMessage: true,
	noResultsMessageText: `Pas de mots-clés correspondant a "%s"`,
	allowEmptyValues: false,
});

const addfilefields = () => {
    $("#filefields").append(`
        <div>
            <input type="file" name="docs[]" id='file'>
            <input class="border border-atgreen-light focus:border-atblue-light rounded-md mt-1 w-3/4 focus:outline-none outline-none px-1 py-0.5" type="text" name="filetitle[]" placeholder="Titre de la piece jointe...">
        </div>
    `);
}

keyword.forEach(key => {
    tokens.trigger('tokenize:tokens:add', [key, key, true]);
});
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
    console.log(data)
    if (data.toggle == "modal") {
        e.preventDefault()
        if (data.target == "addfile") {
            $(".modal-content .modal-title").text(`Joindre des fichiers`)
            $(".modal-content .modal-body").html(`
                <button class="inline-flex self-start" onclick="addfilefields()"><span class="material-icons">add</span></button>
                <form id='filefields' enctype="multipart/form-data" action="/cours/${courId}/file" method="POST" class="space-y-2">
                    <div>
                        <input type="file" name="docs[]" id='file'>
                        <input
                            class="border border-atgreen-light focus:border-atblue-light rounded-md mt-1 w-3/4 focus:outline-none outline-none px-1 py-0.5"
                            type="text" name="filetitle[]" placeholder="Titre de la piece jointe...">
                    </div>
                </form>
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
				.text("Uploader")
                .on("click", (e) => {
                    $('#filefields').submit()
                });
            $(".modal-content .cancel").click(toggleModal);
            toggleModal()

        }
    }
    if(data.toggle == 'deletefile') return deleteFile(data.target)
})

const anuller = (e) => {
    e.preventDefault()
    window.location.href = '\\cours'
}
const modifier = (e) => {
    e.preventDefault()
    $('#form').submit()
}
const deletevideo = (event) => {
    event.preventDefault();
    let xhr = new XMLHttpRequest()
    xhr.open('delete', `/cours/${courId}/video`)
    xhr.onload = () => window.location.reload()
    xhr.send()
}