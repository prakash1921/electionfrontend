import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import _ from 'lodash';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { GlobalService } from './services/GlobalServices';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
// import {Component,} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[NgbTypeaheadConfig]
})

export class AppComponent implements OnInit {
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('instance') instance: NgbTypeahead;
  stateList:any;
  Province: any = [];
  data: any = [];
  cityvalue: any = [];
  JsonData: any = [];
  JsonDataCopy: any = [];
  // ......
  showtime: boolean = false;
  tt: any = [];
  butDisabled1: boolean = false;
  butDisabled2: boolean = false;
  show: boolean = true;
  hide: boolean = false;
  filterdata: any = [];
  totalvotesvalue: any = [];
  title = 'Election';
  // data: any = [];
  user1: any = [];
  user2: any = [];
  user3: any = [];
  user4: any = [];
  user5: any = [];
  usertotal: any = [];
  pollno: any = [];
  forgotpasswordForm: FormGroup;
  result: any = [];
  PollingStationNumber: any = [];
  barChartOptionsa: any = []
  barChartLabelsa: any = [];
  barChartTypea: string;
  barChartLegenda: boolean;
  barChartDataa: any = [];
  barChartOptions: any = [];
  barChartLabels: any = [];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: any = [];
  array: any = [];
  newfilterArray: any[];
  RadioTypeValue: any = "Normal";
  JsonDataresponse: any;
// constructor(private fb: FormBuilder, private http: Http,
//   public base_path_service:GlobalService,private ngxService:NgxUiLoaderService ,private spinner: NgxSpinnerService) {
    // this.onSubmit();
    constructor(private fb: FormBuilder, private http: Http,
      public base_path_service:GlobalService,private spinner: NgxSpinnerService) {
    
    this.forgotpasswordForm = this.fb.group({
      voterstype: [''],
      topandbottom: [''],
      values: ['']

    });
  }
  ngOnInit(): void {
this.provicedata();
  }
 
  
  provicedata(){
const url = this.base_path_service.base_path_api_url()+'state/province';
this.base_path_service.GetRequest(url).subscribe((res)=>{
  if(res[0].json){
console.log('rree',res[0].json)
this.data=res[0].json[0].state;
this.Province = _.uniqBy(this.data, 'Province');
  }
})
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
      map(term => (term === '' ? this.Province
        : this.Province.filter(v => v.Province.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

     
   formatter = (x: {Province: string}) => x.Province;
  onselect(e){
console.log('eeee',e)
this.getcity(e.item.Province)
  }
  getcity(item) {
    console.log("fff", item)
    this.cityvalue = this.data.filter(function (e) { return e.Province == item })
    console.log("new city data", this.cityvalue)
    this.getcancel();

   
  }
  getdata(e) {
    console.log("eeeeeeeeeeee", e)
    var obj;
    // this.getJSON().subscribe(data => obj=data, error => console.log(error));

    this.getJson(e);
    this.getcancel();

  }
  public getJson(id) {
    this.spinner.show();
    // this.ngxService.start();
  const url = this.base_path_service.base_path_api_url()+'state/city/' + id;
  this.base_path_service.GetRequest(url).subscribe((res)=>{
    if(res[0].json){
      console.log('abcd',res[0].json[0]);
      this.JsonDataresponse = res[0].json[0].Data;
      this.JsonDataCopy = this.JsonDataresponse;
      console.log("data new ", this.JsonDataresponse._body)
      var uniqdata = _.uniqBy(this.JsonDataresponse, 'Candidate Name', 'Color Code', 'Political Affiliation');
      console.log("uniqdata lllllllllll", uniqdata);
      this.array=[];
      for (var i = 0; i < uniqdata.length; i++) {
        let candidatename = "candidatename" + i.toString();
        var Obj = {
          candidatename: uniqdata[i]['Candidate Name']
        }
        this.array.push({
          candidatename: uniqdata[i]['Candidate Name'],
          colorcode: uniqdata[i]['Color Code'],
          PoliticalAffiliation: uniqdata[i]['Political Affiliation']
        })
      }
      this.spinner.hide();
      this.getdatachanged(this.RadioTypeValue)
    }
  })
}
  // public getJson(id) {
  //   this.http.get('./assets/' + id + '.json').subscribe(
  //     (data) => {
  //       this.JsonData = data;
  //       this.JsonDataCopy = this.JsonData;
  //       console.log("data new ", this.JsonData._body)
  //       var uniqdata = _.uniqBy(JSON.parse(this.JsonData._body), 'Candidate Name', 'Color Code', 'Political Affiliation');
  //       console.log("uniqdata lllllllllll", uniqdata);
  //       this.array=[];
  //       for (var i = 0; i < uniqdata.length; i++) {
  //         let candidatename = "candidatename" + i.toString();
  //         var Obj = {
  //           candidatename: uniqdata[i]['Candidate Name']
  //         }
  //         this.array.push({
  //           candidatename: uniqdata[i]['Candidate Name'],
  //           colorcode: uniqdata[i]['Color Code'],
  //           PoliticalAffiliation: uniqdata[i]['Political Affiliation']
  //         })
  //       }
  //       this.getdatachanged(this.RadioTypeValue)
  //     },
  //     error => console.error('There was an error!', error)
  //   )

  // }

  getdatachanged(type) {
    this.RadioTypeValue = type;
    var JsonData = [];
    if (type == "Normal") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] <= 599)
      console.log('Normal', JsonData);
      this.forloopdata(JsonData);
    } else if (type == "Advance Polls") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] >= 600 && e['Polling Station Number'] <= 699)
      console.log('Advance Polls', JsonData)
      this.forloopdata(JsonData);

    } else if (type == "Groups") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] == 800 || e['Polling Station Number'] == 801)
      console.log('Groups', JsonData)
      this.forloopdata(JsonData);

    }
  }


  forloopdata(data) {
    console.log("data", data)
    var User = [];
    var newPollnumber = [];
    for (var i = 0; i < this.array.length; i++) {
      var newpollno = [];

      for (var j = 0; j < data.length; j++) {
        // if(data[j]['Candidate Name']==this.array[i].candidatename){
        if (data[j]['Political Affiliation'] == this.array[i].PoliticalAffiliation) {

          // newpollno.push(data[j]['Polling Station Number'])
          newpollno.push(data[j].Votes)
          // newpollno.push(data[j]['Total Votes'])
        }
        newPollnumber.push(data[j]['Polling Station Number'])

      }
      User.push({ data: newpollno, label: this.array[i].PoliticalAffiliation, backgroundColor: this.array[i].colorcode })
    }

    console.log("filter dta", User, newPollnumber.sort());

    // this.getFirstgraphbinding(User,newPollnumber)

    this.getFirstgraphbinding(User, newPollnumber)
    this.newfilterArray = User;
  }
  getFirstgraphbinding(parameterValue, PollingStationNumber) {
    // this.ngxService.stop();
    this.showtime = true;
    console.log("graph data", "parameterValue", parameterValue, "PollingStationNumber", PollingStationNumber)
    this.barChartOptions = {
      type: 'bar',
      //   scaleShowVerticalLines: true,
      responsive: true,
      // events:'click'
      // tooltips: {
      //     callbacks: {
      //         footer: (tooltipItems, data) => {
      //             let total = tooltipItems.reduce((a, e) => a + parseInt(e.yLabel), 0);
      //             return 'Total: ' + total;
      //         }
      //     }


      // },
      labels: {
        fontcolour: 'blue'
      },
      hover: {
        mode: 'label',
        animationDuration: 0

      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Poll No',
            fontSize: '15',
            fontColor: 'lightBlack'
          },
          stacked: true,
          // gridLines: {
          //     // display:false,
          //     offsetGridLines: true
          // },

        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Election Candidate votes',
            fontColor: 'lightBlack',
            fontSize: '15'
          },
          stacked: true,

        }]
      },
      layout: {
        margin: {
          left: 50,
          right: 100,
          top: 200,
          bottom: 200
        }
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'black',
          boxWidth: 10,
          padding: 20
        },
        reverse: true,
        // fontColor:'black',
        rtl: true,
        fullWidth: true,
        align: 'right',
        position: 'bottom',
        fontSize: '15',
        fontColor: 'lightBlack',
        // onHover: function(event, legendItem) {
        //     document.getElementById("canvas").style.cursor = 'pointer';
        //   },
        onClick: function (e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

          ci.data.datasets.forEach(function (e, i) {
            var meta = ci.getDatasetMeta(i);

            if (i !== index) {
              if (!alreadyHidden) {
                meta.hidden = meta.hidden === null ? !meta.hidden : null;
              } else if (meta.hidden === null) {
                meta.hidden = true;
              }
            } else if (i === index) {
              meta.hidden = null;
            }
          });

          ci.update();
        },
      },
      title: {
        display: true,
        text: 'Electoral district',
        fontSize: '20'
      }
    };
    this.barChartLabels = _.uniq(PollingStationNumber);
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = parameterValue;
    console.log('pggg', _.uniq(PollingStationNumber))


  }

  // onsave(){

  // }
  // getcancel(){

  // }

  //    getsavedatachanged(type,data){
  //     var JsonData=[];
  //     if(type=="Normal"){
  //       JsonData =JSON.parse(data).filter((e)=>e['Polling Station Number'] <=599)
  //       console.log('Normal',JsonData);
  // this.forloopdata(JsonData);
  //     }else if(type=="Advance Polls"){
  //       JsonData =JSON.parse(data).filter((e)=>e['Polling Station Number'] >=600 && e['Polling Station Number'] <=699)
  //       console.log('Advance Polls',JsonData)
  // this.forloopdata(JsonData);

  //     }else if(type=="Groups"){
  //       JsonData =JSON.parse(data).filter((e)=>e['Polling Station Number'] ==800 || e['Polling Station Number'] ==801)
  //       console.log('Groups',JsonData)
  // this.forloopdata(JsonData);

  //     }
  //   }

  getfilterpart(data,n){
    console.log('new data',data)
    var totalelctorwise = _.uniqBy(data, 'Total Votes');
    console.log("uniqdata", data);
    console.log('totalelctorwisetotalelctorwise', totalelctorwise)
    var totalarray = [];
    for (var i = 0; i < totalelctorwise.length; i++) {
      totalarray.push(totalelctorwise[i]['Total Votes'])
    }
    console.log('totalarray', totalarray);
    var newTotalArray=[];
    var newTotalArraygroup=[];
  //   console.log('_.groupBy(',_.groupBy(JSON.parse(this.JsonData._body)))
  // console.log('_.union(,',_.uniq(JSON.parse(this.JsonData._body)))
    for (var i = 0; i < totalarray.length; i++) {

      for (var j = 0; j < data.length; j++) {
        if (totalarray[i] == data[j]['Total Votes']) {
          newTotalArray.push(data[j])
         
          // newTotalArray.push(uniqdata.filter((e) => e['Total Votes'] == totalarray[i]))
        
        }

      }
      newTotalArraygroup.push(newTotalArray)
      newTotalArray=[];
    }
  
    console.log('newTotalArraynewTotalArray',newTotalArray)
    console.log('newTotalArraynewTotalArray',newTotalArraygroup)
    console.log('newTotalArraynewTotalArray',newTotalArraygroup[0],newTotalArraygroup[1])

    // console.log('newTotalArraynewTotalArray filter',_.flatten(newTotalArraygroup))
    var newData=[];
    for(var i=0;i< n;i++){
newData.push(newTotalArraygroup[i])
    }
    console.log('newDatanewData',_.flatten(newData))
    this.forloopdata(_.flatten(newData));
  }

  onsave() {
    var a = this.forgotpasswordForm.value.voterstype;
    var b = this.forgotpasswordForm.value.topandbottom;
    var c = this.forgotpasswordForm.value.values;
    var topbotmdata = [];
    var JsonData = [];
    var dataBody = this.JsonDataresponse;
    if (this.RadioTypeValue == "Normal") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] <= 599)
      console.log('Normal', JsonData);
    } else if (this.RadioTypeValue == "Advance Polls") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] >= 600 && e['Polling Station Number'] <= 699)
      console.log('Advance Polls', JsonData)


    } else if (this.RadioTypeValue == "Groups") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] == 800 || e['Polling Station Number'] == 801)
      console.log('Groups', JsonData)
      // this.forloopdata(JsonData);

    }
    //     for(var i=0;i<JsonData.length;i++){
    // if(JsonData[i]['Total Votes'])
    //     }
    // var xyz = _.uniqBy(JsonData, 'Total Votes',);
    // JsonData = _.uniqBy(JsonData, 'Total Votes', 'Candidate Name', 'Polling Station Number');
    // console.log("xyz", xyz)
    // JsonData = _.uniq(JsonData);

    console.log('uniq data JsonData', JsonData)

    if (a == "Total_Votes") {

      if (b == "Bottom") {

        for (var i = 0; i < JsonData.length; i++) {
          // console.log( "sorted data bottom ",JsonData.sort((p, q) => p['Total Votes'] - q['Total Votes'])

          // )
          topbotmdata = JsonData.sort((p, q) => p['Total Votes'] - q['Total Votes']);
          
        }

      } else {
        topbotmdata = JsonData.sort((p, q) => q['Total Votes'] - p['Total Votes']);
        topbotmdata = _.uniqBy(topbotmdata, 'Total Votes');
        console.log('JsonData topbotmdata jjj', topbotmdata)
      }
      this.result = [];
      this.result = _.take(topbotmdata, c)
      console.log(' Electors top or botton data', this.result)
      this.getfilterpart(JsonData,c);
      // this.forloopdata(this.result)

    } else if (a == "Electors") {
      if (b == "Bottom") {
        topbotmdata = JsonData.sort((p, q) => p.Electors - q.Electors);
      } else {
        topbotmdata = JsonData.sort((p, q) => q.Electors - p.Electors)
      }
      this.result = [];
      this.result = _.take(topbotmdata, c)
      console.log(' Electors top or botton data', this.result);
      this.getfilterpart(JsonData,c);
      // this.forloopdata(this.result)
    }
  
  }
  getcancel() {
this.getdatachanged(this.RadioTypeValue);
this.forgotpasswordForm.controls['voterstype'].setValue('');
this.forgotpasswordForm.controls['topandbottom'].setValue('')
this.forgotpasswordForm.controls['values'].setValue('')

  }
}