export interface ILoginer {
	email: string;
	password: string;
}

export interface ILoginerResponse {
	name: string;
	email: string;
	pic: string;
}

export interface INewUser {
	name: string;
	email: string;
	code: string;
	password: string;
} 

export interface IRegisterResponse {

}

export interface IVerifyResponse {
	
}