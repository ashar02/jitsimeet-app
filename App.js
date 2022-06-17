/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
  Switch,
} from 'react-native';

import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet-with-options';

function App() {
  const [userName, setUserName] = useState('');
  const [callLink, setCallLink] = useState('');
  const [callStarted, setCallStarted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);

  useEffect(() => {
    return () => {
      console.log('JitsiMeet end call');
      JitsiMeet.endCall();
    };
  });

  const toggleSwitch = () =>
    setIsVideoEnabled((previousState) => !previousState);

  const onConferenceTerminated = (nativeEvent) => {
    /* Conference terminated event */
    console.log('onConferenceTerminated: ', {nativeEvent});
    //setCallLink('');
    setCallStarted(false);
    setIsVideoEnabled(false);
  };

  const onConferenceJoined = (nativeEvent) => {
    /* Conference joined event */
    console.log('onConferenceJoined: ', {nativeEvent});
  };

  const onConferenceWillJoin = (nativeEvent) => {
    /* Conference will join event */
    console.log('onConferenceWillJoin:', {nativeEvent});
  };

  const onChatButtonPressed = (e) => {
    console.log('onChatButtonPressed in app.js.');
  };

  const onInvitePeopleButtonPressed = (e) => {
    console.log('onInvitePeopleButtonPressed in app.js.');
  };

  const onProfileInfoButtonPressed = (e) => {
    console.log('onProfileInfoButtonPressed in app.js. ' + e.nativeEvent.email);
  };

  const onPrivateChatButtonPressed = (e) => {
    console.log('onPrivateChatButtonPressed in app.js ' + e.nativeEvent.email);
  };

  const startCall = () => {
    if (userName !== '' && callLink !== '') {
      setCallStarted(true);
      setTimeout(() => {
        const url = `https://meet.jit.si/${callLink}#userInfo.displayName=%22${userName}%22`;
        const userInfo = {
          displayName: 'userName',
          email: 'user@example.com',
          avatar: 'https:/gravatar.com/avatar/abc123',
        };
        const options = {
          room: '',
          token: '',
          audioMuted: false,
          videoMuted: !isVideoEnabled,
          subject: '',
        };
        const meetFeatureFlags = {
          'add-people.enabled': false,
          'calendar.enabled': false,
          'call-integration.enabled': false,
          'chat.enabled': true,
          'close-captions.enabled': false,
          'invite.enabled': false,
          'ios.recording.enabled': false,
          'live-streaming.enabled': false,
          'meeting-name.enabled': true,
          'meeting-password.enabled': false,
          'pip.enabled': false,
          'raise-hand.enabled': false,
          'recording.enabled': false,
          'toolbox.alwaysVisible': false,
          'welcomepage.enabled': false,
          'filmstrip.enabled': false,
          'audio-focus.disabled': false,
          'audio-mute.enabled': true,
          'audio-only.enabled': true,
          'conference-timer.enabled': true,
          'fullscreen.enabled': false,
          'help.enabled': false,
          'ios.screensharing.enabled': false,
          'android.screensharing.enabled': false,
          'kick-out.enabled': false,
          'lobby-mode.enabled': false,
          'notifications.enabled': false,
          'overflow-menu.enabled': true,
          'reactions.enabled': false,
          //'replace.participant'
          //'resolution'
          'security-options.enabled': false,
          'server-url-change.enabled': false,
          'tile-view.enabled': true,
          'toolbox.enabled': true,
          'video-mute.enabled': true,
          'video-share.enabled': false,
        };
        options.audioOnly = !isVideoEnabled;
        options.routeEarpieceEnabled = true;
        JitsiMeet.call(url, userInfo, options, meetFeatureFlags);
        //let count = 0;
        //let highlight = false;
        //function callRepeatFn() {
        //  console.log('highlightChatButton called');
        //  highlight = !highlight;
        //  JitsiMeet.highlightChatButton(highlight);
        //  count++;
        //  if (count < 5) {
        //    setTimeout(callRepeatFn, 20000);
        //  }
        //}
        //setTimeout(callRepeatFn, 20000);
      }, 1000);
    } else {
      Alert.alert('Make sure to enter your name and call-link!');
    }
  };

  if (!callStarted) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Join a call</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder="Enter your name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCallLink}
          value={callLink}
          placeholder="Enter call link"
        />
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isVideoEnabled ? '#29d' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isVideoEnabled}
            style={{
              alignSelf: 'flex-start',
              marginLeft: 10,
            }}
          />
          <Text style={styles.text}>Join with your video</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Start Call" onPress={startCall} />
        </View>
      </KeyboardAvoidingView>
    );
  }
  if (callStarted) {
    return (
      <JitsiMeetView
        onConferenceTerminated={(e) => onConferenceTerminated(e)}
        onConferenceJoined={(e) => onConferenceJoined(e)}
        onConferenceWillJoin={(e) => onConferenceWillJoin(e)}
        onChatButtonPressed={(e) => onChatButtonPressed(e)}
        onInvitePeopleButtonPressed={(e) => onInvitePeopleButtonPressed(e)}
        onProfileInfoButtonPressed={(e) => onProfileInfoButtonPressed(e)}
        onPrivateChatButtonPressed={(e) => onPrivateChatButtonPressed(e)}
        style={styles.callContainer}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  callContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  text: {textAlign: 'center'},
  buttonWrapper: {
    marginTop: 30,
    minWidth: 200,
    alignSelf: 'center',
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;
