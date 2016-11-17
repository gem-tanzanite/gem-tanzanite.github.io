function updateTime() {
	var date = new Date();
	var hour = date.getHours();
  var meridian;
	if (hour > 11) {
		meridian = 'PM';
		hour -= 12;
	} else {
		meridian = 'AM';
	}
	var timeString = hour + ':' + ('0' + date.getMinutes()).slice(-2);
	postMessage({
    meridian : meridian,
    timeString: timeString
  });
}
updateTime();
setInterval(updateTime, 1000 * 60);
