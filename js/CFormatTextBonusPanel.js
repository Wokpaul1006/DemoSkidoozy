function CFormatTextBonusPanel (iX, iY, oParentContainer){
    
    var _iPrevLetterWidth;
    
    var _oTextOutline1;
	var _oTextOutline2;
    var _oText1;
    var _oText2;
    
    this._init = function(iX, iY, oParentContainer){    
		_oTextOutline2 = new createjs.Text(" ", "35px " + FONT_BOLD, "#3f1b00");
        _oTextOutline2.x =  iX-2;
        _oTextOutline2.y = iY+2;
        _oTextOutline2.textAlign = "center";
        _oTextOutline2.textBaseline = "alphabetic";
        oParentContainer.addChild(_oTextOutline2);
		
		_oTextOutline1 = new createjs.Text(" ", "34px " + FONT_BOLD, "#3f1b00");
        _oTextOutline1.x =  iX-1;
        _oTextOutline1.y = iY+1;
        _oTextOutline1.textAlign = "center";
        _oTextOutline1.textBaseline = "alphabetic";
        oParentContainer.addChild(_oTextOutline1);
		
		_oText1 = new createjs.Text(" ", "30px " + FONT_BOLD, "#f7db5b");
        _oText1.x = iX;
        _oText1.y = iY;
        _oText1.textAlign = "center";
        _oText1.textBaseline = "alphabetic";
        _oText1.shadow = new createjs.Shadow("#000", 2, 2, 2);
        oParentContainer.addChild(_oText1);

        _oText2 = new createjs.Text(" ", "30px " + FONT_BOLD, "#C0C0C0");
        _oText2.x =  iX;
        _oText2.y = iY;
        _oText2.textAlign = "center";
        _oText2.textBaseline = "alphabetic";
        _oText2.shadow = new createjs.Shadow("#000", 2, 2, 2);
        oParentContainer.addChild(_oText2);
    };
	
	this.ChangeText = function(Text,isEnd){
        //console.log(Text);
        if(!isEnd){
            _oText1.text = Text;
        }else{
            _oText2.text = Text;
        }
		//_oTextOutline1.text = Text;
		//_oTextOutline2.text = Text;
	};
 
    this.unload = function(){
        oParentContainer.removeChild(_oTextContainer);
    };

    
    this._init(iX, iY, oParentContainer);
    
}