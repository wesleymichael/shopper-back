export interface ProductInputUpdate {
  code: number;
  sales_price: number;
}

export interface Product extends ProductInputUpdate {
  name: string;
  cost_price: number;
}

export interface ProductInputValidate {
  product_code: number;
  new_price: number;
}

export class ProductOutput {
  private _code: number;
  private _name: string;
  private _current_price: number;
  private _new_price: number;
  private _error: string[];

  constructor({
    code = 0,
    name = '',
    current_price = 0,
    new_price = 0,
    error = [],
  }: {
    code?: number;
    name?: string;
    current_price?: number;
    new_price?: number;
    error?: string[];
  } = {}) {
    this._code = code;
    this._name = name;
    this._current_price = current_price;
    this._new_price = new_price;
    this._error = error;
  }

  get code(): number {
    return this._code;
  }

  set code(value: number) {
    this._code = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get current_price(): number {
    return this._current_price;
  }

  set current_price(value: number) {
    this._current_price = value;
  }

  get new_price(): number {
    return this._new_price;
  }

  set new_price(value: number) {
    this._new_price = value;
  }

  get error(): string[] {
    return this._error;
  }

  // set error(value: string | string[]) {
  //   if (typeof value === 'string') {
  //     this._error.push(value);
  //   } else if (Array.isArray(value)) {
  //     this._error.push(...value);
  //   }
  // }
}
