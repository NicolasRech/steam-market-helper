// ==UserScript==
// @name        Steam market order validator
// @namespace   hceR scripts
// @match       https://steamcommunity.com/market/
// @version     0
// @author      https://github.com/NicolasRech
// ==/UserScript==

class orderValueGetter {
  constructor(orderHTML) {
    this.orderHTML = orderHTML;
  }
 
  get() {
    var orderText = this.orderHTML.innerHTML;
    
    var orderValue = parseInt(orderText.substring(3,6));
    
    var orderCentsValue = parseInt(orderText.substring(7,10));
    
    return orderValue + (orderCentsValue/100);
  }
}

class myOrderValueGetter {
  constructor(orderHTML) {
    this.orderHTML = orderHTML;
  }
 
  get() {
    var nodeList = this.orderHTML.childNodes;
    
    if(nodeList != null){
      var orderText = nodeList[2].data.substring(5,14);

      var orderValue = parseInt(orderText.substring(3,6));

      var orderCentsValue = parseInt(orderText.substring(7,10));

      return orderValue + (orderCentsValue/100);
    }else{
      return null;
    }
  }
}

class myMoneyGetter {
  constructor(orderHTML) {
    this.orderHTML = orderHTML;
  }
 
  get() {
    var moneyText = this.orderHTML.innerHTML;
    
    var moneyValue = parseInt(moneyText.substring(3,6));
    
    var moneyCentsValue = parseInt(moneyText.substring(7,10));
    
    return moneyValue + (moneyCentsValue/100);
  }
}

class myOrderValidator {
  constructor(orderValue, myOrderValue){
    this.orderValue = orderValue;
    this.myOrderValue = myOrderValue;
  }
  
  isValid() {
    if(this.orderValue > this.myOrderValue){
        console.log(document.getElementsByClassName("item_market_action_button_contents"));

        document.getElementsByClassName("item_market_action_button_contents")[0].click( );

        console.log("My order cancelled")
      }
  }
}

class newOrderBuilder {
  constructor(orderValue, myMoneyValue){
    this.orderValue = orderValue;
    this.myMoneyValue = myMoneyValue;
  }
  
  build() {
    if(this.myMoneyValue > this.orderValue){
        document.getElementsByClassName("market_noncommodity_buyorder_button")[0].click();
        
        document.getElementById("market_buy_commodity_input_price").value = (this.orderValue + 0.03);
        
        window.alert("READY TO ORDER");
    }
  }
}

class orderValidator {
  static isValid() {
    const myMoney = new myMoneyGetter(document.getElementById("header_wallet_balance"));
    
    const myMoneyValue = myMoney.get();
    
    console.log("My money: " + myMoneyValue);
    
    const order = new orderValueGetter(document.getElementsByClassName("market_commodity_orders_header_promote")[1]);
    
    const orderValue = order.get();

    console.log("Order: " + orderValue);
    
    document.getElementById("market_buyorder_info_show_details").click();
    
    try{
      const myOrder = new myOrderValueGetter(document.getElementsByClassName("market_listing_price")[0]);
      
      const tryToValidate = new myOrderValidator(orderValue, myOrder.get());
      
      tryToValidate.isValid();
    }catch{
      const tryToBuildOrder = new newOrderBuilder(orderValue, myMoneyValue);
      
      tryToBuildOrder.build();
    } 
  }
}

window.addEventListener('load', function() {
  var delayInMilliseconds = 500;

  setTimeout(function() {
    orderValidator.isValid();
  }, delayInMilliseconds);
}, false);