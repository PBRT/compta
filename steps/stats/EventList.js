import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  Container,
  List,
  ListItem,
  Button,
  Text,
  Left,
  Right,
} from 'native-base';

import {units} from './data/units';
import moment from 'moment';

type Props = {
  dob: Date,
  isPast?: boolean,
  events: Array<{
    name: string,
    date: Date,
  }>,
};

function getAlertContent(event, isPast) {
  let currentDate = moment();
  let eventDate = moment(event.date);
  let value = moment.duration(currentDate.diff(eventDate)).humanize();
  return isPast ? `${value} ago` : `In ${value}`;
}

const EventList = ({events, dob, isPast = false}: Props) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [offset, setOffset] = useState(10);

  return (
    <ScrollView style={styles.list}>
      <List>
        {events.slice(0, offset).map((event, idx) => (
          <ListItem
            key={idx}
            onPress={() =>
              Alert.alert(`Your ${event.name}`, getAlertContent(event, isPast))
            }>
            <Left>
              <Text>{event.name}</Text>
            </Left>
            <Right style={{minWidth: 100}}>
              <Text>{moment(event.date).format('DD-MM-YYYY')}</Text>
            </Right>
          </ListItem>
        ))}
      </List>
      {offset < events.length && (
        <View style={{alignItems: 'center'}}>
          <View style={styles.buttonContainer}>
            <Button block small onPress={() => setOffset(offset + 10)}>
              <Text style={{textAlign: 'center'}}>Load More</Text>
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default EventList;

const styles = StyleSheet.create({
  list: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    width: 140,
    justifyContent: 'center',
    margin: 'auto',
  },
});
