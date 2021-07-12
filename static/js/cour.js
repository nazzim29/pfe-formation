const search = $("#search");
search.on("keyup", (r) => {
	let query = search.val();
	console.log(query);
	table.search(query, false, false).draw();
});



var table = $("#example").DataTable({
	initComplete: () => {},
	processing: true,
	ajax: {
		url: "/cours?json=true",
		dataSrc: "",
	},
	columnDefs: [
		{
			targets: 0,
			data: "titre",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 1,
			data: "auteur",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 2,
			data: "date_publication",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 3,
			data: "date_modification",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 4,
			data: "like",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 5,
			data: "visite",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 6,
			data: "commentaire",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 6,
            data: "description",
			render: (data, type, row, meta) => {},
		},
		{
			targets: 6,
			data: null,
			render: (data, type, row, meta) => {},
		},
	],
	bfilter: true,
	api: true,
	responsive: true,
	autoWidth: false,
	dom: "<'h-full w-full flex flex-col'<'overflow-y-scroll flex-1 h-full't>r <'flex flex-row flex-wrap w-full space-y-2 content-center justify-center sm:justify-evenly bottom-0'il<'self-center'p>>>",
}).columns.adjust().responsive.recalc()