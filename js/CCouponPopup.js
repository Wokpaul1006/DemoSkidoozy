var _oCouponPopup;
function CCouponPopup(){
    var CouponInfor1 = new Array(7);
    var CouponInfor2 = new Array(7);
    var TitleTxt;
    var CouponCode;
    var CategoryName;
    var CompanyName;
    var PointRequired;
    var AvailableCoupons;
    var Description;
    var Quantity;
    var CouponCodeTxt;
    var CategoryNameTxt;
    var CompanyNameTxt;
    var PointRequiredTxt;
    var AvailableCouponsTxt;
    var DescriptionTxt;
    var QuantityTxt;
    var MinusBut;
    var PlusBut;
    var BuyBut;
    var Container;
    var QuantityCoupon;
    var listTxt;
    var BG;
    var Max;
	var isShow = false;
	var iChoose = 0;

    var _oHitArea;

    this.Init = function(){

        Container = new createjs.Container();
        s_oAttachSection.addChild(Container);
        Container.visible = false;

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oHitArea.on("click",function(){_oStartBut.unload()});
        Container.addChild(_oHitArea);

        BG = new createjs.Bitmap(s_oSpriteLibrary.getSprite('CouponBG'));
        BG.visible = true;
        BG.alpha = 1;
        Container.addChild(BG);

        var oSprite = s_oSpriteLibrary.getSprite('info_but');
        ExitBut = new CGfxButton(1023,50,s_oSpriteLibrary.getSprite('ExitBtn'),Container);
        ExitBut.addEventListener(ON_MOUSE_UP, this.hide, this);

        QuantityCoupon = 0;

        this.InitLeftSide();
        this.InitRightSide();

        oSprite = s_oSpriteLibrary.getSprite('ConfirmBut');
        BuyBut = new CTextButton(510 + (oSprite.width / 2), 570, -2, 2, oSprite, "BUY"," ", FONT_ZDYK, "#ffffff", 38,Container);
        BuyBut.addEventListener(ON_MOUSE_UP, this.BuyCoupon, this);
        
    };

    this.InitLeftSide = function(){
        TitleTxt = new createjs.Text("Print Shop", "42px " + FONT_ZDYK, "#ffffff");
        TitleTxt.x = 662;
        TitleTxt.y = 65;
        TitleTxt.alpha = 1;
        TitleTxt.textAlign = "center";
        TitleTxt.textBaseline = "alphabetic";
        TitleTxt.lineWidth = 900;
        Container.addChild(TitleTxt);

        CouponCode = new createjs.Text("Coupon Code:", "22px " + FONT_REGULAR, "#ffffff");
        CouponCode.x = 650;
        CouponCode.y = 110;
        CouponCode.alpha = 1;
        CouponCode.textAlign = "right";
        CouponCode.textBaseline = "alphabetic";
        CouponCode.lineWidth = 900;
        Container.addChild(CouponCode);

        CategoryName = new createjs.Text("Category Name:", "22px " + FONT_REGULAR, "#ffffff");
        CategoryName.x = 650;
        CategoryName.y = 155;
        CategoryName.alpha = 1;
        CategoryName.textAlign = "right";
        CategoryName.textBaseline = "alphabetic";
        CategoryName.lineWidth = 900;
        Container.addChild(CategoryName);

        CompanyName = new createjs.Text("Company Name:", "22px " + FONT_REGULAR, "#ffffff");
        CompanyName.x = 650;
        CompanyName.y = 200;
        CompanyName.alpha = 1;
        CompanyName.textAlign = "right";
        CompanyName.textBaseline = "alphabetic";
        CompanyName.lineWidth = 900;
        Container.addChild(CompanyName);

        PointRequired = new createjs.Text("Point Required:", "22px " + FONT_REGULAR, "#ffffff");
        PointRequired.x = 650;
        PointRequired.y = 245;
        PointRequired.alpha = 1;
        PointRequired.textAlign = "right";
        PointRequired.textBaseline = "alphabetic";
        PointRequired.lineWidth = 900;
        Container.addChild(PointRequired);

        AvailableCoupons = new createjs.Text("Available Coupons:", "22px " + FONT_REGULAR, "#ffffff");
        AvailableCoupons.x = 650;
        AvailableCoupons.y = 290;
        AvailableCoupons.alpha = 1;
        AvailableCoupons.textAlign = "right";
        AvailableCoupons.textBaseline = "alphabetic";
        AvailableCoupons.lineWidth = 900;
        Container.addChild(AvailableCoupons);

        Description = new createjs.Text("Description:", "22px " + FONT_REGULAR, "#ffffff");
        Description.x = 650;
        Description.y = 335;
        Description.alpha = 1;
        Description.textAlign = "right";
        Description.textBaseline = "alphabetic";
        Description.lineWidth = 900;
        Container.addChild(Description);

        Quantity = new createjs.Text("Quantity:", "22px " + FONT_REGULAR, "#ffffff");
        Quantity.x = 650;
        Quantity.y = 475;
        Quantity.alpha = 1;
        Quantity.textAlign = "right";
        Quantity.textBaseline = "alphabetic";
        Quantity.lineWidth = 900;
        Container.addChild(Quantity);
    };

    this.InitRightSide = function(){
        CouponCodeTxt = new createjs.Text("prs", "22px " + FONT_REGULAR, "#ffffff");
        CouponCodeTxt.x = 675;
        CouponCodeTxt.y = 110;
        CouponCodeTxt.alpha = 1;
        CouponCodeTxt.textAlign = "left";
        CouponCodeTxt.textBaseline = "alphabetic";
        CouponCodeTxt.lineWidth = 900;
        Container.addChild(CouponCodeTxt);

        CategoryNameTxt = new createjs.Text("Services", "22px " + FONT_REGULAR, "#ffffff");
        CategoryNameTxt.x = 675;
        CategoryNameTxt.y = 155;
        CategoryNameTxt.alpha = 1;
        CategoryNameTxt.textAlign = "left";
        CategoryNameTxt.textBaseline = "alphabetic";
        CategoryNameTxt.lineWidth = 900;
        Container.addChild(CategoryNameTxt);

        CompanyNameTxt = new createjs.Text("Print Shop", "22px " + FONT_REGULAR, "#ffffff");
        CompanyNameTxt.x = 675;
        CompanyNameTxt.y = 200;
        CompanyNameTxt.alpha = 1;
        CompanyNameTxt.textAlign = "left";
        CompanyNameTxt.textBaseline = "alphabetic";
        CompanyNameTxt.lineWidth = 900;
        Container.addChild(CompanyNameTxt);

        PointRequiredTxt = new createjs.Text("125", "22px " + FONT_REGULAR, "#ffffff");
        PointRequiredTxt.x = 675;
        PointRequiredTxt.y = 245;
        PointRequiredTxt.alpha = 1;
        PointRequiredTxt.textAlign = "left";
        PointRequiredTxt.textBaseline = "alphabetic";
        PointRequiredTxt.lineWidth = 900;
        Container.addChild(PointRequiredTxt);

        AvailableCouponsTxt = new createjs.Text("102", "22px " + FONT_REGULAR, "#ffffff");
        AvailableCouponsTxt.x = 675;
        AvailableCouponsTxt.y = 290;
        AvailableCouponsTxt.alpha = 1;
        AvailableCouponsTxt.textAlign = "left";
        AvailableCouponsTxt.textBaseline = "alphabetic";
        AvailableCouponsTxt.lineWidth = 900;
        Container.addChild(AvailableCouponsTxt);

        DescriptionTxt = new createjs.Text("Purchase 1 Back Massage and Receive 1 FREE Facial Massage (a $49.99 Value)", "22px " + FONT_REGULAR, "#ffffff");
        DescriptionTxt.x = 675;
        DescriptionTxt.y = 335;
        DescriptionTxt.alpha = 1;
        DescriptionTxt.textAlign = "left";
        DescriptionTxt.textBaseline = "alphabetic";
        DescriptionTxt.lineWidth = 420;
        Container.addChild(DescriptionTxt);

        QuantityTxt = new createjs.Text("100", "22px " + FONT_REGULAR, "#ffffff");
        QuantityTxt.x = 723;
        QuantityTxt.y = 476;
        QuantityTxt.alpha = 1;
        QuantityTxt.textAlign = "center";
        QuantityTxt.textBaseline = "alphabetic";
        QuantityTxt.lineWidth = 900;
        Container.addChild(QuantityTxt);

        listTxt = new Array(CouponCodeTxt,CategoryNameTxt,CompanyNameTxt,PointRequiredTxt,AvailableCouponsTxt,DescriptionTxt);

        var oSprite = s_oSpriteLibrary.getSprite('CouponMinus');
        MinusBut = new CTextButton(675 + (oSprite.width / 2), 468, -2, 2, oSprite, " "," ", FONT_ZDYK, "#ffffff", 38,Container);
        MinusBut.addEventListener(ON_MOUSE_UP, this.ChangeQuantityMinus, this);

        oSprite = s_oSpriteLibrary.getSprite('CouponPlus');
        PlusBut = new CTextButton(750 + (oSprite.width / 2), 468, -2, 2, oSprite, " "," ", FONT_ZDYK, "#ffffff", 38,Container);
        PlusBut.addEventListener(ON_MOUSE_UP, this.ChangeQuantityPlus, this);
    };

    this.GetData = function(data){
        for(var i=0;i<data.length;i++){
            if(i === 0){
                this.InsertData(CouponInfor1,data[i]);
            }else if(i===1){
                this.InsertData(CouponInfor2,data[i]);
            }
        }
		this.hide();
    };

    this.InsertData = function(array, data){
        array[0] = data.CouponCode;
        array[1] = data.CouponCategoryName;
        array[2] = data.CompanyName;
        array[3] = data.CouponPointRequired;
        array[4] = data.AvailableCoupons;
        array[5] = data.Description;
		array[6] = data.CouponID;
    };

    this.ShowCoupon = function(index){
		iChoose = index;
        Container.visible = true;
		isShow = true;
        _oInterface.disableGuiButtons(false);
        var array = new Array();
        if(index === 0){
            array = CouponInfor1;
        }else if(index === 1){
            array = CouponInfor2;
        }
        for(var i=0;i<listTxt.length;i++){
            listTxt[i].text = array[i];
        }
        TitleTxt.text = array[2];
        Max = parseInt(array[4]);
        QuantityCoupon = 0;
        this.refreshQuantity();
    };

    this.hide = function(){
        //_isCouponShow = false;
        _isMadaamAnimShow = true;
        _isMadaamAnimDisableShow = false;
		isShow = false;
        Container.visible = false;
        _oInterface.enableGuiButtons();
		createjs.Sound.setVolume(currentSound);
    };

    this.ChangeQuantityPlus = function(){
        playSound("press_but",1,0);
        if(QuantityCoupon < Max){
            QuantityCoupon++;
        }
        this.refreshQuantity();
    };

    this.ChangeQuantityMinus = function(){
        playSound("press_but",1,0);
        if(QuantityCoupon > 0){
            QuantityCoupon--;
        }
        this.refreshQuantity();
    };
	
	this.GetIsShow = function(){
		return isShow;
	};

    this.refreshQuantity = function(){
        QuantityTxt.text = QuantityCoupon;
    };

    this.BuyCoupon = function(){
        playSound("press_but",1,0);
		var array = new Array();
		if(iChoose === 0){
            array = CouponInfor1;
        }else if(iChoose === 1){
            array = CouponInfor2;
        }
		BuyCoupon(array,QuantityCoupon);
    };

    this.Init();
}