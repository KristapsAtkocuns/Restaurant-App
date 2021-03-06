//Contains functions that we reuse over the project many times
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    //Šeit taisam erroru, ja nu gadījumā adrese ir nepareiza pieprasījumam no servera
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);
    return data;
  } catch (err) {
    throw err; //Pārmetis erroru uz medel.js
  }
};
