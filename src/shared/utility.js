/* eslint-disable react/no-typos */

// Utility functions

/**
 * Inmutable update object
 * @param  {Object} oldObject     Object to update
 * @param  {Object} updatedValues Object with new values
 * @return {Object}               New Object with updated values
 */
export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};
