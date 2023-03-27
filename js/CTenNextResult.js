var _oTenNextResult;
function CTenNextResult(){
    var _oListResultText;
    var _o10NextResultContainer;
    var _o10NextResultPopup;
    var _oExitBtn;
    var _oNextResutlText1;
    var _oNextResutlText2;
    var _oNextResutlText3;
    var _oNextResutlText4;
    var _oNextResutlText5;
    var _oNextResutlText6;
    var _oNextResutlText7;
    var _oNextResutlText8;
    var _oNextResutlText9;
    var _oNextResutlText10;
    var _oNumberText1;
    var _oNumberText2;
    var _oNumberText3;
    var _oNumberText4;
    var _oNumberText5;
    var _oNumberText6;
    var _oNumberText7;
    var _oNumberText8;
    var _oNumberText9;
    var _oNumberText10;

    var _oHitArea;

    this.Init = function(){
        _o10NextResultContainer = new createjs.Container();
        _o10NextResultContainer.visible = false;
        s_oAttachSection.addChild(_o10NextResultContainer);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oHitArea.on("click",function(){_oStartBut.unload()});
        _o10NextResultContainer.addChild(_oHitArea);

        _o10NextResultPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('NextResultPopup'));
        _o10NextResultPopup.visible = true;
        _o10NextResultPopup.alpha = 1;
        _o10NextResultContainer.addChild(_o10NextResultPopup);

        _oExitBtn = new CGfxButton(900,75,s_oSpriteLibrary.getSprite('ExitBtn'),_o10NextResultContainer);
        _oExitBtn.addEventListener(ON_MOUSE_UP, this.hide10NextResult, this);

        _oNextResutlText1 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText1.x = 700;
        _oNextResutlText1.y = 185;
        _oNextResutlText1.alpha = 1;
        _oNextResutlText1.textAlign = "center";
        _oNextResutlText1.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText1);

        _oNextResutlText2 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText2.x = 700;
        _oNextResutlText2.y = 220;
        _oNextResutlText2.alpha = 1;
        _oNextResutlText2.textAlign = "center";
        _oNextResutlText2.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText2);

        _oNextResutlText3 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText3.x = 700;
        _oNextResutlText3.y = 255;
        _oNextResutlText3.alpha = 1;
        _oNextResutlText3.textAlign = "center";
        _oNextResutlText3.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText3);

        _oNextResutlText4 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText4.x = 700;
        _oNextResutlText4.y = 290;
        _oNextResutlText4.alpha = 1;
        _oNextResutlText4.textAlign = "center";
        _oNextResutlText4.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText4);

        _oNextResutlText5 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText5.x = 700;
        _oNextResutlText5.y = 325;
        _oNextResutlText5.alpha = 1;
        _oNextResutlText5.textAlign = "center";
        _oNextResutlText5.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText5);

        _oNextResutlText6 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText6.x = 700;
        _oNextResutlText6.y = 360;
        _oNextResutlText6.alpha = 1;
        _oNextResutlText6.textAlign = "center";
        _oNextResutlText6.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText6);

        _oNextResutlText7 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText7.x = 700;
        _oNextResutlText7.y = 395;
        _oNextResutlText7.alpha = 1;
        _oNextResutlText7.textAlign = "center";
        _oNextResutlText7.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText7);

        _oNextResutlText8 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText8.x = 700;
        _oNextResutlText8.y = 430;
        _oNextResutlText8.alpha = 1;
        _oNextResutlText8.textAlign = "center";
        _oNextResutlText8.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText8);

        _oNextResutlText9 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText9.x = 700;
        _oNextResutlText9.y = 465;
        _oNextResutlText9.alpha = 1;
        _oNextResutlText9.textAlign = "center";
        _oNextResutlText9.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText9);

        _oNextResutlText10 = new createjs.Text(" ", "27px " + FONT_BOLD, "#fdf9bf");
        _oNextResutlText10.x = 700;
        _oNextResutlText10.y = 500;
        _oNextResutlText10.alpha = 1;
        _oNextResutlText10.textAlign = "center";
        _oNextResutlText10.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNextResutlText10);

        _oListResultText = new Array(_oNextResutlText1,_oNextResutlText2,_oNextResutlText3,_oNextResutlText4,_oNextResutlText5,_oNextResutlText6,_oNextResutlText7,_oNextResutlText8,_oNextResutlText9,_oNextResutlText10);

        _oNumberText1 = new createjs.Text("1", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText1.x = 600;
        _oNumberText1.y = 185;
        _oNumberText1.alpha = 1;
        _oNumberText1.textAlign = "center";
        _oNumberText1.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText1);

        _oNumberText2 = new createjs.Text("2", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText2.x = 600;
        _oNumberText2.y = 220;
        _oNumberText2.alpha = 1;
        _oNumberText2.textAlign = "center";
        _oNumberText2.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText2);

        _oNumberText3 = new createjs.Text("3", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText3.x = 600;
        _oNumberText3.y = 255;
        _oNumberText3.alpha = 1;
        _oNumberText3.textAlign = "center";
        _oNumberText3.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText3);

        _oNumberText4 = new createjs.Text("4", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText4.x = 600;
        _oNumberText4.y = 290;
        _oNumberText4.alpha = 1;
        _oNumberText4.textAlign = "center";
        _oNumberText4.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText4);

        _oNumberText5 = new createjs.Text("5", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText5.x = 600;
        _oNumberText5.y = 325;
        _oNumberText5.alpha = 1;
        _oNumberText5.textAlign = "center";
        _oNumberText5.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText5);

        _oNumberText6 = new createjs.Text("6", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText6.x = 600;
        _oNumberText6.y = 360;
        _oNumberText6.alpha = 1;
        _oNumberText6.textAlign = "center";
        _oNumberText6.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText6);

        _oNumberText7 = new createjs.Text("7", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText7.x = 600;
        _oNumberText7.y = 395;
        _oNumberText7.alpha = 1;
        _oNumberText7.textAlign = "center";
        _oNumberText7.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText7);

        _oNumberText8 = new createjs.Text("8", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText8.x = 600;
        _oNumberText8.y = 430;
        _oNumberText8.alpha = 1;
        _oNumberText8.textAlign = "center";
        _oNumberText8.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText8);

        _oNumberText9 = new createjs.Text("9", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText9.x = 600;
        _oNumberText9.y = 465;
        _oNumberText9.alpha = 1;
        _oNumberText9.textAlign = "center";
        _oNumberText9.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText9);

        _oNumberText10 = new createjs.Text("10", "27px " + FONT_BOLD, "#fdf9bf");
        _oNumberText10.x = 600;
        _oNumberText10.y = 500;
        _oNumberText10.alpha = 1;
        _oNumberText10.textAlign = "center";
        _oNumberText10.textBaseline = "alphabetic";
        _o10NextResultContainer.addChild(_oNumberText10);
    };
    
    this.show10NextResult = function(){
        _o10NextResultContainer.visible = true;
        s_oGame.Get10NextResult();
        _oInterface.disableGuiButtons();
    };

    this.hide10NextResult = function(){
        //_is10NextResultShow = false;
        _isMadaamAnimShow = true;
        _isMadaamAnimDisableShow = false;
        _o10NextResultContainer.visible = false;
        _oInterface.enableGuiButtons();
		createjs.Sound.setVolume(currentSound);
    };

    this.getListText = function(){
        return _oListResultText;
    };

    this.Init();
}