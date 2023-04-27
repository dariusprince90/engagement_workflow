import { memo } from 'react';

import Card from './Card';

// ! this is a temporary object to allow the components to render
// ! once the APIs are integrated, the data will be populated from there
const clientContactAddresses = [
  {
    id: 1,
    contactInfoResponseId: 0,
    address1: '3000 Town Center',
    address2: 'Suite 100',
    city: 'Southfield',

    postalCode: '48075',

    countryHierarchyId: 0,
    isPrimary: true
  },
  {
    id: 1,
    contactInfoResponseId: 0,
    address1: '4000 Town Center',
    address2: 'Suite 200',
    city: 'Northfield',

    postalCode: '78965',

    countryHierarchyId: 0,
    isPrimary: false
  },
  {
    id: 1,
    contactInfoResponseId: 0,
    address1: '5000 Town Center',
    address2: 'Suite 300',
    city: 'Southfield',
    postalCode: '48089',
    countryHierarchyId: 0,
    isPrimary: true
  },
  {
    id: 1,
    contactInfoResponseId: 0,
    address1: '6000 Town Center',
    address2: 'Suite 400',
    city: 'Southfield',
    postalCode: '787877',
    countryHierarchyId: 0,
    isPrimary: false
  }
];

let CardList = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const cards = clientContactAddresses.map((clientContactAddress, index) => (
    <Card key={index} clientContactAddress={clientContactAddress} onEdit={() => {}} onDelete={() => {}} />
  ));

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render
  return <div className="card-list">{cards}</div>;
};

CardList = memo(CardList);

export default CardList;
