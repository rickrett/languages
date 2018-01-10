// this uses the jquery library

$(document).ready(function() {
	$('#PGtestbutton').click(function() {
	pigLatin($('#normalstring').val());
	rovarSentence($('#normalstring').val());
	bothPigRovarSentence($('#normalstring').val());
	});
});

function bothPigRovarSentence(allWords) {
	let wordArray = allWords.split(" ");
	let bothArray = [];
	for (index = 0; index < wordArray.length; ++index) {
		var rovarWord = Rovarspraket(wordArray[index]);
		var bothWord = pigConvert(rovarWord);
		bothArray.push(bothWord);	
	};	
	var finalBothSentence = bothArray.join(" ");
	$('#bothstring').html(finalBothSentence);
}


function rovarSentence(allWords) {
	console.log(allWords);
	let wordArray = allWords.split(" ");
	let rovarArray = [];
	for (index = 0; index < wordArray.length; ++index) {
		var rovarWord = Rovarspraket(wordArray[index]);
		rovarArray.push(rovarWord);	
	};	
	var finalRovarSentence = rovarArray.join(" ");
	$('#rovarstring').html(finalRovarSentence);
}


function pigLatin(allWords) {
	let wordArray = allWords.split(" ");
	let sentenceArray = [];
	let rovarArray = [];
	var index;
	for (index = 0; index < wordArray.length; ++index) {
		var newWord = pigConvert(wordArray[index]);
		sentenceArray.push(newWord);		
	};
	var finalSentence = sentenceArray.join(" ");
//	$('h3.font').html(finalSentence);
$('#pigstring').html(finalSentence);
}

function Rovarspraket (wordString) {
/*
Rövarspråket:
The principle is easy enough. Every consonant (spelling matters, not pronunciation) is doubled, and an o is inserted in-between. Vowels are left intact. It is quite possible to render the Rövarspråket version of an English word as well as a Swedish, e.g.:

sos-tot-u-bob-bob-o-ror-non or sostotubobboborornon
*/
var nonVowel = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
var usedString = '';
var re = new RegExp('',"gi");
for (i=0;i < wordString.length;i++){
	if ((nonVowel.indexOf(wordString[i]) != -1) && (usedString.indexOf(wordString[i]) == -1)) {
        usedString = usedString+wordString[i];
        re = new RegExp(wordString[i],'gi');
		wordString = wordString.replace(re, wordString[i]+'o'+wordString[i]);
    }
}
return wordString;
}

	
function pigConvert (wordString) {
	/*
	to do: find commas, period, etc., and place them in the sdame position.
	I guess find the character position	and character, store in array, process 
	the word, then place the characters back?
	
	-- Should handle "sh", "th", etc. together
	-- first constantants should move, and be added with "ay"
	-- first vowels  should not move, and "way" added to the end: "alwaysway"
	-- single letter words are always vowels so end in "way".
	-- middle punctuation stays in the same place. End punctuation is deleted and moved to the end.
	
	*/
	let soundsRay =["sh","ch","th","bl","br","ch","ck","cl"]; //,cr, dr, fl, fr, gh, gl, gr, ng, ph, pl, pr, qu, sc, sh, sk, sl, sm, sn, sp, st, sw, th, tr, tw, wh, wr
	let firstSound = '';
	let numSoundLetters = 0;
	let firstTwo = wordString.slice(0,2);
	if (soundsRay.indexOf(firstTwo.toLowerCase()) >= 0){
		firstSound = wordString.slice(0,2);
		numSoundLetters = 2;
	} else {
		firstSound = wordString[0];
		numSoundLetters = 1;
	}
//	alert(firstSound);
	let firstLetter = wordString[0];
	let lastLetter = wordString[wordString.length -1]; //+(numSoundLetters-1))];
	let punct = '.,;:\"\'-+{}[]\\|/()<>?^&*@#$%!~\`';
	let digits = '0123456789';
	let symbol = '';
	let textString = '';
	
	if (digits.includes(firstLetter) == true || punct.includes(firstLetter) == true) {
		return wordString;
	}
	
	if (punct.includes(lastLetter) == true) {
		symbol = lastLetter;
		textString = wordString.slice(0,[wordString.length-1]);
	}	else {
		textString = wordString;
	}
	let lastPart = textString.slice((numSoundLetters+1),[textString.length]);
	let code = textString.charCodeAt(0);
	let vowel = 'aeiouAEIOU';
	

	if(textString.length == 1) { // single character word
		return (textString+'way'+symbol); // this assumes all single-letter words are vowels and keeps the case the same
	} 

    if(code >= 65 && code <= 90 && textString.length > 1) {  // first letter is a cap
         if (vowel.includes(firstLetter) == true) {
			return (textString+'way'+symbol);
		 } else {
//			return (textString[1].toUpperCase()+lastPart+firstLetter.toLowerCase()+'ay'+symbol); 
			return (textString[numSoundLetters].toUpperCase()+lastPart+firstSound.toLowerCase()+'ay'+symbol); 
		 }
    } else {
		if (vowel.includes(firstLetter) == true) {
			return (textString+'way'+symbol);
		} else {
		return (textString[numSoundLetters]+lastPart+firstLetter.toLowerCase()+'ay'+symbol);
		}
	}	
}
