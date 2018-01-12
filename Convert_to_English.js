// this uses the jquery library

$(document).ready(function() {
	$('#PGreconvert').click(function() {
	unConvertHybrid($('#convertstring').val());
	});
});

String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}

function unConvertHybrid(allWords) {
//convertHybrid
	let wordArray = allWords.split(" ");
	let sentenceArray = [];
	var index;
	for (index = 0; index < wordArray.length; ++index) {
		var newWord = convertHybrid(wordArray[index]);
		sentenceArray.push(newWord);		
	};
	var finalSentence = sentenceArray.join(" ");
$('#unhybridstring').html(finalSentence);
}

//commas = test.count(',') // returns 3
function convertHybrid (wordString) {
var nonVowel = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
var vowels = 'aeiou';//aeiou';
//var wordLength = wordString.length;
var vowelCount = 0;
var constNum = 0;

for (j=0;j<wordString.length;j++){
	if ((nonVowel.indexOf(wordString[j]) != -1)) {
		constNum = wordString.count(wordString[j])/2;
        re = new RegExp(wordString[j]+vowels[((vowelCount)%5)]+wordString[j],'gi');
		wordString = wordString.replace(re, wordString[j]);
		remAlpha = new RegExp(wordString[j],'gi');
		nonVowel = nonVowel.replace(remAlpha, '');
		vowelCount +=1; //Num-1;
		constNum = 0;
    }
}
return wordString;
}

