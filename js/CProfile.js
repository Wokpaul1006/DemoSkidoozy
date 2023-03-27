var _oProfile;

function CProfile(){

    var userInfoGuest = JSON.parse(sessionStorage.getItem('userInfo'));
    var CustomerID = 143 || userInfoGuest.userID; //Chổ này lấy ID người chơi
    var BankBalance;
    var WalletBalance;
    var SweepstakesPoints;

    this.GetPlayerData = function(data){
        if(CustomerID === 143){
            CustomerID = data[0].FKCustomerID;
            BankBalance = data[0].BankBalance;
            WalletBalance = data[0].WalletBalance;
            SweepstakesPoints = data[0].SweepstakesPoints;

        }else if (CustomerID = userInfoGuest.userID){
            CustomerID = userInfoGuest.userID;
            BankBalance = userInfoGuest.bankBalance;
            WalletBalance = userInfoGuest.winBalance;
            SweepstakesPoints = userInfoGuest.entry;
        }

        window.addEventListener('message',(event)=>{
            console.log('iframe message', event.data)
        })
    };

    this.GetPlayerID = function(){
        return CustomerID;
    };

    this.GetWalletBalance = function(){
        return WalletBalance;
    };

    this.refreshWalletBalance = function(value){
        WalletBalance = value;
    };

    this.GetSweepstakesPoints = function(){
        return SweepstakesPoints; //hàm trả về giá trị entries
    };

    this.refreshSweepstakesPoints = function(value){
        SweepstakesPoints += value;
    };

    this.GetBankBalance = function(){
        if(BankBalance < 0){
            return BankBalance + 1;
        }else if(BankBalance > 0)
        {
            return BankBalance;
        }
    };

    this.refreshBankBalance = function(value){
        BankBalance = value
    };
}