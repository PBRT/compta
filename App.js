import React, {useState, useEffect} from 'react';
import {View, Platform, StyleSheet, Text, ScrollView} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Content,
} from 'native-base';

// External Components
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';

// Local Components
import NavBar from './steps/navbar/Navbar';
import StatsStep from './steps/stats/StatsStep';
import SelectDateStep from './steps/select_date/SelectDateStep';

const DEFAULT_DATE = new Date(689385600000);

function App() {
  // Steps handling
  const [step, setStep] = useState(1);
  function nextStep() {
    setStep(1);
  }
  function reset() {
    setStep(0);
  }

  // Local storage
  async function storeDOB(dob) {
    await AsyncStorage.setItem('@compta_dob', dob.toDateString());
  }
  async function retrieveDOB() {
    const value = await AsyncStorage.getItem('@compta_dob');
    if (value == null) return DEFAULT_DATE;
    return new Date(value);
  }

  // Date handling
  const [initDate, setInitDate] = useState(DEFAULT_DATE);
  const [date, setDate] = useState(DEFAULT_DATE);
  useEffect(() => {
    async function getVal() {
      let val = await retrieveDOB();
      setInitDate(val);
      setDate(val);
    }
    getVal();
  }, [setInitDate, setDate]);
  async function onChangeDate(selectedDate) {
    setDate(selectedDate || date);
    await storeDOB(selectedDate || date);
  }

  const [activeSegment, selectActiveSegment] = useState(0);

  return (
    <Container>
      <Container style={{maxHeight: 160}}>
        <NavBar
          activeSegment={activeSegment}
          selectActiveSegment={selectActiveSegment}
          hasSegment={step !== 0}
        />
      </Container>
      <Container>
        {step === 0 && (
          <SelectDateStep
            onNext={nextStep}
            onChangeDate={onChangeDate}
            initDate={initDate}
            date={date}
          />
        )}
        {step === 1 && <StatsStep dob={date} activeSegment={activeSegment} />}
        {step !== 0 && (
          <View style={styles.footerContainer}>
            <Button full onPress={reset} style={{height: 60}}>
              <Text style={{color: '#fff', fontSize: 18}}>Reset Date</Text>
            </Button>
          </View>
        )}
      </Container>
    </Container>
  );
}

export default App;

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#529ff3',
  },
  header: {
    color: '#fff',
  },
});
