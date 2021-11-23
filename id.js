function $(id){return document.getElementById(id)};
function qA(selector){return document.querySelectorAll(selector)};
function ran(max){return Math.floor(Math.random()*max)}

let Prs = {
    alea : ['#','#','#','#','#','#','#','#'],
    codeCitoyen : '###CODE##',
    genCode:function(){
        let codeP='';
        let rLettre = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
                       'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        for(let i=0;i<9;i++){
            if(Math.random()<0.5){
                codeP += rLettre[ran(rLettre.length)];
            } else {
                codeP += ran(10);
            }
        }
        Prs.codeCitoyen = codeP;

        for(let i=0; i<8 ; i++) {
            this.alea[i] = ran(10);
        }

    },
    getInfo : function() {
        prenom();
        nom();
        genre();
        date();
        natio();
        expiration();
        codeRecto();
        codeVerso();
    }

};

// ---------------------------------- //

function prenom(){
    Prs.prenom='';
    Prs.prenomTab=[];
    for(let i=0;i<4;i++){
        if($('pnom'+i).value){
            Prs.prenom += $('pnom'+i).value+', ';
            Prs.prenomTab.push($('pnom'+i).value);
        }
    }
    Prs.prenom = Prs.prenom.substr(0,Prs.prenom.length-2);
}

function nom(){
    Prs.nom = $('nom').value;
}

function genre(){
    let choix = qA('input[name="genre"]');
    for (const i of choix) {
        if (i.checked) {
            Prs.genre = i.value;
        }
    }
}

function date(){
    Prs.dateNais = {
        jour:$('jour').value,
        mois:$('mois').value,
        annee:$('annee').value,
        full:$('jour').value+'.'+$('mois').value+'.'+$('annee').value
    }
}

function natio(){
    Prs.natio = $('natio').value;
}

function expiration(){
    let now = new Date();
    let day = now.getDate(), month = now.getMonth()+1, year = now.getFullYear()+1;
    if (day<10){
        day='0'+day;
    } else if (month<10) {
        month='0'+month;
    }
    Prs.dateExpi = {
        jour:day.toString(),
        mois:month,
        annee:year.toString(),
        full:day+'.'+month+'.'+year
    }
}

function codeRecto(){
    // LIGNE 1 
    let code1 = 'IDKET' + Prs.nom.replaceAll(' ','<') + '<<';
    for(let i=0;i<Prs.prenomTab.length;i++){
        if(code1.length + Prs.prenomTab[i].length <= 36){
            code1+=Prs.prenomTab[i];
            if(code1.length<=35){
                code1+='<';
            }
        }
    }
    while(code1.length<=35){
        code1+='<';
    }

    // LIGNE 2 
    let code2 = Prs.codeCitoyen + Prs.alea[0] + 'KET';
    code2 += Prs.dateNais.annee.substr(Prs.dateNais.annee.length-2);
    code2 += Prs.dateNais.mois + Prs.dateNais.jour;
    code2 += Prs.alea[1];
    code2 += Prs.genre + Prs.dateExpi.annee.substr(Prs.dateExpi.annee.length-2);
    code2 += Prs.dateExpi.mois + Prs.dateExpi.jour;
    code2 += Prs.alea[2] + '<<<<<<<' + Prs.alea[3];

    Prs.codeRecto1 = code1;
    Prs.codeRecto2 = code2;
}

function codeVerso(){
    // LIGNE 1
    let code1 = 'IDKET' + Prs.codeCitoyen + Prs.alea[4];
    while(code1.length<30){
        code1 += '<';
    }

    // LIGNE 2
    let code2 = Prs.dateNais.annee.substr(Prs.dateNais.annee.length-2);
    code2+=Prs.dateNais.mois+Prs.dateNais.jour+Prs.alea[5];
    code2+=Prs.genre+Prs.dateExpi.annee.substr(Prs.dateExpi.annee.length-2);
    code2+=Prs.dateExpi.mois+Prs.dateExpi.jour+Prs.alea[6];
    while(code2.length<29){
        code2+='<';
    }
    code2+=Prs.alea[7];

    // LIGNE 3 
    let code3 = Prs.nom.replaceAll(' ','<') + '<<';
    for(let i=0;i<Prs.prenomTab.length;i++){
        if(code3.length+Prs.prenomTab[i].length<31){
            code3+=Prs.prenomTab[i];
            if(code3.length<30){
                code3+='<';
            }
        }
    }
    while(code3.length<30){
        code3+='<';
    }

    Prs.codeVerso1 = code1;
    Prs.codeVerso2 = code2;
    Prs.codeVerso3 = code3;
}

// ---------------------------------- // 

let cvs=$('cvs'),ctx=cvs.getContext('2d');
let cvs2=$('cvs2'),ctx2=cvs2.getContext('2d');
let cvs3=$('dl-cvs'),ctx3=cvs3.getContext('2d');

function clean(canvas, context) {
    context.clearRect(0,0,canvas.width,canvas.height);
}

function drawRecto(context,y) {

    Prs.getInfo();

    context.font = '120px Bahnshrift';
    context.fillText(Prs.prenom, 1470, 1040+y);
    context.fillText(Prs.nom, 1470, 1285+y);
    context.fillText(Prs.genre, 1470, 1530+y);
    context.fillText(Prs.dateNais.full, 1470, 1775+y);
    context.fillText('KETONSKA/'+Prs.natio, 1470, 2020+y);
    context.fillText(Prs.dateExpi.full, 1470, 2260+y);

    context.font = '160px OCRBRegular';
    let codeR1 = Prs.codeRecto1.split("").join(String.fromCharCode(8202));
    context.fillText(codeR1, 215, 2675+y);
    let codeR2 = Prs.codeRecto2.split("").join(String.fromCharCode(8202))
    context.fillText(codeR2, 215, 2875+y);

    context.font = '75px Bahnshrift';
    context.save();
    context.textAlign='center';
    context.rotate(90*Math.PI/180);
    context.translate(2720+y,-4325);
    context.fillText(Prs.codeCitoyen, 0, 0);
    context.restore();
}

function drawVerso(context){

    Prs.getInfo();

    context.font = '95px Bahnshrift';
    context.fillText(Prs.prenom,2115,570);
    context.fillText(Prs.nom,2115,740);

    context.font = '160px OCRBRegular';
    let codeV1 = Prs.codeVerso1.split("").join(String.fromCharCode(8202));
    context.fillText(codeV1, 845, 2280);
    let codeV2 = Prs.codeVerso2.split("").join(String.fromCharCode(8202))
    context.fillText(codeV2, 845, 2505);
    let codeV3 = Prs.codeVerso3.split("").join(String.fromCharCode(8202));
    context.fillText(codeV3, 845, 2730);

    context.font = '100px Bahnshrift';
    context.save();
    context.textAlign='center';
    context.rotate(90*Math.PI/180);
    context.translate(2440,-4300);
    context.fillText(Prs.codeCitoyen, 0, 0);
    context.restore();
}

function preview() {
    clean(cvs,ctx);
    drawRecto(ctx,0);

    clean(cvs2,ctx2);
    drawVerso(ctx2);
}

// ---------------------------------- // 

$('info').addEventListener('keyup',preview);

qA('input[name="genre"]').forEach(r=>r.addEventListener('click',preview));

$('btnCodeCit').onclick=function(){
    Prs.genCode();
    $('codeCit').innerHTML = Prs.codeCitoyen;
    preview();
}

$('rvBtn').onclick=function(){
    $('rectoDiv').classList.toggle('hide');
    $('versoDiv').classList.toggle('hide');
}

$('genImgBtn').onclick=function(){
    clean(cvs3,ctx3);
    drawRecto(ctx3,cvs3.height/2);
    drawVerso(ctx3);

    let link = document.getElementById('link');
    link.setAttribute('download', 'id-'+Prs.nom+'.png');
    link.setAttribute('href', $('dl-cvs').toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}

// height='1968' width='1488'