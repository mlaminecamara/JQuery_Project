
$(function(){
    var score = 0;
    var grille;

    function blankGrille(){
        return [[ 0, 0, 0, 0],
                [ 0, 0, 0, 0],
                [ 0, 0, 0, 0],
                [ 0, 0, 0, 0]
                ];
    }

    function setup(){

        grille = blankGrille();
        //console.table(grille);
        addNumber();
        addNumber();
        //console.table(grille);
    }

    // fonction pour générér des chiffres aléatoires en random(2 ou 4)
    function addNumber(){
        var options = [];
        for(var i = 0; i < 4; i++){
            for( var j= 0; j < 4; j++){
                if(grille[i][j] === 0)
                    options.push({ x : i, y: j});
                
            }
        }
        if(options.length > 0){
            var place = options[Math.floor(Math.random() * options.length)];
                var r = Math.floor((Math.random() * 10))
                grille[place.x][place.y] = r > 0.7 ? 2: 4;
        }
        
       
    }
    // fonction pour comparer ma grille avec sa copie
    function compare(a, b){
        var a;
        var b;
        for(var i = 0; i < 4; i++){
            for( var j= 0; j < 4; j++){
            if(a[i][j] !== b[i][j]){
                return true;
            }
        }
    }
    return false;
    }

    // on fait une boucle pour dessiner la grille en remplissant avec les coordonnées i et j des nombres générés
    function Dessiner(){
        $(".container").empty();
        for(var i = 0; i < 4; i++){
            $(".container").append('<div class="grid-row" id ="row" '+ i +'></div>');
            for( var j= 0; j < 4; j++){
                if(grille[i][j] === 0)
                $(".container").append('<div class="grid-cell" id =""></div>');
                else
                //console.log(grille[i][j]);
                $(".container").append('<div class="grid-cell" id =""> ' +grille[i][j] + '</div>');
            }   
        
        }

    }

 // fonction qui slide les zéros vers la droite 
function slide_left(row){
var arr = row.filter(val => val);  // filtre uniquement sur une ligne qui contient des valeurs autres que zéros
var missing = 4 - arr.length; // les autres élements sont récupérés 
var zeros = Array(missing).fill(0);  // Les autres sont mis dans un tableau et remplis de zéros
arr = arr.concat(zeros); //On ajoute les zéros à l'array 
return arr;
} 

// function pour slider les zéros vers la gauche
function slide_right(row){
    var arr = row.filter(val => val);  // filtre uniquement sur une ligne qui contient des valeurs autres que zéros
    var missing = 4 - arr.length; // les autres élements sont récupérés 
    var zeros = Array(missing).fill(0);  // Les autres sont mis dans un tableau et remplis de zéros
    arr = zeros.concat(arr); //On ajoute l'array au zéros
    return arr;
    } 


//fonction qui additionne deux cells identiques en allant vers la droite
function combine_right(row){
    for(var i = 3; i >= 1; i--){
        var a = row[i];
        var b = row[i-1];
        if(a == b){
            row[i] = a + b;
            score += row[i];
            $(".score").html(score);
            row[i-1] = 0;
            //break;
        }
    }
    return row;
}

//fonction qui additionne deux cells identiques en allant vers la gauche
function combine_left(row){
    for(var i = 0; i <= 2 ; i++){
        var a = row[i];
        var b = row[i+1];
        if(a == b){
            row[i] = a + b;
            score += row[i];
            $(".score").html(score);
            row[i+1] = 0;
            //break;
        }
    }
    return row;
}

//fonction qui fait bouger à droite
function moveRight(){
    var past = copyGrille(grille);  // on crée une variable pour stocker la copie de notre grille
    
    for(var i=0; i < 4; i++){
        grille[i] = operate_right(grille[i]);
        for(var j= 0; j < 4; j++){
            $(".container").empty().html("" + grille[i] + " ");
        }       
        
    }
    var changed = compare(past, grille);  // on vérifie la valeur de changed après les opérations
    if(changed){                          // Si quelquechose  change (change = true) alors on ajoute un chiffre
        addNumber(); 
    }
   
       
}

// function pour bouger à gauche
function moveLeft(){
    var past = copyGrille(grille);  
    
    for(var i=0; i < 4; i++){
        grille[i] = operate_left(grille[i]);
        for(var j= 0; j < 4; j++){
            $(".container").empty().html("" + grille[i] + " ");
        }       
        
    }
    var changed = compare(past, grille); 
    if(changed){                          
        addNumber(); 
    }

    
}

//fonction pour bouger vers le haut 
function moveUp(){
    grille = rotateGrille();
    moveLeft();
    grille = rotateGrille();
    grille = rotateGrille();
    grille = rotateGrille();
}

//fonction pour buger vers le bas
function moveDown(){
    grille = rotateGrille();
    moveRight();
    grille = rotateGrille();
    grille = rotateGrille();
    grille = rotateGrille();

}

// Fonction qui opère les opérations slide et combine sur chacune des lignes
function operate_right(row){
    row = slide_right(row);
    row = combine_right(row);// après le slide,on combine
    row = slide_right(row);
    return row;
}

function operate_left(row){
    row = slide_left(row);
    row = combine_left(row);// après le slide , on combine
    row = slide_left(row);
    return row;
}



// fonction pour rotate la grille afin de gérer les mouvements haut et bas
function rotateGrille(){
    var newGrille = blankGrille();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            newGrille[i][j] = grille[j][i];
        }
    }
    return newGrille;
}

//fonction qui copie la grille initiale.
function copyGrille(){
    var extra = blankGrille();
 for(var i = 0; i < 4; i++){
    for( var j= 0; j < 4; j++){
        extra[i][j] = grille[i][j];
    }
}
return extra;
}


$(document).on("keydown",function(event) {
    //console.log("hello");   
    //var key = event.which || event.keyCode;
    var game = Gameover();
    switch(event.which){
        case 37:
        moveLeft();
        break;
        case 38:
        moveUp();
        break;
        case 39:
        moveRight();
        break;
        case 40:
        moveDown();
        break;  
        //default:break;
    }
    if(game){
        alert("Game over");
    }
  Dessiner();
})
    
function Gameover(){
    var gameover = true;
    for(var i = 0; i < 3; i++){
        for( var j= 0; j < 3; j++){
            if(grille[i][j] === 0)
            return false;
            if(grille[i][j] == grille[i][j+1])
            return false;
            if(grille[i][j] == grille[i+1][j])
            return false;
        }   
}
return true;
}

$(document).ready(function() {
    setup();
    Dessiner();
    $(".newgame").click(function(){
        setup();
        Dessiner();
    })
    //console.log(operate[0 ,0, 2, 2]);
    //keyPressed();
    //console.log(slide([4,0,2, 4]));              
   
})


})
