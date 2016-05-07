"use strict";


$(document).ready(function() {
	let dropdownMenu = $(".dropdown-menu");
	var categories=[];
	var products=[];
	var types=[];

	var firstXHR = function(){
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "../categories.json"
			}).done(function(data){
				resolve(data);
			}).fail(function(xhr, status, error) {
				reject(error);
			});
		});
	};

	var secondXHR = function(result_of_firstXHR){
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "../types.json",
				data: result_of_firstXHR
			}).done(function(data){
				resolve(data);
			}).fail(function(xhr, status, error){
				reject(error);
			});
		});
	};

	var thirdXHR = function(result_of_secondXHR){
		return new Promise((resolve, reject) => {
			$.ajax({
				url: "../products.json",
				data: result_of_secondXHR
			}).done(function(data){
				resolve(data);
			}).fail(function(xhr, status, error){
				reject(error);
			});
		});
	};

	firstXHR()
		.then(function(data1){
			categories = data1.categories;
			populateDropdown(categories);
			return secondXHR(data1);
		})
		.then(function(data2){
			types = data2.types;
			return thirdXHR(data2);
		}).then(function(data3){
			products = data3.products;
			organizeAcme();
			populateDOM();
		});

	function populateDropdown(categories){
		dropdownMenu.html("");
		categories.forEach(function(cats){
			dropdownMenu.append(`<option id="category${cats.id}">${cats.name}</option>`);
		});
	}

	function populateDOM(){
		let acme = $("#container-fluid");
		acme.html("");
		types.forEach(function(types){
			acme.append(`<div class = "col-sm-9"><p class="types">${types.name}: ${types.description}</p></div>`);
		});
		products.forEach(function(product){
			for(var key in product){
			}
			$(`<div class = "col-xs-8 col-sm-6"><p>${product[key].name} - ${product[key].description}</p></div>`).appendTo(".types");
		});

	}
	function organizeAcme(){
			products.forEach(function(product){
				for(var key in product){
					}
					// console.log("type", types);
				types.forEach(function(type){
				if (product[key].type === type.id) {
					product[key].type = type.name;
				}
				});
				console.log("product", product);
		});
	}

});


