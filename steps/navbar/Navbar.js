import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Segment,
  Text,
  Title,
} from 'native-base';

type Props = {
  hasSegment: boolean,
  activeSegment: number,
  selectActiveSegment: number => void,
};

function NavBar({hasSegment, selectActiveSegment, activeSegment}: Props) {
  return (
    <Container>
      <Header hasSegment={hasSegment}>
        <Left />
        <Body>
          <Title style={{fontWeight: 'bold', fontSize: 20}}>COMPTA</Title>
        </Body>
        <Right />
      </Header>
      {hasSegment && (
        <Segment style={{paddingBottom: 10}}>
          <Button
            first
            active={activeSegment === 0}
            onPress={() => selectActiveSegment(0)}
            style={{width: '30%', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Upcoming</Text>
          </Button>
          <Button
            active={activeSegment === 1}
            onPress={() => selectActiveSegment(1)}
            style={{width: '30%', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Past</Text>
          </Button>
          <Button
            last
            active={activeSegment === 2}
            onPress={() => selectActiveSegment(2)}
            style={{width: '30%', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Me</Text>
          </Button>
        </Segment>
      )}
    </Container>
  );
}

export default NavBar;
