var s_aSession = new Array();
var isStartFreeSpin;
var MoneyFromFreeSpin;
var isStartBonus;
var randtest = 0;

var NUM_ROWS = 3;
var NUM_REELS = 5;
var _aFinalSymbols = new Array();
var _aRandSymbols = new Array();
_aRandSymbols = _initSymbolsOccurence();
var _aPaylineCombo = new Array();
_aPaylineCombo = _initPaylines();
var _aSymbolWin = new Array();

var _iNumSymbolFreeSpin = 0;

s_aSession["bBonus"] = 0;
    
function _initSettings(){
    s_aSession["iMoney"] = _oProfile.GetWalletBalance();                            //USER MONEY
    s_aSession["iSlotCash"] = SLOT_CASH;                       //SLOT CASH. IF USER BET IS HIGHER THAN CASH, USER MUST LOOSE.
    s_aSession["win_occurrence"] = WIN_OCCURRENCE;                    //WIN OCCURRENCE(FROM 0 TO 100)
    s_aSession["freespin_occurrence"] = FREESPIN_OCCURRENCE;               //IF USER MUST WIN, SET THIS VALUE FOR FREESPIN OCCURRENCE
    s_aSession["bonus_occurrence"] = BONUS_OCCURRENCE;                  //IF USER MUST WIN, SET THIS VALUE FOR BONUS OCCURRENCE
    s_aSession["freespin_symbol_num_occur"] = FREESPIN_SYMBOL_NUM_OCCURR; //WHEN PLAYER GET FREESPIN, THIS ARRAY GET THE OCCURRENCE OF RECEIVING 3,4 OR 5 FREESPIN SYMBOLS IN THE WHEEL
    s_aSession["num_freespin"] = NUM_FREESPIN;                 //THIS IS THE NUMBER OF FREESPINS IF IN THE FINAL WHEEL THERE ARE 3,4 OR 5 FREESPIN SYMBOLS
    s_aSession["bonus_prize"] =  BONUS_PRIZE; //THIS IS THE LIST OF BONUS PRIZES. KEEP BEST PRIZE IN PENULTIMATE POSITION IN ARRAY
    s_aSession["bonus_prize_occur"] = BONUS_PRIZE_OCCURR; //OCCURRENCE FOR EACH PRIZE IN BONUS_PRIZES. HIGHER IS THE NUMBER, MORE POSSIBILITY OF OUTPUTHAS THE PRIZE
    s_aSession["coin_bet"] = COIN_BET;
    
    _aSymbolWin = _initSymbolWin();
}

function checkLogin(){
    s_aSession["iTotFreeSpin"] = 0;
    s_aSession["bFreeSpin"] = 0;
    
    //STARTING MONEY
    _initSettings();
    _setMinWin();
    return _tryToCheckLogin();
}

function _tryToCheckLogin(){
    //THIS FUNCTION PASS USER MONEY AND BONUS PRIZES FOR THE WHEEL
    var aTmp = new Array();
    for(var i=0;i< _aSymbolWin.length;i++){
        aTmp[i] = _aSymbolWin[i].join(",");
    }
    
    return "res=true&login=true&money="+s_aSession["iMoney"]+"&bonus_prize="+s_aSession["bonus_prize"].join("#")+"&paytable="+
                                                            aTmp.join("#")+"&coin_bet="+s_aSession["coin_bet"].join("#");
}
    
function _setMinWin(){
    //FIND MIN WIN
    s_aSession["min_win"] = 9999999999999;
    for(var i=0;i<_aSymbolWin.length;i++){
        var aTmp = _aSymbolWin[i];
        for(var j=0;j<aTmp.length;j++){
            if(aTmp[j] !== 0 && aTmp[j] < s_aSession["min_win"]){
                s_aSession["min_win"] = aTmp[j];
            }
        }
    }
}

function callSpin(iNumBettingLines,iCoin,iCurBet){
    var preview = false;
    return _onSpin(iNumBettingLines,iCoin,iCurBet,preview);
}

function _onSpin(iNumBettingLines,iCoin,iCurBet,_preview){
    //CHECK IF iCurBet IS < DI iMoney OR THERE IS AN INVALID BET
    s_aSession["iMoney"] = _oProfile.GetWalletBalance();
    $(s_oMain).trigger("bet_placed",{bet:iCoin,tot_bet:iCurBet});
    
    //DECREASING USER MONEY WITH THE CURRENT BET
    s_aSession["bBonus"] = 0;
    
    var bFreespin = 0;
    var bBonus = 0;

    var iRandOccur = Math.floor(Math.random()*100);
    var iRand;
    if(iRandOccur < s_aSession["win_occurrence"]){
            //WIN
            iRand = Math.floor(Math.random()*(101));
                    if(iRand < (s_aSession["freespin_occurrence"]+s_aSession["bonus_occurrence"]))
                    {
                        //PLAYER GET BONUS OR FREESPIN
                        iRand = Math.floor(Math.random()*(s_aSession["freespin_occurrence"]+s_aSession["bonus_occurrence"])+1);
                        if(iRand <= s_aSession["freespin_occurrence"]){
                                bFreespin = 1;
                        }else
                        {
				            bBonus = 1;
			            }       
			            //else if(s_aSession["iSlotCash"] >= (s_aSession["bonus_prize"][0] * iCoin)){
                                //if(randtest === 1){
                                   // bFreespin = 1;
                                    //randtest = 0;
                                //}else{
                                   // bBonus = 1;
                                //}
                                
                        //}else{
                                //NOT ENOUGH MONEY FOR ANY BONUS PRIZE
                                //bBonus = 0;
                        //}

                    }
            var iPrizeReceived = -1;
            var iBonusWin = 0;
            var iCont = 0;
            do{
                generateRandomSymbols(bFreespin,bBonus);
                var aRet = checkWin(bFreespin,bBonus,iNumBettingLines);
                var iTotWin = 0;
                for(var i=0;i<aRet.length;i++){
                        iTotWin += aRet[i]['amount'];
                }
                iTotWin *= iCoin;
                iBonusWin = 0;
                iPrizeReceived = -1;

                if(bBonus === 1 ){
                    //BONUS WIN
                    s_aSession["bBonus"] = 1;

                    var aPrizeLength = new Array();
                    for(var k=0; k<s_aSession["bonus_prize_occur"].length; k++){
                            var iCount = s_aSession["bonus_prize_occur"][k];
                            for(var j=0;j<iCount;j++){
                                    aPrizeLength.push(k);
                            }
                    }
                    var iRandIndex = Math.floor(Math.random()*(aPrizeLength.length));
                    iPrizeReceived = aPrizeLength[iRandIndex];
                    iBonusWin = (s_aSession["bonus_prize"][iPrizeReceived]);
                }
                    iCont++;
                    var result = iBonusWin + iTotWin;
					result = parseFloat(result.toFixed(2));
                    if(iCont++ > 500){
                        return;
                    }
					////console.log("result: " + result);
					////console.log("GetResultToSpin: " + GetResultToSpin(_lineNumber, _betPerLine, _iCurMode, result));
            }while(aRet.length === 0 || !GetResultToSpin(_iLastLineActive, _iCurBet, _iCurMode, result));
            //while(aRet.length === 0 || (iBonusWin+iTotWin) > s_aSession["iSlotCash"] || (iBonusWin+iTotWin) < iCurBet);
            if(_preview){
                //_iNumSymbolFreeSpin = 0;
            }
            s_aSession["iMoney"] = s_aSession["iMoney"] + iTotWin + iBonusWin; 
            s_aSession["iSlotCash"] = s_aSession["iSlotCash"] - iTotWin - iBonusWin;

            //DECREASE FREESPIN NUMBER EVENTUALLY
            if(s_aSession["bFreeSpin"] === 1 ){
                //s_aSession["iTotFreeSpin"] = s_aSession["iTotFreeSpin"] -1;
                isStartFreeSpin = false;
                s_aSession["iTotFreeSpin"] = s_aSession["iTotFreeSpin"] -1;

                if(s_aSession["iTotFreeSpin"] < 0)
                {
                        s_aSession["iTotFreeSpin"] = 0;
                        s_aSession["bFreeSpin"] = 0;
                }
            }

            if(bFreespin === 1 && _iNumSymbolFreeSpin > 2){
                    s_aSession["bFreeSpin"] = 1;
                    s_aSession["iTotFreeSpin"] += (s_aSession["num_freespin"][_iNumSymbolFreeSpin-3]);
                    _CountFSonOneSpin = s_aSession["num_freespin"][_iNumSymbolFreeSpin-3];
                    _FreespinfromBonus = 0;
                    isStartFreeSpin = true;
                    //console.log("4444" + isStartFreeSpin);
            }
            var resultJson = "res=true&win=true&pattern="+JSON.stringify(_aFinalSymbols)+"&win_lines="+JSON.stringify(aRet)+"&money="+s_aSession["iMoney"]+
            "&tot_win="+iTotWin+"&freespin="+s_aSession["iTotFreeSpin"]+"&bonus="+s_aSession["bBonus"]+"&bonus_prize="+iPrizeReceived+"&cash="+s_aSession["iSlotCash"] ;
            
            return resultJson;
    }
}
	
function _initPaylines(){
    //STORE ALL INFO ABOUT PAYLINE COMBOS

    _aPaylineCombo[0] = [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[1] = [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }];
    _aPaylineCombo[2] = [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }];
    _aPaylineCombo[3] = [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 3 }, { row: 0, col: 4 }];
    _aPaylineCombo[4] = [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }];
    _aPaylineCombo[5] = [{row:0,col:0},{row:0,col:1},{row:1,col:2},{row:0,col:3},{row:0,col:4}];
    _aPaylineCombo[6] = [{row:2,col:0},{row:2,col:1},{row:1,col:2},{row:2,col:3},{row:2,col:4}];
    _aPaylineCombo[7] = [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[8] = [{ row: 1, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[9] = [{ row: 1, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 2 }, { row: 0, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[10] = [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[11] = [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 0, col: 4 }];
    _aPaylineCombo[12] = [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }];
    _aPaylineCombo[13] = [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[14] = [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }];
    _aPaylineCombo[15] = [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 0, col: 4 }];
    _aPaylineCombo[16] = [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }];
    _aPaylineCombo[17] = [{ row: 0, col: 0 }, { row: 2, col: 1 }, { row: 0, col: 2 }, { row: 2, col: 3 }, { row: 0, col: 4 }];
    _aPaylineCombo[18] = [{ row: 2, col: 0 }, { row: 0, col: 1 }, { row: 2, col: 2 }, { row: 0, col: 3 }, { row: 2, col: 4 }];
    _aPaylineCombo[19] = [{ row: 0, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 0, col: 4 }];

    return _aPaylineCombo;
};
	
function _initSymbolsOccurence(){
    var i;

    //OCCURENCE FOR SYMBOL 1
    for(i=0;i<6;i++){
        _aRandSymbols.push(1);
    }

    //OCCURENCE FOR SYMBOL 2
    for(i=0;i<9;i++){
        _aRandSymbols.push(2);
    }

    //OCCURENCE FOR SYMBOL 3
    for(i=0;i<7;i++){
        _aRandSymbols.push(3);
    }

    //OCCURENCE FOR SYMBOL 4
    for(i=0;i<10;i++){
        _aRandSymbols.push(4);
    }

    //OCCURENCE FOR SYMBOL 5
    for(i=0;i<8;i++){
        _aRandSymbols.push(5);
    }

    //OCCURENCE FOR SYMBOL 6
    for(i=0;i<6;i++){
        _aRandSymbols.push(6);
    }

    //OCCURENCE FOR SYMBOL 7
    for(i=0;i<7;i++){
        _aRandSymbols.push(7);
    }

    //OCCURENCE FOR SYMBOL 8
    for(i=0;i<8;i++){
        _aRandSymbols.push(8);
    }

    //OCCURENCE FOR SYMBOL 9 (WILD)
    for(i=0;i<1;i++){
        _aRandSymbols.push(9);
    }

    //OCCURENCE FOR SYMBOL 10 (BONUS)
    for(i=0;i<2;i++){
        _aRandSymbols.push(10);
    }

     //OCCURENCE FOR SYMBOL 11 (FREESPIN)
    for(i=0;i<2;i++){
        _aRandSymbols.push(11);
    }
    
    return _aRandSymbols;
};
	
//THIS FUNCTION INIT WIN FOR EACH SYMBOL COMBO
//EXAMPLE: _aSymbolWin[0] = array(0,0,20,25,30) MEANS THAT
//CHERRY SYMBOL GIVES THE FOLLOWING PRIZE FOR:
//COMBO 1 : 0$
//COMBO 2 : 0$
//COMBO 3 : 20$
//COMBO 4 : 25$
//COMBO 5 : 30$
function _initSymbolWin(){
    _aSymbolWin[0] = PAYTABLE_VALUES[0];
    _aSymbolWin[1] = PAYTABLE_VALUES[1];
    _aSymbolWin[2] = PAYTABLE_VALUES[2];
    _aSymbolWin[3] = PAYTABLE_VALUES[3];
    _aSymbolWin[4] = PAYTABLE_VALUES[4];
    _aSymbolWin[5] = PAYTABLE_VALUES[5];
    _aSymbolWin[6] = PAYTABLE_VALUES[6];
    _aSymbolWin[7] = PAYTABLE_VALUES[7];
    _aSymbolWin[8] = [0,0,0,0,0,0];
    _aSymbolWin[9] = [0,0,0,0,0,0];
    _aSymbolWin[10] = [0,0,0,0,0,0];
    
    return _aSymbolWin;
};
    
	
function generLosingPattern(){
    var aFirstCol = new Array();
    for(var i=0;i<NUM_ROWS;i++){
        do{
            var iRandIndex = Math.floor(Math.random()*(_aRandSymbols.length)); 
        }while(_aRandSymbols[iRandIndex] === 10 || _aRandSymbols[iRandIndex] === 11 || _aRandSymbols[iRandIndex] === 9);
        
        var iRandSymbol = _aRandSymbols[iRandIndex];
        aFirstCol[i] = iRandSymbol;  
    }

    for(var i=0;i<NUM_ROWS;i++){
        _aFinalSymbols[i] = new Array();
        for(var j=0;j<NUM_REELS;j++){
            if(j == 0){
                _aFinalSymbols[i][j] = aFirstCol[i];
            }else{
                do{
                    iRandIndex =  Math.floor(Math.random()*_aRandSymbols.length);
                    iRandSymbol = _aRandSymbols[iRandIndex];
                }while(aFirstCol[0] === iRandSymbol || aFirstCol[1] === iRandSymbol || aFirstCol[2] === iRandSymbol ||
                        iRandSymbol === 10 || iRandSymbol === 11 || iRandSymbol === 9);

                _aFinalSymbols[i][j] = iRandSymbol;			
            }  
        }
    }
};
	
function generateRandomSymbols(bFreespin,bBonus){
    for(var i=0;i<NUM_ROWS;i++){
        _aFinalSymbols[i] = new Array();
        for(var j=0;j<NUM_REELS;j++){
            do{
                var iRandIndex = Math.floor(Math.random()*_aRandSymbols.length);
                iRandSymbol = _aRandSymbols[iRandIndex];
                _aFinalSymbols[i][j] = iRandSymbol;
            }while(iRandSymbol === 10 || iRandSymbol === 11);
        }
    }

    if(bFreespin === 1){
        //DECIDE HOW NAMY FREESPIN SYMBOL MUST APPEAR( MINIMUM 3, MAX 5)
        var aTmp = new Array();
        for(i=0;i<s_aSession["freespin_symbol_num_occur"].length;i++){
            for(j=0;j<s_aSession["freespin_symbol_num_occur"][i];j++){
                aTmp.push(i);
            }
        }

        var iRand =  Math.floor(Math.random()*aTmp.length);
        _iNumSymbolFreeSpin = 3 + aTmp[iRand];

        var aCurReel = [0,1,2,3,4];
        aCurReel = shuffle ( aCurReel );
        for(var k=0;k<_iNumSymbolFreeSpin;k++){
            var iRandRow = Math.floor(Math.random()*3);
            _aFinalSymbols[iRandRow][aCurReel[k]] = 11;
        }
    }else if(bBonus === 1){
        //DECIDE WHERE BONUS SYMBOL MUST APPEAR.          
        aCurReel = [0,1,2,3,4];
        aCurReel = shuffle ( aCurReel );
        var iNumBonusSymbol = Math.floor(Math.random()*3+3);
        for(var k=0;k<iNumBonusSymbol;k++){
            iRandRow = Math.floor(Math.random()*3);
            _aFinalSymbols[iRandRow][aCurReel[k]] = 10;
        }
    }
}
	
    function checkWin(bFreespin,bBonus,iNumBettingLines){
        //CHECK IF THERE IS ANY COMBO
        var _aWinningLine = new Array();
        var aCombos;

        ////console.log(_aPaylineCombo); //Paylinecombo la mot mang gom inumbetline phan tu
        for(var k=0;k<iNumBettingLines;k++){ //numbet line = amout of line player bet
            aCombos = _aPaylineCombo[k];

            var aCellList = new Array();
            var iValue = _aFinalSymbols[ aCombos[0] ['row'] ] [ aCombos[0] ['col'] ];

            var iNumEqualSymbol = 1;
            var iStartIndex = 1;
            
            aCellList.push({row:aCombos[0]['row'],col:aCombos[0]['col'],value:_aFinalSymbols[aCombos[0]['row']][aCombos[0]['col']]} );

            while(iValue === 9 && iStartIndex<NUM_REELS){
                iNumEqualSymbol++;
                iValue = _aFinalSymbols[aCombos[iStartIndex]['row']][aCombos[iStartIndex]['col']];
		
                aCellList.push( {row: aCombos[iStartIndex]['row'] ,col:aCombos[iStartIndex]['col'] ,value:_aFinalSymbols[aCombos[iStartIndex]['row']][aCombos[iStartIndex]['col']]} );                                                    
                iStartIndex++;
            }
            
            for(var t=iStartIndex;t<aCombos.length;t++){
                if(_aFinalSymbols[aCombos[t]['row']][aCombos[t]['col']] === iValue || 
                                            _aFinalSymbols[aCombos[t]['row']][aCombos[t]['col']] === 9){
                    iNumEqualSymbol++;
                    
                    
                    aCellList.push({row:aCombos[t]['row'],col:aCombos[t]['col'],value:_aFinalSymbols[aCombos[t]['row']][aCombos[t]['col']]} );
                }else{
                    break;
                }
            }
            
            if(_aSymbolWin[iValue-1][iNumEqualSymbol-1] > 0){
                _aWinningLine.push({line:k+1,amount:_aSymbolWin[iValue-1][iNumEqualSymbol-1],num_win:iNumEqualSymbol,value:iValue,list:aCellList});
            }
        }
        
        if(bFreespin === 1){
            aCellList = new Array();
            for(var i=0;i<NUM_ROWS;i++){
                for(var j=0;j<NUM_REELS;j++){
                    if(_aFinalSymbols[i][j] === 11){
                        aCellList.push({row:i,col:j,value:11});
                    }
                }
            }

            _aWinningLine.push({line:0,amount:0,num_win:aCellList.length,value:11,list:aCellList});
            
        }else if(bBonus === 1){
            var aCellList = new Array();
            for(var i=0;i<NUM_ROWS;i++){
                for(j=0;j<NUM_REELS;j++){
                    if(_aFinalSymbols[i][j] === 10){
                        aCellList.push({row:i,col:j,value:10});
                    }
                }
            }

            _aWinningLine.push({line:0,amount:0,num_win:aCellList.length,value:10,list:aCellList});
	}
        
        
        return _aWinningLine;
    }

    function shuffle(aArray){
        for(var j, x, i = aArray.length; i; j = Math.floor(Math.random() * i), x = aArray[--i], aArray[i] = aArray[j], aArray[j] = x);
        return aArray;
    }

    function _dieError( szReason){
        return "res=false&desc="+szReason;
    }	