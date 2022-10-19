import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchMessageForm from 'components/SearchMessagesForm/SearchMessagesForm';
import NewChatForm from 'components/NewChatForm/NewChatForm';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import toggleUpdateUserData from '../state/actions/updateUserDataActions';
// import PasswordReset from './UpdateUserDataForms/PasswordReset';
// import NameUpdate from './UpdateUserDataForms/NameUpdate';
// import EmailUpdate from './UpdateUserDataForms/EmailUpdate';
// import PasswordUpdate from './UpdateUserDataForms/PasswordUpdate';
// import ImageUpdate from './UpdateUserDataForms/ImageUpdate';
// import NameChatUpdate from './UpdateChatDataForms/NameChatUpdate';
// import ImageChatUpdate from './UpdateChatDataForms/ImageChatUpdate';

const PasswordReset = React.lazy(() =>
  import('./UpdateUserDataForms/PasswordReset'),
);
const NameUpdate = React.lazy(() => import('./UpdateUserDataForms/NameUpdate'));
const EmailUpdate = React.lazy(() =>
  import('./UpdateUserDataForms/EmailUpdate'),
);
const PasswordUpdate = React.lazy(() =>
  import('./UpdateUserDataForms/PasswordUpdate'),
);
const ImageUpdate = React.lazy(() =>
  import('./UpdateUserDataForms/ImageUpdate'),
);
const NameChatUpdate = React.lazy(() =>
  import('./UpdateChatDataForms/NameChatUpdate'),
);
const ImageChatUpdate = React.lazy(() =>
  import('./UpdateChatDataForms/ImageChatUpdate'),
);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '90vw',
    width: '400px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
}));

const Paper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  h3, p {
    color: ${({ theme }) => theme.colors.font.primary}
  }
`;

const UpdateUserDataModal = ({ type, id }) => {
  const classes = useStyles();
  const updateUserData = useSelector((state) => state.updateUserData);
  const dispatch = useDispatch();

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={updateUserData}
      onClose={() => dispatch(toggleUpdateUserData())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={updateUserData}>
        <Paper className={classes.paper}>
          {type === 'passwordReset' ? <PasswordReset /> : null}
          {type === 'nameUpdate' ? <NameUpdate /> : null}
          {type === 'emailUpdate' ? <EmailUpdate /> : null}
          {type === 'passwordUpdate' ? <PasswordUpdate /> : null}
          {type === 'imageUpdate' ? <ImageUpdate /> : null}
          {type === 'nameChatUpdate' ? <NameChatUpdate id={id} /> : null}
          {type === 'imageChatUpdate' ? <ImageChatUpdate id={id} /> : null}
          {type === 'newChat' ? <NewChatForm /> : null}
        </Paper>
      </Fade>
    </Modal>
  );
};

export default UpdateUserDataModal;

UpdateUserDataModal.defaultProps = {
  type: null,
  id: null,
};

UpdateUserDataModal.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
};
