/*
    Author: Matheus Reis<matheus@cientec.net>
    Date: 25/03/2019
    Description: Reducer to control the message modal
*/

/**
 * ! The parameters below should be passed as the data props of the
 * ! dispatch call for the "MESSAGE" action
 *  @param state
 *  @param action Name of the action button
 */

export function message(state = { show: false, data: {} }, action) {
  switch (action.type) {
    case "MESSAGE":
      return {
        show: Object.keys(action.data).length > 0,
        data: action.data,
      };
    case "CLOSE_MESSAGE":
      return {
        show: false,
        data: {},
      };
    default:
      return { show: false, data: {} };
  }
}
