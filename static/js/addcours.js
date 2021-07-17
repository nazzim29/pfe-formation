const descEl = $("#description");
const signatureEl = $("#signature");
var docsEl = $('input[name="docs[]"]');
const titreEl = $('input[name="filetitle[]"]');
const keywordsEl = $("#keywords");
const video_chkEl = $("#chk_video");
const videoEl = $("#video");

const addfilefield = () => {
	const el = $(
		`<li class="flex flex-col"><input type="file" name="docs[]" id='file'><input class="border border-atgreen-light focus:border-atblue-light rounded-md mt-1 w-3/4 focus:outline-none outline-none px-1 py-0.5" type="text" name="filetitle[]" placeholder="Titre de la piece jointe..."></li>`
	);
	$("#files").append(el);
	docsEl = $('input[name="docs[]"]');
};

video_chkEl.on("change", (e) => {
	if ($(e.target).is(":checked")) {
		videoEl.removeAttr("disabled");
	} else {
		videoEl.attr("disabled", true);
	}
});

keywordsEl.tokenize2({
	placeholder: "Mots-clés",
	tokensMaxitems: 10,
	tokensAllowCustom: true,
	dorpdownMaxLength: 5,
	displayNoResultsMessage: true,
	noResultsMessageText: `Pas de mots-clés correspondant a "%s"`,
	allowEmptyValues: false,
});

const creer = () => {
    $('#form').submit()
    // let files = new FormData()
    // docsEl.each((i, el) => {
    //     console.log(el)
	// 	files.append('file'+i,el.files[0]);
    // });
    // let titre = titreEl.val()
    // let description = descEl.val()
    // let signature = signatureEl.val()
    // let keywords = keywordsEl.val()
    // let video = null
    // if (video_chkEl.is(':checked')) video = videoEl.get(0).files[0]
    // let form = new FormData()
    // form.append('files', files)
    // form.append('titre', titre)
    // form.append('signature', signature)
    // form.append('description', description)
    // form.append('keywords', keywords)
    // form.append('video', video)
    // form.append("video_chk", video_chkEl.is(":checked"));
    // let xhr = new XMLHttpRequest()
    // xhr.open('post', '\\cours')
    // xhr.onload = () => {
    //     window.location.href = '/cours'
    // }
    // xhr.send(form);
};

const anuller = () => {
    window.location.href='\\cours'
}
