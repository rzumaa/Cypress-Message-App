import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email } from '@material-ui/icons';
import alertify from 'alertifyjs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { auth } from '../../services/Firebase';
import Input from '../Input';
import toggleUpdateUserData from '../../state/actions/updateUserDataActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginBottom: '10px',
    color: '#d7d7d7',
  },
}));

const passwordResetSchema = yup.object().shape({
    passwordreset: yup
    .string()
    .required('E-mail jest wymagany')
    .email('Podany adres jest niepoprawny'),
});

const PasswordReset = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordResetSchema) });

  const handleReset = async (data) => {
    await auth
      .sendPasswordResetEmail(data.passwordreset)
      .then(() => {
        alertify.alert(`Reset hasła`, `Email został wysłany!`);
        reset();
        dispatch(toggleUpdateUserData());
      })
      .catch((error) => {
        alertify.alert(`Reset hasła`, error.message);
      });
  };
  return (
    <div>
      <h3 id='transition-modal-title'
          className={classes.text}>
        Resetowanie hasła
      </h3>
      <p id='transition-modal-description'
         className={classes.text}>
        Podaj adres e-mail, do którego chcesz zresetować hasło.
      </p>
      <form onSubmit={handleSubmit(handleReset)}>
        <Input icon={<Email />}
               error={errors.passwordreset?.message}>
          <input type='text'
                 placeholder='E-mail' {...register('passwordreset')} />
        </Input>
        <Button
          style={{
            marginTop: '10px',
          }}
          color='primary'
          variant='contained'
          type='submit'
        >
          Resetuj
        </Button>
      </form>
    </div>
  );
};

export default PasswordReset;
