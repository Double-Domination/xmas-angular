export class ChosenToysList {
  chosenToysList: Array<string>;
  constructor() {
    this.chosenToysList = [
      // 'Красный шар с звёздами',
      // 'Шишка еловая золотая',
      // 'Красный шар с бантом',
      // 'Желтый шар с бантом',
      // 'Шишка расписная',
    ];
  }

  checkExist(recivedCardNameIdentifer: string) {
    if (this.chosenToysList.includes(recivedCardNameIdentifer)) {
      return true;
    } else {
      return false;
    }
  }

  toggleChosen(recivedCardNameIdentifer: string) {
    if (this.chosenToysList.length >= 20) {
      alert('maximum chosen limit[20] is reached. Remove something first');
    } else if (this.checkExist(recivedCardNameIdentifer) === true) {
      const pos = this.chosenToysList.indexOf(recivedCardNameIdentifer);
      this.chosenToysList.splice(pos, 1);
    } else if (this.checkExist(recivedCardNameIdentifer) === false)
      this.chosenToysList.push(recivedCardNameIdentifer);
  }
}
