import { memo } from 'react';
import { useSelector } from 'react-redux';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../../../../helpers/enums/newEngagementInstanceViews';
import { selectView } from '../../../newEngagementInstanceSlice';
import Card from './Card';

let CardList = () => {
  // **********************************************************************
  // * constants

  const { lookups } = useSelector((state) => selectView(state, NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContacts.viewId));
  const { clientContacts } = lookups;

  // **********************************************************************
  // * component vars

  const cards = clientContacts.data.map((clientContact, index) => (
    <Card key={index} clientContact={clientContact} onEdit={() => {}} onDelete={() => {}} />
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
