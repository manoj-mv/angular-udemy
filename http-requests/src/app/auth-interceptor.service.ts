import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";



export class AuthInterceporService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next: HttpHandler){
        const modifiedReq = req.clone(
            {
                headers: req.headers.append('authKey','keyVal'),
            }
        );
        return next.handle(modifiedReq);
    }
}