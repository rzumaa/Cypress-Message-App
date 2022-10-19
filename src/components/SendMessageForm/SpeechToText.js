import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import useSpeechToText from 'react-hook-speech-to-text';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';
import { useStateValue } from '../../services/StateProvider';
import { actionTypes } from '../../services/reducer';
import { setMessage } from '../../state/actions/messageActions';

const useStyles = makeStyles({
  root: {
    animation: `$recordButton .8s linear infinite alternate`,
  },
  '@keyframes recordButton': {
    from: {
      backgroundColor: 'transparent',
    },
    to: {
      backgroundColor: 'lightgray',
    },
  },
});

const SpeechToText = () => {
  const classes = useStyles();
  // const [{ message }, dispatch] = useStateValue();
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(async () => {
    await results.map((result) =>
      // dispatch({
      //   type: actionTypes.SET_MESSAGE,
      //   message: message + result.transcript,
      // })
      dispatch(setMessage(message + result.transcript))
    );
  }, [results]);

  const recordToText = async () => {
    if (error.length === 0) {
      if (isRecording) {
        await stopSpeechToText();
        alertify.warning('Nagrywanie zakończone');
      } else {
        await startSpeechToText();
        alertify.success('Mów teraz!');
      }
    } else {
      alertify.alert(
        'Błąd nagrywania',
        'Twoja przeglądarka nie obsługuje tej funkcji lub masz problemy z mikrofonem. Użyj przeglądarki Google Chrome i spróbuj ponownie.'
      );
    }
  };

  return (
    <Tooltip title="Nagraj wiadomość">
      <IconButton
        className={isRecording && classes.root}
        onClick={recordToText}
        color={isRecording ? 'secondary' : 'default'}
      >
        {error.length === 0 ? <MicNoneIcon /> : <MicOffIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default SpeechToText;
