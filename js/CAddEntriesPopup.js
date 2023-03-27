var _oAddEntriesPopup;
function CAddEntriesPopup(){
    var BG;
    var Container;
    var ExitBut;
    var TitleTxt;
    var BalanceTxt;
    var BankBalanceTxt;
    var MoneySelectTxt;
    var ValueSelectTxt;
    var WinBalanceCheckBox;
    var BankBalanceCheckBox;
    var isWinBalanaceCheck;
    var isBankBalanceCheck;

    var AddEntriesBut;
    var BuyPointBut;
    var BuyCouponBut;
    var PlusValue1;
    var PlusValue2;
    var PlusValue3;
    var PlusValue4;
    var PlusValue5;
    var PlusValue6;

    var titleStr = "USE CURRENT ENTRIES TO ENTER SWEEPSTAKES"; //Print your ticket to redeem your sweepstakes prize.
    var balanceStr = "WIN BALANCE: "; // Your win balance:
    var bankBalanceStr = "BANK BALANCE: ";
    var moneySelectStr = "SELECT HOW MUCH YOU WANT TO ADD";
    var NotSuccess = "Please enter valid redeem amount";
    var Success = "Add Entries Successful";
    
    var valueAdd;
    var valueAddList;

    var isNotificationShow;

    var _oHitArea;

    this.Donothing = function(){ };

    this.Init = function(){
        Container = new createjs.Container();
        s_oAttachSection.addChild(Container);
        Container.visible = false;

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oHitArea.on("click",function(){Donothing()});
        Container.addChild(_oHitArea);

        valueAddList = new Array();
        valueAdd = 0;

        isWinBalanaceCheck = true;
        isBankBalanceCheck = false;

        BG = new createjs.Bitmap(s_oSpriteLibrary.getSprite('AddEntriesBG'));
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

        BalanceTxt = new createjs.Text(balanceStr + TEXT_CURRENCY + _oProfile.GetWalletBalance().toFixed(2), "24px " + FONT_REGULAR, "#fae833");
        BalanceTxt.x = 860;
        BalanceTxt.y = 200;
        BalanceTxt.alpha = 1;
        BalanceTxt.textAlign = "center";
        BalanceTxt.textBaseline = "alphabetic";
        BalanceTxt.lineWidth = 900;
        Container.addChild(BalanceTxt);

        BankBalanceTxt = new createjs.Text(bankBalanceStr + TEXT_CURRENCY + _oProfile.GetBankBalance().toFixed(2), "24px " + FONT_REGULAR, "#fae833");

        BankBalanceTxt.x = 350;
        BankBalanceTxt.y = 200;
        BankBalanceTxt.alpha = 1;
        BankBalanceTxt.textAlign = "left";
        BankBalanceTxt.textBaseline = "alphabetic";
        BankBalanceTxt.lineWidth = 900;
        Container.addChild(BankBalanceTxt);

        MoneySelectTxt = new createjs.Text(moneySelectStr, "35px " + FONT_REGULAR, "#ffffff");
        MoneySelectTxt.x = 663;
        MoneySelectTxt.y = 300;
        MoneySelectTxt.alpha = 1;
        MoneySelectTxt.textAlign = "center";
        MoneySelectTxt.textBaseline = "alphabetic";
        MoneySelectTxt.lineWidth = 900;
        Container.addChild(MoneySelectTxt);

        ValueSelectTxt = new createjs.Text(TEXT_CURRENCY + valueAdd.toFixed(2), "37px " + FONT_REGULAR, "#fae833");
        ValueSelectTxt.x = 663;
        ValueSelectTxt.y = 350;
        ValueSelectTxt.alpha = 1;
        ValueSelectTxt.textAlign = "center";
        ValueSelectTxt.textBaseline = "alphabetic";
        ValueSelectTxt.lineWidth = 900;
        Container.addChild(ValueSelectTxt);

        var oSprite = s_oSpriteLibrary.getSprite('checkbox')
        WinBalanceCheckBox = new CToggle(695,190,oSprite,isWinBalanaceCheck,Container);
        WinBalanceCheckBox.addEventListener(ON_MOUSE_UP, this._onWinBalanceCheckBox, this);

        oSprite = s_oSpriteLibrary.getSprite('checkbox')
        BankBalanceCheckBox = new CToggle(315,190,oSprite,isBankBalanceCheck,Container);
        BankBalanceCheckBox.addEventListener(ON_MOUSE_UP, this._onBankBalanceCheckBox, this);

        oSprite = s_oSpriteLibrary.getSprite('info_but');
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
		
		this.InitMainButton();

        oSprite = s_oSpriteLibrary.getSprite('UndoBut');
        UndoBut = new CTextButton(288 + (oSprite.width / 2), 565, -2, 2, oSprite, " "," ", FONT_BOLD, "#ffffff", 38,Container);
        UndoBut.addEventListener(ON_MOUSE_UP, this.Undo, this);
    };
	
	this.InitMainButton = function(){
		oSprite = s_oSpriteLibrary.getSprite('AddEntriesBut1');
        AddEntriesBut = new CTextButton(370 + (oSprite.width / 2), 555, 1, -2, oSprite, "ADD ENTRIES"," ", FONT_BOLD, "#ffffff", 22,Container);
        AddEntriesBut.addEventListener(ON_MOUSE_UP, this.DoAddEntries, this);

        oSprite = s_oSpriteLibrary.getSprite('AddEntriesBut2');
        BuyCouponBut = new CTextButton(570 + (oSprite.width / 2), 555, 1, 8, oSprite, "BUY COUPON FROM","WINNINGS ", FONT_BOLD, "#ffffff", 19,Container);
        BuyCouponBut.addEventListener(ON_MOUSE_UP, this.BuyCouponFromWining, this);

        oSprite = s_oSpriteLibrary.getSprite('AddEntriesBut2');
        BuyPointBut = new CTextButton(820 + (oSprite.width / 2), 555, 1, 8, oSprite, "BUY ADDITIONAL","COUPON POINTS ", FONT_BOLD, "#ffffff", 19,Container);
        BuyPointBut.addEventListener(ON_MOUSE_UP, this.BuyAdditionalCouponPoints, this);

	};

    this.show = function(){
        console.log("Bank balance: " + _oProfile.GetBankBalance().toFixed(2));
        Container.visible = true;
        this.reset();
        _oInterface.disableGuiButtons(false);
    };
	
	this.DoAddEntries = function(){
        playSound("press_but",1,0);
        if(!this.CheckTrue()) {return};
        DoAddEntries(valueAdd,isBankBalanceCheck);
    };

    this.AddEntriesSuccess = function(){
        if(isWinBalanaceCheck){
            _oProfile.refreshWalletBalance(_oProfile.GetWalletBalance()-valueAdd);
            _oInterface.refreshMoney(_oProfile.GetWalletBalance());
        }else if(isBankBalanceCheck){
            _oProfile.refreshBankBalance(_oProfile.GetBankBalance()-valueAdd);
        }
		_oProfile.refreshSweepstakesPoints(valueAdd * 100);
		_oInterface._refreshEntries(_oProfile.GetSweepstakesPoints());
   
        //var str = "Redemption Successful!\n" + TEXT_CURRENCY +valueRedeem.toFixed(2);
        var str = Success;
        this.ShowNotification(str, "40px ", 370, 5000);
        this.reset();
    };
	
	this.BuyCouponFromWining = function(){
		playSound("press_but",1,0);
        console.log(valueAdd);
		if(valueAdd < 1 || _oProfile.GetBankBalance() < 1){
			var str = "You need minimum $1 to buy coupon from winning balance. You can redeem any amount of winning balance.";
			this.ShowNotification(str, "30px ", 325, 10000);
			return;
		}
		BuyCouponFromWinning();
	};
	
	this.BuyCouponFromWiningSuccess = function(){
		AddUpdateCustomerBankBalance(valueAdd);
	};
	
	this.AddUpdateCustomerBankBalanceSuccess = function(str){
		_oProfile.refreshWalletBalance(_oProfile.GetWalletBalance() - valueAdd);
        _oInterface.refreshMoney(_oProfile.GetWalletBalance());
		_oProfile.refreshBankBalance(_oProfile.GetBankBalance() + valueAdd + (valueAdd/10));
        this.reset();
        this.ShowNotification(str, "21px ", 310, 6000);
	};
	
	this.BuyAdditionalCouponPoints = function(){
		playSound("press_but",1,0);
		if(valueAdd < 1 || _oProfile.GetBankBalance() < 1){
			var str = "You need minimum $1 to buy coupon from bank balance. You can redeem any amount of bank balance.";
			this.ShowNotification(str, "30px ", 325, 10000);
			return;
		}
		BuyAdditionalCouponPoints();
	};
	
	this.BuyAdditionalCouponPointsSuccess = function(){
		AddUpdateCustomerBankBalanceBuyAdditionalCouponPoints(valueAdd);
	};
	
	this.AddUpdateCustomerBankBalanceBuyAdditionalCouponPointsSuccess = function(str){
		_oProfile.refreshBankBalance(_oProfile.GetBankBalance() - valueAdd);
		this.reset();
		this.ShowNotification(str, "21px ", 310, 6000);
	};

    this.reset = function(){
        this.refreshWinningBalance();
        this.refreshBankBalance();
        valueAdd = 0;
        this.refreshRedeemValue();
        this.refreshValueRedeemList();
        //console.log("valueAddList " , valueAddList);
        isNotificationShow = false;
    };

    this.hide = function(){
        //_isAddEntriesShow = false;
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

    this.refreshBankBalance = function(){
        BankBalanceTxt.text = bankBalanceStr + TEXT_CURRENCY + _oProfile.GetBankBalance().toFixed(2);
    };

    this.refreshRedeemValue = function(){
        ValueSelectTxt.text = TEXT_CURRENCY + valueAdd.toFixed(2);
    };

    this.PlusOneValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueAdd += 1;
            this.ActionAfter();
        }
    };

    this.PlusFiveValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueAdd += 5;
            this.ActionAfter();
        }
    };

    this.PlusTenValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueAdd += 10;
            this.ActionAfter();
        }
    };

    this.PlusFiftyValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueAdd += 50;
            this.ActionAfter();
        }
    };

    this.PlusOneHundredValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            valueAdd += 100;
            this.ActionAfter();
        }
    };

    this.PlusAllValue = function(){
        playSound("press_but",1,0);
        if(!this.CheckMaxRedeem()){
            if(isWinBalanaceCheck){
                valueAdd = _oProfile.GetWalletBalance();
            }else if(isBankBalanceCheck){
                valueAdd = _oProfile.GetBankBalance();
            }
            this.ActionAfter();
        }
    };

    this.ActionAfter = function(){
        this.AssignValueWhenMax();
        valueAddList.push(valueAdd);
        this.refreshRedeemValue();
        //console.log(valueAddList);
    };

    this.Undo = function(){
        playSound("press_but",1,0);
        if(valueAddList.length >= 2 && valueAdd !== 0){
            valueAdd = valueAddList[valueAddList.length-2];
            valueAddList.splice(valueAddList.length-1,1);
            this.AssignValueWhenMax();
            this.refreshRedeemValue();
            //console.log(valueAddList);
        }
    };

    this.AssignValueWhenMax = function(){
        if(isWinBalanaceCheck){
            if(valueAdd >= _oProfile.GetWalletBalance()){
                valueAdd = _oProfile.GetWalletBalance();
            }
        }else if(isBankBalanceCheck){
            if(valueAdd >= _oProfile.GetBankBalance()){
                valueAdd = _oProfile.GetBankBalance();
            }
        }
    };

    this.refreshValueRedeemList = function(){
        for(var i=valueAddList.length-1; i>=0; i--){
            valueAddList.splice(i,1);
        }
        valueAddList.push(0);
        //console.log(valueAddList);
    };

    this.CheckMaxRedeem = function(){
        if(isWinBalanaceCheck){
            if(_oProfile.GetWalletBalance() <= 0){
                var str = "YOU HAVE NO \nWINNING BALANCE";
                this.ShowNotification(str,"27px ", 360, 4000);
                return true;
            }

            if(valueAdd >= _oProfile.GetWalletBalance()){
                return true;
            }
            return false;
        }else if(isBankBalanceCheck){
            if(_oProfile.GetBankBalance() <= 0){
                var str = "YOU HAVE NO \BANK BALANCE";
                this.ShowNotification(str,"27px ", 360, 4000);
                return true;
            }

            if(valueAdd >= _oProfile.GetBankBalance()){
                return true;
            }
            return false;
        }
        
        return false;
    };

	
	this.CheckTrue = function(){
		if(!isWinBalanaceCheck && !isBankBalanceCheck){
            return false;
        }
        if(isWinBalanaceCheck){
            if(_oProfile.GetWalletBalance() <= 0){
                var str = "YOU HAVE NO \nWINNING BALANCE";
                this.ShowNotification(str,"27px ", 360, 4000);
                return false;
            }
        }else if(isBankBalanceCheck){
            if(_oProfile.GetBankBalance() <= 0){
                var str = "YOU HAVE NO \BANK BALANCE";
                this.ShowNotification(str,"27px ", 360, 4000);
                return false;
            }
        }
        if(valueAdd <= 0){
			var str = "Please select how much you want to add";
            this.ShowNotification(str,"27px ", 360, 4000);
            return false;
        }
		return true;
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

    this._onWinBalanceCheckBox = function(){
        isWinBalanaceCheck = !isWinBalanaceCheck;
        this.AllCheckBoxFalse();
        if(isWinBalanaceCheck){
            if(isBankBalanceCheck){
                isBankBalanceCheck = false;
                BankBalanceCheckBox.ChangeImage(isBankBalanceCheck);
            }
        }
        this.AssignValueWhenMax();
        this.refreshRedeemValue();
    };

    this._onBankBalanceCheckBox = function(){
        isBankBalanceCheck = !isBankBalanceCheck;
        this.AllCheckBoxFalse();
        if(isBankBalanceCheck){
            if(isWinBalanaceCheck){
                isWinBalanaceCheck = false;
                WinBalanceCheckBox.ChangeImage(isWinBalanaceCheck);
            }
        }
        this.AssignValueWhenMax();
        this.refreshRedeemValue();
    };
	
	this._onBuyCouponFromWinning = function(){
		//Customer/AddUpdateCustomerBankBalance?CustomerSweepstakeID={CustomerSweepstakeID}&CustomerID={CustomerID}&BankBalance={BankBalance}&EstablishmentID={EstablishmentID}&EstablishmentKioskID={EstablishmentKioskID}&Paymentmethod={Paymentmethod}
	};

    this.AllCheckBoxFalse = function(){
        if(!isWinBalanaceCheck && !isBankBalanceCheck){
            this.disableBut();
        }
        if(isWinBalanaceCheck || isBankBalanceCheck){
            this.enableBut();
        }
    };

    this.enableBut = function(){
        AddEntriesBut.enable();
        BuyCouponBut.enable();
        BuyPointBut.enable();
        PlusValue1.enable();
        PlusValue2.enable();
        PlusValue3.enable();
        PlusValue4.enable();
        PlusValue5.enable();
        PlusValue6.enable();
    };

    this.disableBut = function(){
        AddEntriesBut.disable();
        BuyCouponBut.disable();
        BuyPointBut.disable();
        PlusValue1.disable();
        PlusValue2.disable();
        PlusValue3.disable();
        PlusValue4.disable();
        PlusValue5.disable();
        PlusValue6.disable();
    };
   
    this.Init();
}