export class loginDataModel {
  email: string;
  password: string;
  meta?: object;

  constructor(meta?: object) {
    if (meta) {
      this.meta = meta;
    }
  }
}
