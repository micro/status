// notice displayed at top of page
// modify in the event of a problem
var notice = "Micro is in your server being awesome";

var domain = "micro.mu";

// regions in which we exist
var regions = [
	"lon1-do",
	"eastus2-az",
	"uksouth-az",
	"ap-east-1-aws",
	"us-west2-gcp"
];

// the app urls we support
var apps = [
	"api",
	"web"
];

// builds the html table
function buildTable(urls) {
	var el = document.getElementById("urls");

	// add each url to list
	Object.keys(urls).forEach(function(key) {
		var url = urls[key];
		var node = document.createElement('tr');
		node.innerHTML = '<td><a href="https://'+url+'">'+url+'</a></td><td id="'+key+'">~</td>';
		el.appendChild(node);
	});
}

// does the actual http check against a url 
function checkURL(url, callback) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4) {
		callback(this);
	    }
	};

	xhttp.open("GET", 'https://' + url, true);
	xhttp.send();
}

// checkURLS checks all the urls and populates the table on the callback
function checkURLs(urls) {
	// add each url to list
	Object.keys(urls).forEach(function(key) {
		var url = urls[key];
		var node = document.getElementById(key);

		// check the url and execute the callback
		checkURL(url, function(res) {
		    if (res.readyState == 4) {
			 if (res.status == 200) {
				node.innerText = 'OK';
			 } else {
				node.innerText = res.status;
			}
		    }
		});
	});
}

// generateURLs will take the apps, regions and domain values to construct urls
function generateURLs() {
	var urls = {};

	// for each app add just that app.domain
	for (i = 0; i < apps.length; i++) {
		// base urls
		urls[apps[i]] = apps[i] + '.' + domain;
	}

	// for each app add app-region.cloud.domain
	for (i = 0; i < apps.length; i++) {
		regions.forEach(function(region) {
			var key = apps[i] + '-' + region;
			// construct url
			url = apps[i] + '-' + region + '.cloud.' + domain;
			// push to urls
			urls[key] = url;
		})
	}

	return urls;
}

function loadNotice() {
	var el = document.getElementById("notice");	
	el.innerText = notice;
}

// load the the data
function loadData() {
	// load the notice
	loadNotice();

	// generate various urls
	var urls = generateURLs();

	// generate the html table
	buildTable(urls);

	// check the various urls
	checkURLs(urls);
}
