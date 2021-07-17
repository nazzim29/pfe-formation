const search = $("#search");
search.on("keyup", (r) => {
	let query = search.val();
	console.log(query);
	table.search(query, false, false).draw();
});

var table = $("#example")
	.DataTable({
		initComplete: function() {
			let col = this.api().columns(7)
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
					select.append('<option value="' + value + '">' + value + "</option>");
				});
		},
		processing: true,
		ajax: {
			url: "/cours?json=true",
			dataSrc: "",
		},
		columnDefs: [
			{
				targets: 0,
				data: "titre",
				render: (data, type, row, meta) => {
					return `<a href="\\cours/${row.id}">${row.titre}</a>`;
				},
			},
			{
				targets: 1,
				data: "createur",
				render: (data, type, row, meta) => {
					return `<img class="avatar-sm" src="${row.createur._avatar}">
                    <div class="flex flex-col">
                        <a href="\\user/${row.createur._id}" target="_blank">${
						row.createur.nom.toUpperCase() + " " + row.createur.prenom
					}</a>
                        <span>${row.createur._email}</span>
                        
                    </div>`;
				},
			},
			{
				targets: 2,
				data: "date_creation",
				render: (data, type, row, meta) => {
					return moment(row.date_creation).fromNow();
				},
			},
			{
				targets: 3,
				data: "date_modification",
				render: (data, type, row, meta) => {
					return moment(row.date_modification).fromNow();
				},
			},
			{
				targets: 4,
				data: "like",
				render: (data, type, row, meta) => {
					return row.like?.length || 0;
				},
			},
			{
				targets: 5,
				data: "views",
				render: (data, type, row, meta) => {
					return row.views;
				},
			},
			{
				targets: 6,
				data: "comments",
				render: (data, type, row, meta) => {
					return row.comments?.length || 0;
				},
			},
			{
				targets: 7,
				data: "valider_df",
				render: (data, type, row, meta) => {
					if (row.valider_df == "en attente") {
						return `<div class="flex flex-row justify-center items-center">
							<button class="button" ><i data-toggle="valider" data-target="${row.id}" class="material-icons text-green-600">check</i></button>
							<button class="button" ><i data-toggle="refuser" data-target="${row.id}" class="material-icons text-red-500">clear</i></button>
						</div>`;
					} else {
						return `${row.valider_df}`;
					}
				},
			},
			{
				targets: 8,
				data: "description",
				render: (data, type, row, meta) => {
					return row.description;
				},
			},
			{
				targets: 9,
				data: null,
				render: (data, type, row, meta) => {
					if (row.isowner) {
						return `<button class="button focus:outline-none" > <svg data-toggle='edit' data-target='${row.id}' class="fill-current text-atgreen hover:text-atgreen-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293c-.128.128-.219.289-.263.464L3 21l5.242-1.03C8.418 19.926 8.579 19.835 8.707 19.707zM21 7.414c.781-.781.781-2.047 0-2.828L19.414 3c-.781-.781-2.047-.781-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg> </button>
					  <button class="button focus:outline-none"  > <svg data-toggle='supprimer' data-target='${row.id}' class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
					}
					return `<button class="button focus:outline-none"  > <svg data-toggle='supprimer' data-target='${row.id}' class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
				},
			},
		],
		bfilter: true,
		api: true,
		responsive: true,
		autoWidth: false,
		dom: "<'h-full w-full flex flex-col'<'overflow-y-scroll flex-1 h-full't>r <'flex flex-row flex-wrap w-full space-y-2 content-center justify-center sm:justify-evenly bottom-0'il<'self-center'p>>>",
	})
	.columns.adjust()
	.responsive.recalc();
const supprimer = (id) => {
	let xhr = new XMLHttpRequest()
	xhr.open('delete', '\\cours/' + id)
	xhr.send()
}
const validation = (p,id) => {
	let xhr = new XMLHttpRequest()
	console.log(p)
	xhr.open('post', '/cours/' + id + '/validation')
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => table.ajax.reload()
	xhr.send(JSON.stringify({
		validation : p
	}))
}
$(document).on("click", (e) => {
	let data = $(e.target).data();
	if (data.toggle == "edit") return window.location.href = '\\cours/edit/'+data.target
	if (data.toggle == 'supprimer') return supprimer(data.target)
	if (data.toggle == "valider") return validation(true, data.target)
	if (data.toggle == "refuser") return validation(false, data.target)
	
});

