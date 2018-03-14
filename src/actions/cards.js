import axios from 'axios';

export const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_CARDS_STATUS = 'FETCH_CARDS_STATUS';
export const CARD_CHANGE_PIN = 'CARD_CHANGE_PIN';
export const CARD_CHANGE_LIMITS = 'CARD_CHANGE_LIMITS';

export function fetchCards() {
   return dispatch => {
      axios.get('http://localhost:3001/cards')
      .then(res => res.data)
      .then(data => {
         dispatch({ type: FETCH_CARDS, data });
         dispatch(fetchCardsStatus(true));
      })
      .catch(error => {
         dispatch(fetchCardsStatus(0));
      });
   }
}

export function fetchCardsStatus(status) {
   return {
      type: FETCH_CARDS_STATUS,
      status
   }
}

export function changeCardPin(id, newPin) {
   return function (dispatch) {
      axios(`http://localhost:3001/cards/${id}`, {
         method: 'patch',
         headers: { 'Content-Type': 'application/json' },
         data: { pin: newPin }
      })
      .then(res => res.data)
      .then(data => {
         dispatch({ type: CARD_CHANGE_PIN, id, newPin });
      })
      .catch(error => {

      });
   }
}

export function changeCardLimits(id, newWithdrawalLimit, newOnlineLimit) {
   newWithdrawalLimit = newWithdrawalLimit || '';
   newOnlineLimit = newOnlineLimit || '';

   return dispatch => new Promise((resolve, reject) => {
      axios(`http://localhost:3001/cards/${id}`, {
         method: 'patch',
         headers: { 'Content-Type': 'application/json' },
         data: {
            daily_withdrawal_limit: newWithdrawalLimit,
            daily_online_limit: newOnlineLimit
         }
      })
         .then(res => res.data)
         .then(data => {
            dispatch({
               type: CARD_CHANGE_LIMITS,
               id,
               newWithdrawalLimit,
               newOnlineLimit
            });

            resolve(data);
         })
         .catch(err => reject(err));
   });
}