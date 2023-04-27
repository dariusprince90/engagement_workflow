import faker from '@faker-js/faker';

import SORT_DIRECTION from '../enums/sortDirection';
import PmArray from './PmArray';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('PmArray', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('instance methods', () => {
    describe('filterUniqueObjects', () => {
      it('filters the array down to unique objects based on the values of a single property', () => {
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const obj1 = { prop1: faker.random.alphaNumeric(10), prop2: faker.random.alphaNumeric(10) };
        const obj2 = { prop1: faker.random.alphaNumeric(10), prop2: faker.random.alphaNumeric(10) };
        const obj1Coll = [...Array(itemCount).keys()].map(() => ({ ...obj1 }));
        const obj2Coll = [...Array(itemCount).keys()].map(() => ({ ...obj2 }));
        const source = new PmArray(...[...obj1Coll, ...obj2Coll]);
        const expected = [{ prop1: obj1.prop1 }, { prop1: obj2.prop1 }];
        const actual = source.filterUniqueObjects(['prop1']);
        expect(actual).toEqual(expected);
      });

      it('filters the array down to unique objects based on the values of a multiple properties', () => {
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const prop1Value = faker.random.alphaNumeric(10);
        const obj1 = { prop1: prop1Value, prop2: faker.random.alphaNumeric(10), prop3: faker.random.alphaNumeric(10) };
        const obj2 = { prop1: prop1Value, prop2: faker.random.alphaNumeric(10), prop3: faker.random.alphaNumeric(10) };
        const obj3 = { prop1: faker.random.alphaNumeric(10), prop2: faker.random.alphaNumeric(10) };
        const obj1Coll = [...Array(itemCount).keys()].map(() => ({ ...obj1 }));
        const obj2Coll = [...Array(itemCount).keys()].map(() => ({ ...obj2 }));
        const obj3Coll = [...Array(itemCount).keys()].map(() => ({ ...obj3 }));
        const source = new PmArray(...[...obj1Coll, ...obj2Coll, ...obj3Coll]);
        const expected = [
          { prop1: obj1.prop1, prop2: obj1.prop2 },
          { prop1: obj2.prop1, prop2: obj2.prop2 },
          { prop1: obj3.prop1, prop2: obj3.prop2 }
        ];
        const actual = source.filterUniqueObjects(['prop1', 'prop2']);
        expect(actual).toEqual(expected);
      });
    });

    describe('sortObjects', () => {
      it('sorts the objects in the array by the values of a given property - ascending', () => {
        const item4 = { prop1: 'ccc', prop2: 'xxx' };
        const item2 = { prop1: 'bbb', prop2: 'yyy' };
        const item1 = { prop1: 'aaa', prop2: 'zzz' };
        const item3 = { prop1: 'bbb', prop2: 'yyy' };
        const source = new PmArray(item4, item2, item1, item3);
        const expected = new PmArray(item1, item2, item3, item4);
        const actual = source.sortObjects('prop1', SORT_DIRECTION.ascending.abbreviation);
        expect(actual).toEqual(expected);
      });

      it('sorts the objects in the array by the values of a given property - descending', () => {
        const item2 = { prop1: 'bbb', prop2: 'yyy' };
        const item1 = { prop1: 'ccc', prop2: 'xxx' };
        const item4 = { prop1: 'aaa', prop2: 'zzz' };
        const item3 = { prop1: 'bbb', prop2: 'yyy' };
        const source = new PmArray(item2, item1, item4, item3);
        const expected = new PmArray(item1, item2, item3, item4);
        const actual = source.sortObjects('prop1', SORT_DIRECTION.descending.abbreviation);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('static methods', () => {
    describe('fromRange', () => {
      it('creates an array with correct items', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const min = faker.datatype.number();
        const max = min + itemCount - 1;

        // * ACT
        const actual = PmArray.fromRange(min, max);

        // * ASSERT
        // ensure correct item count
        expect(actual).toHaveLength(itemCount);

        // ensure correct items
        for (let ix = 0; ix < actual.length; ix++) {
          expect(actual[ix]).toBe(min + ix);
        }
      });

      it('sets min to 1 and max to min when max is undefined', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const min = itemCount;

        // * ACT
        const actual = PmArray.fromRange(min);

        // * ASSERT
        // ensure correct item count
        expect(actual).toHaveLength(itemCount);

        // ensure correct items
        for (let ix = 0; ix < actual.length; ix++) {
          expect(actual[ix]).toBe(ix + 1);
        }
      });

      it('swaps min and max when min is greater than max', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const max = faker.datatype.number();
        const min = max + itemCount - 1;

        // * ACT
        const actual = PmArray.fromRange(min, max);

        // * ASSERT
        // ensure correct item count
        expect(actual).toHaveLength(itemCount);

        // ensure correct items
        for (let ix = 0; ix < actual.length; ix++) {
          expect(actual[ix]).toBe(max + ix);
        }
      });
    });
  });
});
