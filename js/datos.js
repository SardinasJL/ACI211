$(document).ready(function () {
	//Variables a leer
	Leer();
	//Las variables se escriben dentro de las cajas
	Escribir();
	//De ser necesario se cambian y se guardan
	//document.getElementById("btnGuardar").onclick = Guardar;
	$("#btnGuardar").click(function () {
		Guardar();
	})

});

Leer = function () {
	currentGc = localStorage.getItem('Gc');
	currentGa = localStorage.getItem('Ga');
	currentGamma_c = localStorage.getItem('Gamma_c');
	currentGamma_a = localStorage.getItem('Gamma_a');
	currentGamma_w = localStorage.getItem('Gamma_w');
	currentGamma_g = localStorage.getItem('Gamma_g');
	currentHum_a = localStorage.getItem('Hum_a');
	currentHum_g = localStorage.getItem('Hum_g');
	currentAbs_a = localStorage.getItem('Abs_a');
	currentAbs_g = localStorage.getItem('Abs_g');
	currentPorcen_aire = localStorage.getItem('Porcen_aire');
}

Escribir = function () {
	$("#txtGc").val(currentGc);
	$("#txtGa").val(currentGa);
	$("#txtGamma_c").val(currentGamma_c);
	$("#txtGamma_a").val(currentGamma_a);
	$("#txtGamma_w").val(currentGamma_w);
	$("#txtGamma_g").val(currentGamma_g);
	$("#txtHum_a").val(currentHum_a);
	$("#txtHum_g").val(currentHum_g);
	$("#txtAbs_a").val(currentAbs_a);
	$("#txtAbs_g").val(currentAbs_g);
	$("#txtPorcen_aire").val(currentPorcen_aire);
}

Guardar = function () {
	localStorage.setItem('Gc', document.getElementById('txtGc').value);
	localStorage.setItem('Ga', document.getElementById('txtGa').value);
	localStorage.setItem('Gamma_c', document.getElementById('txtGamma_c').value);
	localStorage.setItem('Gamma_a', document.getElementById('txtGamma_a').value);
	localStorage.setItem('Gamma_w', document.getElementById('txtGamma_w').value);
	localStorage.setItem('Gamma_g', document.getElementById('txtGamma_g').value);
	localStorage.setItem('Hum_a', document.getElementById('txtHum_a').value);
	localStorage.setItem('Hum_g', document.getElementById('txtHum_g').value);
	localStorage.setItem('Abs_a', document.getElementById('txtAbs_a').value);
	localStorage.setItem('Abs_g', document.getElementById('txtAbs_g').value);
	localStorage.setItem('Porcen_aire', document.getElementById('txtPorcen_aire').value);
	alert("Se guardó correctamente");
}
