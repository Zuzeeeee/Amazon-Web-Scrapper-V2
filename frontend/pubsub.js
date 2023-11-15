/*
  Pub-sub

  To avoid calling a component inside another and making a dependecy between components,
  Im using the pub-sub pattern which accept components when they subscribe to certains events,
  and updates them when a publisher creates that event.

  All comunication is made asynchronously with the use of promises.
*/

let sub = {};

const TypeEvents = {
  UPDATE: 'update',
  ERROR: 'error',
  LOADING: 'loading'
}

/**
 * Publishes a value to a certain event
 * @param {TypeEvents} ev 
 * @param {any} value 
 */
const publish = async (ev, value) => {
  sub[ev]?.forEach(async (notify) => { 
    return new Promise((resolve, reject) => {
      notify(value);
      resolve();
    })
  });
};

/**
 * Subscribe a fuction "notify" from a component to a event "ev"
 * @param {TypeEvents} ev 
 * @param {(data: any) => void} notify 
 * @returns 
 */
const subscribe = async (ev, notify) => {
  return new Promise((resolve, reject) => {
    if (sub[ev]) {
      sub[ev].push(notify);
    } else {
      sub[ev] = [notify];
    }

    resolve("Subscribed");
  });
} 

export {TypeEvents, publish, subscribe};