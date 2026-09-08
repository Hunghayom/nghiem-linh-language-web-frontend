import { HanziWriter } from './hanzi-writer';

describe('HanziWriter', () => {
  it('should create an instance', () => {
    const directive = new HanziWriter();
    expect(directive).toBeTruthy();
  });
});
