import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import CardLogos from './CardLogos/index';
import CardDetails from './CardDetails/index';
import AccountDetails from './AccountDetails/index';
import AccountName from './AccountName/index';
import AccountSummary from './AccountSummary/index';

const CardInfobox = (props) => {
   return (
      <section className="account-infobox module">
         <header>
            <CardLogos type="visa" />
            <CardDetails />
         </header>

         <AccountName />
         <AccountSummary />
      </section>
   );
}
 
export default CardInfobox;
