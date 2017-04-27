(function() {

var ORIGIN_Y = 11;

var YEAR_X_MARGIN = 0;
var YEAR_Y_OFFSET = 14.75;

var WEEK_X_MARGIN = YEAR_X_MARGIN + 30;
var WEEK_X_OFFSET = 10;

var TODAY = moment();
var TODAY_YEAR = TODAY.year();
var TODAY_WEEK = TODAY.week();

function generateWeeks(snap, yOffset, year, weekStart, weekEnd) {
	var xOffset = WEEK_X_MARGIN + weekStart * WEEK_X_OFFSET;

	for (var week = weekStart; week <= weekEnd; week++) {
		var outputWeek = snap.rect(xOffset, yOffset, 7, 7);
		xOffset += WEEK_X_OFFSET;

		if (year == TODAY_YEAR) {
			if (week == TODAY_WEEK) { outputWeek.addClass('week-box-present'); }
			else 
			if (week >= TODAY_WEEK) { outputWeek.addClass('week-box-future'); }
		} else 
		if (year > TODAY.year()) {
			outputWeek.addClass('week-box-future');
		}
	}
}

function generateYear(snap, yOffset, year, weekStart, weekEnd) {
	var outputYear = snap.text(YEAR_X_MARGIN, yOffset, year);
	outputYear.addClass('year-text');

	var weekYOffset = yOffset - 7;
	generateWeeks(snap, weekYOffset, year, weekStart, weekEnd);
}

function generateYourLifeInWeeks(snap, birthdate) {
	var birthweek = birthdate.week();

	var deathdate  = moment(birthdate).add(71, 'years').add(26, 'weeks');
	var deathweek = deathdate.week();

	console.log(birthdate.format())
	console.log(birthweek);
	console.log(deathdate.format());
	console.log(deathweek);

	var yOffset = ORIGIN_Y;

	// First year you were born.
	generateYear(snap, yOffset, birthdate.year(), birthweek, 52);

	// Full years.
	for (var year = (birthdate.year() + 1); year < deathdate.year(); year++) {
		yOffset += YEAR_Y_OFFSET;

		generateYear(snap, yOffset, year, 1, 52);
	}

	// Last year you will live according to averages.
	yOffset += YEAR_Y_OFFSET;
	generateYear(snap, yOffset, year, 1, deathweek);
}

var update = function() {
	var enteredDate = document.getElementById('birthdateText').value;
	var birthdate = moment(enteredDate);

	if (birthdate.isValid()) {
		s.clear();
		generateYourLifeInWeeks(s, birthdate);
	}
};

var checkEnter = function(e) {
	if (e.keyCode == 13) {
		update();
		return false;
	}
};

document.getElementById('birthdateText').onkeypress = checkEnter;
document.getElementById('calculateButton').onclick = update;

var s = Snap("#YourLifeInWeeks");
update();

})();