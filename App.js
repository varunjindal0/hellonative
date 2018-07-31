import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight } from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


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

// function ChangeDisplayButton(props){
//   value = this.props.Entry;
//   a=this.props.a;
//   return (
//     <TouchableHighlight style={{paddingLeft: 9}} onPress={()=> {return }} underlayColor= 'transparent'>
//       <View style={[styles.button, {backgroundColor: (value[5]-value[2])>=0 ? '#5ae224':'#c10141'}]}>
//         <Text style={styles.buttonText}>{(value[5]-value[2]).toFixed(2)>0 ? '+'+(value[5]-value[2]).toFixed(2):(value[5]-value[2]).toFixed(2)}</Text>
//       </View>
//       {/* ((value[5]-value[2])>0) ? '#5ae224':'#c10141' */}
//      </TouchableHighlight>
//   )
// }

class ChangeDisplayButton extends React.Component {
  constructor(props){
    super(props);
    this.state={toggleDisplayChangeFlag: this.props.a}
  }
  render(){
    value = this.props.Entry;
    console.log("*******************************"+this.props.Entry)
    return (
          <TouchableHighlight style={{paddingLeft: 9}} onPress={()=>this.setState({toggleDisplayChangeFlag: !this.state.toggleDisplayChangeFlag}) } underlayColor= 'transparent'>
            <View style={[styles.button, {backgroundColor: (value[7])>=0 ? '#5ae224':'#c10141'}]}>
              <Text style={styles.buttonText}>{this.state.toggleDisplayChangeFlag ? ((value[7])>0 ? '+'+(value[7]) : value[7]) : (value[8]>=0 ? '+'+value[8]+'%' : value[8]+'%')}</Text>
            </View>
            {/* ((value[5]-value[2])>0) ? '#5ae224':'#c10141' */}
           </TouchableHighlight>
        )
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log("i am in the constructor")
    setTimeout(()=> console.log("setTimeout is working------------------------------------------------------------------"), 0)
  //  this.handleEntryPress = this.handleEntryPress.bind(this)
    this.state = {stocks: [], commodity: [], selectedStock: [], selectedCommodityIndex: null}
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
     //   var url = 'https://rpsc.rajasthan.gov.in/applyonline/'
      var url = 'https://www.ncdex.com/MarketData/LiveFuturesQuotes.aspx';
   // var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=JPASSOCIAT.NS&apikey=KKNXLVMLE1A5RTQ0';

    fetch(url,{method: 'get', headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }})
    .then(response=>{
      console.log("123")
      setTimeout(() => console.log("I am in response of commodity fetch!!!!!!!!!!!!!!!!"), 0);
      return response.text()
    })
    .then(html=>{
      console.log("786")
        // console.log(html)  
         const $= cheerio.load(html);
         console.log("2")
           var info = $('.ItemColor').text().trim().replace(/\s\s+/g, ',')
           console.log(info) ;
            var dataArray = info.split(",");

          //   var info2 = $('.altItemcolor').text().trim().replace(/\s\s+/g, ',')
          // //  console.log(info2) ;
          //   var dataArray2 = info2.split(",");
          //   var dataArray= [];
          //   for(i=0, index=0; i<(dataArray1.length+dataArray2.length) || index<dataArray1.length;i=i+2, index++){
          //     dataArray[i] = dataArray1[index]
          //   }
          //   for(i=1, index=0; i<(dataArray1.length+dataArray2.length) || index<dataArray2.length;i=i+2, index++){
          //     dataArray[i] = dataArray2[index]
          //   }
          




            var temp=[];
            var tempdata=[]
          for(index=0; index<dataArray.length; index++){
          //   console.log(index%15 + typeof(index%15))
          //  console.log(dataArray[index]);
           temp[index%15] = dataArray[index];
           if(index%15 == 14){
             //this.state.commodity.push(temp)
           //  var tempdata = this.state.commodity.concat();
             tempdata.push(temp);
           //  this.setState({commodity: tempdata})
             temp= [null];
           }
          }
          tempdata.forEach(elem=>{
            console.log(elem[0]);
          })
          console.log("------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ...")

          var info2 = $('.altItemcolor').text().trim().replace(/\s\s+/g, ',')
          console.log(info2) ;
          var dataArray2 = info2.split(",");
          var temp=[];
          var tempdata2=[]
          for(index=0; index<dataArray2.length; index++){
          //   console.log(index%15 + typeof(index%15))
          //  console.log(dataArray[index]);
           temp[index%15] = dataArray2[index];
           if(index%15 == 14){
             //this.state.commodity.push(temp)
           //  var tempdata = this.state.commodity.concat();
             tempdata2.push(temp);
           //  this.setState({commodity: tempdata})
             temp= [null];
           }
          }
          tempdata2.forEach(elem=>{
            console.log(elem[0]);
          })

          // Add both the arrays in following way:
          var dataArray= [];
            for(i=0, index=0; i<(tempdata.length+tempdata2.length) || index<tempdata.length;i=i+2, index++){
              dataArray[i] = tempdata[index]
            }
            for(i=1, index=0; i<(tempdata.length+tempdata2.length) || index<tempdata2.length;i=i+2, index++){
              dataArray[i] = tempdata2[index]
            }
          

          this.setState({commodity: dataArray})
          // console.log(index);
           console.log(this.state.commodity.length)
          // console.log(this.state.commodity)



          //************************************************************************************************************************ */

          var info2 = $('.altItemcolor').text().trim().replace(/\s\s+/g, ',')
          //  console.log(info2) ;
            var dataArray2 = info2.split(",");
            var temp=[];
            var tempdata=[]
          for(index=0; index<dataArray2.length; index++){
          //   console.log(index%15 + typeof(index%15))
          //  console.log(dataArray[index]);
           temp[index%15] = dataArray2[index];
           if(index%15 == 14){
             //this.state.commodity.push(temp)
           //  var tempdata = this.state.commodity.concat();
             tempdata.push(temp);
           //  this.setState({commodity: tempdata})
             temp= [null];
           }
          }
          tempdata.forEach(elem=>{
            console.log(elem[0]);
          })
      

    })
    .catch((error) => {
      if (error.response) {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              console.log("IF----------------")
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else {
              console.log("ELSE--------------")
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error);
    });





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

    // console.log("Just before axios")
    // axios({url: url,method:'get'})
    //   .then(function (response) {
    //     console.log("123")
    //     setTimeout(() => console.log("I am in response of commodity fetch!!!!!!!!!!!!!!!!"), 0);
    //     return response.data
    //   })
    //   .then(function(html){
    //     console.log("786")
    //     // console.log(html)  
    //      const $= cheerio.load(html);
    //      console.log("2")
    //        var info = $('.ItemColor').text().trim().replace(/\s\s+/g, ',')
    //        console.log(info) ;
    //         var dataArray = info.split(",");

    //       //   var info2 = $('.altItemcolor').text().trim().replace(/\s\s+/g, ',')
    //       // //  console.log(info2) ;
    //       //   var dataArray2 = info2.split(",");
    //       //   var dataArray= [];
    //       //   for(i=0, index=0; i<(dataArray1.length+dataArray2.length) || index<dataArray1.length;i=i+2, index++){
    //       //     dataArray[i] = dataArray1[index]
    //       //   }
    //       //   for(i=1, index=0; i<(dataArray1.length+dataArray2.length) || index<dataArray2.length;i=i+2, index++){
    //       //     dataArray[i] = dataArray2[index]
    //       //   }
          




    //         var temp=[];
    //         var tempdata=[]
    //       for(index=0; index<dataArray.length; index++){
    //       //   console.log(index%15 + typeof(index%15))
    //       //  console.log(dataArray[index]);
    //        temp[index%15] = dataArray[index];
    //        if(index%15 == 14){
    //          //this.state.commodity.push(temp)
    //        //  var tempdata = this.state.commodity.concat();
    //          tempdata.push(temp);
    //        //  this.setState({commodity: tempdata})
    //          temp= [null];
    //        }
    //       }
    //       tempdata.forEach(elem=>{
    //         console.log(elem[0]);
    //       })
    //       console.log("------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ...")

    //       var info2 = $('.altItemcolor').text().trim().replace(/\s\s+/g, ',')
    //       console.log(info2) ;
    //       var dataArray2 = info2.split(",");
    //       var temp=[];
    //       var tempdata2=[]
    //       for(index=0; index<dataArray2.length; index++){
    //       //   console.log(index%15 + typeof(index%15))
    //       //  console.log(dataArray[index]);
    //        temp[index%15] = dataArray2[index];
    //        if(index%15 == 14){
    //          //this.state.commodity.push(temp)
    //        //  var tempdata = this.state.commodity.concat();
    //          tempdata2.push(temp);
    //        //  this.setState({commodity: tempdata})
    //          temp= [null];
    //        }
    //       }
    //       tempdata2.forEach(elem=>{
    //         console.log(elem[0]);
    //       })

    //       // Add both the arrays in following way:
    //       var dataArray= [];
    //         for(i=0, index=0; i<(tempdata.length+tempdata2.length) || index<tempdata.length;i=i+2, index++){
    //           dataArray[i] = tempdata[index]
    //         }
    //         for(i=1, index=0; i<(tempdata.length+tempdata2.length) || index<tempdata2.length;i=i+2, index++){
    //           dataArray[i] = tempdata2[index]
    //         }
          

    //       this.setState({commodity: dataArray})
    //       // console.log(index);
    //        console.log(this.state.commodity.length)
    //       // console.log(this.state.commodity)



    //       //************************************************************************************************************************ */

    //       var info2 = $('.altItemcolor').text().trim().replace(/\s\s+/g, ',')
    //       //  console.log(info2) ;
    //         var dataArray2 = info2.split(",");
    //         var temp=[];
    //         var tempdata=[]
    //       for(index=0; index<dataArray2.length; index++){
    //       //   console.log(index%15 + typeof(index%15))
    //       //  console.log(dataArray[index]);
    //        temp[index%15] = dataArray2[index];
    //        if(index%15 == 14){
    //          //this.state.commodity.push(temp)
    //        //  var tempdata = this.state.commodity.concat();
    //          tempdata.push(temp);
    //        //  this.setState({commodity: tempdata})
    //          temp= [null];
    //        }
    //       }
    //       tempdata.forEach(elem=>{
    //         console.log(elem[0]);
    //       })
    //   }.bind(this))
    //   .catch(function (error) {
    //     if (error.response) {
    //       // The request was made, but the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log("IF----------------")
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else {
    //       console.log("ELSE--------------")
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    
    //   });
 

    
  }

  _onPressButtonTH(){
    Alert.alert("IT SHOULD TOOGLE %AGE CHANGE AND ABSOLUTE CHANGE");
  }
  handleEntryPress(index){
    console.log("Entry number this is pressed: "+ index)
    this.setState({selectedStock: this.state.commodity[index], selectedCommodityIndex: index})
    console.log(this.state.selectedStock[0])
  }

  onSwipeDown(gestureState) {
    console.log('You swiped down!');
    this.setState({selectedCommodityIndex: null, selectedStock: []})
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
   // console.log(this.state);
    let bool = this.state.commodity.length;
    return (
      <View style={styles.container}>
      <View style={styles.stockBasket}  >
        <ScrollView>
          {
            
            function(){
                
               if(bool){
             return this.state.commodity.map(function(value,index){
           //   console.log("--------------------------------------------------------------------------------------------------- : "+index + " "+value[0]);
              return (
                    <TouchableHighlight onPress={()=>this.handleEntryPress(index)} key={index}>
                    <View style={(index!=this.state.selectedCommodityIndex)?styles.stockEntry:styles.selectedStockEntry}>
                     <View>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 6, fontSize: 15}}>
                        {value[0] + " "}
                      </Text>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 6}}>{value[1]}</Text>
                      </View>
                        

                        <View style={styles.stockEntryRightPart} >
                        
                          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                            {Number(value[6]).toFixed(2)}
                          </Text>
                          
                          {/* <TouchableHighlight style={{paddingLeft: 9}} a='1' onPress={()=> console.log("IT SHOULD TOOGLE %AGE CHANGE AND ABSOLUTE CHANGE"+this.props.backgroundColor)} underlayColor= 'transparent'>
                            <View style={[styles.button, {backgroundColor: (value[5]-value[2])>=0 ? '#5ae224':'#c10141'}]}>
                              <Text style={styles.buttonText}>{(value[5]-value[2]).toFixed(2)>0 ? '+'+(value[5]-value[2]).toFixed(2):(value[5]-value[2]).toFixed(2)}</Text>
                            </View>
                            
                          </TouchableHighlight> */}
                          <ChangeDisplayButton a='1' Entry={value} />
                        
                        </View>  
                        </View>  
                  </TouchableHighlight>
              )
            }.bind(this))
           } else {
             return <Text>chgchdxghcjh</Text>
           }
          }.bind(this)()
          
          }
          </ScrollView>
        </View>
        {/* <View> */}
        

          {

                
            function(){
              if(this.state.selectedStock.length){
                return (
                  <GestureRecognizer
                    // onSwipe={(direction, state) => this.onSwipe(direction, state)}
                    onSwipeDown={(state) => this.onSwipeDown(state)}
                    config={config}
                    style={{
                      flex: 2,
                    }}
                    >
                  // <Text> {this.state.selectedStock[0]}</Text>
                  <View style={styles.selectedStockInfo}>
                    {/* <View style={styles.infoAreaSingleRow}><View style={styles.infoAreaSingleItem}><Text> {this.state.selectedStock[0]}</Text></View></View> */}
                      <View style={{borderBottomWidth: 1, borderBottomColor: 'rgb(183, 168, 168)'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18}}>{this.state.selectedStock[0]}</Text>
                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold'}}>{this.state.selectedStock[1]}</Text>
                      </View>
                      <View style={styles.infoAreaSingleRow} >
                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1', paddingLeft: 6}}>OPEN</Text>
                            <Text style={{marginRight: 15, color: '#fff', fontWeight: 'bold'}}>{this.state.selectedStock[2]}</Text>
                          </View>

                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1'}}>SPOT PRICE</Text>
                            <Text style={{color: '#fff', fontWeight: 'bold', marginRight: 6}}>{this.state.selectedStock[10]}</Text>
                          </View>
                          
                      </View>

                      <View style={styles.infoAreaSingleRow} >
                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1', paddingLeft: 6}}>HIGH</Text>
                            <Text style={{marginRight: 15, color: '#fff', fontWeight: 'bold'}}>{this.state.selectedStock[3]}</Text>
                          </View>

                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1'}}>SPOT DT.</Text>
                            <Text style={{fontSize: 12, width: 60, color: '#fff', fontWeight: 'bold', marginRight: 6 }}>{this.state.selectedStock[11]}</Text>
                          </View>
                          
                      </View>

                      <View style={styles.infoAreaSingleRow} >
                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1', paddingLeft: 6}}>LOW</Text>
                            <Text style={{marginRight: 15, color: '#fff', fontWeight: 'bold'}}>{this.state.selectedStock[4]}</Text>
                          </View>

                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1'}}>BEST BUY</Text>
                            <Text style={{color: '#fff', fontWeight: 'bold', marginRight: 6}}>{this.state.selectedStock[12]}</Text>
                          </View>
                          
                      </View>

                      <View style={styles.infoAreaSingleRow} >
                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1', paddingLeft: 6}}>CLOSE</Text>
                            <Text style={{marginRight: 15, color: '#fff', fontWeight: 'bold'}}>{this.state.selectedStock[5]}</Text>
                          </View>

                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1'}}>BEST SELL</Text>
                            <Text style={{color: '#fff', fontWeight: 'bold', marginRight: 6}}>{this.state.selectedStock[13]}</Text>
                          </View>
                          
                      </View>
                      <View style={styles.infoAreaSingleRow} >
                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1', paddingLeft: 6}}>AV TP.</Text>
                            <Text style={{marginRight: 15, color: '#fff', fontWeight: 'bold'}}>{this.state.selectedStock[9]}</Text>
                          </View>

                          <View style={styles.infoAreaSingleItem}>
                            <Text style={{color: '#c8cbd1'}}>OPEN INT.</Text>
                            <Text style={{color: '#fff', fontWeight: 'bold', marginRight: 6}}>{this.state.selectedStock[14]}</Text>
                          </View>
                          
                      </View>
                 </View>
                 </GestureRecognizer>  
            ) 
            }else {
              return <Text>----</Text>
            }
              
          }.bind(this)()


          }

           
        </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02091A',
    marginTop: 20,
  },
  stockBasket: {
    flex: 3,
    backgroundColor: '#02091A',
    // Color: '#fff'
   // borderWidth: 5
    },
  stockEntry: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(183, 168, 168)',
    marginTop: 4,
    // borderWidth: 5
  },
  selectedStockEntry: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(183, 168, 168)',
    // marginTop: 4,
    backgroundColor: '#293242'
  },
  selectedStockInfo: {
    flex: 2,
    backgroundColor: '#293242',
   // backgroundColor: '#EEEFF6',
  },
  stockEntryRightPart: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  button: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#5ae224',
    marginRight: 6,
    borderRadius: 5
  },
  buttonText: {
    padding: 2,
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoAreaSingleRow: {
     flex: 1,
     flexDirection: 'row',
   //  justifyContent: 'space-between',
    //  height: 20,
    //  borderWidth: 2,
     borderBottomWidth: 1,
     borderBottomColor: 'rgb(183, 168, 168)'
    //  alignItems: 'center'
  },
  infoAreaSingleItem: {
     flex: 1,
     flexDirection: 'row',
    //  borderRightWidth: 1,
     justifyContent: 'space-between',
     alignItems: 'center'
  }
});
