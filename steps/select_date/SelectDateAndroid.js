import moment from 'moment';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, Button, Title} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  initDate: Date,
  date: Date,
  onNext: () => void,
  onChangeDate: (date: Date) => void,
};
const SelectDateAndroid = ({initDate, date, onChangeDate, onNext}: Props) => {
  const [localDate, setLocalDate] = useState(date);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const onPress = () => {
    onChangeDate(localDate);
    if (onNext != undefined) {
      onNext();
    }
  };

  return (
    <Container>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 10,
          color: '#111',
          fontSize: 20,
        }}>
        Date of birth
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#111',
          fontSize: 20,
        }}>
        {moment(localDate).format('DD/MM/YYYY')}
      </Text>
      <View style={{alignItems: 'center'}}>
        <View style={styles.buttonContainer}>
          <Button block onPress={() => setShowDate(true)} info>
            <Text style={{textAlign: 'center'}}>Edit ✏️</Text>
          </Button>
        </View>
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 10,
          color: '#111',
          marginTop: 60,
          fontSize: 20,
        }}>
        Time
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#111',
          fontSize: 20,
        }}>
        {moment(localDate).format('HH:mm')}
      </Text>
      <View style={{alignItems: 'center'}}>
        <View style={styles.buttonContainer}>
          <Button block onPress={() => setShowTime(true)} info>
            <Text style={{textAlign: 'center'}}>Edit ✏️</Text>
          </Button>
        </View>
      </View>
      {showDate === true && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={localDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            setShowDate(false);
            setLocalDate(date);
          }}
        />
      )}
      {showTime === true && (
        <DateTimePicker
          testID="timeTimePicker"
          timeZoneOffsetInMinutes={0}
          value={localDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            setShowTime(false);
            setLocalDate(date);
          }}
        />
      )}
      <View style={{alignItems: 'center'}}>
        <View style={{...styles.buttonContainer, marginTop: 80, width: 200}}>
          <Button block onPress={onPress} success>
            <Text style={{textAlign: 'center'}}>Save 💾</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default SelectDateAndroid;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ccc',
  },
  buttonContainer: {
    width: 140,
    justifyContent: 'center',
    margin: 'auto',
  },
});
