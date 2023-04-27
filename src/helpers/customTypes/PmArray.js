import SORT_DIRECTION from '../enums/sortDirection';

/**
 * ! Modifying the built-in object prototypes is not a good idea because it always has the potential to clash
 * ! with code from other vendors or libraries (along with many other reasons).
 *
 * Create a new array type that extends array and allows us to add additional "extension" methods without affecting
 * the original Array type.
 */
class PmArray extends Array {
  // **********************************************************************
  // * instance methods

  /**
   * Given a set of property names, filters the array of objects down to an array of unique objects containing only the given property names.
   * @param {Array} propertyNames - Array of property names used in the uniqueness comparison.
   * @returns A PmArray containing unique objects. Each object will only have the properties specified in propertyNames.
   */
  filterUniqueObjects(propertyNames) {
    const foundKeys = Object.create(null);

    const results = this.filter((obj) => {
      const key = propertyNames.map((propertyName) => obj[propertyName]).join('|');

      if (!foundKeys[key]) {
        foundKeys[key] = true;
        return true;
      }

      return false;
    });

    return results.map((obj) => {
      const newObj = {};

      propertyNames.forEach((propName) => {
        newObj[propName] = obj[propName];
      });

      return newObj;
    });
  }

  /**
   * Sorts the array of objects by the specified property name.
   * @param {string} propertyName - The name of the property to be used for sorting.
   * @param {string} direction - The direction in which to sort (asc/desc).
   * @returns A PmArray of objects that is sorted by the specified property name.
   */
  sortObjects(propertyName, direction) {
    const sorted = this.sort((item1, item2) => {
      const item1Dn = item1[propertyName].toUpperCase();
      const item2Dn = item2[propertyName].toUpperCase();

      if (item1Dn < item2Dn) return direction === SORT_DIRECTION.ascending.abbreviation ? -1 : 1;
      if (item1Dn > item2Dn) return direction === SORT_DIRECTION.ascending.abbreviation ? 1 : -1;
      return 0;
    });

    return sorted;
  }

  // **********************************************************************
  // * static methods

  /**
   * Creates an array of integers from a min/max range.
   * @param {integer} min - The min number of the range.
   * @param {integer} max - The max number of the range.
   * @returns An array of integers ranging from min to max.
   */
  static fromRange(min, max) {
    if (max === undefined) {
      max = min;
      min = 1;
    }

    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return Array.from(new Array(max - min + 1).keys()).map(function (num) {
      return num + min;
    });
  }
}

export default PmArray;
