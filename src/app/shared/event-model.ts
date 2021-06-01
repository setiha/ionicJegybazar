export class EventModel {
  id: any;
  name: string;
  date: string;
  pictureURL: string;
  description: string;
  tickets?: { [key: string]: string };
  key: string;

  constructor(param?: EventModel) {
    if (param) {
      Object.assign(this, param);
      if (!this.id) {
        this.id = param.key
      }
      const $idPropertyDescriptior = Object.getOwnPropertyDescriptor(this, 'id');
      $idPropertyDescriptior.enumerable = false;
      Object.defineProperty(this, 'id', $idPropertyDescriptior);
    }
  }

}
