var currentSound = 1;
var active = false;
	var currentX;
	var currentY;
	var initialX;
	var initialY;
	var xOffset = 0;
	var yOffset = 0;
	var windownHeight = $(window).height();
	var windownWidth = $(window).width();
  var max, min;

	function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
      active = true;
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      active = false;  
	  
    }

    function drag(e) {
      if (active) {
        e.preventDefault();
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;
		_oSoundPanel.ChangePosition(currentY);
      }
    }
var _oSoundPanel;
function CSoundPanel(){
    var BG;
    var Container;
    var SlidePoint;

    this.Init = function(){
        Container = new createjs.Container();
        s_oAttachSection.addChild(Container);
        Container.visible = false;
		
		BG = new createjs.Bitmap(s_oSpriteLibrary.getSprite('slideSound'));
		BG.x = 280;
		BG.y = 65;
        BG.visible = true;
        BG.alpha = 1;
        Container.addChild(BG);
		
        var oSprite = s_oSpriteLibrary.getSprite('slidePoint');
        SlidePoint = new CTextButton(283 + (oSprite.width / 2), 80, 3, -3, oSprite, " "," ", FONT_REGULAR, "#ffffff", 35,Container);
        SlidePoint.addEventListener(ON_MOUSE_UP, this.checkClick, this);
		//start 80 // end 199
    };

    this.show = function(isShow){
        Container.visible = isShow;
    };
	
	this.checkClick = function(){

	};
	
	this.ChangePosition = function(value){
		if(!SlidePoint.getDrag()){return;}
		min = 80; //slider on top
    max = 199; //slider below

		value = value *0.8; //(CANVAS_HEIGHT/windownHeight) = 0.8

		if(value < min){value = min;}
		if(value > max){value = max+1;}
		
		var soundValue = 1 - ((value - min) / (max - min));

		currentSound = soundValue;
		createjs.Sound.setVolume(soundValue);
    if(soundValue === 1){
      soundValue = 0.9;
    }

		if(soundValue > 0){
      console.log("soundValue > 0: "+soundValue);
			_oAudioToggle.setVisible(true);
			_oAudioToggleMute.setVisible(false);
		}else if(soundValue < 0){
      console.log("soundValue mute: "+soundValue);
			_oAudioToggle.setVisible(false);
			_oAudioToggleMute.setVisible(true);
		}
		SlidePoint.changeY(value);
	};

    this.Init();
}