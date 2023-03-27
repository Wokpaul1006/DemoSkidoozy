function CMenus(){
    var _oStartBut;
    var _oContainer;
    var _oHitArea;

    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = true;
		
        s_oAttachSection.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBg);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oHitArea.on("click",function(){_oStartBut.unload()});
        _oContainer.addChild(_oHitArea);
        
        var oSprite = s_oSpriteLibrary.getSprite('spin_but');
        _oStartBut = new CTextButton(701 + (oSprite.width / 2), 590, -1, -5 ,oSprite," "," ",FONT_ZDYK,"#ffffff",45,_oContainer);  
        _oStartBut.addEventListener(ON_MOUSE_UP, this.unload, this);
    }

    this.unload = function(){
        playSound("BGMusic",0.1,-1); //0.1 -1
        _oContainer.visible = false;
    };

    s_oMenus = this;
    this._init();
}
var s_oMenus = null;
