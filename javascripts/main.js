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
			let products1 = data3.products;
			products1.forEach(function(product){
				products.push(product[Object.keys(product)[0]]);
			});
			organizeAcme();
		});

	function populateDropdown(categories){
		dropdownMenu.html("");
		categories.forEach(function(cats){
			dropdownMenu.append(`<option value="${cats.id}">${cats.name}</option>`);
		});
	}

	function populateDOM(acmeArray){
		let acme = $("#container-fluid");
		acme.html("");
		// categories.forEach(function(categories){
		// 	acme.append(`<div class = "col-md-12"><h2>${categories.name}</h2></div>`);
		// });
		// types.forEach(function(types){
		// 	$(`<div class = "col-md-9"><h4 class="types">${types.name}: ${types.description}</h4></div>`).appendTo(".col-md-12");
		// });
		acmeArray.forEach(function(product){
			$(`<div class = "col-md-6"><p>${product.name} - ${product.description}</p></div>`).appendTo(acme);
		});
	}

	function organizeAcme(){
		let finalProducts = products;
		finalProducts.forEach(function(finalProduct){
			finalProduct.typeInfo = types[finalProduct.type];
			finalProduct.categoryInfo = categories[finalProduct.typeInfo.category];
			// console.log("categoryInfo", );

		});
		// console.log("finalProducts", finalProducts);
		populateDOM(finalProducts);
	}

});


