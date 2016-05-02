"use strict";


$(document).ready(function() {
	let dropdownMenu = $(".dropdown-menu");

	$.ajax ({
		url: "../categories.json",
		success:function(categoriesJSON){
			let categories = categoriesJSON.categories;
			console.log("categories", categories);
			dropdownMenu.html("");
			categories.forEach(function(cats){
				dropdownMenu.append(`<option>${cats.name}</option>`);
			});
		},
		error: function(categories){
			console.log("fail", categories);
		}
	});
});