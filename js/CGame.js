var _aMovingColumns;
var _iLastLineActive;
var _iCurBet;
var _aFinalSymbolCombo;
var _iTotBet;
var _iCurState;
var _aStaticSymbols;
var _aWinningLine = null;
var _oMadaam;
var _oMadaamDisable;
var _isMaxBetEnable;
var _isMaxBetForBetBut;
var _is5OnaRow;
var _isInBonus;
var _CountFSonOneSpin;

function CGame(oData){
    var _bUpdate = false;
    var _bReadyToStop = false;
    var _bAutoSpin;
    var _iCurReelLoops;
    var _iNextColToStop;
    var _iNumReelsStopped;
    var _iTimeElaps;
    var _iCurWinShown;
    var _iTotWin;
    var _iTotFreeSpin;
    var _iBonus;
    var _iCurBonusPrizeIndex;
    var _iCurCoinIndex;
    var _iNumSpinCont;
    var _aReelSequence;
    var _oReelSound;
    var _oCurSymbolWinSound;
    var _oBg;
    var _oLogo;
    var _oLogoFreeSpin;
    var _oFreeSpinPanel;
    var _oFrontSkin;
    var _oPayTable = null;
    var _oBonusPanel;
    var _oCountReel;
    var _oIndexBonusArray;
    var _oIndexFreeSpinArray;
    var _oIndexWildArray;
    var _iFreeSpin;
	var _iCountBonusSymbol;
    
    this._init = function(){
        _iCurState = GAME_STATE_IDLE;
        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iCurCoinIndex = 0;
        _aReelSequence = new Array(0,1,2,3,4);
        _iNextColToStop = _aReelSequence[0];
        _iLastLineActive = NUM_PAYLINES;
        _iCurBet = MIN_BET;
        _iTotBet = _iCurBet * _iLastLineActive;
        _bAutoSpin = false;
        _iTotFreeSpin = 0;
        _iBonus = 0;
        _iNumSpinCont = 0;
        _iFreeSpin = 0;
        _isMaxBetEnable = false;
        _isMaxBetForBetBut = false;
        _is5OnaRow = false;
        _isInBonus = false;
        
        s_oTweenController = new CTweenController();
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oAttachSection.addChild(_oBg);

        _aFinalSymbolCombo = new Array();
        for(var i=0;i<NUM_ROWS;i++){
            _aFinalSymbolCombo[i] = new Array();
             for(var j=0;j<NUM_REELS;j++){
                _aFinalSymbolCombo[i][j] = 0;
            }
        }
        this._initReels();

        _oFrontSkin = new createjs.Bitmap(s_oSpriteLibrary.getSprite('mask_slot'));
        s_oAttachSection.addChild(_oFrontSkin);

        _oMadaamDisable = new CMadaamAnimDisable(s_oAttachSection);
        _oMadaamDisable.show(0);

        _oMadaam = new CMadaamAnim(s_oAttachSection);
        _oMadaam.show(0);
        
        _oLogo = new createjs.Bitmap(s_oSpriteLibrary.getSprite('logo'));
        _oLogo.x = 650;
        _oLogo.y = 0;
        s_oAttachSection.addChild(_oLogo);
        
        _oLogoFreeSpin = new createjs.Bitmap(s_oSpriteLibrary.getSprite('logo_freespin'));
        _oLogoFreeSpin.x = 590;
        _oLogoFreeSpin.y = 0;
        _oLogoFreeSpin.visible = false;
        s_oAttachSection.addChild(_oLogoFreeSpin);

        _oFreeSpinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('freespin_panel'));
        _oFreeSpinPanel.x = 775;
        _oFreeSpinPanel.y = 0;
        _oFreeSpinPanel.visible = false;
        s_oAttachSection.addChild(_oFreeSpinPanel);

        this._initStaticSymbols();
        _oInterface = new CInterface(_iCurBet,_iTotBet,_oProfile.GetWalletBalance());
        _oPayTable = new CPayTablePanel();

        var fee = 100 * _iCurBet * _iLastLineActive;
        if(_oProfile.GetSweepstakesPoints() < fee){
                _oInterface.disableSpin(_bAutoSpin);
        }
        
        //FIND MIN WIN
        MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length-1];
        for(var i=0;i<s_aSymbolWin.length;i++){
            var aTmp = s_aSymbolWin[i];
            for(var j=0;j<aTmp.length;j++){
                if(aTmp[j] !== 0 && aTmp[j] < MIN_WIN){
                    MIN_WIN = aTmp[j];
                }
            }
        }
		
        this.resetInfoNextReel();
		
        _oBonusPanel = new CBonusPanel();
		_oPopup = new CPopup();
        _bUpdate = true;
        _oMenu = new CMenus();
    };
    
    this.unload = function(){
        createjs.Sound.stop();
        
        
        _oInterface.unload();
        _oPayTable.unload();
        
        for(var k=0;k<_aMovingColumns.length;k++){
            _aMovingColumns[k].unload();
        }
        
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_REELS;j++){
                _aStaticSymbols[i][j].unload();
            }
        }
        
        s_oAttachSection.removeAllChildren();
    };
    
    this._initReels = function(){  
        var iXPos = REEL_OFFSET_X;
        var iYPos = REEL_OFFSET_Y;
        
        var iCurDelay = 0;
        _aMovingColumns = new Array();
        for(var i=0;i<NUM_REELS;i++){ 
			iXPos = this._ChangeX(i,iXPos);
            _aMovingColumns[i] = new CReelColumn(i,iXPos,iYPos,iCurDelay);
            _aMovingColumns[i+NUM_REELS] = new CReelColumn(i+NUM_REELS,iXPos,iYPos + (SYMBOL_SIZE*NUM_ROWS),iCurDelay );
            iXPos += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS;
            iCurDelay += REEL_DELAY;
        }
        //console.log("_aFinalSymbolCombo " , _aFinalSymbolCombo);
    };
	
	this._ChangeX = function(_iCol, _XPos){
		var x;
		if(_iCol === 0){
			x = _XPos;
		}else if(_iCol === 1){
			x = _XPos + 2;
		}else if(_iCol === 2){
			x = _XPos ;
		}else if(_iCol === 3){
			x = _XPos + 1;
		}else if(_iCol === 4){
			x = _XPos + 1;
		}
		return x;
	};
    
    this._initStaticSymbols = function(){
        var iXPos = REEL_OFFSET_X;
        var iYPos = REEL_OFFSET_Y;
        _aStaticSymbols = new Array();
        for(var i=0;i<NUM_ROWS;i++){
            _aStaticSymbols[i] = new Array();
            for(var j=0;j<NUM_REELS;j++){
                var oSymbol = new CStaticSymbolCell(i,j,iXPos,iYPos);
                _aStaticSymbols[i][j] = oSymbol;
                
                iXPos += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS;
            }
            iXPos = REEL_OFFSET_X;
            iYPos += SYMBOL_SIZE;
        }
    };
    
    this.generateLosingPattern = function(){
         var aFirstCol = new Array();
         for(var i=0;i<NUM_ROWS;i++){
            var iRandIndex = Math.floor(Math.random()* (s_aRandSymbols.length-2));
            var iRandSymbol = s_aRandSymbols[iRandIndex];
            aFirstCol[i] = iRandSymbol;  
        }
        
        _aFinalSymbolCombo = new Array();
        for(var i=0;i<NUM_ROWS;i++){
            _aFinalSymbolCombo[i] = new Array();
            for(var j=0;j<NUM_REELS;j++){
                
                if(j === 0){
                    _aFinalSymbolCombo[i][j] = aFirstCol[i];
                }else{
                    do{
                        var iRandIndex = Math.floor(Math.random()* (s_aRandSymbols.length-2));
                        var iRandSymbol = s_aRandSymbols[iRandIndex];
                    }while(aFirstCol[0] === iRandSymbol || aFirstCol[1] === iRandSymbol || aFirstCol[2] === iRandSymbol);

                    _aFinalSymbolCombo[i][j] = iRandSymbol;
                }  
            }
        }
        
        _aWinningLine = new Array();
        _bReadyToStop = true;
    };
    
    this._generateRandSymbols = function() {
        var aRandSymbols = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
                var iRandIndex = Math.floor(Math.random()* s_aRandSymbols.length);
                aRandSymbols[i] = s_aRandSymbols[iRandIndex];
        }

        return aRandSymbols;
    };
    
    this.reelArrived = function(iReelIndex,iCol) {
        if(_iCurReelLoops>MIN_REEL_LOOPS ){
            if (_iNextColToStop === iCol) {
                if (_aMovingColumns[iReelIndex].isReadyToStop() === false) {
                    var iNewReelInd = iReelIndex;
                    if (iReelIndex < NUM_REELS) {
                            iNewReelInd += NUM_REELS;
                            
                            _aMovingColumns[iNewReelInd].setReadyToStop();
                            
                            _aMovingColumns[iReelIndex].restart(new Array(_aFinalSymbolCombo[0][iReelIndex],
                                                                        _aFinalSymbolCombo[1][iReelIndex],
                                                                        _aFinalSymbolCombo[2][iReelIndex]), true);
                            
                    }else {
                            iNewReelInd -= NUM_REELS;
                            _aMovingColumns[iNewReelInd].setReadyToStop();
                            
                            _aMovingColumns[iReelIndex].restart(new Array(_aFinalSymbolCombo[0][iNewReelInd],
                                                                          _aFinalSymbolCombo[1][iNewReelInd],
                                                                          _aFinalSymbolCombo[2][iNewReelInd]), true);
                            
                            
                    }
                    
                }
            }else {
                    _aMovingColumns[iReelIndex].restart(this._generateRandSymbols(),false);
            }
            
        }else {
            
            _aMovingColumns[iReelIndex].restart(this._generateRandSymbols(), false);
            if(_bReadyToStop && iReelIndex === 0){
                _iCurReelLoops++;
            }
            
        }
    };
    
    this.stopNextReel = function() {
        _iNumReelsStopped++;
        if(_iNumReelsStopped%2 === 0){
            _oCountReel++;
            this.playSoundForSymbol(_oCountReel);
            _iNextColToStop = _aReelSequence[_iNumReelsStopped/2];
            if (_iNumReelsStopped === (NUM_REELS*2) ) {
                    this._endReelAnimation();
            }
        }    
    };

    this.playSoundForSymbol = function(index){
        index -= 1;
        _oIndexWildArray.sort(function(a, b){return a - b});
        _oIndexBonusArray.sort(function(a, b){return a - b});
        _oIndexFreeSpinArray.sort(function(a, b){return a - b});
        for(var i=0; i<_oIndexFreeSpinArray.length; i++){
            if(index === _oIndexFreeSpinArray[i]){
                playSound("FreespinSymbol",1,0);
                return;
            }
        }
        for(var i=0; i<_oIndexBonusArray.length; i++){
            if(index === _oIndexBonusArray[i]){
                playSound("BonusSymbol",1,0);
                return;
            }
        }
        for(var i=0; i<_oIndexWildArray.length; i++){
            if(index === _oIndexWildArray[i]){
                playSound("WildSymbol",1,0);
                return;
            }
        }
        playSound("Spin",1,0);
    };

    this.resetInfoNextReel = function(){
        _oCountReel = 0;
        _oIndexBonusArray = new Array();
        _oIndexFreeSpinArray = new Array();
        _oIndexWildArray = new Array();
    };

    this.getSymbol = function(){
		_iCountBonusSymbol = 0;
        for(var i=0; i< _aFinalSymbolCombo.length;i++){
            for(var j=0; j < _aFinalSymbolCombo[i].length;j++){
                if(_aFinalSymbolCombo[i][j] === 9){
                    //wild
                    _oIndexWildArray.push(j);
                }
                if(_aFinalSymbolCombo[i][j] === 10){
                    //bonus
                    _oIndexBonusArray.push(j);
					_iCountBonusSymbol++;
                }
                if(_aFinalSymbolCombo[i][j] === 11){
                    //freespin
                    _oIndexFreeSpinArray.push(j);
                }
            }
        }
    }

    this._endReelAnimation = function(){
        _isMaxBetEnable = false;

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oReelSound.stop();
        }

        _bReadyToStop = false;
        
        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iNextColToStop = _aReelSequence[0];

        if(_iBonus > 0){
            _oInterface.disableSpin(_bAutoSpin);
            _oInterface.disableGuiButtons(false);
        }
        
        if( !(_oFreeSpinPanel.visible === false && _iTotFreeSpin === 0)){
            _oInterface.refreshFreeSpinNum(_iTotFreeSpin + "\nFREE SPINS");
        }

        if(_oLogoFreeSpin.visible){
            MoneyFromFreeSpin += _iTotWin;
            console.log("MoneyFromFreeSpin: " + MoneyFromFreeSpin);
        }            
        //INCREASE MONEY IF THERE ARE COMBOS
        if(_aWinningLine.length > 0 ){
            //console.log("_aWinningLine.length: "+_aWinningLine.length);
			
            //HIGHLIGHT WIN COMBOS IN PAYTABLE
            for(var i=0;i<_aWinningLine.length;i++){
                
                if(_aWinningLine[i].line > 0){

                    _oPayTable.highlightCombo(_aWinningLine[i].value,_aWinningLine[i].num_win);
                    _oPayLineController.isShowLineAnim(true);
                    if(_aWinningLine[i].num_win === 5)
                    {
                        _is5OnaRow = true;
                    }
					//_oInterface.showLine(_aWinningLine[i].line);
                }
                var aList = _aWinningLine[i].list;
                for(var k=0;k<aList.length;k++){
                    _aStaticSymbols[aList[k].row][aList[k].col].show(aList[k].value);
                    _aMovingColumns[aList[k].col].setVisible(aList[k].row,false);
                    _aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,false);
                }
            }

            if(_iTotWin > 0 ){
                if(_iBonus !==  1){
                    _oInterface.refreshWinText(_iTotWin);
                }
                //_oInterface.refreshWinText(_iTotWin);
                if(_is5OnaRow === false){
                    _oPopup.showPopupText(_iTotWin,"",0);
                }
			}

            //console.log(_aWinningLine[0].line);
          
            if(_iTotFreeSpin > 0){
                _oLogo.visible = false;
                _oLogoFreeSpin.visible = true;
                _oFreeSpinPanel.visible = true;
            }else{
                _oLogo.visible = true;
                _oLogoFreeSpin.visible = false;
                _oFreeSpinPanel.visible = false;
                _oInterface.refreshFreeSpinNum("");
            }
			
            _iTimeElaps = 0;
            _iCurState = GAME_STATE_SHOW_ALL_WIN;

            if(_iBonus !== BONUS_WHEEL){
                _oInterface.refreshMoney(_oProfile.GetWalletBalance());
            }
        }

        var fee = 100 * _iCurBet * _iLastLineActive;
        if(_oProfile.GetSweepstakesPoints() < fee && _iTotFreeSpin === 0){
            this.resetCoinBet();
            _bAutoSpin = false;
            _oInterface.enableGuiButtons();
            //s_oMsgBox.show(TEXT_NOT_ENOUGH_MONEY);
        }else{
            if(!_bAutoSpin && _iTotFreeSpin === 0 && _iBonus === 0){
                _oInterface.enableGuiButtons();
                _oInterface.disableBetBut(false);
            }
        }
		
		if(_iBonus === BONUS_WHEEL){
            //_oCurSymbolWinSound = playSound("FreeSpinPopupSound",1,0);
            _oPopup.showPopup(3);

            _oPopup.showPopupText(0, " ",2);
        }

        else if(isStartFreeSpin === true){
            //_oCurSymbolWinSound = playSound("FreeSpinPopupSound",1,0);
            _oPopup.showPopup(4, _CountFSonOneSpin);
            _oPopup.showPopupText(0, " ",2);
            _CountFSonOneSpin = 0;
        }
		
        if(_aWinningLine.length > 0){
            if(_iTotWin > 0){
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                    var isCheck = true;

                    //console.log("_aWinningLine.length: "+_aWinningLine.length);
                    if(_iBonus === BONUS_WHEEL || isStartFreeSpin === true){
                        isCheck = false;
                    }
                    if(isCheck){
                        if(_is5OnaRow){
                            _oPopup.showPopup(6);
                            setTimeout(() => {
                                this.playSoundPopup(_iTotWin);
                                _oPopup.hide5OnaRowPopup();
                                _oPopup.showPopupText(_iTotWin,"",0);
                            }, 3000);
                        }
                        else{
                            this.playSoundPopup(_iTotWin);
                        }
                        _is5OnaRow = false;
                    }
                }
            }
        }else{
            if(_iTotFreeSpin > 0){
                _oLogo.visible = false;
                _oLogoFreeSpin.visible = true;
                _oFreeSpinPanel.visible = true;
                _oPopup.showPopup(4);
                
                _oInterface.disableSpin(_bAutoSpin);
                this.onSpin();
            }else{
                _oLogo.visible = true;
                _oLogoFreeSpin.visible = false;
                _oFreeSpinPanel.visible = false;
                _oInterface.refreshFreeSpinNum("");
                
                if(_bAutoSpin){
                    if(_oProfile.GetSweepstakesPoints() < fee && _iTotFreeSpin === 0){
                        this.resetCoinBet();
                        _bAutoSpin = false;
                        _oInterface.enableGuiButtons();
                    }else{
                        _oInterface.enableAutoSpin();
                        this.onSpin();
                    }
                }else{
                    _iCurState = GAME_STATE_IDLE;
                }
            }
        }
        
        console.log("Money From Freespin: "+MoneyFromFreeSpin);
        if(!_oLogoFreeSpin.visible && MoneyFromFreeSpin > 0){
            setTimeout(() => {
                _oPopup.showPopup(5);
                _oPopup.showPopupText(MoneyFromFreeSpin, "Free Spins\n ",1);
                console.log("inside condition");
                MoneyFromFreeSpin = 0;
                _iFreeSpin = 0;
            }, 4500);
        }

        _iNumSpinCont++;
        if(_iNumSpinCont === NUM_SPIN_FOR_ADS){
            _iNumSpinCont = 0;
            
            $(s_oMain).trigger("show_interlevel_ad");
        }
        _oInterface._onShowNextResult();
        $(s_oMain).trigger("save_score",_oProfile.GetWalletBalance());
    };
	
	this.GetIsStartFreeSpin = function(){
		return isStartFreeSpin;
	};
	
	this.GetIsStartBonus = function(){
		return isStartBonus;
	};
	
    this.playSoundPopup = function(a){
        if(a < 1){
            _oPopup.showPopup(0);
        }else if(a < 5 && a >= 1){
            _oPopup.showPopup(1);
        }else if(a >= 5){
            _oPopup.showPopup(2);
        }

    };

    this.hidePayTable = function(){
        _oPayTable.hide();
    };
    
    this._showWin = function(){
        var iLineIndex;
        if(_iCurWinShown>0){ 
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                //_oCurSymbolWinSound.stop();
            }
            
            iLineIndex = _aWinningLine[_iCurWinShown-1].line;
            if(iLineIndex > 0){
                _oInterface.hideLineAnim(iLineIndex);
            }
            
            
            var aList = _aWinningLine[_iCurWinShown-1].list;
            for(var k=0;k<aList.length;k++){
                _aStaticSymbols[aList[k].row][aList[k].col].stopAnim();
                _aMovingColumns[aList[k].col].setVisible(aList[k].row,true);
                _aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,true);
            }
        }
        if(_aWinningLine != null){
			if(_iCurWinShown === _aWinningLine.length)
            {
                _iCurWinShown = 0;

                //#region Show when freespin
				if(_iTotFreeSpin > 0){
                    if(_iBonus === BONUS_WHEEL)
                    {
                        _oBonusPanel.show(_iCurBonusPrizeIndex, _iCurBet, _iCountBonusSymbol,_iTotWin);
                        _iCurState = GAME_STATE_BONUS;
                    }else{
                        _oInterface.disableSpin(_bAutoSpin);
                        this.onSpin();
                    }
    
                    return;
				}//#endregion

                //#region show when bonus 
                else if(_iBonus === BONUS_WHEEL){
					_oBonusPanel.show(_iCurBonusPrizeIndex, _iCurBet, _iCountBonusSymbol,_iTotWin);
					_iCurState = GAME_STATE_BONUS;
					isStartBonus = false;
				}//#endregion
                
                else if(_bAutoSpin){
					_oInterface.enableAutoSpin();
					this.onSpin();
					return;
				}
			}
			
			iLineIndex = _aWinningLine[_iCurWinShown].line;

			if(iLineIndex > 0){
                // if(iLineIndex === 1 || iLineIndex === 2 || iLineIndex === 3)
                // {
                    
                //     //another if, check if 5 symbol lie together in one row => show notification
                // }
				_oPayLineController.isShowLineAnim(true);
				_oInterface.showLineAnim(iLineIndex);
			}else{
				_oPayLineController.isShowLineAnim(false);
			}
			

			var aList = _aWinningLine[_iCurWinShown].list;
			for(var k=0;k<aList.length;k++){
				_aStaticSymbols[aList[k].row][aList[k].col].show(aList[k].value);
				_aMovingColumns[aList[k].col].setVisible(aList[k].row,false);
				_aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,false);
			}
			_iCurWinShown++;
		}
		
    };
	
	this.SetStateShowWin = function(){
		_iCurState = GAME_STATE_SHOW_WIN;
	};
    
    this._hideAllWins = function(){
        for(var i=0;i<_aWinningLine.length;i++){
            var aList = _aWinningLine[i].list;
            for(var k=0;k<aList.length;k++){
                _aStaticSymbols[aList[k].row][aList[k].col].stopAnim();
                _aMovingColumns[aList[k].col].setVisible(aList[k].row,true);
                _aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,true);
            }
        }
        
        _oInterface.hideAllLinesAnim();

        _iTimeElaps = 0;
        _iCurWinShown = 0;
        _iTimeElaps = TIME_SHOW_WIN;
        _iCurState = GAME_STATE_SHOW_WIN;
    };
	
    this.activateLines = function(iLine){
        _iLastLineActive = iLine;
        this.removeWinShowing();
		
        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshNumLines(_iLastLineActive);
    };
	
    this.PlusLine = function(){
        //console.log(NUM_PREVIEWPAYLINES);
        if(_iLastLineActive === NUM_PREVIEWPAYLINES){
            _iLastLineActive = 1;  
        }else{
            _iLastLineActive++;    
        }
		
        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshNumLines(_iLastLineActive);
        _oInterface.enableSpin();
        if(isNeedGetResult(_iLastLineActive,_iCurBet)){
            var isMaxBet = false;
            _iMode = _iCurMode;
            GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
        }else{
            _oInterface._onShowNextResult();
        }
    };

    this.MinusLine = function () {
        if (_iLastLineActive <= 1) {
            _iLastLineActive = NUM_PAYLINES;
        }else {
            _iLastLineActive--;
        }

        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshNumLines(_iLastLineActive);
        _oInterface.enableSpin();
        if(isNeedGetResult(_iLastLineActive,_iCurBet)){
            var isMaxBet = false;
            _iMode = _iCurMode;
            GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
        }else{
            _oInterface._onShowNextResult();
        }
    };
    
    this.resetCoinBet = function(){
        _iCurCoinIndex = 0;
        
        var iNewBet = parseFloat(COIN_BET[_iCurCoinIndex]);
        
        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = iNewBet;
        _iCurBet = Math.floor(_iCurBet * 100)/100;
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);
   
        
        /*
        if(iNewTotalBet>_oProfile.GetWalletBalance()){
                _oInterface.disableSpin(_bAutoSpin);
        }else{*/
                _oInterface.enableSpin();
        //}
        if(isNeedGetResult(_iLastLineActive,_iCurBet)){
            var isMaxBet = false;
            _iMode = _iCurMode;
            GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
        }else{
            _oInterface._onShowNextResult();
        }
    };
    
    this.MinusCoinBet = function(){
        _iCurCoinIndex--;
        if(_iCurCoinIndex < 0){
            _iCurCoinIndex = COIN_BET.length - 1;
        }
        var iNewBet = parseFloat(COIN_BET[_iCurCoinIndex]);
        
        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = iNewBet;
        _iCurBet = Math.floor(_iCurBet * 100)/100;
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);    
        _oInterface.enableSpin();
        if(isNeedGetResult(_iLastLineActive,_iCurBet)){
            var isMaxBet = false;
            _iMode = _iCurMode;
            GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
        }else{
            _oInterface._onShowNextResult();
        }
    };

    this.PlusCoinBet = function () {
        if (_iCurCoinIndex === COIN_BET.length -1 || _isMaxBetForBetBut)// $1.00 
        {
            _iCurCoinIndex = 0;  
            _isMaxBetForBetBut = false;
        }else if(_isMaxBetForBetBut === false)
        {
            _iCurCoinIndex++;
        }
        var iNewBet = parseFloat(COIN_BET[_iCurCoinIndex]);

        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = iNewBet;
        _iCurBet = Math.floor(_iCurBet * 100) / 100;
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);
        _oInterface.enableSpin();
        if(isNeedGetResult(_iLastLineActive,_iCurBet)){
            var isMaxBet = false;
            _iMode = _iCurMode;
            GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
        }else{
            _oInterface._onShowNextResult();
        }
    };

    this.Get10NextResult = function(){
        var indexCoin = findIndexCoin(_iCurBet);
        var indexLineActive = _iLastLineActive - 1;
        var _index = _iCurMode;
        var List10Result = new Array();
        var listText = new Array();
        listText = _oTenNextResult.getListText();
        for(j=0;j<10;j++){
            for(i=0; i< listResult[indexLineActive][indexCoin].length; i++){
                if(listResult[indexLineActive][indexCoin][i][0] === _index){
                    List10Result.push(listResult[indexLineActive][indexCoin][i][1]);
                    listText[j].text = "$"+(parseFloat(List10Result[j])).toFixed(2);
                }
            }
            _index++;
        }
        
        //console.log(List10Result);
    };

    this.Get1NextResult = function(){
        var indexCoin = findIndexCoin(_iCurBet);
        var indexLineActive = _iLastLineActive - 1;
        var _index = _iCurMode;
        for(i=0; i< listResult[indexLineActive][indexCoin].length; i++){
            if(listResult[indexLineActive][indexCoin][i][0] === _index){
                return listResult[indexLineActive][indexCoin][i][1];
            }    
        }
    };
	
    this.onMaxBet = function(){
        _isMaxBetEnable = true;
        _isMaxBetForBetBut = true;
        
        var fee = 100 * MAX_BET * NUM_PAYLINES;
        if(_oProfile.GetSweepstakesPoints() < fee || listResult.length <= 0){
            DisableUI(true,TEXT_NO_MAX_BET,"25px " + FONT_BOLD,355);
            _isMaxBetEnable = false;
            _isMaxBetForBetBut = false;
            setTimeout(() => {
                DisableUI(false," ");
            }, 1000);
            return;
        }
    
        var iNewBet = MAX_BET;
        _iLastLineActive = NUM_PAYLINES;
    
        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = MAX_BET;
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);
        _oInterface.refreshNumLines(_iLastLineActive);

        if(fee > _oProfile.GetSweepstakesPoints()){
            _oInterface.disableSpin(_bAutoSpin);
        }else{
            if(isNeedGetResult(_iLastLineActive,_iCurBet)){
                var isMaxBet = true;
                _iMode = _iCurMode;
                GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
                return;
            }else{
                _oInterface._onShowNextResult();
            }
            this.TryMaxBet();
        }
    };

    this.TryMaxBet = function(){
        _oInterface.enableSpin();
        this.onSpin();
    };
    
    this.removeWinShowing = function(){
        _oPayTable.resetHighlightCombo();
        
        _oInterface.resetWin();
        
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_REELS;j++){
                _aStaticSymbols[i][j].hide();
                _aMovingColumns[j].setVisible(i,true);
                _aMovingColumns[j+NUM_REELS].setVisible(i,true);
            }
        }
        
        for(var k=0;k<_aMovingColumns.length;k++){
            _aMovingColumns[k].activate();
        }
        
        _iCurState = GAME_STATE_IDLE;
    };
    
    this.onSpin = function(){
        var fee = 100 * _iCurBet * _iLastLineActive;
        //console.log(_oProfile.GetSweepstakesPoints(), fee);
        if(_oProfile.GetSweepstakesPoints() < fee && _iTotFreeSpin === 0 || listResult.length <= 0){
            //console.log("enable GIU Button");
            _oInterface.enableGuiButtons();
            _bAutoSpin = false;
            DisableUI(true,TEXT_NOT_ENOUGH_MONEY,"25px " + FONT_BOLD,355);
            setTimeout(() => {
                DisableUI(false," ");
            }, 1000);
            return;
        }
		
        if(_iTotFreeSpin <= 0){
            _oProfile.refreshSweepstakesPoints(-fee);
		    _oInterface._refreshEntries(_oProfile.GetSweepstakesPoints());
        }
    
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(_oCurSymbolWinSound){
                _oCurSymbolWinSound.stop();
            }
            _oReelSound = playSound("reels",1,0);
        }
        
        _oInterface.disableBetBut(true);
        this.removeWinShowing();
        if(s_bLogged === true){
            if(_oLogoFreeSpin.visible){
                _iTotBet = 0;
            }else{
                _iTotBet = _iCurBet * _iLastLineActive;
            }
            
            tryCallSpin(_iCurBet,_iTotBet,_iLastLineActive);
            //tryCallSpinFromListResult(_iCurBet,_iTotBet,_iLastLineActive);
            //s_oGame.Get10NextResult();
        }else{
            this.generateLosingPattern();
        }
		_oPayLineController.isShowLineAnim(false);
        _oInterface.hideAllLinesAnim();
        _oInterface.disableGuiButtons(_bAutoSpin);
		

        _iCurMode++;
        if(_iCurMode > 1000){
            _iCurMode = 1;
        }
        CreateListResult(listResultPreview);
        ClearResultsNoUse();
    };
    
    //AUTOSPIN BUTTON CLICKED
    this.onAutoSpin = function(){
        _bAutoSpin = true;
        this.onSpin();
    };
    
    this.onStopAutoSpin = function(){
        _bAutoSpin = false;
        if(_iCurState !== GAME_STATE_SPINNING && _iCurState !== GAME_STATE_BONUS){
            _oInterface.enableGuiButtons();
        }
    };
    
    this.generateLosingPattern = function(){
         var aFirstCol = new Array();
         for(var i=0;i<NUM_ROWS;i++){
            var iRandIndex = Math.floor(Math.random()* (s_aRandSymbols.length-2));
            var iRandSymbol = s_aRandSymbols[iRandIndex];
            aFirstCol[i] = iRandSymbol;  
        }
        
        _aFinalSymbolCombo = new Array();
        for(var i=0;i<NUM_ROWS;i++){
            _aFinalSymbolCombo[i] = new Array();
            for(var j=0;j<NUM_REELS;j++){
                
                if(j === 0){
                    _aFinalSymbolCombo[i][j] = aFirstCol[i];
                }else{
                    do{
                        var iRandIndex = Math.floor(Math.random()* (s_aRandSymbols.length-2));
                        var iRandSymbol = s_aRandSymbols[iRandIndex];
                    }while(aFirstCol[0] === iRandSymbol || aFirstCol[1] === iRandSymbol || aFirstCol[2] === iRandSymbol);

                    _aFinalSymbolCombo[i][j] = iRandSymbol;
                }  
            }
        }
        
        _aWinningLine = new Array();
        _bReadyToStop = true;
    };
    
    this.onSpinReceived = function(oRetData){
        //isStartFreeSpin = false;
        //isStartBonus = false;
        _aWinningLine = new Array();
        _iTotWin = 0;
        _iCurState = GAME_STATE_SPINNING;
        if ( oRetData.res === "true" ){
                
            _iTotFreeSpin = parseInt(oRetData.freespin);
            //console.log("oRetdata.freespin= "+ oRetData);
                
            if(oRetData.win === "true"){
                _aFinalSymbolCombo = JSON.parse(oRetData.pattern);
                _aWinningLine = JSON.parse(oRetData.win_lines);
                
                if(parseInt(oRetData.freespin) > 0 ){
                    _iBonus = BONUS_FREESPIN;
                    if(_iFreeSpin === 0){
                        MoneyFromFreeSpin = 0;
                    }
                }
                
                if(parseInt(oRetData.bonus) > 0){
                    isStartBonus = true;
                    _iBonus = BONUS_WHEEL;
                    console.log(oRetData);
                    _iCurBonusPrizeIndex = oRetData.bonus_prize;
                }else{
                    _iBonus = 0;
                }
                
                    //GET TOTAL WIN FOR THIS SPIN
                    _iTotWin = parseFloat(oRetData.tot_win);

                    _bReadyToStop = true;
                }else{
                    _iBonus = 0;
                    
                    _aFinalSymbolCombo = JSON.parse(oRetData.pattern);

                    _aWinningLine = new Array();
                    _bReadyToStop = true;
                }
                _oProfile.refreshWalletBalance(parseFloat(oRetData.money));
				UpdateCustomerSweepstakePerSpin(_oProfile.GetSweepstakesPoints(),_iTotWin + 100000);  //this line is code for update total winning
        }else{
            s_oGame.generateLosingPattern();
        }
        this.resetInfoNextReel();
        this.getSymbol();
    };
    
    this.onInfoClicked = function(){
        if(_iCurState === GAME_STATE_SPINNING){
            return;
        }
        
        if(_oPayTable.isVisible()){
            _oPayTable.hide();
        }else{
            _oPayTable.show();
        }
    };
    
    this.onConnectionLost = function(){
        s_oMsgBox.show(TEXT_CONNECTION_LOST);
        _oInterface.enableGuiButtons();
    };
    
    this.exitFromBonus = function(_TotFreeSpinFromBonus,resultFromBonus){
        //_iTotFreeSpin = 0;
        _isInBonus = false;
        _iTotFreeSpin += _TotFreeSpinFromBonus;
        //WalletBalance = WalletBalance + parseFloat(WHEEL_SETTINGS[_iCurBonusPrizeIndex]);
		_iBonus = 0;
        setVolume("BGMusic",0.1);
        console.log("resultFromBonus: " +resultFromBonus);
        console.log("_oProfile.GetWalletBalance(): "+_oProfile.GetWalletBalance());
        _oInterface.refreshMoney(_oProfile.GetWalletBalance());
        //_oInterface.refreshMoney(resultFromBonus);
        
        if(_TotFreeSpinFromBonus > 0){
            _oInterface.disableSpin(_bAutoSpin);
            _oFreeSpinPanel.visible = true;
            this.PlayFreeSpinToExitBonus(_TotFreeSpinFromBonus);
        }else{
            if(_bAutoSpin){
                _oInterface.enableAutoSpin();
                this.onSpin();
            }else if(_iTotFreeSpin > 0){
                _oInterface.disableSpin(_bAutoSpin);
                this.onSpin();
            }else{
                _oInterface.enableGuiButtons();
                _oInterface.disableBetBut(false);
                _oInterface.enableSpin();
            }
        }

        $(s_oMain).trigger("save_score",_oProfile.GetWalletBalance());
    };
	
	this.PlayFreeSpinToExitBonus = function(_TotFreeSpin){
        //console.log(_TotFreeSpin);
		s_aSession["bFreeSpin"] = 1;
		s_aSession["iTotFreeSpin"] += _TotFreeSpin;
		_iFreeSpin = _TotFreeSpin;
		_oInterface.refreshFreeSpinNum(_iTotFreeSpin + "\nFREE SPINS");
		_oFreeSpinPanel.visible = true;
		_oInterface.disableSpin(_bAutoSpin);
		this.onSpin();
	};

    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
        
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", {
                img: "200x200.jpg",
                title: TEXT_CONGRATULATIONS,
                msg:  TEXT_MSG_SHARE1+ _oProfile.GetWalletBalance() + TEXT_MSG_SHARE2,
                msg_share: TEXT_MSG_SHARING1 + _oProfile.GetWalletBalance() + TEXT_MSG_SHARING2
            });
    };
    
    this.getState = function(){
        return _iCurState;
    };
    
    this.update = function(){
        if(_bUpdate === false){
            return;
        }

        if (_isMadaamAnimDisableShow === false && _isMadaamAnimShow === true)
        {
            ////console.log("here enable");
            //_oMadaam.show(0);
            _oMadaam.update();
            _oMadaamDisable._hideAllAnims();
        }
        if(_isMadaamAnimDisableShow === true && _isMadaamAnimShow === false)
        {
            _oMadaamDisable.update();
            _oMadaam._hideAllAnims();
        }
       
        switch(_iCurState){
            case GAME_STATE_SPINNING:{
                for(var i=0;i<_aMovingColumns.length;i++){
                    _aMovingColumns[i].update();
                    
                }
                break;
            }
            case GAME_STATE_SHOW_ALL_WIN:{
                    
                    _iTimeElaps += s_iTimeElaps;
                    if(_iTimeElaps> TIME_SHOW_ALL_WINS){  
                        this._hideAllWins();
                    }
                    break;
            }
            case GAME_STATE_SHOW_WIN:{
                _iTimeElaps += s_iTimeElaps;
                if(_iTimeElaps > TIME_SHOW_WIN){
                    _iTimeElaps = 0;
                    this._showWin();
                }
                break;
            }
            case GAME_STATE_BONUS:{
                    _oBonusPanel.update();
                    break;
            }
        }
        
		_oPopup.update();
		_oPayLineController.update();
    };
    
    s_oGame = this;
    
    
    
    this._init();
}

var s_oGame;
var s_oTweenController;