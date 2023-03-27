var listResult = new Array();
var CountToLoadData = 0;
var MaxCount = 0;
var _lineNumber;
var _kiosID = 18;
var _numberData = 30;
var listResultPreview = new Array();
var isPreviewShow = false;
var maxGetData = 1000;
var QRString;
var _iCurMode = 1; 
var _iMode = 1;
var _establishmentid = 40;
var _establishmentkioskid = 18;
var _gamePoolId = 0;
var _gameID = 2;

//Call API: GetData ,GetCouponData ,GetPlayerData ,CashOutRedeem ,DoAddEntries

function SettingWhenStartGame(){
    _iLastLineActive = NUM_PAYLINES;
    _iCurBet = MIN_BET;
    _iMode = _iCurMode;
    GetPlayerData();
}

function GetMoreData(kiosID,lineNumber,betPerLine,numberData,isMaxBet){
    CountToLoadData = 0;
    MaxCount = numberData;
    //DisableUI(true,"LOADING...","40px " + FONT_BOLD,375);
	_oInterface.disableGuiButtons();
    for(i=0;i<numberData;i++){
        RequestGetData(kiosID,lineNumber,betPerLine,_iMode,isMaxBet);
        _iMode++;
        if(_iMode > 1000){
            _iMode = 1;
        }
    }
}

function RequestGetData(kiosID, lineNumber, betPerLine, mode, isMaxBet){
    //max 1100
    var request = new XMLHttpRequest();
    var _kiosID = kiosID;
    var _lineNumber = lineNumber;
    var _betPerLine = betPerLine * 100;
    var _mode = mode;
	
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Admin/GetGameResultFromPool";
	//var headUrl = "http://localhost:59560/Admin/GetGameResultFromPool";
	var _url = headUrl +"?kioskid="+ _kiosID +"&gameID="+ _gameID +"&lineNumber="+ _lineNumber +"&betPerLine="+ _betPerLine +"&mode="+ _mode +"&gamepoolid="+ _gamePoolId;
    //console.log("GetData_url" + _url);
	
	request.open('GET', _url, true)
    request.onload = function (){
    // Begin accessing JSON data here
		var data = JSON.parse(this.response)
		var result = 0;
		if (request.status >= 200 && request.status < 400) {
			result = (data.WinEntris)/100;
			//console.log(data.WinEntris);
			AddResult(result, lineNumber, betPerLine, mode);
			CountToLoadData++;
			if(CountToLoadData == MaxCount){
				DoWhenGetDataComplete(isMaxBet);
			}   
		}
		else{
			console.log('error')
		}
    }
    request.send()
}

function GetCouponData(){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Custom/GetRandomFeaturedCouponList";
	//var headUrl = "http://localhost:59560/Custom/GetRandomFeaturedCouponList";
	var _url = headUrl+ "?isfeatured=True&recordrequired=2";
	if(!_oCouponPopup.GetIsShow()){
		RequestGetCouPon(_url);
		//console.log("GetCouponData_url: " + _url);
	}
    setTimeout(() => {
        GetCouponData();
    }, 60000);
}

function GetPlayerData(){
    _oProfile = new CProfile();
	//var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Customer/GetCustomerByID";
	//var headUrl = "http://localhost:59560/Customer/GetCustomerByID";
	//var _url = headUrl+ "?customerid=" + _oProfile.GetPlayerID();
	
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Customer/GetCustomerSweepstakeList";
	//var headUrl = "http://localhost:59560/Customer/GetCustomerSweepstakeList";
	var _url = headUrl+ "?customerid="+ _oProfile.GetPlayerID() +"&establishmentid="+ _establishmentid;
	
	
	RequestGetPlayer(_url);
	console.log("GetPlayerData_url: " + _url);
}

function CashOutRedeem(value){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Customer/AddCustomerSweepstakesRedeem";
	//var headUrl = "http://localhost:59560/Customer/AddCustomerSweepstakesRedeem";
	var _url = headUrl +"?customerid="+ _oProfile.GetPlayerID() + "&establishmentid="+ _establishmentid +"&sweepstakespoints=0&amount="+ value;
	RequestRedeem(_url);
	console.log("CashOutRedeem_url: " + _url);
}

function DoAddEntries(value,isBank){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Custom/CouponBuy";
	//var headUrl = "http://localhost:59560/Custom/CouponBuy";
	var _url = headUrl +"?customerid="+ _oProfile.GetPlayerID() +"&establishmentid="+ _establishmentid +"&establishmentkioskid="+ _establishmentkioskid +"&credit="+ value +"&paymentmethod=77&addentries=true&addentriesfrombank="+ isBank;
	RequestAddEntries(_url);
	console.log("DoAddEntries_url: " + _url);
}

function BuyCouponFromWinning(){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Establishment/EstablishmentBalanceCheck";
	//var headUrl = "http://localhost:59560/Establishment/EstablishmentBalanceCheck";
	var _url = headUrl+ "?establishmentid="+ _establishmentid;
	RequestBuyCouponFromWinning(_url);
	console.log("BuyCouponFromWinning: " + _url);
}

function AddUpdateCustomerBankBalance(value){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Customer/AddUpdateCustomerBankBalance?CustomerSweepstakeID=0";
	//var headUrl = "http://localhost:59560/Customer/AddUpdateCustomerBankBalance?CustomerSweepstakeID=0";
	var _url = headUrl +"&CustomerID="+ _oProfile.GetPlayerID() +"&BankBalance="+ value +"&EstablishmentID="+ _establishmentid +"&EstablishmentKioskID="+ _establishmentkioskid +"&paymentmethod=77";
	RequestAddUpdateCustomerBankBalance(_url);
	console.log("AddUpdateCustomerBankBalance_url: " + _url);
}

function BuyAdditionalCouponPoints(){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Establishment/EstablishmentBalanceCheck";
	//var headUrl = "http://localhost:59560/Establishment/EstablishmentBalanceCheck";
	var _url = headUrl+ "?establishmentid="+ _establishmentid;
	RequestBuyAdditionalCouponPoints(_url);
	console.log("RequestBuyAdditionalCouponPoints: " + _url);
}

function AddUpdateCustomerBankBalanceBuyAdditionalCouponPoints(value){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Customer/AddUpdateCustomerBankBalance?CustomerSweepstakeID=0";
	//var headUrl = "http://localhost:59560/Customer/AddUpdateCustomerBankBalance?CustomerSweepstakeID=0";
	var _url = headUrl +"&CustomerID="+ _oProfile.GetPlayerID() +"&BankBalance="+ value +"&EstablishmentID="+ _establishmentid +"&EstablishmentKioskID="+ _establishmentkioskid +"&paymentmethod=2";
	RequestAddUpdateCustomerBankBalanceBuyAdditionalCouponPoints(_url);
	console.log("RequestAddUpdateCustomerBankBalanceBuyAdditionalCouponPoints: " + _url);
}

function UpdateCustomerSweepstakePerSpin(iSweepstakespoints, iCurrentWin){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/Custom/UpdateCustomerSweepstakePerSpin?customerid";
	//var headUrl = "http://localhost:59560/Custom/UpdateCustomerSweepstakePerSpin?customerid";
	var _url = headUrl + "="+ _oProfile.GetPlayerID() +"&establishmentid="+ _establishmentid +"&establishmentkioskid="+ _establishmentkioskid +"&gameid="+ _gameID +"&sweepstakespoints="+ iSweepstakespoints +"&currentwin="+ iCurrentWin +"&gamepoolid=" + _gamePoolId;
	RequestUpdateCustomerSweepstakePerSpin(_url);
	console.log("UpdateCustomerSweepstakePerSpin_url: " + _url);
}

function BuyCoupon(data, _Quantity){
	var headUrl = "http://3.211.184.6/Sweepstakes.Web.Api/";
	
	//var headUrl = "http://localhost:59560/";
	var _url = headUrl +"Customer/AddCustomerCoupon";
	RequestBuyCoupon(_url, data, _Quantity);
}

function RequestBuyCoupon(_url, _data, _Quantity){
	
	//array[0] = data.CouponCode;
    //array[1] = data.CouponCategoryName;
    //array[2] = data.CompanyName;
    //array[3] = data.CouponPointRequired;
    //array[4] = data.AvailableCoupons;
    //array[5] = data.Description;
	//array[6] = data.CouponID;
	
	$.ajax({
      url: _url,
      method: "post",
      dataType: "json",
      data: {
        CustomerCouponID: 0,
        FKCustomerID: _oProfile.GetPlayerID(),
		FKCouponID: _data[6],
		Quantity: _Quantity,
		CurrentQuantity: _data[4],
		CouponPointSpent: _data[3] * _Quantity
      },
    }).done(function(res) {
        console.log(res)
	});
	
}

function RequestGetCouPon(_url){
    var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            console.log("RequestGetCouPon " , data);
            _oCouponPopup.GetData(data);   
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestGetPlayer(_url){
    var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            console.log("RequestGetPlayer " , data);
            _oProfile.GetPlayerData(data);
            CallWhenHaveProfile();
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestRedeem(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			if(data.Successful.toString() === "true"){
				QRString = data.ID.toString();
                console.log(QRString)
                _oRedeemPopup.CashOutSuccess();
			}
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestAddEntries(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			if(data.Successful.toString() === "true"){
				//QRString = data.ID.toString();
                _oAddEntriesPopup.AddEntriesSuccess();
			}
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestBuyCouponFromWinning(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			if(data.Successful.toString() === "true"){
				_oAddEntriesPopup.BuyCouponFromWiningSuccess();
			}
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestBuyAdditionalCouponPoints(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			if(data.Successful.toString() === "true"){
				_oAddEntriesPopup.BuyAdditionalCouponPointsSuccess();
			}
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestAddUpdateCustomerBankBalanceBuyAdditionalCouponPoints(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			if(data.Successful.toString() === "true"){
				_oAddEntriesPopup.AddUpdateCustomerBankBalanceBuyAdditionalCouponPointsSuccess(data.Message.toString());
			}
        }else{
            console.log('error')
        }
    }
    request.send()
}

function RequestAddUpdateCustomerBankBalance(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			if(data.Successful.toString() === "true"){
				_oAddEntriesPopup.AddUpdateCustomerBankBalanceSuccess(data.Message.toString());
			}
        }else{
            console.log('error')
        }
    }
    request.send()
}



function RequestUpdateCustomerSweepstakePerSpin(_url){
	var request = new XMLHttpRequest();
    request.open('GET', _url, true)
    request.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
			console.log(data);
        }else{
            console.log('error')
        }
    }
    request.send()
}

function CreateListResult(array){
    var countLine = NUM_PAYLINES;
    var countBet = COIN_BET.length;
    for(i=0;i<countLine;i++){
        array[i] = new Array(); 
        for(j=0;j<countBet;j++){
            array[i][j] = new Array(); 
        }
    }
}

function DoWhenGetDataComplete(isMaxBet){
	if(isMaxBet){
        s_oGame.TryMaxBet();
    }
	//DisableUI(false," ");
    _oInterface.enableGuiButtons();
    _oInterface._onShowNextResult();
    //_onSpin(lineNumber,betPerLine,0);
    console.log("listResult:=== " + listResult);
}

function DisableUI(isDisable, txt, font, y){
    if(isDisable){
        _oInterface.disableGuiButtons();
        _oNotification.showNotification(true,txt,font,y);
    }else{
        _oInterface.enableGuiButtons();
        _oNotification.showNotification(false,txt);
    }
}

function AddResult(result, lineNumber, betPerLine, mode){
    var indexCoin = findIndexCoin(betPerLine);
    var indexLineActive = lineNumber - 1;
    var _Result = new Array();
    _Result.push(mode);
    _Result.push(result);
    listResult[indexLineActive][indexCoin].push(_Result);
}

var _FinalSymbolCombo;
var _WinningLine;

function GetResultPreview(){
    var indexCoin = findIndexCoin(_iCurBet);
    var indexLineActive = _iLastLineActive - 1;
    var preview = true;
    var oData;
    var oRetData;
    
    if(listResultPreview[indexLineActive][indexCoin].length <= 0){
        oData = _onSpin(_iLastLineActive,_iCurBet,_iTotBet,preview);
        if(oData === undefined){
            GetResultPreview();
            return;
        }
        oRetData = getUrlVars(oData);
        listResultPreview[indexLineActive][indexCoin].push(oRetData);
    }else{
        oRetData = listResultPreview[indexLineActive][indexCoin][0];
    }
    isPreviewShow = true;
    _FinalSymbolCombo = new Array();
    _WinningLine = new Array();
    _FinalSymbolCombo = JSON.parse(oRetData.pattern);
    console.log("_FinalSymbolCombo " , _FinalSymbolCombo);
    _WinningLine = JSON.parse(oRetData.win_lines);

    for(var i=0;i<NUM_ROWS;i++){
        for(var j=0;j<NUM_REELS;j++){
            _aStaticSymbols[i][j].hide();
            _aMovingColumns[j].setVisible(i,true);
            _aMovingColumns[j+NUM_REELS].setVisible(i,true);
        }
    }
    
    for(var k=0;k<_aMovingColumns.length;k++){
        _aMovingColumns[k].activate();
    }

    _oInterface.hideAllLines();
	_oInterface.hideAllLinesAnim();
    
    _iCurState = GAME_STATE_IDLE;

    for(i=0; i< NUM_REELS; i++){ //show symbol
        _aMovingColumns[i]._setSymbol(new Array(_FinalSymbolCombo[0][i],_FinalSymbolCombo[1][i],_FinalSymbolCombo[2][i])); 
        _aMovingColumns[i+NUM_REELS]._setSymbol(new Array(_FinalSymbolCombo[0][i],_FinalSymbolCombo[1][i],_FinalSymbolCombo[2][i])); 
    }
	
	var _WinningLinesArraysToPreviewShow = new Array();
    if(_WinningLine.length > 0){ //show win
        for(var i=0;i<_WinningLine.length;i++){
            
            if(_WinningLine[i].line > 0){
                //_oInterface.showLine(_WinningLine[i].line);
				console.log("_WinningLine Info: " + _WinningLine[i]);
				console.log("_WinningLine: " + _WinningLine[i].line);
				_WinningLinesArraysToPreviewShow.push(_WinningLine[i].line);
			}
            var aList = _WinningLine[i].list;
            for(var k=0;k<aList.length;k++){
                _aStaticSymbols[aList[k].row][aList[k].col].show(aList[k].value);
                _aMovingColumns[aList[k].col].setVisible(aList[k].row,false);
                _aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,false);
            }
        }
    }
	
	_oPayLineController.GetWinningLinesArraysToPreviewShow(_WinningLinesArraysToPreviewShow);
	_oPayLineController.isShowLineAnim(true);
	_oPayLineController.ShowPreview();
}

function GetResultPreviewToSpin(){
    var indexCoin = findIndexCoin(_iCurBet);
    var indexLineActive = _iLastLineActive - 1;
    if(listResultPreview[indexLineActive][indexCoin].length > 0){
        var oRetData = listResultPreview[indexLineActive][indexCoin][0];
        if ( oRetData.res === "true" ){
            s_oGame.onSpinReceived(oRetData);
            return true;
        }
    }else{
        return false;
    }
}

function GetSymbolBeforePreview(){
    for(i=0; i< NUM_REELS; i++){
        _aMovingColumns[i]._setSymbol(new Array(_aFinalSymbolCombo[0][i],_aFinalSymbolCombo[1][i],_aFinalSymbolCombo[2][i]));  
        _aMovingColumns[i+NUM_REELS]._setSymbol(new Array(_aFinalSymbolCombo[0][i],_aFinalSymbolCombo[1][i],_aFinalSymbolCombo[2][i])); 
    }

	if(_WinningLine != null){
		for(var i=0;i<_WinningLine.length;i++){
				var aList = _WinningLine[i].list;
				for(var k=0;k<aList.length;k++){
					_aStaticSymbols[aList[k].row][aList[k].col].stopAnim();
					_aMovingColumns[aList[k].col].setVisible(aList[k].row,true);
					_aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,true);
				}
			}
	}
    _oInterface.hideAllLines();
	
	if(_aWinningLine != null){
		for(var i=0;i<_aWinningLine.length;i++){
                
                if(_aWinningLine[i].line > 0){
                    //_oPayTable.highlightCombo(_aWinningLine[i].value,_aWinningLine[i].num_win);
                    //_oInterface.showLine(_aWinningLine[i].line);
					_oPayLineController.isShowLineAnim(true);
                }
                var aList = _aWinningLine[i].list;
                for(var k=0;k<aList.length;k++){
                    _aStaticSymbols[aList[k].row][aList[k].col].show(aList[k].value);
                    _aMovingColumns[aList[k].col].setVisible(aList[k].row,false);
                    _aMovingColumns[aList[k].col+NUM_REELS].setVisible(aList[k].row,false);
                }
            }
	}
	s_oGame.SetStateShowWin();
    //s_oGame._showWin();
    isPreviewShow = false;
}

function CheckData(){
    var indexCoin = findIndexCoin(_iCurBet);
    var indexLineActive = _iLastLineActive - 1;
    if(listResult[indexLineActive][indexCoin].length <= 0){
        if(isNeedGetResult(_iLastLineActive,_iCurBet)){
            var isMaxBet = false;
            _iMode = _iCurMode;
            GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
        }
        return false;
    }else{
        return true;
    }

}

function GetResultToSpin(iLine, iCoin, mode, result){
    var indexCoin = findIndexCoin(iCoin);
    var indexLineActive = iLine - 1;
    var lengtArray = listResult[indexLineActive][indexCoin].length;
    var _result = 0;
    for(i=0;i<lengtArray;i++){
        var _mode = listResult[indexLineActive][indexCoin][i][0];
        if(_mode === mode){
            _result = listResult[indexLineActive][indexCoin][i][1];
            break; 
        }
    }
    if(_result === result){
        //console.log("==== HAVE RESULT ====:" + " Mode: " + mode + " Result: " + _result);
        //setTimeout(() => {
            //_iCurMode++;
            //if(_iCurMode === 1001){
                //return;
            //}
            //_onSpin(iLine, iCoin, 0);
        //}, 200);
       
        return true;
    }else{
        return false;
    }
}

function ClearResultsNoUse(){
    if(_iCurMode >= 980){
        return;
    }
    if(_iCurMode === 1){
        ClearResultNoUseSmallStep();
        return;
    }
    for(i=0;i<listResult.length;i++){
        for(j=0;j<listResult[i].length;j++){
            for(k=listResult[i][j].length-1;k>=0;k--){
                if(listResult[i][j][k][0] < _iCurMode){
                    listResult[i][j].splice(k,1);
                }
            }
        }
    }
}

function ClearResultNoUseSmallStep(){
    for(i=0;i<listResult.length;i++){
        for(j=0;j<listResult[i].length;j++){
            for(k=listResult[i][j].length-1;k>=0;k--){
                if(listResult[i][j][k][0] <= 1000 && listResult[i][j][k][0] >= 970){
                    listResult[i][j].splice(k,1);
                }
            }
        }
    }
}

function findIndexCoin(iCoin){
    for(var i=0; i<COIN_BET.length;i++){
        if(iCoin === parseFloat(COIN_BET[i])){
            return i;
        }
    }
}

function isNeedGetResult(lineNumber,betPerLine){
    var indexCoin = findIndexCoin(betPerLine);
    var indexLineActive = lineNumber - 1;
    if(listResult[indexLineActive][indexCoin].length <= 21){
        return true;
    }
    return false;
}



  function toDataURL(url, callback) {
    //http://localhost:59570/Coupon/RenderCouponMedia/20?original=True&v=637443364558936855
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  //toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
    //console.log('RESULT:', dataUrl)
  //})



function CallWhenHaveProfile(){
    _oPreloader.unload();
    tryCheckLogin();
    _oInterface.disableGuiButtons();
    _oInterface._refreshEntries(_oProfile.GetSweepstakesPoints());
    var isMaxBet = false
    GetMoreData(_kiosID,_iLastLineActive,_iCurBet,_numberData,isMaxBet);
    CreateListResult(listResult);
    CreateListResult(listResultPreview);
    GetCouponData();
}