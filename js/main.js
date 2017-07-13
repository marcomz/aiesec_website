var index = function(){

	function start(pjax_load){
		(!pjax_load)&&load_navbar();
		carousel();
		load_youtube(!pjax_load);
	}

	function load_navbar(){
		$("#myNavDiv").load("navbar-r.html",function(){
			check_if_logged();
			init_pjax();
		});
	}

	function cero(n){
		return ((''+n).length===1)?'0'+n:n;
	}

	function init_pjax(){
		var pjax = new Pjax({
			selectors: ["title","#contenido_general"],
		});
		document.addEventListener("pjax:success", function() {
			init_function[document.getElementById('page_codename').innerHTML](true);
		});
	}

	function carousel(){
		var owl = $('.owl-carousel');
		var owl2 = $('.owly-2');

		owl.owlCarousel({
			loop:true,
			items:1,
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoPlaySpeed: 500,
			autoplayHoverPause:false
		});


		owl2.owlCarousel({
			loop:true,
			items:1,
			loop:true,
			autoplay:true,
			autoplayTimeout:3000,
			autoPlaySpeed: 500,
			autoplayHoverPause:false
		});
	}

	function load_youtube(load_script){
		// Replace the 'ytplayer' element with an <iframe> and
		// YouTube player after the API code downloads.
		window.onYouTubePlayerAPIReady = function() {
			var player = new YT.Player('ytplayer', {
				height: '272',
				width: '100%',
				videoId: 'YE8CAzT4N9Q'
			});

			var player2 = new YT.Player('ytplayer-2', {
				height: '270',
				width: '100%',
				videoId: 'YE8CAzT4N9Q'
			});
		}

		// Load the IFrame Player API code asynchronously.
		if(load_script){
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			try{
				onYouTubePlayerAPIReady();
			} catch(error){
				if(error.message.indexOf('YT')>-1){
					load_youtube(true);
				}
			}
		}
	}

	function check_if_logged(){
		var token = obtenerCookie('expa_token');
		if(token!==''){
			$.ajax({
				type: "GET",
				dataType:"html",
				url: 'https://gis-api.aiesec.org/v2/current_person.json?access_token='+token,
				cache: false,
				success: function(result) {
					try{
						var obj = JSON.parse(result);
						//console.log(obj);
						if(obj.person.id>0){
							show_hide(1,document.getElementById('dropdownMenu1_'));
							document.getElementById('dropdownMenu1_').style.background = "url('"+obj.person.profile_photo_url+"')";
							document.getElementById('dropdownMenu1_mobile').style.background = "url('"+obj.person.profile_photo_url+"')";
							document.getElementById('cerrar_sesion').addEventListener('click',logout);
							document.getElementById('cerrar_sesion_mobile').addEventListener('click',logout);
						} else {
							is_not_logged();
						}
					} catch(error){
						console.log(error);
						is_not_logged();
					}
				},
				error: function(error) {
					console.log(error);
					is_not_logged();
				}
			});
		} else {
			//que hacer cuando no está logueado
			is_not_logged();
		}
		function is_not_logged(){
			show_hide(1,document.getElementById('navbar').getElementsByClassName('signupA')[0]);
			show_hide(1,document.getElementById('navbar').getElementsByClassName('loginA')[0]);
			document.getElementById('navbar').getElementsByClassName('loginA')[0].addEventListener('click',display_login_form);
		}
	}

	function logout(){
		document.cookie = "expa_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
		location.reload();
	}

	function display_login_form(){
		swal({
			title: 'Iniciar Sesión',
			html:
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<label class="ico" for="correo_input"><i class="fa fa-envelope-o" aria-hidden="true" style="position: absolute;left: 2px;padding-top: 8px;top: 23px;'+
				'width: 55px;height: 50px;font-size: 30px;background: #f3f4f5;color: #c0c3c5;text-align: center;border-radius: 2px 0 0 2px;"></i></label>'+
				'<input autofocus="autofocus" class="form-control" id="correo_input" placeholder="Correo" type="email" value="" '+
				'style="box-shadow: none;padding: 0 20px 0 71px;font-size: 16px;line-height: 20px;color: #777f81;font-weight: bold;height: 54px;width: 100%;'+
				'border: 2px solid #dbdddd;background: #fff;"></div></div>'+
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<label class="ico" for="pass_input"><i class="fa fa-lock" aria-hidden="true" style="position: absolute;left: 2px;padding-top: 8px;top: 23px;'+
				'width: 55px;height: 50px;font-size: 30px;background: #f3f4f5;color: #c0c3c5;text-align: center;border-radius: 2px 0 0 2px;"></i></label>'+
				'<input autofocus="autofocus" class="form-control" id="pass_input" placeholder="Contraseña" type="password" value="" '+
				'style="box-shadow: none;padding: 0 20px 0 71px;font-size: 16px;line-height: 20px;color: #777f81;font-weight: bold;height: 54px;width: 100%;'+
				'border: 2px solid #dbdddd;background: #fff;"></div></div>'+
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<input type="button" value="Entrar" id="login_button_form" style="background-color: #037EF3;color: #fff;padding: 10px;border-radius:0;"></div></div>'+
				'<div class="row" style=""><div class="txt-holder" style="position: relative;border-radius: 2px;">'+
				'<input type="button" value="Cancelar" onclick="swal.close();" style="background-color: #DD1C1A;color: #fff;padding: 10px;border-radius:0;"></div></div>',
			showCloseButton:false,
			showCancelButton:false,
			showConfirmButton:false,
			allowOutsideClick:false,
			allowEscapeKey:true
		});
		document.getElementById('login_button_form').addEventListener("click", function(){
			iniciar_sesion();
		});
		document.getElementById('correo_input').addEventListener("keyup", function(e){
			if(e.code==='Enter'){
				iniciar_sesion();
			}
		});
		document.getElementById('pass_input').addEventListener("keyup", function(e){
			if(e.code==='Enter'){
				iniciar_sesion();
			}
		});
		function iniciar_sesion(){
			var correo = document.getElementById('correo_input').value;
			var pass = document.getElementById('pass_input').value;
			$.ajax({
				type: "POST",
				dataType:"html",
				url: 'http://api.aiesec.org.mx/gis_auth.php',
				//url: 'get_token.php',
				data: 'email='+correo+'&password='+pass,
				cache: false,
				success: function(result) {
					try{
						var obj = JSON.parse(result);
						document.cookie = "expa_token="+obj.aiesec_mx_token+"; path=/; expires="+return_date_for_cookie();
						location.reload();
					}catch(error){
						console.log(error);
					}
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
		function return_date_for_cookie(){
			var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

			var d1 = new Date();
			var d = new Date(d1.getTime()+3600000);
			console.log(days[d.getUTCDay()]+", "+cero(d.getUTCDate())+" "+months[d.getUTCMonth()]+" "+d.getUTCFullYear()+" "+d.getUTCHours()+":"+d.getUTCMinutes()+":00 GMT;");
			return days[d.getUTCDay()]+", "+cero(d.getUTCDate())+" "+months[d.getUTCMonth()]+" "+d.getUTCFullYear()+" "+d.getUTCHours()+":"+d.getUTCMinutes()+":00 GMT;";
		}
	}

	function show_hide(show,element){
		element.style.display = show?'block':'none';
	}

	function obtenerCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	}

	function myMap() {
		var mapOptions = {
			center: new google.maps.LatLng(51.5, -0.12),
			zoom: 10
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}

	return{
		start:start,
		myMap:myMap,
		load_navbar:load_navbar,
		obtenerCookie:obtenerCookie,
		cero:cero
	}
}();

var gt = function(){

	function start(pjax_load){
		if(location.href.indexOf('GT.html')>-1){
			var list = ['1621','1549','1613','1554','1551'];
			var type = 2;
		} else if(location.href.indexOf('GE.html')>-1){
			var list = ['1551','1606','1553','1535','577'];
			var type = 5;
		}
		(!pjax_load)&&index.load_navbar();
		//que_no_se_que_hace();
		carousel();
		load_youtube(!pjax_load);
		global_accordion();
		fill_opps(list,type);
	}

	function que_no_se_que_hace(){
		var visible = true;
		$("owl-nav").remove();
		$( ".owl-controls" ).remove();
		$( ".owl-dots" ).insertBefore( ".owl-stage" );
		$('.accordion-title').on('click', function(e){
			if (visible) {
				visible = false;
			} else {
				if ($(".is-expanded")[0]){
					// Do something if class exists
				} else {
					visible = true;
				}
			}
		})
	}

	function carousel(){
		$('.owl-carousel').owlCarousel({
			loop:true,
			items:1,
			autoplay:true,
			autoplayTimeout:3000,
			autoPlaySpeed: 500,
			autoplayHoverPause:false
		})
	}

	function load_youtube(load_script){
		// Replace the 'ytplayer' element with an <iframe> and
		// YouTube player after the API code downloads.
		window.onYouTubePlayerAPIReady = function() {
			var player = new YT.Player('ytplayer', {
				height: '272',
				width: '100%',
				videoId: 'M7lc1UVf-VE'
			});

			var player2 = new YT.Player('ytplayer-2', {
				height: '270',
				width: '100%',
				videoId: 'LtynkOyrjao'
			});
		}

		// Load the IFrame Player API code asynchronously.
		if(load_script){
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			try{
				onYouTubePlayerAPIReady();
			} catch(error){
				if(error.message.indexOf('YT')>-1){
					load_youtube(true);
				}
			}
		}
	}

	function fill_opps(mcs,program){
		//cuando creas links nuevos pjax tiene que volver a iniciarse, aquí estamos esperando a que todos los requests terminen para proceder a hacerlo
		var promise1 = $.Deferred();
		var promise2 = $.Deferred();
		var promise3 = $.Deferred();
		var promise4 = $.Deferred();
		var promise5 = $.Deferred();
		call_opps(mcs[0],program,promise1);
		call_opps(mcs[1],program,promise2);
		call_opps(mcs[2],program,promise3);
		call_opps(mcs[3],program,promise4);
		call_opps(mcs[4],program,promise5);
		$.when(promise1,promise2,promise3,promise4,promise5).done(function(){
			var pjax = new Pjax({
				selectors: ["title","#contenido_general"],
			});
		});
	}

	function call_opps(mc,program,promise){
		$.ajax({
			type: "GET",
			dataType:"html",
			url: 'https://gis-api.aiesec.org/v2/opportunities.json?access_token=e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493&filters[home_mcs][]='+mc+'&filters[programmes][]='+program+'&filters[last_interaction][from]='+return_date(false)+'&filters[earliest_start_date]='+return_date(true)+'&sort=created_at',
			cache: false,
			success: function(result) {
				try{
					var obj = JSON.parse(result);
					document.getElementById('card_view_container_'+mc).innerHTML = '';
					for (var i = 0; i < 3; i++) {
						(function(){
							if(obj.data[i]!==undefined){
								var semanas = (obj.data[i].duration_max!==null && obj.data[i].duration_min!==null)?(obj.data[i].duration_min+' - '+obj.data[i].duration_max):(obj.data[i].duration);
								var locations = (obj.data[i].location===null)?(obj.data[i].city):(obj.data[i].location);
								document.getElementById('card_view_container_'+mc).innerHTML += '<div class="col-md-4 translateit">'+
								'<div class="panel panel-default">'+
								'<div class="thumbnail-2 height-6"><img src="'+obj.data[i].cover_photo_urls+'" class="">'+
								'<p class="lead leadExtra">'+obj.data[i].title+'</p>'+
								'</div>'+
								'<div class="panel-body">'+
								'<p class="sizeLarge">'+obj.data[i].branch.name+'<br>'+semanas+' semanas<br>'+locations+'.</p>'+
								'<hr>'+
								'<a class="a-card" href="opp-details.html?id='+obj.data[i].id+'">Ver práctica</a>'+
								'</div></div></div>';
							}
						})();
					}
				}catch(error){
					console.log(error);
				}finally {
					promise.resolve();
				}
			},
			error: function(error) {
				console.log(error);
			}
		});
		function return_date(starting_date){
			var d = new Date();
			return (starting_date)?(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()):(d.getFullYear()+'-01-01');
		}
	}

	return{
		start:start,
		load_youtube:load_youtube,
		carousel:carousel
	}
}();

var opp_details = function(){

	function start(pjax_load){
		var id = (read_parameters('id')!==undefined) ? read_parameters('id') : 836303;
		(!pjax_load)&&index.load_navbar();
		(id!=0)&&init_angular(id);
	}

	function read_parameters(p){if (location.search != ""){var d=location.search.split("?");var e=d[1].split("&");for(i=0;i<e.length;i++){if(e[i].split("=")[0]==p){return e[i].split("=")[1];}}}else{return undefined;}}

	function init_angular(id){
		var oppPage = angular.module('oppPage', []);
		oppPage.controller('oppCtrl', function ($scope, $http) {
			$scope.data = "";
			$scope.semanas = "";
			$scope.app_close_date = "";
			$scope.fecha_inicio = "";
			$scope.fecha_final = "";
			$scope.location = "";
			$scope.program_logo = "";

			var token = index.obtenerCookie('expa_token');
			$http.get('https://gis-api.aiesec.org/v2/opportunities/'+id+'.json?access_token='+((token==='')?('e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493'):(token))).then(function (response) {
				console.log(response.data);
				document.getElementsByTagName('title')[0].innerText = response.data.title;
				$scope.data = response.data;
				$scope.semanas = (response.data.duration_max!==null && response.data.duration_min!==null)?(response.data.duration_min+' - '+response.data.duration_max):(response.data.duration);
				$scope.app_close_date = format_date(response.data.applications_close_date);
				$scope.fecha_inicio = format_date(response.data.earliest_start_date);
				$scope.fecha_final = format_date(response.data.latest_end_date);
				$scope.location = (response.data.location===null)?(response.data.city):(response.data.location);
				$scope.program_logo = 'img/Logos/'+response.data.programmes.short_name+'/Logo_'+response.data.programmes.short_name+'.png'
				render_button(!token=='',response.data.id,response.data.applied_to,response.data.applied_to_with);
				setTimeout(function(){
					activities_list('activities_list_'+response.data.id,response.data.role_info.learning_points_list);
				},100);
			});
		});
		angular.element(function() {
			angular.bootstrap(document.getElementById('contenido_general'), ['oppPage']);
		});
	}

	function render_button(logged,id,applied,app_id){
		document.getElementById('aplicar_btn_container').innerHTML = (logged)?'<a href="#" class="opp-normal" id="aplicar_btn">Aplicar ahora</a>':'<span class="opp-normal">Inicia sesión para aplicar</span>';
		if(applied){
			document.getElementById('aplicar_btn').style.backgroundColor = '#30C39E';
			document.getElementById('aplicar_btn').innerText = 'Ver aplicación';
			document.getElementById('aplicar_btn').setAttribute('href', 'https://opportunities.aiesec.org/opportunity-application/'+app_id);
			document.getElementById('aplicar_btn').setAttribute('target', '_blank');
		} else {
			if(logged){
				document.getElementById('aplicar_btn').onclick = function() {
					aplicar(id);
				};
			}
		}
	}

	function aplicar(id){
		var token = index.obtenerCookie('expa_token');
		var payload = '{"application": {"opportunity_id": '+id+'}}';
		document.getElementById('aplicar_btn').innerText = 'Enviando...';
		var r = new XMLHttpRequest();
		r.open('POST', 'https://gis-api.aiesec.org/v2/applications.json?access_token='+token, true);
		r.setRequestHeader('Content-type', 'application/json');
		r.onload = function() {
			if (r.status >= 200 && r.status < 400) {
				document.getElementById('aplicar_btn').innerText = 'Procesando...';
				setTimeout(function(){
					location.reload();
				},1000);
			} else {
				document.getElementById('aplicar_btn').innerText = 'Aplicar ahora';
				console.log("Ha ocurrido un error");
			}
		};
		r.onerror = function() {
			document.getElementById('aplicar_btn').innerText = 'Aplicar ahora';
			console.log("Ha ocurrido un error");
		};
		try{
			r.send(payload);
		} catch(e){
			document.getElementById('aplicar_btn').innerText = 'Aplicar ahora';
			console.log("Ha ocurrido un error");
		}
	}

	function activities_list(id,list){
		var el = document.getElementById(id);
		el.innerHTML = '';
		list.map(function(o){
			var li = document.createElement('li');
			li.innerText = o;
			el.appendChild(li);
		});
	}

	function format_date(date){
		var month = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
		var d = new Date(date);
		return index.cero(d.getUTCDate())+' de '+month[d.getUTCMonth()]+' de '+d.getUTCFullYear();
	}

	return{
		start:start
	}
}();

var gv = function(){

	function start(pjax_load){
		(!pjax_load)&&index.load_navbar();
		gt.load_youtube(!pjax_load);
		gt.carousel();
	}

	return{
		start:start
	}
}();

var about = function(){

	function start(pjax_load){
		(!pjax_load)&&index.load_navbar();
		load_youtube(!pjax_load);
		gt.carousel();
	}

	function load_youtube(load_script){
		// Replace the 'ytplayer' element with an <iframe> and
		// YouTube player after the API code downloads.
		window.onYouTubePlayerAPIReady = function() {
			var player = new YT.Player('ytplayer', {
				height: '272',
				width: '100%',
				videoId: 'M7lc1UVf-VE'
			});

			var player2 = new YT.Player('ytplayer-2', {
				height: '370',
				width: '100%',
				videoId: 'LtynkOyrjao'
			});
		}

		// Load the IFrame Player API code asynchronously.
		if(load_script){
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			try{
				onYouTubePlayerAPIReady();
			} catch(error){
				if(error.message.indexOf('YT')>-1){
					load_youtube(true);
				}
			}
		}
	}

	return{
		start:start
	}
}();

var init_function = {'index':index.start,'gt':gt.start,'gv':gv.start,'opp_details':opp_details.start,'about':about.start};

$(document).ready(function() {
	init_function[document.getElementById('page_codename').innerHTML](false);
});