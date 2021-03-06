import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {List, ListItem, Text, Container} from 'native-base';

import {units} from './data/units';
import moment from 'moment';

type Props = {
  date: Date,
};

const Me = ({date}: Props) => {
  const birthdayDate = moment(date);
  const [currentDate, setCurrentDate] = useState(moment(new Date()));
  setInterval(() => setCurrentDate(moment(new Date())), 5000);

  const diffs = units.map(unit => ({
    unit,
    value: currentDate.diff(birthdayDate, unit.unit),
  }));

  return (
    <Container>
      <List>
        {diffs.map((diff, idx) => (
          <ListItem key={idx}>
            <Text>{`${diff.value} ${diff.unit.name.toLowerCase()}`}</Text>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Me;

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
