var chiGioca = false; //se false è il pc //se true io
function ScegliGioco(classCella){
    if(document.getElementById("rdb1vs1").checked)
        chiGioca = true;

    for(let i =0; i<9; i++)
        document.getElementsByClassName(classCella)[i].style.borderColor = "black";
    
    document.getElementById("helpGui").innerText = "Stai giocando..."
    
}                            
                            //colonne       0  1   2
var tris = [      //righe                   
    ["","",""],        //0                  0,0  0,1  0,2
    ["","",""],        //1                  1,0  1,1  1,2
    ["","",""]        //2                   2,0  2,1  2,2
];
var turno=0;

//se a = b e b = c allora c=a, a deve averre un valore 
let RelazioneTransitiva = (a,b,c) => (a==b && b==c && a != "");

function ControllaVincitore(){
    var vincitore ="";

    // righe
    for(let i=0; i<3; i++)
        if(RelazioneTransitiva(tris[i][0], tris[i][1], tris[i][2]))
            vincitore=tris[i][0];

    //colonne
    if(RelazioneTransitiva(tris[0][0],tris[1][0], tris[2][0]))
        vincitore = tris[0][0];
    
    if(RelazioneTransitiva(tris[0][1],tris[1][1], tris[2][1]))  
        vincitore = tris[0][1];

    if(RelazioneTransitiva(tris[0][2],tris[1][2], tris[2][2]))
        vincitore = tris[0][2];
        
    //diagonale 1
    if(RelazioneTransitiva(tris[0][0],tris[1][1], tris[2][2]))
        vincitore=tris[0][0]

    //diagonale 2
    if(RelazioneTransitiva(tris[2][0],tris[1][1], tris[0][2]))
        vincitore=tris[2][0]

    return vincitore;

}
//inizia giocatore, driver del codice
function Segna(divID){
        if(turno<8){
            XorO(divID); // il primo è del giocatore 
            if(Vittoria(ControllaVincitore())){
                setTimeout(function(){ location.reload()}, 1000);
                return true;
            }
                
            if(!chiGioca){
                TurnoPc(); //turno pc  

                if(Vittoria(ControllaVincitore())){
                    setTimeout(function(){ location.reload()}, 1000);
                        return true;
                }
            }
        }
        else{
            alert("Patta!\nLa pagina verrà aggiornata...");
            setTimeout(function(){ location.reload()}, 1000);
        }          
}

function Vittoria(vincitore){
    let f = false;
    if(vincitore!=""){
        setTimeout(
            function(){ 
            alert(`Congratulazioni ${vincitore} hai vinto... La pagina verrà riaggiornata `);
            }, 
        200); 
        f=true;
    }
    return f;
}

function SetMatrix(index, segno){
    // divX substring(3) rimane X-1  X diventa un int → div1 → 1 → 0
    // 3 →2
    // 4 → 3
    index = index.substring(3)-1;   
    if(index<3) tris[0][index] = segno;
    else
        switch(index){
            case 3:
                tris[1][0] = segno;
                break;    
            case 6:
                tris[2][0] = segno;
                break;           
        }
   
    if(index<6 && index>3)
        tris[1][index-3] = segno;

    if(index<9 && index>6)
        tris[2][index-6] = segno;
        
}

//toglie possibilita di cliccare e mette X o O, popolo matrice
function XorO(divID){
    var retval = document.getElementById(divID);

    var segno;
    if(turno%2==0)
        segno="X";
    else
        segno="O";

    retval.innerText = segno
    retval.removeAttribute("onclick");
    SetMatrix(divID, segno);

    turno++;
}
function TurnoPc(){
    //finchè non trova uno spazio cliccabile
    while(true){
        let pos = "div"+ Math.floor(1 + Math.random()*9)
        let retval = document.getElementById(pos);
        if(retval.onclick != null){
            XorO(pos)
            break;
        }
    }
}