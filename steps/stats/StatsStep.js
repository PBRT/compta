import moment from 'moment';
import React, {useState} from 'react';
import {Container} from 'native-base';
import {
  View,
  StyleSheet,
  ScrollView,
  Segment,
  Text,
  Button,
  Alert,
} from 'react-native';

import Me from './Me';
import {units} from './data/units';
import EventList from './EventList';

const GAP = 300000; // 5 minutes in ms

type Props = {
  dob: Date,
  activeSegment: number,
};

const StatsStep = ({dob, activeSegment}: Props) => {
  const currentDate = new Date();
  const computedEvents = units
    .reduce((acc, i) => acc.concat(i.events), [])
    .map(item => {
      let dateTo = item.getTimeTo(dob);
      return Object.assign({}, item, {date: dateTo});
    })
    .sort((a, b) => a.date - b.date);

  let upcomingEvents = [];
  let pastEvents = [];
  for (let ev of computedEvents) {
    if (ev.date > currentDate) upcomingEvents.push(ev);
    else pastEvents.push(ev);
  }

  const [isEventOverlayVisible, setIsEventOverlayVisible] = useState(false);
  const [hasEventOverlayBeenVisible, setHasEventOverlayBeenVisible] = useState(
    false,
  );
  if (
    upcomingEvents.length > 0 &&
    Math.abs(upcomingEvents[0].date - currentDate) < GAP &&
    isEventOverlayVisible === false &&
    hasEventOverlayBeenVisible === false
  ) {
    Alert.alert(
      'Congratulations 👏',
      `You just passed your ${upcomingEvents[0].name} at ${moment(
        upcomingEvents[0].date,
      ).format('DD-MM-YYYY, HH:mm')}`,
    );
    setIsEventOverlayVisible(true);
    setHasEventOverlayBeenVisible(true);
  }

  return (
    <Container style={{marginTop: 0}}>
      {activeSegment === 0 && <EventList events={upcomingEvents} dob={dob} />}
      {activeSegment === 1 && (
        <EventList events={pastEvents.reverse()} dob={dob} isPast />
      )}
      {activeSegment === 2 && <Me date={dob} />}
    </Container>
  );
};

export default StatsStep;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  list: {
    padding: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    marginTop: 4,
  },
  unitName: {
    fontWeight: 'bold',
  },
});
