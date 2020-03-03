$(document).ready(function(){
	$("#btn1").click(function(){
		var div = $("#box1");
		div.animate({width: '300px'}, "slow");
		div.animate({height: '300px'}, "slow");
		div.animate({left: '70px'}, "slow");
		div.animate({borderWidth: '15'}, "slow");
		div.animate({
			left: '0',
			width: '100px',
			height: '100',
			borderWidth: '5'
		}, "slow");
	});

	$("#btn2").click(function(){
		var div = $("#box2");
			div.animate({
			margin: '+=10px',
			height: '+=15px',
			width: '+=15px'
		}, "slow");
	});


	var cons = $(".content").hide();

	$(".accordion").click(function(){

		if($(this).next().is(":visible")){
			$(this).next().slideUp("slow");
		}else{
			$(".content").slideUp("slow");
			$(this).next().slideDown("slow");
		}
	});

});