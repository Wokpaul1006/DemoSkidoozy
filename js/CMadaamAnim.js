function CMadaamAnim(oParentContainer)
{
    var _bUpdate = false;
    var _iContAnimCycle =  false;
    var _iFrameCont;
    var _iTotFrameCont = 2;
    var _iCurFrameIndex = 0;
    var _iTotAnimFrame;
    var _iCurAnim = 0;
    var _aAnims;
    var _pStartPosAvatar;
    
    var _oContainer1;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _pStartPosAvatar = {x:200,y:85};
        
        _oContainer = new createjs.Container();
        _oContainer.x = 1082;
        _oContainer.y = 0;
        _oParentContainer.addChild(_oContainer);
    

        _aAnims = new Array();
        for(var i=1;i<51;i++){
            var oBmp1 = createBitmap(s_oSpriteLibrary.getSprite('MadaamAnim_'+i));
            _oContainer.addChild(oBmp1);
            //_aAnims[i] = oBmp1;
            _aAnims.push(oBmp1);
            oBmp1.visible = false;
        }
        this.refreshButtonPos(s_iOffsetX);
    };
    
    this._hideAllAnims = function(){
        for(var k=0;k<_aAnims.length;k++){
            _aAnims[k].visible = false;
        }
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if( (_pStartPosAvatar.x + iNewX ) < 130){
            _oContainer.x = _pStartPosAvatar.x + iNewX;
        }
    };
    
    this.show = function(iAnim){
        _iCurAnim = iAnim;
        _oContainer.visible = true;
        _iFrameCont = 0;
        _iTotFrameCont = 3;
        _iTotAnimFrame = _aAnims.length;
        //_aAnims[0].visible = true;
        _iCurFrameIndex = 0;
        _iContAnimCycle = 0;
        _bUpdate = true;
        
    };
    
    this.playToFrame = function(iFrame){
        _aAnims[_iCurFrameIndex].visible = false;
        _iCurFrameIndex = iFrame;
        _aAnims[_iCurFrameIndex].visible= true;
    };
    
    this.nextFrame = function(){
        _aAnims[_iCurFrameIndex].visible = false;
        _iCurFrameIndex++;
        //console.log(_iCurFrameIndex);
        _aAnims[_iCurFrameIndex].visible= true;
    };
    
    this.update = function(){
        if(_bUpdate === false){
            return;
        }
        
        _iFrameCont++;
        if(_iFrameCont === _iTotFrameCont){
            _iFrameCont = 0;
            if ( _iCurFrameIndex === _iTotAnimFrame-1) 
            {
                this.playToFrame(1);
                _iContAnimCycle++;
                if(_iContAnimCycle === 2){
                    this.show(0);
                }
            }else{
                this.nextFrame();
            }
            
        }
    };
    _oParentContainer = oParentContainer;
    
    this._init();
}