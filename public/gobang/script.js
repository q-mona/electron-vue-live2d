var chessB = [];
var wins = [];
var ok = false;
var me = true;
var myWin = [];
var PCWin = [];
var chess = document.getElementById('chess');
var context = chess.getContext('2d');
context.strokeStyle = '#bfbfbf';

let step = 0
var DrawCB = function () {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}

window.onload = function () {
    DrawCB();
}
// win needs
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

var count = 0;

for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i + k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    PCWin[i] = 0;
}





for (var i = 0; i < 15; i++) {
    chessB[i] = [];
    for (var j = 0; j < 15; j++) {
        chessB[i][j] = 0;
    }
}
var oneStep = function (i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gre = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gre.addColorStop(0, '#0a0a0a');
        gre.addColorStop(1, '#636766');
    } else {
        gre.addColorStop(0, '#d1d1d1');
        gre.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gre;
    context.fill();

}


chess.onclick = function (e) {
    step++
    window.document.querySelector('#step').innerHTML = step
    if (ok) {
        return;
    }
    if (!me) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessB[i][j] == 0) {
        oneStep(i, j, me);
        chessB[i][j] = 1;         
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                PCWin[k] = 6;
                if (myWin[k] == 5) {
                    window.alert("赢！");
                    ok = true;
                }
            }
        }
        if (!ok) {
            me = !me;
            PCAI();
        }
    }

}

var PCAI = function () {
    var myS = [];
    var PCS = [];
    var max = 0;
    var u = 0,
        v = 0;
    for (var i = 0; i < 15; i++) {
        myS[i] = [];
        PCS[i] = [];
        for (var j = 0; j < 15; j++) {
            myS[i][j] = 0;
            PCS[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessB[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myS[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myS[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myS[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myS[i][j] += 99999;
                        }

                        if (PCWin[k] == 1) {
                            PCS[i][j] += 220;
                        } else if (PCWin[k] == 2) {
                            PCS[i][j] += 420;
                        } else if (PCWin[k] == 3) {
                            PCS[i][j] += 2100;
                        } else if (PCWin[k] == 4) {
                            PCS[i][j] += 999999;
                        }
                    }
                }
                if (myS[i][j] > max) {
                    max = myS[i][j];
                    u = i;
                    v = j;
                } else if (myS[i][j] == max) {
                    if (PCS[i][j] > PCS[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                if (PCS[i][j] > max) {
                    max = PCS[i][j];
                    u = i;
                    v = j;
                } else if (PCS[i][j] == max) {
                    if (myS[i][j] > myS[u][v]) {
                        u = i;
                        v = j;
                    }
                }

            }
        }
    }
    oneStep(u, v, false);
    chessB[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            PCWin[k]++;
            myWin[k] = 6;
            if (PCWin[k] == 5) {
                window.alert("寄!");
                ok = true;
            }
        }
    }
    if (!ok) {
        me = !me;
    }
}