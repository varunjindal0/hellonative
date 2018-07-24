import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
const cheerio = require('react-native-cheerio');
const axios = require('axios')
// import cheerio from 'cheerio'
// import request from 'request'

// var cheerio = require('cheerio');
// var request = require('request');

const stockList = [
  "JPASSOCIAT.NS",
  // "BHUSANSTL.NS",
  "INDIGO.NS",
  // "WALCHANNAG.NS",
  // "TATAMOTORS.NS"
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log("i am in the constructor")
    setTimeout(()=> console.log("setTimeout is working------------------------------------------------------------------"), 0)
    this.state = {stocks: [], commodity: []}
  //  this.fetchStockData();
    this._onPressButton();
  }
  fetchStockData(){
    let konstant = "Time Series (Daily)";
    console.log("I am in fetch stock data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    let today = "2018-07-18";
    for(let i=0;i<stockList.length;i++){
      let query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockList[i] + "&apikey=KKNXLVMLE1A5RTQ0"
      fetch(query)
      .then((response) => {
        console.log("Fetch stock data vala response")
        setTimeout(() => console.log("setTimeout works fine!!--stock data"), 0);
        return response.json()
      })
      .then(responseJson=>{
        console.log("I am in deep down here!!")
        let stockName = stockList[i];
        console.log(responseJson["Time Series (Daily)"]["2018-07-18"]);
        let data = responseJson["Time Series (Daily)"]["2018-07-18"];
        data.stockSymbol = stockName;
        let tempArray = this.state.stocks.concat();
        tempArray.push(data);
        this.setState({stocks: tempArray}); 

      })
      .catch((error) => {
        console.error(error);
      });
    }
    
  }

   _onPressButton(){
    console.log("Button Pressed!!")
    // url = 'http://localhost:3000/scrape';
    // var data;

    // fetch(url)
    // .then(response=>{
    //   return response.json();
    // })
    // .then(myJson=>{
    //   console.log("Have fetched data successfully!!")
    //   console.log(typeof(JSON.stringify(myJson).replace(/^"(.*)"$/, '$1').replace(/\s /g,"").replace(/\n/g, '')));
    //   console.log(JSON.stringify(myJson).replace(/^"(.*)"$/, '$1').replace(/\s /g, "").replace("\n", ''));
    // })
      // var url = 'https://www.google.com'
    var url = 'https://www.ncdex.com/MarketData/LiveFuturesQuotes.aspx';

    // fetch(url)
    // .then(response=>{
    //   console.log("123")
    //   setTimeout(() => console.log("I am in response of commodity fetch!!!!!!!!!!!!!!!!"), 0);
    //   return response.text()
    // })
    // .then(html=>{
    //   console.log("786")
    //   const $= cheerio.load(html);
    //   console.log("2")
    //   var data = $('.ItemColor').text().trim().replace(/\s\s+/g, ',')
    //   // console.log(data) ;
    //   var dataArray = data.split(",");
    //   var temp;
    //   for(index=0, i=0; index<dataArray.length; i++){
    //    // temp[index%16] = dataArray[index]
    //     console.log(index%16)
    //   }
    //   console.log("############################################################################################################################")
     
      

    // })
    // .catch((error) => {
    //   console.error(error);
    // });





    // console.log("1")
    // const response = await fetch(url);
    // console.log("2")

    // const html = await response.text();
    // console.log("3")

    // const $= cheerio.load(html);
    //   console.log("cheerio.load passed!!")
    //   var data = $('.ItemColor').text().trim().replace(/\s\s+/g, ',')
    //   // console.log(data) ;
    //   var dataArray = data.split(",");
    //   var temp;
    //   for(index=0, i=0; index<dataArray.length; i++){
    //    // temp[index%16] = dataArray[index]
    //     console.log(index%16)
    //   }
    //   console.log("############################################################################################################################")

    console.log("Just before axios")
    axios.get(url)
      .then(function (response) {
        console.log("123")
        setTimeout(() => console.log("I am in response of commodity fetch!!!!!!!!!!!!!!!!"), 0);
        return response
      })
      .then(function(html){
        console.log("786")
          const $= cheerio.load(html);
          console.log("2")
          var data = $('.ItemColor').text().trim().replace(/\s\s+/g, ',')
          // console.log(data) ;
          var dataArray = data.split(",");
          var temp;
          for(index=0, i=0; index<dataArray.length; i++){
           // temp[index%16] = dataArray[index]
            console.log(index%16)
          }
      })
      .catch(function (error) {
        console.log(error);
      });
 

    
  }
  render() {
    console.log(this.state);
    console.log(this.state.stocks.length)
    let bool = this.state.stocks.length;
    return (
      <View style={styles.container}>
        <View style={styles.stockBasket} >
          <View>
          {
            this.state.stocks.map(function(value,index){
              console.log((value["4. close"]-value["1. open"]).toFixed(2) + value.stockSymbol);
              return (
                     <View style={styles.stockEntry} key={index} >
                      <Text>
                        {value.stockSymbol + " "}
                      </Text>  
                        <View style={styles.stockEntryRightPart} >
                          <Text>
                            {Number(value["4. close"]).toFixed(2)}
                          </Text>
                          <TouchableHighlight style={{paddingLeft: 9}} onPress={this._onPressButton} underlayColor="white">
                            <View style={styles.button}>
                              <Text style={styles.buttonText}>{(value["4. close"]-value["1. open"]).toFixed(2)}</Text>
                            </View>
                          </TouchableHighlight>
                        </View>    
                  </View>
              )
            })
          }
          </View>
        </View>
        <View style={styles.selectedStockInfo}>
           <Text>
             can't see anything here!
              {this.state.stock}
           </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5
  },
  stockBasket: {
    flex: 2,
    },
  stockEntry: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap:'wrap',
    // borderWidth: 5
  },
  selectedStockInfo: {
    flex: 1,
    backgroundColor: '#0ab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockEntryRightPart: {
    flexDirection: 'row',
    
  },
  button: {
    marginBottom: 30,
    width: 60,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    padding: 2,
    color: 'white'
  }
});
