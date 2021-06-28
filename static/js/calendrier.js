const blankdayEl = $("#blankdays");
const monthEl = $('#month')
let month = "";
let year = "";
let no_of_days = [];
let blankdays = [];
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
const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

let events = [];
let event_title = "";
let event_date = "";
let event_theme = "blue";
const initDate = () => {
	let today = new Date();
	month = today.getMonth();
	year = today.getFullYear();
	datepickerValue = new Date(
		year,
		month,
		today.getDate()
	).toDateString();
};
const getNoOfDays = () => {
	let daysInMonth = new Date(year, month + 1, 0).getDate();

	// find where to start calendar day of week
	let dayOfWeek = new Date(year, month).getDay();
	let blankdaysArray = [];
	for (var i = 1; i <= dayOfWeek; i++) {
		blankdaysArray.push(i);
	}
	let daysArray = [];
	for (var i = 1; i <= daysInMonth; i++) {
		daysArray.push(i);
	}
	blankdays = blankdaysArray;
	no_of_days = daysArray;
};
