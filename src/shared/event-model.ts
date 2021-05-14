export class EventModel {
  id: number;
  name: string;
  date: string;
  pictureURL: string;
  description: string;
  tickets: {[key: string]: string};

  constructor(param?: EventModel) {
    if (param) {
      Object.assign(this, param);

      const $idPropertyDescriptior = Object.getOwnPropertyDescriptor(this, 'id');
      $idPropertyDescriptior.enumerable = false;
      Object.defineProperty(this, 'id', $idPropertyDescriptior);
    }
  }

}
