export interface IUnitTesting {
  sampleResource: any;
}

declare global {
  // eslint-disable-next-line no-var
  var UnitTesting: IUnitTesting;
}
