var _oNotification;
function CNotification(){

    var ContentTxt;
    var Container;
    var BG;

    this.Init = function(){
        Container = new createjs.Container();
        s_oAttachSection.addChild(Container);

        BG = new createjs.Bitmap(s_oSpriteLibrary.getSprite('NotificationPopup'));
        BG.visible = true;
        BG.alpha = 1;
        Container.addChild(BG);

        ContentTxt = new createjs.Text(" ", "40px " + FONT_BOLD, "#fdf9bf");
        ContentTxt.x = 660;
        ContentTxt.y = 375;
        ContentTxt.alpha = 1;
        ContentTxt.textAlign = "center";
        ContentTxt.textBaseline = "alphabetic";
        ContentTxt.lineWidth = 350;
        Container.addChild(ContentTxt);
		Container.visible = false;
    };

    this.showNotification = function(isShow,Txt,font,yValue){
        if(isShow){
            this.show();
        }else{
            this.hide();
        }
        ContentTxt.text = Txt;
        ContentTxt.font = font;
        ContentTxt.y = yValue;
    };

    this.show = function(){
        Container.visible = true;
    };

    this.hide = function(){
        Container.visible = false;
    };

    this.Init();
}