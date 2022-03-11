import { IToyCard } from './IToyCard';

export type StateObject = {
  [key: string]: string | any;
};

export interface IUseState {
  stDriver: StateDriver;
}

export interface IFolower {
  updateFolower(): void;
}

class StateStruct {
  [identifer: string]: StateObject;
  constructor(identifer: string, stateData: StateObject) {
    this[identifer] = { ...stateData };
  }
}
//[{identifer:{keyStr:valueStr}}]

export abstract class AbstractStateFolower {
  abstract updateFolower(): void;
}

export class StateDriver {
  private static states: StateStruct = {};
  public static folowers: Array<AbstractStateFolower> = [];

  static get stateInteractor(): any {
    // console.log('container getter trigerred');
    return StateDriver.states;
  }
  static set stateInteractor({ identifer, values }) {
    StateDriver.states[identifer] = { ...values };
    StateDriver.notify();
  }
  constructor() {
    //
  }

  static getAllStates() {
    return StateDriver.states;
  }

  checkStateIdentifer(recivedIfentifer: string): boolean {
    return Object.keys(StateDriver.states).includes(recivedIfentifer);
  }

  addState(recivedIfentifer: string, recivedValues: StateObject) {
    if (this.checkStateIdentifer(recivedIfentifer) === true) {
      throw new Error(
        `Try to add state with already used identifer ${recivedIfentifer}`
      );
      // console.log(`Warning - identifer ${} already exists!`)
    }
    Object.defineProperty(StateDriver.states, recivedIfentifer, {
      value: { ...recivedValues },
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }

  setState(identifer: string, values: StateObject) {
    if (this.checkStateIdentifer(identifer) === false) {
      throw new Error(
        `Cant SET ${identifer} state because identifer unexisted`
      );
    }
    // StateDriver.states[identifer] = { ...values };
    StateDriver.stateInteractor = { identifer: identifer, values: values };
  }

  getState(identifer: string) {
    if (this.checkStateIdentifer(identifer) === false) {
      throw new Error(
        `Cant GET ${identifer} state because identifer unexisted`
      );
    }
    return StateDriver.stateInteractor[identifer];
  }

  deleteState(identifer: string) {
    if (this.checkStateIdentifer(identifer) === false) {
      throw new Error(
        `Cant DELETE ${identifer} state because identifer unexisted`
      );
    }
    delete StateDriver.states[identifer];
    // console.log(`state>${StateDriver.getAllStates}`);
  }

  subscribeToState(recivedThis: any) {
    StateDriver.folowers.push(recivedThis);
  }

  static notify() {
    for (const currentFolower of StateDriver.folowers) {
      currentFolower.updateFolower();
    }
  }
}
