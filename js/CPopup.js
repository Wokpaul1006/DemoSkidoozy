var _oPopup;
function CPopup(){
    var _oPCon;
	var _oSubContainer;
    var _oWinPopup;
    var _oBigWinPopup;
    var _oMegaWinPopup;
    var _oBonusPopup;
    var _oFreeSpinsPopup;
    var _oFreeSpinsWinPopup;
    var _iCurAlpha = 0;
    var _oPopupWinText;
	var _light;
	var _listMoneyAnim;
	var _curIndexMoneyAnim = 0;
	var _isAction = false;
    var NoticBFreespinTxt;
    var _5SymbolsPopup;
    var _oBonusWinPopup;
    var _BonusFSTxt;

    this.Init = function(){
        _oPCon = new createjs.Container();
        s_oAttachSection.addChild(_oPCon); 
		
		_oSubContainer = new createjs.Container();
		s_oAttachSection.addChild(_oSubContainer); 
		
		_oSubContainer2 = new createjs.Container();
		s_oAttachSection.addChild(_oSubContainer2); 
		
		_light = new createjs.Bitmap(s_oSpriteLibrary.getSprite('light'));
        _light.visible = false;
        _light.alpha = _iCurAlpha;
        _oPCon.addChild(_light);
		
		this.initMoneyAnim();

        _5SymbolsPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('5SymbolsPopup'));
        _5SymbolsPopup.visible = false;
        _5SymbolsPopup.alpha = _iCurAlpha;
        _oSubContainer2.addChild(_5SymbolsPopup); 
		
        _oWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('WinPopup'));
        _oWinPopup.visible = false;
        _oWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oWinPopup);

        _oBigWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('BigWinPopup'));
        _oBigWinPopup.visible = false;
        _oBigWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oBigWinPopup);

        _oMegaWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('MegaWinPopup'));
        _oMegaWinPopup.visible = false;
        _oMegaWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oMegaWinPopup);

        _oBonusWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('BonusWinPopup'));
        _oBonusWinPopup.visible = false;
        _oBonusWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oBonusWinPopup);
        
        _oPopupWinText = new createjs.Text(" ", "70px " + FONT_BOLD, "#4f2930");
        _oPopupWinText.x = 660;
        _oPopupWinText.y = 390;
        _oPopupWinText.alpha = _iCurAlpha;
        _oPopupWinText.textAlign = "center";
        _oPopupWinText.textBaseline = "alphabetic";
        _oPCon.addChild(_oPopupWinText);

        _oBonusPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('BonusPopup'));
        _oBonusPopup.visible = false;
        _oBonusPopup.alpha = _iCurAlpha;
        _oSubContainer2.addChild(_oBonusPopup);

        _oFreeSpinsPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('FreeSpinsPopup'));
        _oFreeSpinsPopup.visible = false;
        _oFreeSpinsPopup.alpha = _iCurAlpha;
        _oSubContainer2.addChild(_oFreeSpinsPopup); 

        _oFreeSpinsWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('FreespinWinPopup'));
        _oFreeSpinsWinPopup.visible = false;
        _oFreeSpinsWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oFreeSpinsWinPopup); 

        NoticBFreespinTxt = new createjs.Text(" ", "69px " + FONT_PAYTABLE, "#000");
        NoticBFreespinTxt.x = 663;
        NoticBFreespinTxt.y = 320;
        NoticBFreespinTxt.textAlign = "center";
        NoticBFreespinTxt.textBaseline = "alphabetic";
        NoticBFreespinTxt.visible = false;
        NoticBFreespinTxt.shadow = new createjs.Shadow("#000", 0, 0, 50);
        s_oAttachSection.addChild(NoticBFreespinTxt);

        NoticFreespinTxt = new createjs.Text(" ", "70px " + FONT_PAYTABLE, "#fedc00");
        NoticFreespinTxt.x = 663;
        NoticFreespinTxt.y = 320;
        NoticFreespinTxt.textAlign = "center";
        NoticFreespinTxt.textBaseline = "alphabetic";
        NoticFreespinTxt.visible = false;
        NoticFreespinTxt.shadow = new createjs.Shadow("#000", 0, 0, 50);
        s_oAttachSection.addChild(NoticFreespinTxt);	

        _BonusFSTxt = new createjs.Text(" ", "74px " + FONT_PAYTABLE, "#000");
        _BonusFSTxt.x = 750;
        _BonusFSTxt.y = 485;
        _BonusFSTxt.textAlign = "center";
        _BonusFSTxt.textBaseline = "alphabetic";
        _BonusFSTxt.visible = false;
        _BonusFSTxt.shadow = new createjs.Shadow("#000", 0, 0, 50);
        _oPCon.addChild(_BonusFSTxt);	

        _BonusBFSTxt = new createjs.Text(" ", "74px " + FONT_PAYTABLE, "#fedc00");
        _BonusBFSTxt.x = 750;
        _BonusBFSTxt.y = 485;
        _BonusBFSTxt.textAlign = "center";
        _BonusBFSTxt.textBaseline = "alphabetic";
        _BonusBFSTxt.visible = false;
        _BonusBFSTxt.shadow = new createjs.Shadow("#000", 0, 0, 50);
        _oPCon.addChild(_BonusBFSTxt);	
    };
	
	this.initMoneyAnim = function(){
		_listMoneyAnim = new Array();
        for(var t=0;t<61;t++){
            var _moneyAnim = new createjs.Bitmap(s_oSpriteLibrary.getSprite('moneyAnim'+t));
            _moneyAnim.visible = false;
			_moneyAnim.alpha = 1;
            _oPCon.addChild(_moneyAnim);
            _listMoneyAnim.push(_moneyAnim);
        }
	};

    this.showPopup = function(a,numFreespin){
        _oInterface.disableGuiButtons(false);
        _iCurAlpha = 0;

        //console.log("a = "+a);
        if(a === 0){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oWinPopup.visible = true;
            _oWinPopup.alpha = _iCurAlpha;
        }else if(a === 1){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oBigWinPopup.visible = true;
            _oBigWinPopup.alpha = _iCurAlpha;
        }else if(a === 2){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oMegaWinPopup.visible = true;
            _oMegaWinPopup.alpha = _iCurAlpha;
        }else if(a === 3){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oBonusPopup.visible = true;
            _oBonusPopup.alpha = _iCurAlpha;
        }else if(a === 4){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oFreeSpinsPopup.visible = true;
            _oFreeSpinsPopup.alpha = _iCurAlpha;

            NoticBFreespinTxt.text = "YOU HAVE\nWON: " + numFreespin + " FREE SPINS";
            NoticBFreespinTxt.visible = true;

            NoticFreespinTxt.text = "YOU HAVE\nWON: " + numFreespin + " FREE SPINS";
            NoticFreespinTxt.visible = true;
        }
        else if(a === 5){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oFreeSpinsWinPopup.visible = true;
            _oFreeSpinsWinPopup.alpha = _iCurAlpha;
        }
        else if(a === 6){
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _5SymbolsPopup.visible = true;
            _5SymbolsPopup.alpha = _iCurAlpha;
        }
        else if(a === 7)
        {
            _light.visible = true;
            _light.alpha = _iCurAlpha;

            _oBonusWinPopup.visible = true;
            _oBonusWinPopup.alpha = _iCurAlpha;

            if(numFreespin > 0){
                _BonusFSTxt.text = "AND: " + numFreespin + " FREE SPINS";
                _BonusFSTxt.visible = true;

                _BonusBFSTxt.text = "AND: " + numFreespin + " FREE SPINS";
                _BonusBFSTxt.visible = true;
            }
        }
        _oPopupWinText.visible = true;
        _oPopupWinText.alpha = _iCurAlpha;
        _oPCon.visible = true;
		_oSubContainer2.visible = true;
		_oSubContainer.visible = true;
		_isAction = true;
        this._fadeInPopup(a);
        this.hidePopup(a);
    };

    this.hidePopup = function(){
        setTimeout(() => {
            _iCurAlpha = 0;
            _oWinPopup.visible = false;
            _oWinPopup.alpha = _iCurAlpha;
            _oBigWinPopup.visible = false;
            _oBigWinPopup.alpha = _iCurAlpha;
            _oMegaWinPopup.visible = false;
            _oMegaWinPopup.alpha = _iCurAlpha;
            _oBonusPopup.visible = false;
            _oBonusPopup.alpha = _iCurAlpha;
            _5SymbolsPopup.visible = false;
            _5SymbolsPopup.alpha = _iCurAlpha;
            _oBonusWinPopup.visible = false;
            _oBonusWinPopup.alpha = _iCurAlpha;
            _oFreeSpinsPopup.visible = false;
            _oFreeSpinsPopup.alpha = _iCurAlpha;
            _oFreeSpinsWinPopup.visible = false;
            _oFreeSpinsWinPopup.alpha = _iCurAlpha;
            _oPopupWinText.visible = false;
            _oPopupWinText.alpha = _iCurAlpha;
            _oPopupWinText.text = " ";
            
            NoticBFreespinTxt.visible = false;
            NoticFreespinTxt.visible = false;
            _BonusFSTxt.visible = false;
            _BonusBFSTxt.visible = false;

            if(MoneyFromFreeSpin === 0 && !isStartFreeSpin && !isStartBonus){
                _oInterface.enableGuiButtons();
            }
            this.resetPopupWin();
            _oPCon.visible = false;
            _oSubContainer2.visible = false;
			_oSubContainer.visible = false;
			_oSubContainer.removeAllChildren();
			_isAction = false;
        }, 4500); 
    };

    this.hide5OnaRowPopup = function(){
        _oSubContainer2.visible = false;
    }

    this._fadeInPopup = function(a){
        _iCurAlpha = 1;
        var object;
        if(a === 0){
            object = _oWinPopup;
            playSound("SmallWin",0.9,0);
        }else if(a === 1){
            object = _oBigWinPopup;
            playSound("BigWin",0.9,0);
        }else if(a === 2){
            object = _oMegaWinPopup;
            playSound("MegaWin",0.9,0);
        }else if(a === 3){
            object = _oBonusPopup;
            playSound("FreeSpinPopupSound",0.9,0);
        }else if(a === 4){
            object = _oFreeSpinsPopup;
            playSound("FreeSpinPopupSound",0.9,0);
        }
        else if(a === 5){
            object = _oFreeSpinsWinPopup;
            playSound("FreeSpinPopupSound",0.9,0);
        }
        else if(a === 6){
            object = _5SymbolsPopup;
            playSound("MegaWin",0.9,0);
        }else if(a === 7){
            object = _oBonusWinPopup;
            playSound("BigWin",0.9,0);
        }
        createjs.Tween.get(object).to({alpha:_iCurAlpha }, 1000,createjs.Ease.quintIn);
        createjs.Tween.get(_oPopupWinText).to({alpha:_iCurAlpha }, 1000,createjs.Ease.quintIn);
		createjs.Tween.get(_light).to({alpha:_iCurAlpha }, 000,createjs.Ease.quintIn);
    };

    this.showPopupText = function(a, b, c,d){
        if(d !== undefined)
        {
            console.log(d);
        }
        var _alpha;
        var _txt;
        var _y;
		var isShow = false;
        if(c === 0 || c === 1){
            _alpha = 1;
            _txt = b + "Win: " + TEXT_CURRENCY + a.toFixed(2);
            if(c === 0){
                _y = 370;
            }else if(c === 1){
                _y = 330;
            }
			isShow = true;
        }

        if(c === 2){
            _alpha = 0;
			_txt = " ";
			isShow = false;
        }
        
        //_oPopupWinText.text = _txt;
		_oPopupWinText.text = " ";
        _oPopupWinText.alpha = _alpha;
        _oPopupWinText.y = _y;
		
		var _a = a.toFixed(2);
		setTimeout(() => {
            //console.log(_a);
            _isInBonus = d;
			this.ShowNumber(_a,isShow,_isInBonus);
		}, 0000); 
    };
	
	this.ChangePosition = function(){
		_oPCon.x = 0;
		_oSubContainer.x = 0;
	};
	
	this.ShowNumber = function(number, isShow,_isInBonus){
		if(s_oGame.GetIsStartFreeSpin()){ return;}
		if(s_oGame.GetIsStartBonus()){ return;}
		//95 65
		//y = 200
		//3 x = 440
		//2 x = 490
		//1 x = 555
		//console.log("ShowNumber");
		var listNum = new Array();
		var _alpha = 0;
		var _x = 0;
		var _xPlus = 0;
		var num = number.length - 4;
        if (_isInBonus === true){
            _x = 530 - (num * 50);
        }else if(!_isInBonus){
            _x = 437 - (num * 50);
        }
		var _oCurrency = new createjs.Bitmap(s_oSpriteLibrary.getSprite('currency'));
		_oCurrency.visible = isShow;
		_oCurrency.alpha = _alpha;
		_oCurrency.x = _x;
		_oCurrency.y = 270;
		_oSubContainer.addChild(_oCurrency);

        //console.log(_oCurrency.x);

		listNum.push(_oCurrency);
		for(var i=0; i<number.length;i++){
			var res = number.charAt(i);
			if(i === 0){
				_xPlus += 95;
				var _num0 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('num' + res));
				_num0.visible = isShow;
				_num0.alpha = _alpha;
				_num0.x = _x + _xPlus;
				_num0.y = 270;
				_oSubContainer.addChild(_num0);
				listNum.push(_num0);
			}else{
				if(res === "."){
					_xPlus += 65;
					var nextNum = new createjs.Bitmap(s_oSpriteLibrary.getSprite('dotNum'));
					nextNum.visible = isShow;
					nextNum.alpha = _alpha;
					nextNum.x = _x + _xPlus;
					nextNum.y = 270;
					_oSubContainer.addChild(nextNum);
					listNum.push(nextNum);
				}else{
					var subRes = number.charAt(i - 1);
					if(subRes === "."){
						_xPlus += 65;
					}else{
						_xPlus += 95;
					}
					var nextNum = new createjs.Bitmap(s_oSpriteLibrary.getSprite('num' + res));
					nextNum.visible = isShow;
					nextNum.alpha = _alpha;
					nextNum.x = _x + _xPlus;
					nextNum.y = 270;
					_oSubContainer.addChild(nextNum);
					listNum.push(nextNum);
				}
			}
		}
		
		for(j=0; j< listNum.length; j++){
			createjs.Tween.get(listNum[j]).to({alpha:1 }, 1000,createjs.Ease.quintIn);
		}
	};

    this.resetPopupWin = function(){
        _oPopupWinText.text = " ";
        _oPopupWinText.alpha = 0;
    };
	
	this.ActionAnim = function(){
		for(var i=0; i< 61; i++){
			_listMoneyAnim[i].visible = false;
		}
		_listMoneyAnim[_curIndexMoneyAnim].visible = true;
		_curIndexMoneyAnim++;
		if(_curIndexMoneyAnim >= 61){
			_curIndexMoneyAnim = 0;
		}
	};
	
	this.update = function(){
		if(!_isAction){return;}
		this.ActionAnim();
	};

    this.Init();
}