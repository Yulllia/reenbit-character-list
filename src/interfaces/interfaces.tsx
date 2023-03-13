import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

export interface ICard {
  id: number;
  gender: string;
  name: string;
  image: string;
  species: string;
  status: string;
  type: string;
  origin: IPlanet;
}

export interface CardList {
    results: Array<ICard>
}

export const isGoogleLoginResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline): 
response is GoogleLoginResponse => { 
  return !!response && 
         typeof response === 'object' && 
         !!(response as GoogleLoginResponse).tokenObj;
};

export const isFacebookLoginResponse = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): 
response is ReactFacebookLoginInfo => { 
  return !!response && 
         typeof response === 'object' && 
         !!(response as ReactFacebookLoginInfo).name;
};

interface IPlanet {
  name: string;
  url: string;
}

export type Character = {
    character: ICard
}

export type onEnterFunction = {
    onEnter: (searchWord: string)=>void
}
