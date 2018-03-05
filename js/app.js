var juego = false;
var min;
var seg;
var segundo;
var puntos = 0;
var epserar = false;

function updateReloj() {
    var reloj;
    var hora = 0;
    var tiempo = new Date();

    if (min != 0 || seg != 0){
        if (segundo != tiempo.getSeconds()){
            segundo = tiempo.getSeconds();
            seg = seg - 1
            if(seg == - 1){
                seg = 59;
                min = min - 1
            }
        reloj = ((min < 10) ? "0" : ":") + (min) ;
        reloj += ((seg < 10) ? ":0" : ":") + (seg);
        }
        setTimeout(function(){
            updateReloj();
        },500);
    }else{
        fin_juego();
    }
    $("#timer").text(reloj);
}

function fin_juego(){
    clearTimeout("updateReloj()");
    $('.panel-tablero').toggle(1000);
    $('.time').toggle(1000);
    $('.panel-score').width('100%')
}

function LlenarDulces(){
    for (var num = 1; num <= 7; num++) {
        for (var num2 = 1; num2 <= 7; num2++) {
            if ($(".col-" + num2 + " img").length < 7 ){
                var dulce = Math.floor((Math.random() * 4) + 1);
                var imagen = document.createElement('img');
                $(".col-" + num2).prepend(imagen);
                $(imagen).addClass('dulces');
                $(imagen).attr('src', "image/" + dulce + ".png");
            }
        }
    }
}

function organizar_dulces(){
    for (var num = 1; num <= 7; num++) {
        for (var num2 = 1; num2 <= 7; num2++) {
            $(".col-" + num2 + " img:nth-child(" + num + ")").addClass('dulce' + num2 + '-' + num);
        }
    }
}


function HacerJugada(){
    var dulce_linea = "";
    var ducles_acumulados = [];

    for (var num = 1; num <= 7; num++) {
        var suma = 0;
        var temp_ducels = [];
        for(var num2 = 1; num2 <= 7; num2++){
            var dulce = $(".col-" + num).find('.dulce' + num +'-' + num2 ).attr('src');
            if ( dulce_linea == dulce ){
                suma = suma + 1;
                temp_ducels.push(num + "-" + num2); 
            }else{
                suma = 1;
                temp_ducels = [];
                temp_ducels.push(num + "-" + num2);
            }
            if( suma >= 3){
                if (sum2 = 3){
                    $.each(temp_ducels, function (ind, elem) { 
                        ducles_acumulados.push(elem);
                    });
                }else{
                    ducles_acumulados.push( num2);
                }
            }
            dulce_linea = $(".col-" + num).find('.dulce' + num + '-' + num2 ).attr('src');
        }
    }

    for (var num = 1; num <= 7; num++) {
        var suma = 0;
        var temp_ducels = [];
        for(var num2 = 1; num2 <= 7; num2++){    
            var dulce = $(".col-" + num2).find('.dulce' + num2 +'-' + num ).attr('src');
            if ( dulce_linea == dulce ){
                suma = suma + 1;
                temp_ducels.push(num2 + "-" + num); 
            }else{
                suma = 1;
                temp_ducels = [];
                temp_ducels.push(num2 + "-" + num);
            }
            if( suma >= 3){
                if (sum = 3){
                    $.each(temp_ducels, function (ind, elem) { 
                        ducles_acumulados.push(elem);
                    });
                }else{
                    ducles_acumulados.push( num);
                }
            }
            dulce_linea = $(".col-" + num2).find('.dulce' + num2 + '-' + num ).attr('src');
        }
    }

    if(ducles_acumulados != [] && epserar == false){
        epserar = true;

        $.each(ducles_acumulados, function (ind, elem) { 
            if ($(".dulce" + elem).addClass( "borrar_dulce" ) != ""){
                $(".dulce" + elem).addClass( "borrar_dulce" );
                Contar_Puntos(1);
            }
        });

        setTimeout(function() {
            borrardulcesjugada();
        },500);
    }
}


function borrardulcesjugada(){
    $(".borrar_dulce").remove();
    for (var num = 1; num <= 7; num++) {
        for (var num2 = 1; num2 <= 7; num2++) {
            $('.dulce' + num2 + '-' + num).removeClass( 'dulce' + num2 + '-' + num );
        }
    }

    setTimeout(function() {
        LlenarDulces();
        organizar_dulces();
        agregarDulcesEvents();
    },400);   
    setTimeout(function() {
        epserar = false;
        HacerJugada();
    },400);    
}

function agregarDulcesEvents() {
    $('img').draggable({
        containment: '.panel-tablero',
        droppable: 'img',
        revert: true,
        revertDuration: 500,
        grid: [100, 100],
        drag: movimientos_dulce
    });

    $('img').droppable({
        drop: moverDulce
    });
}

function moverDulce(event, drag){
    var drag = $(drag.draggable);
    var dragSrc = drag.attr('src');
    var drop = $(this);
    var dropSrc = drop.attr('src');
    drag.attr('src', dropSrc);
    drop.attr('src', dragSrc);

    setTimeout(function () {
        HacerJugada();
        Contar_Movimientos();
    }, 800);
}

function Contar_Puntos(dulces){
    var puntosActuales = Number($('#score-text').text());
    var nuevosPuntos = puntosActuales += dulces;
    $('#score-text').text(nuevosPuntos);
}

function Contar_Movimientos(){
    var movimientos = Number($('#movimientos-text').text());
    movimientos += 1; 
    $('#movimientos-text').text(movimientos);
}

function movimientos_dulce(event, moveDrag) {
    moveDrag.position.top = Math.min(100, moveDrag.position.top);
    moveDrag.position.bottom = Math.min(100, moveDrag.position.bottom);
    moveDrag.position.left = Math.min(100, moveDrag.position.left);
    moveDrag.position.right = Math.min(100, moveDrag.position.right);
}

$(".btn-reinicio").on("click", function(){
    clearTimeout("updateReloj()");
    if  (min == 0 && seg == 0) {
        $('.panel-tablero').toggle(1000)
        $('.time').toggle(1000)
        $('.panel-score').width('25%')
    }

    min = 2;
    seg = 0;
    puntos = 0;
    $(".dulces").remove('img');
    $(".btn-reinicio").text("Reiniciar");
    $("#timer").text("02:00");

    LlenarDulces();
    organizar_dulces();
    agregarDulcesEvents(); 
    HacerJugada();    
    updateReloj();
});
