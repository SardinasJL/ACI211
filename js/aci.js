window.onload = function () {
	var btnCalcular = document.getElementById("btnCalcular");
	var forms = document.getElementsByClassName('needs-validation');
	var validation = Array.prototype.filter.call(forms, function (form) {
		//form.addEventListener('submit', function(event) {
		btnCalcular.addEventListener('click', function (event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			} else {
				calcular(); //Se llama a la función calcular sólo si el formulario está validado correctamente
			}
			form.classList.add('was-validated');
		}, false);
	});
};

calcular = function () {
	//Variables
	fc = Number($("#txtFc").val());
	Cc = Number($("#cbxCc").val()); //Number() es un método para convertir una cadena en número
	Caire = $("input[name='rbCaire']:checked").val();
	Mfinura_a = Number($("#txtMfinura_a").val());
	Dgrava = Number($("#txtDgrava").val());
	Tdc = Number($("#cbxTdc").val());
	Rev = $("input[name='rbRev']:checked").val();
	Tmg = Number($("#cbxTmg").val());
	//Constantes
	Rev_reco = { //Revenimientos recomendados tabla 4.3.1
		0: {
			MAXIMO: 7.5,
			MINIMO: 2.5,
		},
		1: {
			MAXIMO: 7.5,
			MINIMO: 2.5,
		},
		2: {
			MAXIMO: 10,
			MINIMO: 2.5,
		},
		3: {
			MAXIMO: 10,
			MINIMO: 2.5,
		},
		4: {
			MAXIMO: 7.5,
			MINIMO: 2.5,
		},
		5: {
			MAXIMO: 7.5,
			MINIMO: 2.5,
		},
	};

	//	Req_apro = { // Requisitos aproximados de agua de mezclado y contenido de aire	
	//		SINAIRE: [
	//		[2.5, 5.0, 207, 199, 190, 179, 166, 154, 130, 113],
	//		[7.5, 10, 228, 216, 205, 193, 181, 169, 145, 124],
	//		[15, 17.5, 243, 228, 216, 202, 190, 178, 160, "-"],
	//		["-", "-", 3, 2.5, 2, 1.5, 1, 0.5, 0.3, 0.2], //Cantidad aproximada de aire
	//		],
	//		CONAIRE: [
	//		[2.5, 5.0, 181, 175, 168, 160, 150, 142, 122, 107],
	//		[7.5, 10, 202, 193, 184, 175, 165, 157, 133, 119],
	//		[15, 17.5, 216, 205, 197, 174, 174, 166, 154, "-"],
	//		["-", "-", 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0], //Exposición ligera
	//		["-", "-", 6.0, 5.5, 5.0, 4.5, 4.5, 4.0, 3.5, 3.0], //Exposición moderada
	//		["-", "-", 7.5, 7.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0], //Exposición severa
	//		],
	//	};

	Req_apro = {
		SINAIRE: {
			2.5: [207, 199, 190, 179, 166, 154, 130, 113],
			5.0: [207, 199, 190, 179, 166, 154, 130, 113],
			7.5: [228, 216, 205, 193, 181, 169, 145, 124],
			10.0: [228, 216, 205, 193, 181, 169, 145, 124],
			15.0: [243, 228, 216, 202, 190, 178, 160, "-"],
			17.5: [243, 228, 216, 202, 190, 178, 160, "-"],
			cca: [3, 2.5, 2, 1.5, 1, 0.5, 0.3, 0.2], //Cantidad aproximada de aire
		},
		CONAIRE: {
			2.5: [181, 175, 168, 160, 150, 142, 122, 107],
			5.0: [181, 175, 168, 160, 150, 142, 122, 107],
			7.5: [202, 193, 184, 175, 165, 157, 133, 119],
			10.0: [202, 193, 184, 175, 165, 157, 133, 119],
			15.0: [216, 205, 197, 174, 174, 166, 154, "-"],
			17.5: [216, 205, 197, 174, 174, 166, 154, "-"],
			ligera: [4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0],
			moderada: [6.0, 5.5, 5.0, 4.5, 4.5, 4.0, 3.5, 3.0],
			severa: [7.5, 7.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0],
		}
	}

	Rel_AC = { //Correspondencia entre la relación Agua/cemento y la resistencia a compresión
		420: {
			SINAIRE: 0.41,
			CONAIRE: "-",
		},
		350: {
			SINAIRE: 0.48,
			CONAIRE: 0.40,
		},
		280: {
			SINAIRE: 0.57,
			CONAIRE: 0.48,
		},
		210: {
			SINAIRE: 0.68,
			CONAIRE: 0.59,
		},
		140: {
			SINAIRE: 0.82,
			CONAIRE: 0.74,
		},
	};

	/*Vol_AH = [ // Tabla 4.3.4 Volumen de agregado grueso por volumen unitario de hormigón
		[2.4, 2.6, 2.80, 3.00],
		[0.50, 0.48, 0.46, 0.44],
		[0.59, 0.57, 0.55, 0.53],
		[0.66, 0.64, 0.62, 0.60],
		[0.71, 0.69, 0.67, 0.65],
		[0.75, 0.73, 0.71, 0.69],
		[0.78, 0.76, 0.74, 0.72],
		[0.82, 0.80, 0.78, 0.76],
		[0.87, 0.85, 0.83, 0.81],
	];*/

	Vol_AH = { // Tabla 4.3.4 Volumen de agregado grueso por volumen unitario de hormigón
		0: {
			2.40: 0.50,
			2.60: 0.48,
			2.80: 0.46,
			3.00: 0.44
		},
		1: {
			2.40: 0.59,
			2.60: 0.57,
			2.80: 0.55,
			3.00: 0.53
		},
		2: {
			2.40: 0.66,
			2.60: 0.64,
			2.80: 0.62,
			3.00: 0.60
		},
		3: {
			2.40: 0.71,
			2.60: 0.69,
			2.80: 0.67,
			3.00: 0.65
		},
		4: {
			2.40: 0.75,
			2.60: 0.73,
			2.80: 0.71,
			3.00: 0.69
		},
		5: {
			2.40: 0.78,
			2.60: 0.76,
			2.80: 0.74,
			3.00: 0.72
		},
		6: {
			2.40: 0.82,
			2.60: 0.80,
			2.80: 0.78,
			3.00: 0.76
		},
		7: {
			2.40: 0.87,
			2.60: 0.85,
			2.80: 0.83,
			3.00: 0.81
		},
	}

	Phf = { // Tabla 4.3.5 Estimación del peso de hormigón fresco
		SINAIRE: [
				2280,
				2310,
				2345,
				2380,
				2410,
				2445,
				2490,
				2530
		],
		CONAIRE: [
				2200,
				2230,
				2275,
				2290,
				2350,
				2345,
				2405,
				2435
		]
	};

	//Proceso

	//1. Resistencia media

	fcr = new Array();
	fcr[0] = fc + 1.28 * Cc;
	fcr[1] = fc + 1.343 * Cc;
	fcr[2] = fc - 35 + 2.326 * Cc;
	fcr[3] = 0.85 * fc + 2.326 * Cc;

	fcr_mayor = 0; //Se itera para encontrar el mayor valor
	for (var i = 0; i < fcr.length; i++) {
		if (fcr_mayor < fcr[i]) {
			fcr_mayor = fcr[i];
		}
	}

	//2. Elección del revenimiento

	Rev_seleccionado = Rev_reco["0"].MAXIMO; //Rev_reco["INDICE DEL REVENIMIENTO RECOMENDADO MURO, ZAPATA, VIGA, ETC"].EL REVENIMIENTO MAXIMO O MINIMO

	//3. Elección del tamaño máximo de grava.

	// Ya se realizó a partir del select //lOS ÍNDICES VAN DEL 0 AL 7

	//4. Cantidad de agua tabla 4.3.2

	//Agua = Req_apro.SINAIRE["2.5"][0]; //Req_apro.SIN AIRE O CON AIRE["REV_SELECCIONADO"][INDICE DEL TAMAÑO MAXIMO DE GRAVA]
	Agua = eval("Req_apro." + Caire + "['" + Rev_seleccionado + "'][" + Tmg + "]");

	//5. Relación agua/cemento seleccionada (A/C) tabla 4.3.3

	if (fcr_mayor > 420) {
		fcr_max = 420;
		fcr_min = 350;
	};
	if (fcr_mayor <= 420 && fcr_mayor >= 350) {
		fcr_max = 420;
		fcr_min = 350;
	};
	if (fcr_mayor <= 350 && fcr_mayor >= 280) {
		fcr_max = 350;
		fcr_min = 280;
	};
	if (fcr_mayor <= 280 && fcr_mayor >= 210) {
		fcr_max = 280;
		fcr_min = 210;
	};
	if (fcr_mayor <= 210 && fcr_mayor >= 140) {
		fcr_max = 210;
		fcr_min = 140;
	};
	if (fcr_mayor < 140) {
		fcr_max = 210;
		fcr_min = 140;
	};
	Rel_AC_max = eval("Rel_AC[fcr_max]." + Caire);
	Rel_AC_min = eval("Rel_AC[fcr_min]." + Caire);

	Rel_AC_seleccionada = interpolar(fcr_max, Rel_AC_max, fcr_min, Rel_AC_min, fcr_mayor);

	//6. Cantidad de cemento

	Cemento = Agua / Rel_AC_seleccionada;

	//7. Estimación del contenido de agregado grueso tabla 4.3.4

	switch (true) {
		case (Mfinura_a > 3.00):
			Mfinura_a_max = 3.00;
			Mfinura_a_min = 2.80;
			break;
		case (Mfinura_a <= 3.00 && Mfinura_a >= 2.80):
			Mfinura_a_max = 3.00;
			Mfinura_a_min = 2.80;
			break;
		case (Mfinura_a <= 2.80 && Mfinura_a >= 2.60):
			Mfinura_a_max = 2.80;
			Mfinura_a_min = 2.60;
			break;
		case (Mfinura_a <= 2.60 && Mfinura_a >= 2.40):
			Mfinura_a_max = 2.60;
			Mfinura_a_min = 2.40;
			break;
		case (Mfinura_a <= 2.40):
			Mfinura_a_max = 2.60;
			Mfinura_a_min = 2.40;
			break;
	};

	Vol_AH_max = eval("Vol_AH[" + Tmg + "][" + Mfinura_a_max + "]");
	Vol_AH_min = eval("Vol_AH[" + Tmg + "][" + Mfinura_a_min + "]");

	Vol_AH_seleccionada = interpolar(Mfinura_a_max, Vol_AH_max, Mfinura_a_min, Vol_AH_min, Mfinura_a);
	Grava = Dgrava * Vol_AH_seleccionada;

	//8.- Agregado fino

	//Método a base de peso

	Ga = Number($("#txtGa").val());
	Gc = Number($("#txtGc").val());
	A = Number($("#txtPorcen_aire").val()) / 100;

	U = 10 * Ga * (100 - A) + Cemento * (1 - (Ga / Gc)) - Agua * (Ga - 1);
	Arena = U - (Agua + Cemento + Grava);

	//Método a base de volumen

	Gamma_a = Number($("#txtGamma_a").val());
	Gamma_w = Number($("#txtGamma_w").val());
	Gamma_c = Number($("#txtGamma_c").val());
	Gamma_g = Number($("#txtGamma_g").val());
	a = Number($("#txtPorcen_aire").val());


	Ar = (1 - (Agua / Gamma_w + Cemento / Gamma_c + Grava / Gamma_g + a / 100)) * Gamma_a;

	//9.- Ajuste por humedad y absorción
	Hum_a = Number($("#txtHum_a").val());
	Hum_g = Number($("#txtHum_g").val());
	Abs_a = Number($("#txtAbs_a").val());
	Abs_g = Number($("#txtAbs_g").val());

	Pgrava = Grava * (1 + (Hum_g / 100));
	Parena = Arena * (1 + (Hum_a / 100));
	Pagua = Agua - (Grava * (Hum_g - Abs_g) / 100) - (Arena * (Hum_a - Abs_a) / 100);


	//PASO FINAL - ESCRIBE Y DESPLIEGA LOS RESULTADOS
	//Escribe (Método a base de volumen)
	$("td[name='tdAgua']").html(Agua.toFixed());
	$("td[name='tdCemento']").html(Cemento.toFixed());
	$("td[name='tdArena']").html(Arena.toFixed());
	$("td[name='tdGrava']").html(Grava.toFixed());
	$("td[name='tdAr']").html(Ar.toFixed());
	//Escribe (Mëtodo a base de peso)
	$("td[name='tdPagua']").html(Pagua.toFixed());
	$("td[name='tdPcemento']").html(Cemento.toFixed());
	$("td[name='tdParena']").html(Parena.toFixed());
	$("td[name='tdPgrava']").html(Pgrava.toFixed());
	//Escribe (Tabla de proporciones)
	$("#tdProparena_1").html(Parena.toFixed() + " / " + Cemento.toFixed());
	$("#tdPropgrava_1").html(Pgrava.toFixed() + " / " + Cemento.toFixed());
	$("#tdProparena_2").html((Parena.toFixed() / Cemento.toFixed()).toFixed(2));
	$("#tdPropgrava_2").html((Pgrava.toFixed() / Cemento.toFixed()).toFixed(2));
	//Despliega el modal (popup)
	$('#exampleModal').modal('show');









};

interpolar = function (x1, y1, x2, y2, x) {
	var y = ((y2 - y1) / (x2 - x1)) * (x - x1) + y1;
	return y;
}
