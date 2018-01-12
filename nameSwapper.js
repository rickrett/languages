// this uses the jquery library

$(document).ready(function() {
    $('#testbutton').click(function() {
      myFunction($('#testfill').val());
    });
});
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function myFunction (nameString) {
	// "Last comma First" if the string contains two words (only)
	var res = nameString.split(" ");
	if (res.length == 2) {
			var revString = (res[1]+", "+res[0]);
	}

	if (revString) {
		$('h2.center').html('<b>'+revString+'</b>');
		$('p').html('');
	} else {
		$('p.error').html('<div>Did you enter a first and last name?</div>');
		$('h2.center').html('');
	}
}


/*
Probably a better way to do this

var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);  // Smith, John

*/