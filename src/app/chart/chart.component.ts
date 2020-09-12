import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
// import { HttpClient } from '@angular/common/http'; 
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
 Province:any=[];
 data:any=[];
  cityvalue: any=[];
  JsonData: any=[];
  JsonDataCopy: any=[];
// ......
showtime:boolean=false;
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
barChartOptionsa:any=[]
barChartLabelsa: any=[];
barChartTypea: string;
barChartLegenda: boolean;
barChartDataa:any=[];
barChartOptions:any=[];
barChartLabels:any=[];
barChartType:string;
barChartLegend:boolean;
barChartData:any=[];
array:any=[];
  newfilterArray: any[];
  constructor(private fb: FormBuilder, private http: Http) { 
    // this.onSubmit();
        this.forgotpasswordForm = this.fb.group({
            voterstype: [''],
            topandbottom: [''],
            values: ['']

        });
  }

  ngOnInit(): void {
    this.data=[{"Code":10001,"Federal Electoral Districts":"Avalon","Province":"Newfoundland and Labrador"},{"Code":10002,"Federal Electoral Districts":"Bonavista\u2013Burin\u2013Trinity","Province":"Newfoundland and Labrador"},{"Code":10003,"Federal Electoral Districts":"Coast of Bays\u2013Central\u2013Notre Dame","Province":"Newfoundland and Labrador"},{"Code":10004,"Federal Electoral Districts":"Labrador","Province":"Newfoundland and Labrador"},{"Code":10005,"Federal Electoral Districts":"Long Range Mountains","Province":"Newfoundland and Labrador"},{"Code":10006,"Federal Electoral Districts":"St. John's East","Province":"Newfoundland and Labrador"},{"Code":10007,"Federal Electoral Districts":"St. John's South\u2013Mount Pearl","Province":"Newfoundland and Labrador"},{"Code":11001,"Federal Electoral Districts":"Cardigan","Province":"Prince Edward Island"},{"Code":11002,"Federal Electoral Districts":"Charlottetown","Province":"Prince Edward Island"},{"Code":11003,"Federal Electoral Districts":"Egmont","Province":"Prince Edward Island"},{"Code":11004,"Federal Electoral Districts":"Malpeque","Province":"Prince Edward Island"},{"Code":12001,"Federal Electoral Districts":"Cape Breton\u2013Canso","Province":"Nova Scotia"},{"Code":12002,"Federal Electoral Districts":"Central Nova","Province":"Nova Scotia"},{"Code":12003,"Federal Electoral Districts":"Cumberland\u2013Colchester","Province":"Nova Scotia"},{"Code":12004,"Federal Electoral Districts":"Dartmouth\u2013Cole Harbour","Province":"Nova Scotia"},{"Code":12005,"Federal Electoral Districts":"Halifax","Province":"Nova Scotia"},{"Code":12006,"Federal Electoral Districts":"Halifax West","Province":"Nova Scotia"},{"Code":12007,"Federal Electoral Districts":"Kings\u2013Hants","Province":"Nova Scotia"},{"Code":12008,"Federal Electoral Districts":"Sackville\u2013Preston\u2013Chezzetcook","Province":"Nova Scotia"},{"Code":12009,"Federal Electoral Districts":"South Shore\u2013St. Margarets","Province":"Nova Scotia"},{"Code":12010,"Federal Electoral Districts":"Sydney\u2013Victoria","Province":"Nova Scotia"},{"Code":12011,"Federal Electoral Districts":"West Nova","Province":"Nova Scotia"},{"Code":13001,"Federal Electoral Districts":"Acadie\u2013Bathurst","Province":"New Brunswick"},{"Code":13002,"Federal Electoral Districts":"Beaus\u00e9jour","Province":"New Brunswick"},{"Code":13003,"Federal Electoral Districts":"Fredericton","Province":"New Brunswick"},{"Code":13004,"Federal Electoral Districts":"Fundy Royal","Province":"New Brunswick"},{"Code":13005,"Federal Electoral Districts":"Madawaska\u2013Restigouche","Province":"New Brunswick"},{"Code":13006,"Federal Electoral Districts":"Miramichi\u2013Grand Lake","Province":"New Brunswick"},{"Code":13007,"Federal Electoral Districts":"Moncton\u2013Riverview\u2013Dieppe","Province":"New Brunswick"},{"Code":13008,"Federal Electoral Districts":"New Brunswick Southwest","Province":"New Brunswick"},{"Code":13009,"Federal Electoral Districts":"Saint John\u2013Rothesay","Province":"New Brunswick"},{"Code":13010,"Federal Electoral Districts":"Tobique\u2013Mactaquac","Province":"New Brunswick"},{"Code":24001,"Federal Electoral Districts":"Abitibi\u2013Baie-James\u2013Nunavik\u2013Eeyou","Province":"Quebec"},{"Code":24002,"Federal Electoral Districts":"Abitibi\u2013T\u00e9miscamingue","Province":"Quebec"},{"Code":24003,"Federal Electoral Districts":"Ahuntsic-Cartierville","Province":"Quebec"},{"Code":24004,"Federal Electoral Districts":"Alfred-Pellan","Province":"Quebec"},{"Code":24005,"Federal Electoral Districts":"Argenteuil\u2013La Petite-Nation","Province":"Quebec"},{"Code":24006,"Federal Electoral Districts":"Avignon\u2013La Mitis\u2013Matane\u2013Matap\u00e9dia","Province":"Quebec"},{"Code":24007,"Federal Electoral Districts":"Beauce","Province":"Quebec"},{"Code":24008,"Federal Electoral Districts":"Beauport\u2013Limoilou","Province":"Quebec"},{"Code":24009,"Federal Electoral Districts":"B\u00e9cancour\u2013Nicolet\u2013Saurel","Province":"Quebec"},{"Code":24010,"Federal Electoral Districts":"Bellechasse\u2013Les Etchemins\u2013L\u00e9vis","Province":"Quebec"},{"Code":24011,"Federal Electoral Districts":"Beloeil\u2013Chambly","Province":"Quebec"},{"Code":24012,"Federal Electoral Districts":"Berthier\u2013Maskinong\u00e9","Province":"Quebec"},{"Code":24013,"Federal Electoral Districts":"Th\u00e9r\u00e8se-De Blainville","Province":"Quebec"},{"Code":24014,"Federal Electoral Districts":"Pierre-Boucher\u2013Les Patriotes\u2013Verch\u00e8res","Province":"Quebec"},{"Code":24015,"Federal Electoral Districts":"Bourassa","Province":"Quebec"},{"Code":24016,"Federal Electoral Districts":"Brome\u2013Missisquoi","Province":"Quebec"},{"Code":24017,"Federal Electoral Districts":"Brossard\u2013Saint-Lambert","Province":"Quebec"},{"Code":24018,"Federal Electoral Districts":"Rimouski-Neigette\u2013T\u00e9miscouata\u2013Les Basques","Province":"Quebec"},{"Code":24019,"Federal Electoral Districts":"Charlesbourg\u2013Haute-Saint-Charles","Province":"Quebec"},{"Code":24020,"Federal Electoral Districts":"Beauport\u2013C\u00f4te-de-Beaupr\u00e9\u2013\u00cele d'Orl\u00e9ans\u2013Charlevoix","Province":"Quebec"},{"Code":24021,"Federal Electoral Districts":"Ch\u00e2teauguay\u2013Lacolle","Province":"Quebec"},{"Code":24022,"Federal Electoral Districts":"Chicoutimi\u2013Le Fjord","Province":"Quebec"},{"Code":24023,"Federal Electoral Districts":"Compton\u2013Stanstead","Province":"Quebec"},{"Code":24024,"Federal Electoral Districts":"Dorval\u2013Lachine\u2013LaSalle","Province":"Quebec"},{"Code":24025,"Federal Electoral Districts":"Drummond","Province":"Quebec"},{"Code":24026,"Federal Electoral Districts":"Gasp\u00e9sie\u2013Les \u00celes-de-la-Madeleine","Province":"Quebec"},{"Code":24027,"Federal Electoral Districts":"Gatineau","Province":"Quebec"},{"Code":24028,"Federal Electoral Districts":"Hochelaga","Province":"Quebec"},{"Code":24029,"Federal Electoral Districts":"Honor\u00e9-Mercier","Province":"Quebec"},{"Code":24030,"Federal Electoral Districts":"Hull\u2013Aylmer","Province":"Quebec"},{"Code":24031,"Federal Electoral Districts":"Joliette","Province":"Quebec"},{"Code":24032,"Federal Electoral Districts":"Jonqui\u00e8re","Province":"Quebec"},{"Code":24033,"Federal Electoral Districts":"La Pointe-de-l'\u00cele","Province":"Quebec"},{"Code":24034,"Federal Electoral Districts":"La Prairie","Province":"Quebec"},{"Code":24035,"Federal Electoral Districts":"Lac-Saint-Jean","Province":"Quebec"},{"Code":24036,"Federal Electoral Districts":"Lac-Saint-Louis","Province":"Quebec"},{"Code":24037,"Federal Electoral Districts":"LaSalle\u2013\u00c9mard\u2013Verdun","Province":"Quebec"},{"Code":24038,"Federal Electoral Districts":"Laurentides\u2013Labelle","Province":"Quebec"},{"Code":24039,"Federal Electoral Districts":"Laurier\u2013Sainte-Marie","Province":"Quebec"},{"Code":24040,"Federal Electoral Districts":"Laval\u2013Les \u00celes","Province":"Quebec"},{"Code":24041,"Federal Electoral Districts":"Longueuil\u2013Charles-LeMoyne","Province":"Quebec"},{"Code":24042,"Federal Electoral Districts":"L\u00e9vis\u2013Lotbini\u00e8re","Province":"Quebec"},{"Code":24043,"Federal Electoral Districts":"Longueuil\u2013Saint-Hubert","Province":"Quebec"},{"Code":24044,"Federal Electoral Districts":"Louis-H\u00e9bert","Province":"Quebec"},{"Code":24045,"Federal Electoral Districts":"Louis-Saint-Laurent","Province":"Quebec"},{"Code":24046,"Federal Electoral Districts":"Manicouagan","Province":"Quebec"},{"Code":24047,"Federal Electoral Districts":"M\u00e9gantic\u2013L'\u00c9rable","Province":"Quebec"},{"Code":24048,"Federal Electoral Districts":"Mirabel","Province":"Quebec"},{"Code":24049,"Federal Electoral Districts":"Montarville","Province":"Quebec"},{"Code":24050,"Federal Electoral Districts":"Montcalm","Province":"Quebec"},{"Code":24051,"Federal Electoral Districts":"Montmagny\u2013L'Islet\u2013Kamouraska\u2013Rivi\u00e8re-du-Loup","Province":"Quebec"},{"Code":24052,"Federal Electoral Districts":"Mont-Royal","Province":"Quebec"},{"Code":24053,"Federal Electoral Districts":"Notre-Dame-de-Gr\u00e2ce\u2013Westmount","Province":"Quebec"},{"Code":24054,"Federal Electoral Districts":"Outremont","Province":"Quebec"},{"Code":24055,"Federal Electoral Districts":"Papineau","Province":"Quebec"},{"Code":24056,"Federal Electoral Districts":"Pierrefonds\u2013Dollard","Province":"Quebec"},{"Code":24057,"Federal Electoral Districts":"Pontiac","Province":"Quebec"},{"Code":24058,"Federal Electoral Districts":"Portneuf\u2013Jacques-Cartier","Province":"Quebec"},{"Code":24059,"Federal Electoral Districts":"Qu\u00e9bec","Province":"Quebec"},{"Code":24060,"Federal Electoral Districts":"Repentigny","Province":"Quebec"},{"Code":24061,"Federal Electoral Districts":"Richmond\u2013Arthabaska","Province":"Quebec"},{"Code":24062,"Federal Electoral Districts":"Rivi\u00e8re-des-Mille-\u00celes","Province":"Quebec"},{"Code":24063,"Federal Electoral Districts":"Rivi\u00e8re-du-Nord","Province":"Quebec"},{"Code":24064,"Federal Electoral Districts":"Rosemont\u2013La Petite-Patrie","Province":"Quebec"},{"Code":24065,"Federal Electoral Districts":"Marc-Aur\u00e8le-Fortin","Province":"Quebec"},{"Code":24066,"Federal Electoral Districts":"Saint-Hyacinthe\u2013Bagot","Province":"Quebec"},{"Code":24067,"Federal Electoral Districts":"Saint-Jean","Province":"Quebec"},{"Code":24068,"Federal Electoral Districts":"Saint-Laurent","Province":"Quebec"},{"Code":24069,"Federal Electoral Districts":"Saint-L\u00e9onard\u2013Saint-Michel","Province":"Quebec"},{"Code":24070,"Federal Electoral Districts":"Saint-Maurice\u2013Champlain","Province":"Quebec"},{"Code":24071,"Federal Electoral Districts":"Salaberry\u2013Suro\u00eet","Province":"Quebec"},{"Code":24072,"Federal Electoral Districts":"Shefford","Province":"Quebec"},{"Code":24073,"Federal Electoral Districts":"Sherbrooke","Province":"Quebec"},{"Code":24074,"Federal Electoral Districts":"Vaudreuil\u2013Soulanges","Province":"Quebec"},{"Code":24075,"Federal Electoral Districts":"Terrebonne","Province":"Quebec"},{"Code":24076,"Federal Electoral Districts":"Trois-Rivi\u00e8res","Province":"Quebec"},{"Code":24077,"Federal Electoral Districts":"Ville-Marie\u2013Le Sud-Ouest\u2013\u00cele-des-Soeurs","Province":"Quebec"},{"Code":24078,"Federal Electoral Districts":"Vimy","Province":"Quebec"},{"Code":35001,"Federal Electoral Districts":"Ajax","Province":"Ontario"},{"Code":35002,"Federal Electoral Districts":"Algoma\u2013Manitoulin\u2013Kapuskasing","Province":"Ontario"},{"Code":35003,"Federal Electoral Districts":"Aurora\u2013Oak Ridges\u2013Richmond Hill","Province":"Ontario"},{"Code":35004,"Federal Electoral Districts":"Barrie\u2013Innisfil","Province":"Ontario"},{"Code":35005,"Federal Electoral Districts":"Barrie\u2013Springwater\u2013Oro-Medonte","Province":"Ontario"},{"Code":35006,"Federal Electoral Districts":"Bay of Quinte","Province":"Ontario"},{"Code":35007,"Federal Electoral Districts":"Beaches\u2013East York","Province":"Ontario"},{"Code":35008,"Federal Electoral Districts":"Brampton Centre","Province":"Ontario"},{"Code":35009,"Federal Electoral Districts":"Brampton East","Province":"Ontario"},{"Code":35010,"Federal Electoral Districts":"Brampton North","Province":"Ontario"},{"Code":35011,"Federal Electoral Districts":"Brampton South","Province":"Ontario"},{"Code":35012,"Federal Electoral Districts":"Brampton West","Province":"Ontario"},{"Code":35013,"Federal Electoral Districts":"Brantford\u2013Brant","Province":"Ontario"},{"Code":35014,"Federal Electoral Districts":"Bruce\u2013Grey\u2013Owen Sound","Province":"Ontario"},{"Code":35015,"Federal Electoral Districts":"Burlington","Province":"Ontario"},{"Code":35016,"Federal Electoral Districts":"Cambridge","Province":"Ontario"},{"Code":35017,"Federal Electoral Districts":"Chatham-Kent\u2013Leamington","Province":"Ontario"},{"Code":35018,"Federal Electoral Districts":"Davenport","Province":"Ontario"},{"Code":35019,"Federal Electoral Districts":"Don Valley East","Province":"Ontario"},{"Code":35020,"Federal Electoral Districts":"Don Valley North","Province":"Ontario"},{"Code":35021,"Federal Electoral Districts":"Don Valley West","Province":"Ontario"},{"Code":35022,"Federal Electoral Districts":"Dufferin\u2013Caledon","Province":"Ontario"},{"Code":35023,"Federal Electoral Districts":"Durham","Province":"Ontario"},{"Code":35024,"Federal Electoral Districts":"Eglinton\u2013Lawrence","Province":"Ontario"},{"Code":35025,"Federal Electoral Districts":"Elgin\u2013Middlesex\u2013London","Province":"Ontario"},{"Code":35026,"Federal Electoral Districts":"Essex","Province":"Ontario"},{"Code":35027,"Federal Electoral Districts":"Etobicoke Centre","Province":"Ontario"},{"Code":35028,"Federal Electoral Districts":"Etobicoke\u2013Lakeshore","Province":"Ontario"},{"Code":35029,"Federal Electoral Districts":"Etobicoke North","Province":"Ontario"},{"Code":35030,"Federal Electoral Districts":"Flamborough\u2013Glanbrook","Province":"Ontario"},{"Code":35031,"Federal Electoral Districts":"Glengarry\u2013Prescott\u2013Russell","Province":"Ontario"},{"Code":35032,"Federal Electoral Districts":"Guelph","Province":"Ontario"},{"Code":35033,"Federal Electoral Districts":"Haldimand\u2013Norfolk","Province":"Ontario"},{"Code":35034,"Federal Electoral Districts":"Haliburton\u2013Kawartha Lakes\u2013Brock","Province":"Ontario"},{"Code":35035,"Federal Electoral Districts":"Hamilton Centre","Province":"Ontario"},{"Code":35036,"Federal Electoral Districts":"Hamilton East\u2013Stoney Creek","Province":"Ontario"},{"Code":35037,"Federal Electoral Districts":"Hamilton Mountain","Province":"Ontario"},{"Code":35038,"Federal Electoral Districts":"Hamilton West\u2013Ancaster\u2013Dundas","Province":"Ontario"},{"Code":35039,"Federal Electoral Districts":"Hastings\u2013Lennox and Addington","Province":"Ontario"},{"Code":35040,"Federal Electoral Districts":"Huron\u2013Bruce","Province":"Ontario"},{"Code":35041,"Federal Electoral Districts":"Kanata\u2013Carleton","Province":"Ontario"},{"Code":35042,"Federal Electoral Districts":"Kenora","Province":"Ontario"},{"Code":35043,"Federal Electoral Districts":"King\u2013Vaughan","Province":"Ontario"},{"Code":35044,"Federal Electoral Districts":"Kingston and the Islands","Province":"Ontario"},{"Code":35045,"Federal Electoral Districts":"Kitchener Centre","Province":"Ontario"},{"Code":35046,"Federal Electoral Districts":"Kitchener\u2013Conestoga","Province":"Ontario"},{"Code":35047,"Federal Electoral Districts":"Kitchener South\u2013Hespeler","Province":"Ontario"},{"Code":35048,"Federal Electoral Districts":"Lambton\u2013Kent\u2013Middlesex","Province":"Ontario"},{"Code":35049,"Federal Electoral Districts":"Lanark\u2013Frontenac\u2013Kingston","Province":"Ontario"},{"Code":35050,"Federal Electoral Districts":"Leeds\u2013Grenville\u2013Thousand Islands and Rideau Lakes","Province":"Ontario"},{"Code":35051,"Federal Electoral Districts":"London\u2013Fanshawe","Province":"Ontario"},{"Code":35052,"Federal Electoral Districts":"London North Centre","Province":"Ontario"},{"Code":35053,"Federal Electoral Districts":"London West","Province":"Ontario"},{"Code":35054,"Federal Electoral Districts":"Markham\u2013Stouffville","Province":"Ontario"},{"Code":35055,"Federal Electoral Districts":"Markham\u2013Thornhill","Province":"Ontario"},{"Code":35056,"Federal Electoral Districts":"Markham\u2013Unionville","Province":"Ontario"},{"Code":35057,"Federal Electoral Districts":"Milton","Province":"Ontario"},{"Code":35058,"Federal Electoral Districts":"Mississauga Centre","Province":"Ontario"},{"Code":35059,"Federal Electoral Districts":"Mississauga East\u2013Cooksville","Province":"Ontario"},{"Code":35060,"Federal Electoral Districts":"Mississauga\u2013Erin Mills","Province":"Ontario"},{"Code":35061,"Federal Electoral Districts":"Mississauga\u2013Lakeshore","Province":"Ontario"},{"Code":35062,"Federal Electoral Districts":"Mississauga\u2013Malton","Province":"Ontario"},{"Code":35063,"Federal Electoral Districts":"Mississauga\u2013Streetsville","Province":"Ontario"},{"Code":35064,"Federal Electoral Districts":"Nepean","Province":"Ontario"},{"Code":35065,"Federal Electoral Districts":"Newmarket\u2013Aurora","Province":"Ontario"},{"Code":35066,"Federal Electoral Districts":"Niagara Centre","Province":"Ontario"},{"Code":35067,"Federal Electoral Districts":"Niagara Falls","Province":"Ontario"},{"Code":35068,"Federal Electoral Districts":"Niagara West","Province":"Ontario"},{"Code":35069,"Federal Electoral Districts":"Nickel Belt","Province":"Ontario"},{"Code":35070,"Federal Electoral Districts":"Nipissing\u2013Timiskaming","Province":"Ontario"},{"Code":35071,"Federal Electoral Districts":"Northumberland\u2013Peterborough South","Province":"Ontario"},{"Code":35072,"Federal Electoral Districts":"Oakville","Province":"Ontario"},{"Code":35073,"Federal Electoral Districts":"Oakville North\u2013Burlington","Province":"Ontario"},{"Code":35074,"Federal Electoral Districts":"Oshawa","Province":"Ontario"},{"Code":35075,"Federal Electoral Districts":"Ottawa Centre","Province":"Ontario"},{"Code":35076,"Federal Electoral Districts":"Orl\u00e9ans","Province":"Ontario"},{"Code":35077,"Federal Electoral Districts":"Ottawa South","Province":"Ontario"},{"Code":35078,"Federal Electoral Districts":"Ottawa\u2013Vanier","Province":"Ontario"},{"Code":35079,"Federal Electoral Districts":"Ottawa West\u2013Nepean","Province":"Ontario"},{"Code":35080,"Federal Electoral Districts":"Oxford","Province":"Ontario"},{"Code":35081,"Federal Electoral Districts":"Parkdale\u2013High Park","Province":"Ontario"},{"Code":35082,"Federal Electoral Districts":"Parry Sound\u2013Muskoka","Province":"Ontario"},{"Code":35083,"Federal Electoral Districts":"Perth\u2013Wellington","Province":"Ontario"},{"Code":35084,"Federal Electoral Districts":"Peterborough\u2013Kawartha","Province":"Ontario"},{"Code":35085,"Federal Electoral Districts":"Pickering\u2013Uxbridge","Province":"Ontario"},{"Code":35086,"Federal Electoral Districts":"Renfrew\u2013Nipissing\u2013Pembroke","Province":"Ontario"},{"Code":35087,"Federal Electoral Districts":"Richmond Hill","Province":"Ontario"},{"Code":35088,"Federal Electoral Districts":"Carleton","Province":"Ontario"},{"Code":35089,"Federal Electoral Districts":"St. Catharines","Province":"Ontario"},{"Code":35090,"Federal Electoral Districts":"Toronto\u2013St. Paul's","Province":"Ontario"},{"Code":35091,"Federal Electoral Districts":"Sarnia\u2013Lambton","Province":"Ontario"},{"Code":35092,"Federal Electoral Districts":"Sault Ste. Marie","Province":"Ontario"},{"Code":35093,"Federal Electoral Districts":"Scarborough\u2013Agincourt","Province":"Ontario"},{"Code":35094,"Federal Electoral Districts":"Scarborough Centre","Province":"Ontario"},{"Code":35095,"Federal Electoral Districts":"Scarborough\u2013Guildwood","Province":"Ontario"},{"Code":35096,"Federal Electoral Districts":"Scarborough North","Province":"Ontario"},{"Code":35097,"Federal Electoral Districts":"Scarborough\u2013Rouge Park","Province":"Ontario"},{"Code":35098,"Federal Electoral Districts":"Scarborough Southwest","Province":"Ontario"},{"Code":35099,"Federal Electoral Districts":"Simcoe\u2013Grey","Province":"Ontario"},{"Code":35100,"Federal Electoral Districts":"Simcoe North","Province":"Ontario"},{"Code":35101,"Federal Electoral Districts":"Spadina\u2013Fort York","Province":"Ontario"},{"Code":35102,"Federal Electoral Districts":"Stormont\u2013Dundas\u2013South Glengarry","Province":"Ontario"},{"Code":35103,"Federal Electoral Districts":"Sudbury","Province":"Ontario"},{"Code":35104,"Federal Electoral Districts":"Thornhill","Province":"Ontario"},{"Code":35105,"Federal Electoral Districts":"Thunder Bay\u2013Rainy River","Province":"Ontario"},{"Code":35106,"Federal Electoral Districts":"Thunder Bay\u2013Superior North","Province":"Ontario"},{"Code":35107,"Federal Electoral Districts":"Timmins\u2013James Bay","Province":"Ontario"},{"Code":35108,"Federal Electoral Districts":"Toronto Centre","Province":"Ontario"},{"Code":35109,"Federal Electoral Districts":"Toronto\u2013Danforth","Province":"Ontario"},{"Code":35110,"Federal Electoral Districts":"University\u2013Rosedale","Province":"Ontario"},{"Code":35111,"Federal Electoral Districts":"Vaughan\u2013Woodbridge","Province":"Ontario"},{"Code":35112,"Federal Electoral Districts":"Waterloo","Province":"Ontario"},{"Code":35113,"Federal Electoral Districts":"Wellington\u2013Halton Hills","Province":"Ontario"},{"Code":35114,"Federal Electoral Districts":"Whitby","Province":"Ontario"},{"Code":35115,"Federal Electoral Districts":"Willowdale","Province":"Ontario"},{"Code":35116,"Federal Electoral Districts":"Windsor\u2013Tecumseh","Province":"Ontario"},{"Code":35117,"Federal Electoral Districts":"Windsor West","Province":"Ontario"},{"Code":35118,"Federal Electoral Districts":"York Centre","Province":"Ontario"},{"Code":35119,"Federal Electoral Districts":"York\u2013Simcoe","Province":"Ontario"},{"Code":35120,"Federal Electoral Districts":"York South\u2013Weston","Province":"Ontario"},{"Code":35121,"Federal Electoral Districts":"Humber River\u2013Black Creek","Province":"Ontario"},{"Code":46001,"Federal Electoral Districts":"Brandon\u2013Souris","Province":"Manitoba"},{"Code":46002,"Federal Electoral Districts":"Charleswood\u2013St. James\u2013Assiniboia\u2013Headingley","Province":"Manitoba"},{"Code":46003,"Federal Electoral Districts":"Churchill\u2013Keewatinook Aski","Province":"Manitoba"},{"Code":46004,"Federal Electoral Districts":"Dauphin\u2013Swan River\u2013Neepawa","Province":"Manitoba"},{"Code":46005,"Federal Electoral Districts":"Elmwood\u2013Transcona","Province":"Manitoba"},{"Code":46006,"Federal Electoral Districts":"Kildonan\u2013St. Paul","Province":"Manitoba"},{"Code":46007,"Federal Electoral Districts":"Portage\u2013Lisgar","Province":"Manitoba"},{"Code":46008,"Federal Electoral Districts":"Provencher","Province":"Manitoba"},{"Code":46009,"Federal Electoral Districts":"Saint Boniface\u2013Saint Vital","Province":"Manitoba"},{"Code":46010,"Federal Electoral Districts":"Selkirk\u2013Interlake\u2013Eastman","Province":"Manitoba"},{"Code":46011,"Federal Electoral Districts":"Winnipeg Centre","Province":"Manitoba"},{"Code":46012,"Federal Electoral Districts":"Winnipeg North","Province":"Manitoba"},{"Code":46013,"Federal Electoral Districts":"Winnipeg South","Province":"Manitoba"},{"Code":46014,"Federal Electoral Districts":"Winnipeg South Centre","Province":"Manitoba"},{"Code":47001,"Federal Electoral Districts":"Battlefords\u2013Lloydminster","Province":"Saskatchewan"},{"Code":47002,"Federal Electoral Districts":"Cypress Hills\u2013Grasslands","Province":"Saskatchewan"},{"Code":47003,"Federal Electoral Districts":"Desneth\u00e9\u2013Missinippi\u2013Churchill River","Province":"Saskatchewan"},{"Code":47004,"Federal Electoral Districts":"Carlton Trail\u2013Eagle Creek","Province":"Saskatchewan"},{"Code":47005,"Federal Electoral Districts":"Moose Jaw\u2013Lake Centre\u2013Lanigan","Province":"Saskatchewan"},{"Code":47006,"Federal Electoral Districts":"Prince Albert\u00a0","Province":"Saskatchewan"},{"Code":47007,"Federal Electoral Districts":"Regina\u2013Lewvan","Province":"Saskatchewan"},{"Code":47008,"Federal Electoral Districts":"Regina\u2013Qu'Appelle\u00a0","Province":"Saskatchewan"},{"Code":47009,"Federal Electoral Districts":"Regina\u2013Wascana\u00a0","Province":"Saskatchewan"},{"Code":47010,"Federal Electoral Districts":"Saskatoon\u2013Grasswood","Province":"Saskatchewan"},{"Code":47011,"Federal Electoral Districts":"Saskatoon\u2013University","Province":"Saskatchewan"},{"Code":47012,"Federal Electoral Districts":"Saskatoon West","Province":"Saskatchewan"},{"Code":47013,"Federal Electoral Districts":"Souris\u2013Moose Mountain\u00a0","Province":"Saskatchewan"},{"Code":47014,"Federal Electoral Districts":"Yorkton\u2013Melville\u00a0","Province":"Saskatchewan"},{"Code":48001,"Federal Electoral Districts":"Banff\u2013Airdrie","Province":"Alberta"},{"Code":48002,"Federal Electoral Districts":"Battle River\u2013Crowfoot","Province":"Alberta"},{"Code":48003,"Federal Electoral Districts":"Bow River","Province":"Alberta"},{"Code":48004,"Federal Electoral Districts":"Calgary Centre","Province":"Alberta"},{"Code":48005,"Federal Electoral Districts":"Calgary Confederation","Province":"Alberta"},{"Code":48006,"Federal Electoral Districts":"Calgary Forest Lawn","Province":"Alberta"},{"Code":48007,"Federal Electoral Districts":"Calgary Heritage","Province":"Alberta"},{"Code":48008,"Federal Electoral Districts":"Calgary Midnapore","Province":"Alberta"},{"Code":48009,"Federal Electoral Districts":"Calgary Nose Hill","Province":"Alberta"},{"Code":48010,"Federal Electoral Districts":"Calgary Rocky Ridge","Province":"Alberta"},{"Code":48011,"Federal Electoral Districts":"Calgary Shepard","Province":"Alberta"},{"Code":48012,"Federal Electoral Districts":"Calgary Signal Hill","Province":"Alberta"},{"Code":48013,"Federal Electoral Districts":"Calgary Skyview","Province":"Alberta"},{"Code":48014,"Federal Electoral Districts":"Edmonton Centre","Province":"Alberta"},{"Code":48015,"Federal Electoral Districts":"Edmonton Griesbach","Province":"Alberta"},{"Code":48016,"Federal Electoral Districts":"Edmonton Manning","Province":"Alberta"},{"Code":48017,"Federal Electoral Districts":"Edmonton Mill Woods","Province":"Alberta"},{"Code":48018,"Federal Electoral Districts":"Edmonton Riverbend","Province":"Alberta"},{"Code":48019,"Federal Electoral Districts":"Edmonton Strathcona","Province":"Alberta"},{"Code":48020,"Federal Electoral Districts":"Edmonton West","Province":"Alberta"},{"Code":48021,"Federal Electoral Districts":"Edmonton\u2013Wetaskiwin","Province":"Alberta"},{"Code":48022,"Federal Electoral Districts":"Foothills","Province":"Alberta"},{"Code":48023,"Federal Electoral Districts":"Fort McMurray\u2013Cold Lake","Province":"Alberta"},{"Code":48024,"Federal Electoral Districts":"Grande Prairie\u2013Mackenzie","Province":"Alberta"},{"Code":48025,"Federal Electoral Districts":"Lakeland","Province":"Alberta"},{"Code":48026,"Federal Electoral Districts":"Lethbridge","Province":"Alberta"},{"Code":48027,"Federal Electoral Districts":"Medicine Hat\u2013Cardston\u2013Warner","Province":"Alberta"},{"Code":48028,"Federal Electoral Districts":"Peace River\u2013Westlock","Province":"Alberta"},{"Code":48029,"Federal Electoral Districts":"Red Deer\u2013Mountain View","Province":"Alberta"},{"Code":48030,"Federal Electoral Districts":"Red Deer\u2013Lacombe","Province":"Alberta"},{"Code":48031,"Federal Electoral Districts":"St. Albert\u2013Edmonton","Province":"Alberta"},{"Code":48032,"Federal Electoral Districts":"Sherwood Park\u2013Fort Saskatchewan","Province":"Alberta"},{"Code":48033,"Federal Electoral Districts":"Sturgeon River\u2013Parkland","Province":"Alberta"},{"Code":48034,"Federal Electoral Districts":"Yellowhead","Province":"Alberta"},{"Code":59001,"Federal Electoral Districts":"Abbotsford","Province":"British Columbia"},{"Code":59002,"Federal Electoral Districts":"Burnaby North\u2013Seymour","Province":"British Columbia"},{"Code":59003,"Federal Electoral Districts":"Burnaby South","Province":"British Columbia"},{"Code":59004,"Federal Electoral Districts":"Cariboo\u2013Prince George","Province":"British Columbia"},{"Code":59005,"Federal Electoral Districts":"Central Okanagan\u2013Similkameen\u2013Nicola","Province":"British Columbia"},{"Code":59006,"Federal Electoral Districts":"Chilliwack\u2013Hope","Province":"British Columbia"},{"Code":59007,"Federal Electoral Districts":"Cloverdale\u2013Langley City","Province":"British Columbia"},{"Code":59008,"Federal Electoral Districts":"Coquitlam\u2013Port Coquitlam","Province":"British Columbia"},{"Code":59009,"Federal Electoral Districts":"Courtenay\u2013Alberni","Province":"British Columbia"},{"Code":59010,"Federal Electoral Districts":"Cowichan\u2013Malahat\u2013Langford","Province":"British Columbia"},{"Code":59011,"Federal Electoral Districts":"Delta","Province":"British Columbia"},{"Code":59012,"Federal Electoral Districts":"Fleetwood\u2013Port Kells","Province":"British Columbia"},{"Code":59013,"Federal Electoral Districts":"Kamloops\u2013Thompson\u2013Cariboo","Province":"British Columbia"},{"Code":59014,"Federal Electoral Districts":"Kelowna\u2013Lake Country","Province":"British Columbia"},{"Code":59015,"Federal Electoral Districts":"Kootenay\u2013Columbia","Province":"British Columbia"},{"Code":59016,"Federal Electoral Districts":"Langley\u2013Aldergrove","Province":"British Columbia"},{"Code":59017,"Federal Electoral Districts":"Mission\u2013Matsqui\u2013Fraser Canyon","Province":"British Columbia"},{"Code":59018,"Federal Electoral Districts":"Nanaimo\u2013Ladysmith","Province":"British Columbia"},{"Code":59019,"Federal Electoral Districts":"New Westminster\u2013Burnaby","Province":"British Columbia"},{"Code":59020,"Federal Electoral Districts":"North Okanagan\u2013Shuswap","Province":"British Columbia"},{"Code":59021,"Federal Electoral Districts":"North Vancouver","Province":"British Columbia"},{"Code":59022,"Federal Electoral Districts":"Pitt Meadows\u2013Maple Ridge","Province":"British Columbia"},{"Code":59023,"Federal Electoral Districts":"Port Moody\u2013Coquitlam","Province":"British Columbia"},{"Code":59024,"Federal Electoral Districts":"Prince George\u2013Peace River\u2013Northern Rockies","Province":"British Columbia"},{"Code":59025,"Federal Electoral Districts":"Richmond Centre","Province":"British Columbia"},{"Code":59026,"Federal Electoral Districts":"Esquimalt\u2013Saanich\u2013Sooke","Province":"British Columbia"},{"Code":59027,"Federal Electoral Districts":"Saanich\u2013Gulf Islands","Province":"British Columbia"},{"Code":59028,"Federal Electoral Districts":"Skeena\u2013Bulkley Valley","Province":"British Columbia"},{"Code":59029,"Federal Electoral Districts":"South Okanagan\u2013West Kootenay","Province":"British Columbia"},{"Code":59030,"Federal Electoral Districts":"South Surrey\u2013White Rock","Province":"British Columbia"},{"Code":59031,"Federal Electoral Districts":"Steveston\u2013Richmond East","Province":"British Columbia"},{"Code":59032,"Federal Electoral Districts":"Surrey Centre","Province":"British Columbia"},{"Code":59033,"Federal Electoral Districts":"Surrey\u2013Newton","Province":"British Columbia"},{"Code":59034,"Federal Electoral Districts":"Vancouver Centre","Province":"British Columbia"},{"Code":59035,"Federal Electoral Districts":"Vancouver East","Province":"British Columbia"},{"Code":59036,"Federal Electoral Districts":"Vancouver Granville","Province":"British Columbia"},{"Code":59037,"Federal Electoral Districts":"North Island\u2013Powell River","Province":"British Columbia"},{"Code":59038,"Federal Electoral Districts":"Vancouver Kingsway","Province":"British Columbia"},{"Code":59039,"Federal Electoral Districts":"Vancouver Quadra","Province":"British Columbia"},{"Code":59040,"Federal Electoral Districts":"Vancouver South","Province":"British Columbia"},{"Code":59041,"Federal Electoral Districts":"Victoria","Province":"British Columbia"},{"Code":59042,"Federal Electoral Districts":"West Vancouver\u2013Sunshine Coast\u2013Sea to Sky Country","Province":"British Columbia"},{"Code":60001,"Federal Electoral Districts":"Yukon","Province":"Yukon"},{"Code":61001,"Federal Electoral Districts":"Northwest Territories","Province":"Northwest Territories"},{"Code":62001,"Federal Electoral Districts":"Nunavut","Province":"Nunavut"}]
    console.log('dda',this.data)

  this.Province=_.uniqBy(this.data,'Province');
    console.log("new uniq data",this.Province)
  
  }
  getcity(item){
    console.log("fff",item)
this.cityvalue=this.data.filter(function(e){ return e.Province==item})
console.log("new city data",this.cityvalue)

  }
  getdata(e){
    console.log("eeeeeeeeeeee",e)
    var obj;
    // this.getJSON().subscribe(data => obj=data, error => console.log(error));

  this.getJson(e);

  }

  public getJson(id){
    this.http.get('./assets/'+id+'.json').subscribe(
   (data)=>{
    this.JsonData = data;
    this.JsonDataCopy=this.JsonData ;
    console.log("data new ",this.JsonData._body)
   var uniqdata= _.uniqBy(JSON.parse(this.JsonData._body),'Candidate Name','Color Code','Political Affiliation');
   console.log("uniqdata",uniqdata);
   
   for(var i=0;i<uniqdata.length;i++){
    // this.PollingStationNumber.push(this.result[i]['Polling Station Number'])
     let candidatename="candidatename"+i.toString();
     var Obj={
      candidatename:uniqdata[i]['Candidate Name']
     }
    // candidatename + i ;
    // candidatename= uniqdata[i]['Candidate Name'];
    this.array.push({candidatename:uniqdata[i]['Candidate Name'],
    colorcode:uniqdata[i]['Color Code'],
    PoliticalAffiliation:uniqdata[i]['Political Affiliation']})
   }
   console.log("array",this.array)
   } ,
    error => console.error('There was an error!', error)
)
  }

  getdatachanged(type){
    var JsonData=[];
    if(type=="Normal"){
      JsonData =JSON.parse(this.JsonData._body).filter((e)=>e['Polling Station Number'] <=599)
      console.log('Normal',JsonData);
this.forloopdata(JsonData);
    }else if(type=="Advance Polls"){
      JsonData =JSON.parse(this.JsonData._body).filter((e)=>e['Polling Station Number'] >=600 && e['Polling Station Number'] <=699)
      console.log('Advance Polls',JsonData)
this.forloopdata(JsonData);

    }else if(type=="Groups"){
      JsonData =JSON.parse(this.JsonData._body).filter((e)=>e['Polling Station Number'] ==800 || e['Polling Station Number'] ==801)
      console.log('Groups',JsonData)
this.forloopdata(JsonData);

    }
  }


  forloopdata(data){
console.log("data",data)
var User=[];
var newPollnumber=[];
for(var i=0;i<this.array.length;i++){
var newpollno=[];

  for(var j=0;j<data.length;j++){
    // if(data[j]['Candidate Name']==this.array[i].candidatename){
    if(data[j]['Political Affiliation']==this.array[i].PoliticalAffiliation){

      // newpollno.push(data[j]['Polling Station Number'])
      newpollno.push(data[j].Votes)
      // newpollno.push(data[j]['Total Votes'])
}
newPollnumber.push(data[j]['Polling Station Number'])

  }
User.push({data:newpollno,label:this.array[i].PoliticalAffiliation,backgroundColor:this.array[i].colorcode})
}

console.log("filter dta",User,newPollnumber.sort());

// this.getFirstgraphbinding(User,newPollnumber)

this.getFirstgraphbinding(User,newPollnumber)
this.newfilterArray=User;
  }
  getFirstgraphbinding(parameterValue,PollingStationNumber){
    this.showtime=true;
    console.log("graph data","parameterValue",parameterValue,"PollingStationNumber",PollingStationNumber)
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
    console.log('pggg',_.uniq(PollingStationNumber))
         
    
}
  
// onsave(){

// }
// getcancel(){

// }



onsave() {
        
  //   if (!this.forgotpasswordForm.invalid) {
  var a = this.forgotpasswordForm.value.voterstype;
  var b = this.forgotpasswordForm.value.topandbottom;
  var c = this.forgotpasswordForm.value.values;
  var topbotmdata = [];
  var dataBody=JSON.parse(this.JsonData._body);
  console.log('a', a, 'b', b, 'c', c,'this.JsonData',this.JsonData._body)
  
  if (a == "Total_Votes") {

      if (b == "Bottom") {
          for(var i=0;i<dataBody.length;i++){
           console.log( "sorted data bottom ",dataBody.sort((p, q) => p['Total Votes'] - q['Total Votes']))
           topbotmdata=dataBody.sort((p, q) => p['Total Votes'] - q['Total Votes']);
          }

      } else {
            topbotmdata=dataBody.sort((p, q) => q['Total Votes'] - p['Total Votes']);
      }
      this.result=[];
      this.result = _.take(topbotmdata, c)
      console.log(' Electors top or botton data', this.result)
      this.forloopdata(this.result)
      
  } else if (a == "Electors") {
      if (b == "Bottom") {
          topbotmdata=dataBody.sort((p, q) => p.Electors - q.Electors);
      } else {
          topbotmdata=dataBody.sort((p, q) => q.Electors - p.Electors)
      }
      this.result=[];
      this.result = _.take(topbotmdata, c)
      console.log(' Electors top or botton data', this.result)
      this.forloopdata(this.result)
  }

}
getcancel() {
  // this.show=true;
  // this.hide=false;
  // console.log('cancel fnctn')
  // this.getFirstgraph();

}
}
