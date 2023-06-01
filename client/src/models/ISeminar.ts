export interface IResponse<T> {
  data: T[];
  count: number;
}

export interface IFutureSeminar {
  id: string;
  date: string;
  seminar: ISeminar;
  user: IUser;
}

export interface ISeminar {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  phone: string;
  name: string;
  lastName: string;
  secondName: string;
  firmName: string;
}
