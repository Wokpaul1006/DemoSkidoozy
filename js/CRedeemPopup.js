var _oRedeemPopup;
function CRedeemPopup(){
    var BG;
    var Container;
    var ExitBut;
    var TitleTxt;
    var BalanceTxt;
    var MoneySelectTxt;
    var ValueSelectTxt;

    var CashOutBut;
    var PlusValue1;
    var PlusValue2;
    var PlusValue3;
    var PlusValue4;
    var PlusValue5;
    var PlusValue6;

    var titleStr = "PRINT YOUR TICKET TO REDEEM YOUR SWEEPSTAKES PRIZE."; //Print your ticket to redeem your sweepstakes prize.
    var balanceStr = "YOUR WIN BALANCE: "; // Your win balance:
    var moneySelectStr = "SELECT HOW MUCH YOU WANT TO REDEEM";
    var NotSuccess = "Please enter valid redeem amount";
    var Success = "Please Present Receipt to Attendant on Duty to Redeem Your Sweepstakes Prize";
    
    var valueRedeem;
    var valueRedeemList;

    var isNotificationShow;

    var _oHitArea;

    this.Init = function(){
        Container = new createjs.Container();
        s_oAttachSection.addChild(Container);
        Container.visible = false;

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oHitArea.on("click",function(){_oStartBut.unload()});
        Container.addChild(_oHitArea);


        valueRedeemList = new Array();
        valueRedeem = 0;

        BG = new createjs.Bitmap(s_oSpriteLibrary.getSprite('RedeemBG'));
        BG.visible = true;
        BG.alpha = 1;
        Container.addChild(BG);

        TitleTxt = new createjs.Text(titleStr, "26px " + FONT_REGULAR, "#ffffff");
        TitleTxt.x = 664;
        TitleTxt.y = 150;
        TitleTxt.alpha = 1;
        TitleTxt.textAlign = "center";
        TitleTxt.textBaseline = "alphabetic";
        TitleTxt.lineWidth = 900;
        Container.addChild(TitleTxt);

        BalanceTxt = new createjs.Text(balanceStr + TEXT_CURRENCY + _oProfile.GetWalletBalance().toFixed(2), "28px " + FONT_REGULAR, "#fae833");
        BalanceTxt.x = 662;
        BalanceTxt.y = 200;
        BalanceTxt.alpha = 1;
        BalanceTxt.textAlign = "center";
        BalanceTxt.textBaseline = "alphabetic";
        BalanceTxt.lineWidth = 900;
        Container.addChild(BalanceTxt);

        MoneySelectTxt = new createjs.Text(moneySelectStr, "35px " + FONT_REGULAR, "#ffffff");
        MoneySelectTxt.x = 663;
        MoneySelectTxt.y = 300;
        MoneySelectTxt.alpha = 1;
        MoneySelectTxt.textAlign = "center";
        MoneySelectTxt.textBaseline = "alphabetic";
        MoneySelectTxt.lineWidth = 900;
        Container.addChild(MoneySelectTxt);

        ValueSelectTxt = new createjs.Text(TEXT_CURRENCY + valueRedeem.toFixed(2), "37px " + FONT_REGULAR, "#fae833");
        ValueSelectTxt.x = 663;
        ValueSelectTxt.y = 350;
        ValueSelectTxt.alpha = 1;
        ValueSelectTxt.textAlign = "center";
        ValueSelectTxt.textBaseline = "alphabetic";
        ValueSelectTxt.lineWidth = 900;
        Container.addChild(ValueSelectTxt);

        var oSprite = s_oSpriteLibrary.getSprite('info_but');
        ExitBut = new CGfxButton(1023,50,s_oSpriteLibrary.getSprite('ExitBtn'),Container);
        ExitBut.addEventListener(ON_MOUSE_UP, this.hide, this);

        oSprite = s_oSpriteLibrary.getSprite('ValueBut1');
        PlusValue1 = new CTextButton(265 + (oSprite.width / 2), 445, 3, -3, oSprite, "+1"," ", FONT_REGULAR, "#ffffff", 35,Container);
        PlusValue1.addEventListener(ON_MOUSE_UP, this.PlusOneValue, this);

        oSprite = s_oSpriteLibrary.getSprite('ValueBut1');
        PlusValue2 = new CTextButton(395 + (oSprite.width / 2), 445, 3, -3, oSprite, "+5"," ", FONT_REGULAR, "#ffffff", 35,Container);
        PlusValue2.addEventListener(ON_MOUSE_UP, this.PlusFiveValue, this);

        oSprite = s_oSpriteLibrary.getSprite('ValueBut1');
        PlusValue3 = new CTextButton(525 + (oSprite.width / 2), 445, 3, -3, oSprite, "+10"," ", FONT_REGULAR, "#ffffff", 35,Container);
        PlusValue3.addEventListener(ON_MOUSE_UP, this.PlusTenValue, this);

        oSprite = s_oSpriteLibrary.getSprite('ValueBut1');
        PlusValue4 = new CTextButton(655 + (oSprite.width / 2), 445, 3, -3, oSprite, "+50"," ", FONT_REGULAR, "#ffffff", 35,Container);
        PlusValue4.addEventListener(ON_MOUSE_UP, this.PlusFiftyValue, this);

        oSprite = s_oSpriteLibrary.getSprite('ValueBut2');
        PlusValue5 = new CTextButton(785 + (oSprite.width / 2), 445, 3, -3, oSprite, "+100"," ", FONT_REGULAR, "#ffffff", 35,Container);
        PlusValue5.addEventListener(ON_MOUSE_UP, this.PlusOneHundredValue, this);

        oSprite = s_oSpriteLibrary.getSprite('ValueBut2');
        PlusValue6 = new CTextButton(935 + (oSprite.width / 2), 445, 3, -3, oSprite, "ALL"," ", FONT_REGULAR, "#ffffff", 35,Container);
        PlusValue6.addEventListener(ON_MOUSE_UP, this.PlusAllValue, this);

        oSprite = s_oSpriteLibrary.getSprite('ConfirmBut');
        CashOutBut = new CTextButton(510 + (oSprite.width / 2), 570, -2, 2, oSprite, "CASH OUT"," ", FONT_BOLD, "#ffffff", 38,Container);
        CashOutBut.addEventListener(ON_MOUSE_UP, this.CashOut, this);

        oSprite = s_oSpriteLibrary.getSprite('UndoBut');
        UndoBut = new CTextButton(288 + (oSprite.width / 2), 565, -2, 2, oSprite, " "," ", FONT_BOLD, "#ffffff", 38,Container);
        UndoBut.addEventListener(ON_MOUSE_UP, this.Undo, this);
    };

    this.show = function(){
        Container.visible = true;
        this.reset();
        _oInterface.disableGuiButtons(false);
    };

    this.reset = function(){
        this.refreshWinningBalance();
        valueRedeem = 0;
        this.refreshRedeemValue();
        this.refreshValueRedeemList();
        console.log("valueRedeemList " , valueRedeemList);
        isNotificationShow = false;
    };

    this.hide = function(){
        //_isRedeemShow = false;
        _isMadaamAnimShow = true;
        _isMadaamAnimDisableShow = false;
        if(isNotificationShow){
            return;
        }
        Container.visible = false;
        _oInterface.enableGuiButtons();
		createjs.Sound.setVolume(currentSound);
    };

    this.refreshWinningBalance = function(){
        BalanceTxt.text = balanceStr + TEXT_CURRENCY + _oProfile.GetWalletBalance().toFixed(2);
    };

    this.refreshRedeemValue = function(){
        ValueSelectTxt.text = TEXT_CURRENCY + valueRedeem.toFixed(2);
    };

    this.PlusOneValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueRedeem += 1;
            this.ActionAfter();
        }
    };

    this.PlusFiveValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueRedeem += 5;
            this.ActionAfter();
        }
    };

    this.PlusTenValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueRedeem += 10;
            this.ActionAfter();
        }
    };

    this.PlusFiftyValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueRedeem += 50;
            this.ActionAfter();
        }
    };

    this.PlusOneHundredValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueRedeem += 100;
            this.ActionAfter();
        }
    };

    this.PlusAllValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueRedeem = _oProfile.GetWalletBalance();
            this.ActionAfter();
        }
    };

    this.ActionAfter = function(){
        if(valueRedeem >= _oProfile.GetWalletBalance()){
            valueRedeem = _oProfile.GetWalletBalance();
        }
        valueRedeemList.push(valueRedeem);
        this.refreshRedeemValue();
        console.log(valueRedeemList);
    };

    this.Undo = function(){
        playSound("press_but",1,0);
        if(valueRedeemList.length >= 2 && valueRedeem !== 0){
            valueRedeem = valueRedeemList[valueRedeemList.length-2];
            valueRedeemList.splice(valueRedeemList.length-1,1);
            this.refreshRedeemValue();
            console.log(valueRedeemList);
        }
    };

    this.refreshValueRedeemList = function(){
        for(var i=valueRedeemList.length-1; i>=0; i--){
            valueRedeemList.splice(i,1);
        }
        valueRedeemList.push(0);
        console.log(valueRedeemList);
    };

    this.CheckMaxRedeem = function(){
        if(_oProfile.GetWalletBalance() <= 0){
            var str = "YOU HAVE NO \nWINNING BALANCE";
            this.ShowNotification(str,"27px ", 360, 2000);
            return true;
        }
        if(valueRedeem >= _oProfile.GetWalletBalance()){
            return true;
        }
        return false;
    };

    this.CashOut = function(){
        playSound("press_but",1,0);
        if(_oProfile.GetWalletBalance() <= 0){
            var str = "YOU HAVE NO \nWINNING BALANCE";
            this.ShowNotification(str,"27px ", 360, 2000);
        }else{
            if(valueRedeem <= 0){
                return;
            }
            CashOutRedeem(valueRedeem);
        }
    };

    this.CashOutSuccess = function(){
        _oProfile.refreshWalletBalance(_oProfile.GetWalletBalance()-valueRedeem);
        _oInterface.refreshMoney(_oProfile.GetWalletBalance());
        //var str = "Redemption Successful!\n" + TEXT_CURRENCY +valueRedeem.toFixed(2);
        var str = Success;
        this.ShowNotification(str, "30px ", 340, 10000);
        this.reset();
    };

    this.ShowNotification = function(str,fontsize,_y,_timeshow){
        this.disableBut();
        isNotificationShow = true;
        _oNotification.showNotification(true,str,fontsize + FONT_BOLD,_y);
        setTimeout(() => {
            _oNotification.showNotification(false," ");
            this.enableBut();
            isNotificationShow = false;
        }, _timeshow);
    };  

    this.enableBut = function(){
        CashOutBut.enable();
        PlusValue1.enable();
        PlusValue2.enable();
        PlusValue3.enable();
        PlusValue4.enable();
        PlusValue5.enable();
        PlusValue6.enable();
    };

    this.disableBut = function(isAll){
        CashOutBut.disable();
        PlusValue1.disable();
        PlusValue2.disable();
        PlusValue3.disable();
        PlusValue4.disable();
        PlusValue5.disable();
        PlusValue6.disable();
    };
   
    this.Init();
}