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
const SelectDateStep = ({initDate, date, onChangeDate, onNext}: Props) => {
  const [localDate, setLocalDate] = useState(date);
  const onPress = () => {
    onChangeDate(localDate);
    if (onNext != undefined) {
      onNext();
    }
  };

  return (
    <Container>
      <Title style={{textAlign: 'center', marginBottom: 10}}>
        Select your date of birth
      </Title>
      <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={localDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={(_, date) => setLocalDate(date)}
      />
      <DateTimePicker
        testID="timeTimePicker"
        timeZoneOffsetInMinutes={0}
        value={localDate}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(_, date) => setLocalDate(date)}
      />
      <View style={{alignItems: 'center'}}>
        <View style={styles.buttonContainer}>
          <Button
            block
            onPress={onPress}
            disabled={localDate.toString() === initDate.toString()}>
            <Text style={{textAlign: 'center'}}>Done 👌</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default SelectDateStep;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ccc',
  },
  buttonContainer: {
    marginTop: 40,
    width: 140,
    justifyContent: 'center',
    margin: 'auto',
  },
});
