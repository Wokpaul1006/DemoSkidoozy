function CBonusPanel(){
    var finalResult;
    var _bInitGame;
    var _iCurAnim;
    var _iTimeIdle;
    var _iTimeWin;
    var _iGameState;
    var _iPrizeToShow;
    var _iCurAlpha;
    var _oLeds;
    var _oTextHighLight;
    var _oContainer;
	var _oPoint;
	var _oPopupBonus;
	var _iCountBox;
	var _iCountOpen;
    var _resulttoshowPopup;

    var _oBox1,_oBox2,_oBox3,_oBox4,_oBox5,_oBox6,_oBox7,_oBox8,_oBox9,_oBox10,_oBox11,_oBox12,_oBox13,_oBox14,_oBox15;	
	var _oMoney1,_oMoney2,_oMoney3,_oMoney4,_oMoney5,_oMoney6,_oMoney7,_oMoney8,_oMoney9,_oMoney10,_oMoney11,_oMoney12,_oMoney13,_oMoney14,_oMoney15;
    var _oFreespinFail1,_oFreespinFail2,_oFreespinFail3,_oFreespinFail4,_oFreespinFail5,_oFreespinFail6,_oFreespinFail7,_oFreespinFail8,_oFreespinFail9,
                                                        _oFreespinFail10,_oFreespinFail11,_oFreespinFail12,_oFreespinFail13,_oFreespinFail14,_oFreespinFail15;

	var _oSymbol1,_oSymbol2,_oSymbol3,_oSymbol4,_oSymbol5,_oSymbol6,_oSymbol7,_oSymbol8,_oSymbol9,_oSymbol10,_oSymbol11,_oSymbol12,_oSymbol13,_oSymbol14,_oSymbol15;
	var _oSymbolFail1,_oSymbolFail2,_oSymbolFail3,_oSymbolFail4,_oSymbolFail5,_oSymbolFail6,_oSymbolFail7,_oSymbolFail8,_oSymbolFail9,_oSymbolFail10,_oSymbolFail11,_oSymbolFail12,
    _oSymbolFail13,_oSymbolFail14,_oSymbolFail15;
	
	var _listBox;
	var _listText;
	var _listSymbol;
	var _listSymbolFail;
    var _listFreespinFail;

    var _listResult;
    var countNumberAfterCommar;
    var _isEnd;
    var _oFreeSpinPanel;
    var _oTextTime;
	
	var _listParticleAnim;
	var _oPCon;
	var _isAction;
	var _curIndexParticleAnim;
	var _freeSpinCount;
    var _singleFreespincount;
    var _oBackBut;
    
    this._init = function(){
        _iTimeIdle = 0;
        _iTimeWin = 0;
        _iCurAlpha = 0;
        _bInitGame = false;
		_isAction = false;
        _iGameState = STATE_BONUS_IDLE;
		
		_listBox = new Array();
        _listText = new Array();
		_listSymbol = new Array();
        _listSymbolFail = new Array();
        _listFreespinFail = new Array();
        _listResult = new Array();
		_curIndexParticleAnim = 0;
		
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
		
        s_oAttachSection.addChild(_oContainer);
		
		_iCurAnim = 0;
		
		_oTextHighLight = new createjs.Text("X" +"0","80px "+FONT_BOLD, "#4f2930");
        _oTextHighLight.x = 710;
        _oTextHighLight.y = 350;
        _oTextHighLight.textAlign = "center";
        _oTextHighLight.textBaseline = "alphabetic";
        _oTextHighLight.lineWidth = 700;
        _oTextHighLight.alpha = _iCurAlpha;
        _oContainer.addChild(_oTextHighLight);
    };
    
    this.show = function(iPrize, iBet, iCountBox,_iTotWin){
		_freeSpinCount = 0;
        _singleFreespincount = 0;
		_curIndexParticleAnim = 0;
		_iCountOpen = 0;
        _isEnd = false;
		_isAction = false;
        _oTextHighLight.text = "";
        _oTextHighLight.alpha = 1;
        _iPrizeToShow = iPrize;
        _resultFormmaingame = _iTotWin;
        console.log(_iPrizeToShow);
        _oContainer.visible = true;
        _bInitGame = true;
		_oCurBet = iBet;
		_iCountBox = iCountBox - 2;
        this.GenerateResult(_iCountBox);
        this.refreshFreeTime(_iCountBox);
        _isInBonus = true;
    };

    this.refreshFreeTime = function(_iCountBox){
        var _text = " ";
        if(_iCountBox <= 1){
            _text = _iCountBox + "\nCHEST";
        }else{
            _text = _iCountBox + "\nCHESTS";
        }
        _oTextTime.text = _text;
    };

    this.showElement = function(){
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_bonus'));
        _oContainer.addChild(oBg);

        _oPopupBonus = new createjs.Bitmap(s_oSpriteLibrary.getSprite('popupbonus'));
        _oPopupBonus.visible = false;
		_oContainer.addChild(_oPopupBonus);

        _oFreeSpinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('freespin_panel'));
        _oFreeSpinPanel.x = 890;
        _oFreeSpinPanel.y = 15;
        _oFreeSpinPanel.visible = true;
        _oContainer.addChild(_oFreeSpinPanel);

        _oTextTime = new createjs.Text("", "23px " + FONT_BOLD, "#fdf9bf");
        _oTextTime.x = 960;
        _oTextTime.y = 44;
        _oTextTime.textAlign = "center";
        _oTextTime.textBaseline = "alphabetic";
        _oContainer.addChild(_oTextTime);
		_oCurBet = 0;

        _oBackBut = new CGfxButton(175,600,s_oSpriteLibrary.getSprite('back_Btn'),_oContainer);
        _oBackBut.addEventListener(ON_MOUSE_UP, this._onBack, this);
		_oBackBut.setVisible(false);
    };
	
	this.initParticleAnim = function(){
		_oPCon = new createjs.Container();
		_oPCon.visible = false;
		_oContainer.addChild(_oPCon);
		_listParticleAnim = new Array();
        for(var t=0;t<30;t++){
            var _particleAnim = new createjs.Bitmap(s_oSpriteLibrary.getSprite('particle_'+t));
            _particleAnim.visible = false;
			_particleAnim.alpha = 1;
            _oPCon.addChild(_particleAnim);
            _listParticleAnim.push(_particleAnim);
        }
	};
	
	this.PlayAction = function(iX,iY){
		_oPCon.visible = true;
		_oPCon.x = iX-100;
		_oPCon.y = iY-100;
		_isAction = true;
	};
	
	this.ActionParticleAnim = function(){
		for(var i=0;i<30;i++){
			_listParticleAnim[i].visible = false;
		}
		//console.log(_curIndexParticleAnim);
		_listParticleAnim[_curIndexParticleAnim].visible = true;
		_curIndexParticleAnim++;
		if(_curIndexParticleAnim >= 30){
			_curIndexParticleAnim = 0;
			this.HideParticle();
		}
	};
	
	this.HideParticle = function(){
		_isAction = false;
		_oPCon.visible = false;
	};
	
	this.InitAllBox = function(){
		_listBox = new Array(); 
		
		var oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox1 = new CToggle(362,176,oSprite,true,_oContainer,true,0);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox2 = new CToggle(362,359,oSprite,true,_oContainer,true,1);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox3 = new CToggle(362,540,oSprite,true,_oContainer,true,2);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox4 = new CToggle(556,176,oSprite,true,_oContainer,true,3);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox5 = new CToggle(556,359,oSprite,true,_oContainer,true,4);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox6 = new CToggle(556,540,oSprite,true,_oContainer,true,5);

		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox7 = new CToggle(752,176,oSprite,true,_oContainer,true,6);

		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox8 = new CToggle(752,359,oSprite,true,_oContainer,true,7);

		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox9 = new CToggle(752,540,oSprite,true,_oContainer,true,8);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox10 = new CToggle(949,176,oSprite,true,_oContainer,true,9);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox11 = new CToggle(949,359,oSprite,true,_oContainer,true,10);

		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox12 = new CToggle(949,540,oSprite,true,_oContainer,true,11);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox13 = new CToggle(1145,176,oSprite,true,_oContainer,true,12);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox14 = new CToggle(1145,359,oSprite,true,_oContainer,true,13);
		
		oSprite = s_oSpriteLibrary.getSprite('box')
        _oBox15 = new CToggle(1145,540,oSprite,true,_oContainer,true,14);
		
		_listBox.push(_oBox1,_oBox2, _oBox3,_oBox4,_oBox5,_oBox6,_oBox7,_oBox8,_oBox9,_oBox10, _oBox11,_oBox12,_oBox13,_oBox14,_oBox15);
	};
	
	this.InitFreeSpinSymbol = function(){
		
		_listSymbol = new Array();
		
		_oSymbol1 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol1.x = 299;
        _oSymbol1.y = 150;
        _oSymbol1.visible = false;
        _oContainer.addChild(_oSymbol1);
		
		_oSymbol2 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol2.x = 299;
        _oSymbol2.y = 333;
        _oSymbol2.visible = false;
        _oContainer.addChild(_oSymbol2);
		
		_oSymbol3 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol3.x = 299;
        _oSymbol3.y = 514;
        _oSymbol3.visible = false;
        _oContainer.addChild(_oSymbol3);
		
		_oSymbol4 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol4.x = 493;
        _oSymbol4.y = 150;
        _oSymbol4.visible = false;
        _oContainer.addChild(_oSymbol4);
		
		_oSymbol5 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol5.x = 493;
        _oSymbol5.y = 333;
        _oSymbol5.visible = false;
        _oContainer.addChild(_oSymbol5);
		
		_oSymbol6 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol6.x = 493;
        _oSymbol6.y = 514;
        _oSymbol6.visible = false;
        _oContainer.addChild(_oSymbol6);
		
		_oSymbol7 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol7.x = 689;
        _oSymbol7.y = 150;
        _oSymbol7.visible = false;
        _oContainer.addChild(_oSymbol7);
		
		_oSymbol8 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol8.x = 689;
        _oSymbol8.y = 333;
        _oSymbol8.visible = false;
        _oContainer.addChild(_oSymbol8);
		
		_oSymbol9 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol9.x = 689;
        _oSymbol9.y = 514;
        _oSymbol9.visible = false;
        _oContainer.addChild(_oSymbol9);
		
		_oSymbol10 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol10.x = 886;
        _oSymbol10.y = 150;
        _oSymbol10.visible = false;
        _oContainer.addChild(_oSymbol10);
		
		_oSymbol11 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol11.x = 886;
        _oSymbol11.y = 333;
        _oSymbol11.visible = false;
        _oContainer.addChild(_oSymbol11);
		
		_oSymbol12 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol12.x = 886;
        _oSymbol12.y = 514;
        _oSymbol12.visible = false;
        _oContainer.addChild(_oSymbol12);
		
		_oSymbol13 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol13.x = 1082
        _oSymbol13.y = 150;
        _oSymbol13.visible = false;
        _oContainer.addChild(_oSymbol13);
		
		_oSymbol14 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol14.x = 1082;
        _oSymbol14.y = 333;
        _oSymbol14.visible = false;
        _oContainer.addChild(_oSymbol14);
		
		_oSymbol15 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol'));
        _oSymbol15.x = 1082;
        _oSymbol15.y = 514;
        _oSymbol15.visible = false;
        _oContainer.addChild(_oSymbol15);
		
		_listSymbol.push(_oSymbol1,_oSymbol2,_oSymbol3,_oSymbol4,_oSymbol5,_oSymbol6,_oSymbol7,_oSymbol8,_oSymbol9,_oSymbol10,_oSymbol11,_oSymbol12,_oSymbol13,_oSymbol14,_oSymbol15);
	};
	
	this.InitFreeSpinSymbolFail = function(){
		_listSymbolFail = new Array();
		
		_oSymbolFail1 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail1.x = 299;
        _oSymbolFail1.y = 150;
        _oSymbolFail1.visible = false;
        _oContainer.addChild(_oSymbolFail1);
		
		_oSymbolFail2 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail2.x = 299;
        _oSymbolFail2.y = 333;
        _oSymbolFail2.visible = false;
        _oContainer.addChild(_oSymbolFail2);
		
		_oSymbolFail3 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail3.x = 299;
        _oSymbolFail3.y = 514;
        _oSymbolFail3.visible = false;
        _oContainer.addChild(_oSymbolFail3);
		
		_oSymbolFail4 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail4.x = 493;
        _oSymbolFail4.y = 150;
        _oSymbolFail4.visible = false;
        _oContainer.addChild(_oSymbolFail4);
		
		_oSymbolFail5 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail5.x = 493;
        _oSymbolFail5.y = 333;
        _oSymbolFail5.visible = false;
        _oContainer.addChild(_oSymbolFail5);
		
		_oSymbolFail6 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail6.x = 493;
        _oSymbolFail6.y = 514;
        _oSymbolFail6.visible = false;
        _oContainer.addChild(_oSymbolFail6);
		
		_oSymbolFail7 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail7.x = 689;
        _oSymbolFail7.y = 150;
        _oSymbolFail7.visible = false;
        _oContainer.addChild(_oSymbolFail7);
		
		_oSymbolFail8 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail8.x = 689;
        _oSymbolFail8.y = 333;
        _oSymbolFail8.visible = false;
        _oContainer.addChild(_oSymbolFail8);
		
		_oSymbolFail9 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail9.x = 689;
        _oSymbolFail9.y = 514;
        _oSymbolFail9.visible = false;
        _oContainer.addChild(_oSymbolFail9);
		
		_oSymbolFail10 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail10.x = 886;
        _oSymbolFail10.y = 150;
        _oSymbolFail10.visible = false;
        _oContainer.addChild(_oSymbolFail10);
		
		_oSymbolFail11 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail11.x = 886;
        _oSymbolFail11.y = 333;
        _oSymbolFail11.visible = false;
        _oContainer.addChild(_oSymbolFail11);
		
		_oSymbolFail12 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail12.x = 886;
        _oSymbolFail12.y = 514;
        _oSymbolFail12.visible = false;
        _oContainer.addChild(_oSymbolFail12);
		
		_oSymbolFail13 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail13.x = 1082
        _oSymbolFail13.y = 150;
        _oSymbolFail13.visible = false;
        _oContainer.addChild(_oSymbolFail13);
		
		_oSymbolFail14 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail14.x = 1082;
        _oSymbolFail14.y = 333;
        _oSymbolFail14.visible = false;
        _oContainer.addChild(_oSymbolFail14);
		
		_oSymbolFail15 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('free_spin_symbol_fail'));
        _oSymbolFail15.x = 1082;
        _oSymbolFail15.y = 514;
        _oSymbolFail15.visible = false;
        _oContainer.addChild(_oSymbolFail15);
		
		_listSymbolFail.push(_oSymbolFail1,_oSymbolFail2,_oSymbolFail3,_oSymbolFail4,_oSymbolFail5,_oSymbolFail6,_oSymbolFail7,_oSymbolFail8,_oSymbolFail9,_oSymbolFail10,_oSymbolFail11,_oSymbolFail12,_oSymbolFail13,_oSymbolFail14,_oSymbolFail15);
	};
	this.InitTextFreespinFaill = function()
    {
        _listFreespinFail = new Array()

        _oFreespinFail1 = new CFormatTextBonusPanel(362,176-25,_oContainer);
		_oFreespinFail2 = new CFormatTextBonusPanel(362,359-25,_oContainer);
		_oFreespinFail3 = new CFormatTextBonusPanel(362,540-25,_oContainer);
		_oFreespinFail4 = new CFormatTextBonusPanel(556,176-25,_oContainer);
		_oFreespinFail5 = new CFormatTextBonusPanel(556,359-25,_oContainer);
		_oFreespinFail6 = new CFormatTextBonusPanel(556,540-25,_oContainer);
		_oFreespinFail7 = new CFormatTextBonusPanel(752,176-25,_oContainer);
		_oFreespinFail8 = new CFormatTextBonusPanel(752,359-25,_oContainer);
		_oFreespinFail9 = new CFormatTextBonusPanel(752,540-25,_oContainer);
		_oFreespinFail10 = new CFormatTextBonusPanel(949,176-25,_oContainer);
		_oFreespinFail11= new CFormatTextBonusPanel(949,359-25,_oContainer);
		_oFreespinFail12 = new CFormatTextBonusPanel(949,540-25,_oContainer);
		_oFreespinFail13 = new CFormatTextBonusPanel(1145,176-25,_oContainer);
		_oFreespinFail14 = new CFormatTextBonusPanel(1145,359-25,_oContainer);
		_oFreespinFail15 = new CFormatTextBonusPanel(1145,540-25,_oContainer);

        _listFreespinFail.push(_oFreespinFail1,_oFreespinFail2,_oFreespinFail3,_oFreespinFail4,_oFreespinFail5,_oFreespinFail6,_oFreespinFail7,_oFreespinFail8,_oFreespinFail9,_oFreespinFail10,_oFreespinFail11,_oFreespinFail12,_oFreespinFail13,_oFreespinFail14,_oFreespinFail15);

        console.log(_listFreespinFail);
    }

	this.InitText = function(){
		
		_listText = new Array();
		
		_oMoney1 = new CFormatTextBonusPanel(362,160+16,_oContainer);
		_oMoney2 = new CFormatTextBonusPanel(362,343+16,_oContainer);
		_oMoney3 = new CFormatTextBonusPanel(362,540,_oContainer);
		_oMoney4 = new CFormatTextBonusPanel(556,176,_oContainer);
		_oMoney5 = new CFormatTextBonusPanel(556,359,_oContainer);
		_oMoney6 = new CFormatTextBonusPanel(556,540,_oContainer);
		_oMoney7 = new CFormatTextBonusPanel(752,176,_oContainer);
		_oMoney8 = new CFormatTextBonusPanel(752,359,_oContainer);
		_oMoney9 = new CFormatTextBonusPanel(752,540,_oContainer);
		_oMoney10 = new CFormatTextBonusPanel(949,176,_oContainer);
		_oMoney11 = new CFormatTextBonusPanel(949,359,_oContainer);
		_oMoney12 = new CFormatTextBonusPanel(949,540,_oContainer);
		_oMoney13 = new CFormatTextBonusPanel(1145,176,_oContainer);
		_oMoney14 = new CFormatTextBonusPanel(1145,359,_oContainer);
		_oMoney15 = new CFormatTextBonusPanel(1145,540,_oContainer);
		
		_listText.push(_oMoney1,_oMoney2,_oMoney3,_oMoney4,_oMoney5,_oMoney6,_oMoney7,_oMoney8,_oMoney9,_oMoney10,_oMoney11,_oMoney12,_oMoney13,_oMoney14,_oMoney15);

	};

    this.GenerateResult = function(countBox){
        isStartBonus = false; 
        var multiplyResultfromeMainGame = _resultFormmaingame * 100;
        console.log (multiplyResultfromeMainGame);
        var multiplyBonusResult =  WHEEL_SETTINGS[_iPrizeToShow] * 100;
        //var mainResult = WHEEL_SETTINGS[_iPrizeToShow];
        var mainResult = (multiplyResultfromeMainGame + multiplyBonusResult)/100;
        _resulttoshowPopup = mainResult;
        console.log(mainResult);
        var string = mainResult.toString()
        countNumberAfterCommar = 0;

        for(var i=0;i<string.length;i++){
            if(string[i] === "."){
                countNumberAfterCommar = string.length - 1 - i;
            }
        }

        do{
            _listResult = new Array();
            var subResult = 0;
            for(var i=0;i<countBox;i++){
                var result = (Math.random() * (mainResult - 0) + 0).toFixed(countNumberAfterCommar);
                //var result = mainResult;
                if(parseFloat(subResult) === parseFloat(mainResult)){
					result = 0;
                }
                subResult += parseFloat(result);
				if(result === 0){
					var rand = Math.floor(Math.random() * 101);
					console.log("RessultRand: " , rand);
					if(rand < 50){
						result = 0;
					}else{
						result = -1;
					}
				}
                _listResult.push(result);
            }
        }while(parseFloat(subResult) !== parseFloat(mainResult));
        if(!this.CheckListInvalid(_listResult)){
            this.GenerateResult(_iCountBox);
            return;
        }
        this.shuffleArray(_listResult);
        this.showElement();
		this.InitAllBox();
		this.InitText();
        this.InitTextFreespinFaill();
		this.initParticleAnim();
		this.InitFreeSpinSymbol();
		this.InitFreeSpinSymbolFail();
    };

    this.CheckListInvalid = function(list){
        var isInvalid = true;
        var count = 0;
        for(var i=0; i<list.length;i++){
            if(list[i] === 0){
                count++;
            } 
        }
        if(count > 1){
            isInvalid = false;
        }
        return isInvalid;
    };

    this.shuffleArray = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
	
	this.CheckShowAll = function(){

        playSound("OpenChest",1,0);
        _iCountOpen++;
		_iCountBox--;
        this.refreshFreeTime(_iCountBox);
		if(_iCountBox == 0){
			this.ShowAllMoney();
		}
	};

    this.ShowMoney = function(iChestIndex, iX,iY){
        if(_isEnd){
			var rand = Math.floor(Math.random() * 101);
			//console.log("random: " ,rand);
			if(rand < 50){
				var mainResult = WHEEL_SETTINGS[_iPrizeToShow];
				var result = (Math.random() * (mainResult - 0) + 1).toFixed(countNumberAfterCommar);
				_listText[iChestIndex].ChangeText("$" + result, _isEnd);
			}else{
                var RandFailFreespin;
                RandFailFreespin = Math.floor(Math.random() * 23)+2;
                _listFreespinFail[iChestIndex].ChangeText(RandFailFreespin + "\nFree spin",_isEnd);
			}		
            
        }else{
			if(_listResult[_iCountOpen] !== -1){
				_listText[iChestIndex].ChangeText("$" + _listResult[_iCountOpen], _isEnd);
			}else{
                _singleFreespincount = Math.floor(Math.random() * 23)+1;

                _listFreespinFail[iChestIndex].ChangeText(_singleFreespincount + "\nFree spin",_isEnd);
                console.log("_singleFreespincount = " + _singleFreespincount);
                _freeSpinCount += _singleFreespincount

                console.log("TotalFresspinBons = " + _freeSpinCount);
			}
            
			this.PlayAction(iX,iY);
			this.CheckShowAll();
        }
    };
	
	this.ShowAllMoney = function(){
        _isEnd = true;
		
		setTimeout(() => {
            for(var i=0; i<_listBox.length;i++){
				_listBox[i].buttonRelease();
			}
        }, 1000);

        setTimeout(() => {
            this.wheelArrived();
        }, 2100);

        setTimeout(() => {
            s_oBonusPanel.unload();
        }, 12000);
	};

    this.GetEnd = function(){
        return _isEnd;
    };
    
    this.wheelArrived = function(){	
		_oPopup.ChangePosition();
		var result = WHEEL_SETTINGS[_iPrizeToShow];
        //_oTextHighLight.text = "WIN: " +TEXT_CURRENCY + result;
		_oTextHighLight.text = " ";
		_oPopupBonus.visible = false;

        if(result < 1){
            console.log("TH1");
            _oPopup.showPopup(7,_freeSpinCount);
        }else if(result < 5 && result >= 1){
            console.log("TH2");
            _oPopup.showPopup(7,_freeSpinCount);
        }else if(result >= 5){
            console.log("TH3");
            _oPopup.showPopup(7,_freeSpinCount);
        }
		var _result = parseFloat(_resulttoshowPopup);
        finalResult = _result;
        console.log("_result= "+ _result);
		_oPopup.showPopupText(_result,"",0,_isInBonus);
		
		//this._animWinText();

        if(WHEEL_SETTINGS[_iPrizeToShow].prize <= 0){
            _iGameState = STATE_BONUS_LOSE;

            //playSound("game_over_bonus",1,0);
        } else {
            _iGameState = STATE_BONUS_WIN;

            //playSound("win_bonus",1,0);
        }
    };

    this._animLedWin = function(){
        //console.log(_iTimeWin);
        if(_iTimeWin === 0)
        {
        } else if(_iTimeWin > TIME_ANIM_WIN) {
            _iTimeIdle = TIME_ANIM_IDLE; 
            _iGameState = STATE_BONUS_IDLE;
            _iTimeWin =0;
        }
        _iTimeWin += s_iTimeElaps;
        
    };
    
    this._animWinText = function(){
        if(_iCurAlpha === 1){
            _iCurAlpha = 0;
            createjs.Tween.get(_oTextHighLight).to({alpha:_iCurAlpha }, 150,createjs.Ease.cubicOut).call(function(){s_oBonusPanel._animWinText();});
        }else{
            _iCurAlpha = 1;
            createjs.Tween.get(_oTextHighLight).to({alpha:_iCurAlpha }, 150,createjs.Ease.cubicOut).call(function(){s_oBonusPanel._animWinText();});
        }
    };	
	
	this._onBack = function(){
		_bInitGame = false;
		_oContainer.removeAllChildren();
        _oContainer.visible = false;
		_oPopupBonus.visible = false;
        createjs.Tween.removeTweens(_oTextHighLight);
        s_oGame.exitFromBonus(_freeSpinCount,finalResult);
	};
    
    this.unload = function(){
        _oBackBut.setVisible(true);
    };
    
    this.update = function(){
	if(_bInitGame){
            switch(_iGameState) {
                case STATE_BONUS_WIN: {
                        this._animLedWin();
                        break;                             
                } 
            }
			if(!_isAction){return;}
			this.ActionParticleAnim();
        }
    };
    
    s_oBonusPanel = this;
    
    this._init();
}
var _oCurBet;
var pCenterWheel = {x: 751, y: 321};
var s_oBonusPanel = null;