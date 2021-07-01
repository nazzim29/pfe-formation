const calendrierEl = $("#calendrier");
const monthEl = $('#month')
const yearEl = $('#year')
const prevBtn = $('#prev')
const nextBtn = $('#next')
var CURRENT_DATE = new Date();
var events = [];
const MONTH_NAMES = [
	"Janvier",
	"Fevrier",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Aout",
	"Septembre",
	"Octobre",
	"Novembre",
	"Decembre",
];
const DAYS = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
];
var blankdays = 0;
var daysInMonth = NaN;
const isToday = (date) => {
	const today = new Date();
	const d = new Date(CURRENT_DATE.getYear(), CURRENT_DATE.getMonth(), date);
	return today.toDateString() === d.toDateString() ? true : false;
};
const getBlankDays = () => {
	blankdays = new Date(
		CURRENT_DATE.getFullYear(),
		CURRENT_DATE.getMonth()
	).getDay();
};
const getNoOfDays = () => {
	daysInMonth = new Date(
		CURRENT_DATE.getFullYear(),
		CURRENT_DATE.getMonth() + 1,
		0
	).getDate();
};

const drawCalendrier = () => {
	let html = "";
	for (i = 1; i <= blankdays; i++) {
		html += `<div style="width: 14.28%; height: 120px" class="text-center border-r border-b px-4 pt-2"></div>`;
	}
	for (i = 1; i <= daysInMonth; i++) {
		html += `
			<div style="width: 14.28%; height: 120px" class="px-4 pt-2 border-r border-b relative">
				<div onclick="showEventModal(date)" x-text="date"
					class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100
					${
						isToday(i)
							? "bg-atblue text-white"
							: "text-gray-700 hover:bg-blue-200"
					}">${i}
				</div>
				<div style="height: 80px;" class="overflow-y-auto mt-1">
					${events
						.filter(
							(e) => {
								return (
									new Date(e.event_date).toDateString() ===
									new Date(
										CURRENT_DATE.getFullYear(),
										CURRENT_DATE.getMonth(),
										i
									).toDateString()
								);
							}
						)
						.map((a) => {
							return `<a href="${a.link}">
							<div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border font-semibold ${
								a.event_theme === "blue"
									? "border-atblue-dark text-atblue bg-atblue-light"
									: a.event_theme === "red"
									? "border-red-200 text-red-800 bg-red-100"
									: a.event_theme === "yellow"
									? "border-yellow-200 text-yellow-800 bg-yellow-100"
									: a.event_theme === "green"
									? "border-green-200 text-green-800 bg-green-100"
									: a.event_theme === "purple"
									? "border-purple-200 text-purple-800 bg-purple-100"
									: ""
							}">
								<p x-text="a.event_title" class="text-sm truncate leading-tight">${
									a.event_title
								}</p>
							</div>
							</a>
						`;
						})
						.join("")}
				</div>
			</div>
		`;
	}
	calendrierEl.html(html);
	monthEl.text(MONTH_NAMES[CURRENT_DATE.getMonth()])
	yearEl.text(CURRENT_DATE.getFullYear())
};
const nextMonth = () => {
	CURRENT_DATE = new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() + 1)
	getBlankDays();
	getNoOfDays();
	drawCalendrier();
}
const prevMonth = () => {
	CURRENT_DATE = new Date(
		CURRENT_DATE.getFullYear(),
		CURRENT_DATE.getMonth() - 1
	);
	getBlankDays();
	getNoOfDays();
	drawCalendrier();
};
let xhr = new XMLHttpRequest()
xhr.open('get', '\\calendrier?json=true')
xhr.responseType = 'json'
xhr.onload = () => {
	console.log(xhr.response)
	events = xhr.response
	getBlankDays();
	getNoOfDays();
	drawCalendrier();
}
xhr.send()


