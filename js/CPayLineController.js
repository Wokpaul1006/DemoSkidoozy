var _oPayLineController;
var _oSoundWind;
function CPayLineController(){
    var _oPCon;
	var _listLine;
	var _curIndexLineAnim = 0;
	var _isAction = false;
	var _LineIndex = -1;
	var _TimeToChangeAnim = 0;
	var _WinningLinesArraysToPreviewShow = new Array();
	var _isPreviewShow = false;
	var _LinePreviewIndex = -1;

    this.Init = function(){
        _oPCon = new createjs.Container();
        s_oAttachSection.addChild(_oPCon); 
		this.initLinesAnim();
		this.HideAllLines();
		_isPreviewShow = false;
    };
	
	this.initLinesAnim = function(){
		_listLine = new Array();
        for(var i=1;i<NUM_PAYLINES+1;i++){
			var _Line = new Array();
			for(var j=0;j<16;j++){
				var Line = new createjs.Bitmap(s_oSpriteLibrary.getSprite('line'+i+"_"+j));
				Line.visible = false;
				Line.alpha = 1;
				_oPCon.addChild(Line);
				_Line.push(Line);
			}
			_listLine.push(_Line);
        }
	};
	
	this.HideAllLines = function(){
		for(var i=0;i<_listLine.length;i++){
			for(var j=0;j<_listLine[i].length;j++){
					_listLine[i][j].visible = false;
			}
		}
		_LineIndex = -1;
	};
	
	this.HideLine = function(iLine){
		for(var i=0;i<_listLine.length;i++){
			for(var j=0;j<_listLine[i].length;j++){
					_listLine[iLine][j].visible = false;
			}
		}
	};
	
	this.ShowLine = function(iLine){
		this.HideAllLines();
		_curIndexLineAnim = 0;
		_TimeToChangeAnim = 0;
		_LineIndex = iLine;
		this.isShowLineAnim(true);
		for(var j=0;j<_listLine[iLine].length;j++){
			_listLine[iLine][j].visible = true;
		}
	};
	
	this.ActionAnim = function(){
		if(_LineIndex === -1){return;}
		for(var i=0;i<_listLine[_LineIndex].length;i++){
			_listLine[_LineIndex][i].visible = false;
		}
		if(_curIndexLineAnim === 0){
			_oSoundWind = playSound("BigSwoosh",0.0,0);
		}
		_listLine[_LineIndex][_curIndexLineAnim].visible = true;
		_TimeToChangeAnim++;
		if(_TimeToChangeAnim >= 2){
			_TimeToChangeAnim = 0;
			_curIndexLineAnim++;
			if(_curIndexLineAnim >= 16){
				_curIndexLineAnim = 0;
				_oSoundWind.stop();
			}
		}
	};
	
	this.GetWinningLinesArraysToPreviewShow = function(array){
		_WinningLinesArraysToPreviewShow = array;
		_LinePreviewIndex = 0;
	};
	
	this.ShowPreview = function(){
		if(_WinningLinesArraysToPreviewShow.length <= 0){return;}
		var index = _WinningLinesArraysToPreviewShow[_LinePreviewIndex] - 1;
		var maxLine = _WinningLinesArraysToPreviewShow.length;
		for(var i=0;i<_listLine[index].length;i++){
			_listLine[index][i].visible = false;
		}
		if(_curIndexLineAnim === 0){
			_oSoundWind = playSound("BigSwoosh",0.0,0);
		}
		_listLine[index][_curIndexLineAnim].visible = true;
		_TimeToChangeAnim++;
		if(_TimeToChangeAnim >= 2){
			_TimeToChangeAnim = 0;
			_curIndexLineAnim++;
			if(_curIndexLineAnim >= 16){
				_curIndexLineAnim = 0;
				_oSoundWind.stop();
				this.HideAllLines();
				_LinePreviewIndex++;
				if(_LinePreviewIndex > maxLine - 1){
					_LinePreviewIndex = 0;
				}
			}
		}
	};
	
	this.isPreviewShow = function(isShow){
		_isPreviewShow = isShow;
		if(!isShow){
			this.HideAllLines();
			_isAction = true;
		}else{
			_isAction = false;
		}
	};
	
	this.isShowLineAnim = function(isShow){
		_isAction = isShow;
		if(isShow){_isPreviewShow = false}
	};
	
	this.update = function(){
		if(_isAction){this.ActionAnim();}
		if(_isPreviewShow){this.ShowPreview();}
	};

    this.Init();
}