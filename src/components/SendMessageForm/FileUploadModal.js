import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import firebase from 'firebase';
import alertify from 'alertifyjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'services/AuthProvider';
import db, { storage } from 'services/Firebase';
import toggleFileUpload from 'state/actions/fileUploadActions';
import styled from 'styled-components';
import Loader from '../Loader';
import Input from '../Input';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '90vw',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    marginBottom: '10px',
  },
}));

const Paper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  h3, p {
    color: ${({ theme }) => theme.colors.font.primary}
  }
`;

const schema = yup.object().shape({
  uploadFile: yup
    .mixed()
    .required('Wybierz plik z urządzenia')
    .test(
      'fileSize',
      'Plik jest za duży',
      (value) => value && value[0].size <= 5000000,
    )
    .test(
      'type',
      'Można przesłać wyłącznie pliki PNG, JPEG, JPG i PDF',
      (value) =>
        (value && value[0].type === 'image/png') ||
        (value && value[0].type === 'image/jpeg') ||
        (value && value[0].type === 'image/jpg') ||
        (value && value[0].type === 'application/pdf'),
    ),
});

const FileUploadModal = ({ id }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const fileUpload = useSelector((state) => state.fileUpload);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleUpload = async (data) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(data.uploadFile[0].name);
    setLoader(true);
    await fileRef.put(data.uploadFile[0]).then(() => {
      storage
        .ref()
        .child(data.uploadFile[0].name)
        .getDownloadURL()
        .then((url) => {
          db.collection('rooms').doc(id).collection('messages').add({
            message: url,
            user: currentUser?.uid,
            type: data.uploadFile[0].type,
            fileName: data.uploadFile[0].name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          db.collection('rooms').doc(id).update({
            lastMessage: 'Plik...',
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          });
          reset();
          dispatch(toggleFileUpload());
          alertify.success('Plik wysłano');
          setLoader(false);
        });
    });
  };

  return (
    <>
      {loader ? <Loader /> :
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={fileUpload}
          onClose={() => dispatch(toggleFileUpload())}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={fileUpload}>
            <Paper className={classes.paper}>
              <h3 id='transition-modal-title'
                  className={classes.text}>
                Wyślij załącznik
              </h3>
              <p id='transition-modal-description'
                 className={classes.text}>
                Wybierz plik z urządzenia, który chcesz wysłać
              </p>
              <form onSubmit={handleSubmit(handleUpload)}>
                <Input icon={<AttachFile />}
                       error={errors.uploadFile?.message}>
                  <input
                    type='file'
                    placeholder='Plik'
                    // onChange={reset}
                    {...register('uploadFile', { required: true })}
                  />
                </Input>
                <Button
                  style={{
                    marginTop: '10px',
                  }}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  Wyślij
                </Button>
              </form>
            </Paper>
          </Fade>
        </Modal>
      }
    </>
  );
};

export default FileUploadModal;

FileUploadModal.defaultProps = {
  id: null,
};

FileUploadModal.propTypes = {
  id: PropTypes.string,
};
