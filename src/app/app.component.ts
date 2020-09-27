import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import _ from 'lodash';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { GlobalService } from './services/GlobalServices';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbTypeaheadConfig]
})

export class AppComponent implements OnInit {
  inputValue: any = 0;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('instance') instance: NgbTypeahead;
  stateList: any;
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
  electionresultList: any = [];
  constructor(private fb: FormBuilder, private http: Http,
    public base_path_service: GlobalService, private spinner: NgxSpinnerService,
    public toastr: ToastrManager) {

    this.forgotpasswordForm = this.fb.group({
      voterstype: [''],
      topandbottom: [''],
      values: ['']

    });

  }

  ngOnInit(): void {
    this.inputValue = 0;
    this.electionresultdata();
    this.forgotpasswordForm.controls['voterstype'].setValue('');
    this.forgotpasswordForm.controls['topandbottom'].setValue('Top')
    this.forgotpasswordForm.controls['values'].setValue('5')
  }


  provicedata(eid) {
    const url = this.base_path_service.base_path_api_url() + 'newstate/province/' + eid;
    this.base_path_service.GetRequest(url).subscribe((res) => {
      if (res[0].json) {
        this.data = res[0].json[0].stateData;
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


  formatter = (x: { Province: string }) => x.Province;

  electionresultdata() {
    const url = this.base_path_service.base_path_api_url() + 'election/electionresult';
    this.base_path_service.GetRequest(url).subscribe((res) => {
      if (res[0].json) {
     this.showtime = false;
        this.stateList = [];
        this.electionresultList = res[0].json;
      }
    })
  }
  
  onelectionselect(e) {
    this.Province = [];
    this.JsonDataresponse = [];
    this.stateList = [];
    this.cityvalue = [];
    this.JsonDataCopy = [];
    this.inputValue = 0;
    this.showtime = false;
    this.provicedata(e);
  }
  onselect(e) {
    this.JsonDataresponse = [];
    this.cityvalue = [];

    this.JsonDataCopy = [];
    this.inputValue = 0;
  this.forgotpasswordForm.controls['voterstype'].setValue('');
    this.forgotpasswordForm.controls['topandbottom'].setValue('Top')
    this.forgotpasswordForm.controls['values'].setValue('5')
   this.array = [];
    this.result=[];
    this.showtime = false;
    this.getcity(e.item.Province)
  }
  getcity(item) {
    this.cityvalue = [];
    this.JsonDataresponse = [];
    this.array = [];
    this.JsonDataCopy = [];
    this.inputValue = 0;
    this.result=[];
  this.forgotpasswordForm.controls['voterstype'].setValue('');
    this.forgotpasswordForm.controls['topandbottom'].setValue('Top')
    this.forgotpasswordForm.controls['values'].setValue('5')
  this.cityvalue = this.data.filter(function (e) { return e.Province == item })
 
  }
  getdata(e) {
  var obj;
   if (e != ' ') {
      this.getJson(e);
    } else {
      this.JsonDataresponse = [];
      this.array = [];
      this.JsonDataCopy = [];
      this.inputValue = 0;
      this.result=[];
      this.showtime = false;
        this.toastr.errorToastr('Select Federal Electrol District.', 'Oops!');
     
    }

  }
  
  public getJson(id) {
    this.spinner.show();
    const url = this.base_path_service.base_path_api_url() + 'newstate/city/' + id;
    this.base_path_service.GetRequest(url).subscribe((res) => {
      if (res[0].json) {
       this.JsonDataresponse = res[0].json[0].cityData;
       this.JsonDataCopy = this.JsonDataresponse;
        this.inputValue = 0;
        this.inputValue = this.JsonDataresponse.length;
       var uniqdata = _.uniqBy(this.JsonDataresponse, 'Candidate Name', 'Color Code', 'Political Affiliation');
      this.array = [];
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

        this.getdatachanged(this.RadioTypeValue)
        this.spinner.hide();
      }
    })
  }











  getdatachanged(type) {
    this.RadioTypeValue = type;
    var JsonData = [];
    if (type == "Normal") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] <= 599);
      this.inputValue = JsonData.length;
    this.forloopdata(JsonData);
    } else if (type == "Advance Polls") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] >= 600 && e['Polling Station Number'] <= 699)
    this.inputValue = JsonData.length;
      this.forloopdata(JsonData);

    } else if (type == "Groups") {
      JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] == 800 || e['Polling Station Number'] == 801)
     
      this.inputValue = JsonData.length;
      this.forloopdata(JsonData);

    }
  }


  forloopdata(data) {
    var User = [];
    var newPollnumber = [];
    for (var i = 0; i < this.array.length; i++) {
      var newpollno = [];

      for (var j = 0; j < data.length; j++) {
        if (data[j]['Political Affiliation'] == this.array[i].PoliticalAffiliation) {
          newpollno.push(data[j].Votes)
        }
        newPollnumber.push(data[j]['Polling Station Number'])

      }
      User.push({ data: newpollno, label: this.array[i].PoliticalAffiliation, backgroundColor: this.array[i].colorcode })
    }
    newPollnumber.sort()
    this.getFirstgraphbinding(User, newPollnumber)
    this.newfilterArray = User;
  }

  getFirstgraphbinding(parameterValue, PollingStationNumber) {
    this.showtime = true;
  this.barChartOptions = {
      type: 'bar',
      responsive: true,
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
            labelString: 'Poll Number',
            fontSize: '15',
            fontColor: 'lightBlack'
          },
          stacked: true,
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of votes',
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
        rtl: true,
        fullWidth: true,
        align: 'right',
        position: 'bottom',
        fontSize: '15',
        fontColor: 'lightBlack',
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
    var newtakepoll = [];
    if (this.inputValue == this.JsonDataresponse.length) {
      newtakepoll = _.uniq(PollingStationNumber);
    } else {
      var uniqpollno = _.uniq(PollingStationNumber);
      newtakepoll = _.take(uniqpollno, this.inputValue)
    }
    this.barChartLabels = newtakepoll;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = parameterValue;
  }

  
  getfilterpart(data, n) {
    var totalelctorwise = _.uniqBy(data, 'Total Votes');
    var totalarray = [];
    for (var i = 0; i < totalelctorwise.length; i++) {
      totalarray.push(totalelctorwise[i]['Total Votes'])
    }
    var newTotalArray = [];
    var newTotalArraygroup = [];
    for (var i = 0; i < totalarray.length; i++) {

      for (var j = 0; j < data.length; j++) {
        if (totalarray[i] == data[j]['Total Votes']) {
          newTotalArray.push(data[j])
        }

      }
      newTotalArraygroup.push(newTotalArray)
      newTotalArray = [];
    }

   var newData = [];
    for (var i = 0; i < n; i++) {
      newData.push(newTotalArraygroup[i])
    }
  
    this.forloopdata(_.flatten(newData));
  }

  onsave() {
    var a = this.forgotpasswordForm.value.voterstype;
    var b = this.forgotpasswordForm.value.topandbottom;
    var c = this.forgotpasswordForm.value.values;
    var topbotmdata = [];
    var JsonData = [];
    var dataBody = this.JsonDataresponse;
    this.inputValue = c;
    if (this.forgotpasswordForm.value.voterstype == '' || this.forgotpasswordForm.value.voterstype == undefined || this.forgotpasswordForm.value.voterstype == null) {
      this.toastr.errorToastr('Select Vote Type.', 'Oops!');
    }
    else if (this.forgotpasswordForm.value.topandbottom == null) {
      this.toastr.errorToastr('Select from and Number of Values.', 'Oops!');
    } else if (this.forgotpasswordForm.value.values == null) {
      this.inputValue =
        this.toastr.errorToastr('Select  Number of Values.', 'Oops!');
    }
    else {
      this.inputValue = this.forgotpasswordForm.value.values
      this.toastr.successToastr('Graph Data As per Additional Filters ', 'Success!');
      if (this.RadioTypeValue == "Normal") {
        JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] <= 599)
       
      } else if (this.RadioTypeValue == "Advance Polls") {
        JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] >= 600 && e['Polling Station Number'] <= 699)
      
      } else if (this.RadioTypeValue == "Groups") {
        JsonData = this.JsonDataresponse.filter((e) => e['Polling Station Number'] == 800 || e['Polling Station Number'] == 801)
     
      }

      if (a == "Total_Votes") {

        if (b == "Bottom") {

          for (var i = 0; i < JsonData.length; i++) {
            topbotmdata = JsonData.sort((p, q) => p['Total Votes'] - q['Total Votes']);

          }

        } else {
          topbotmdata = JsonData.sort((p, q) => q['Total Votes'] - p['Total Votes']);
          topbotmdata = _.uniqBy(topbotmdata, 'Total Votes');
        }
        this.result = [];
        this.result = _.take(topbotmdata, c);
        this.getfilterpart(JsonData, c);

      } else if (a == "Electors") {
        if (b == "Bottom") {
          topbotmdata = JsonData.sort((p, q) => p.Electors - q.Electors);
        } else {
          topbotmdata = JsonData.sort((p, q) => q.Electors - p.Electors)
        }
        this.result = [];
        this.result = _.take(topbotmdata, c);
        this.getfilterpart(JsonData, c);
      }
    }
  }
  getcancel() {
    this.inputValue = this.JsonDataresponse.length;
    this.getdatachanged(this.RadioTypeValue);
    this.forgotpasswordForm.controls['voterstype'].setValue('');
    this.forgotpasswordForm.controls['topandbottom'].setValue('Top')
    this.forgotpasswordForm.controls['values'].setValue('5')
  
  }
}



