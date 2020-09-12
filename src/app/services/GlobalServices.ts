import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs/Rx';
@Injectable()
export class GlobalService {
    public base_path: string;
    public headers: Headers;
    public requestoptions: RequestOptions;
    constructor(public http: Http, public router: Router) {
        // this.root = location.href.split("#/");
    //    this.base_path = "http://localhost:8000/";
       this.base_path="https://election-new.herokuapp.com/";
        // this.base_path = 'http://172.16.1.51:8001/';
    }

    public base_path_api() {
        return this.base_path + 'api/';
    }

    public base_path_api_url() {
        return this.base_path;
    }
     /*google*/

     public GetRequest(url: string): any {

        return this.http.request(new Request(this.getRequsetOptions(url)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    jsonObj = null;
                }
                else if (res.status === 500) {
                    jsonObj = null;
                }
                else if (res.status !== 204) {
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status == 401) {
                    // this.router.navigateByUrl('/login');
                    // localStorage.clear();
                }
                if (error.status === 403 || error.status === 500 || error.status === 401 || error.status === 400 || error.status === 409 || error.status === 404) {
                    return Observable.throw(error);
                } else {
                    return Observable.throw(error);
                }
            });
    }


    public getRequsetOptions(url: string): RequestOptions {
        if (localStorage.getItem('access_token')) {
            this.headers = new Headers();
            this.headers.append("Access-Control-Allow-Origin","*")
            this.headers.append("Content-Type", "application/json");
            this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('access_token'));
        }
        // else {
        //     this.router.navigateByUrl('/home');
        // }

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: this.headers
        });
        return this.requestoptions;
    }




    public PostRequest(url: string, data: any): any {
        this.headers = new Headers();
        this.headers.append("Access-Control-Allow-Origin","*")
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('access_token'));

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: this.headers,
            body: JSON.stringify(data)

        })

        return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                // console.log(res, "Mapping");
                if (res.status === 201) {
                    return [{ status: res.status, json: res.json() }]
                }
                else if (res.status === 205) {
                    return [{ status: res.status, json: res.json() }]
                }
                else if (res.status === 200) {
                    return [{ status: res.status, json: res.json() }]
                }
                else if (res.status === 400) {
                    return [{ status: res.status, json: res.json() }]
                }

            })
            .catch((error: any) => {
                if (error.status == 401) {
                    return Observable.throw(error);
                    // localStorage.clear();
                    // this.router.navigateByUrl('/home/login');
                }
                // console.log(error, "Error");
                if (error.status === 500) {
                    return Observable.throw(error);
                }
                else if (error.status === 400) {
                    return Observable.throw(error);
                }
                else if (error.status === 409) {
                    return Observable.throw(error);
                }
                else if (error.status === 406) {
                    return Observable.throw(error);
                }
                else if (error.status === 404) {
                    return Observable.throw(error);
                }
                else if (error.status === 403) {
                    return Observable.throw(error);
                }
            });

    }
}
