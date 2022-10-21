import { Avatar, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ChatItem from '../components/ChatItem';
import Header from '../components/Header';
import { useAuth } from '../services/AuthProvider';
import { actionTypes } from '../services/reducer';
import { useStateValue } from '../services/StateProvider';
import UpdateUserDataModal from '../components/UpdateUserDataModal';
import { auth } from '../services/Firebase';
import { setCurrentProvider } from '../state/actions/currentProviderActions';
import toggleUpdateUserData from '../state/actions/updateUserDataActions';
import toggleSidebar from '../state/actions/sidebarActions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  /* align-items: center; */
  /* justify-content: center; */

  ${({ theme }) => theme.media.tablet} {
    flex: 1;
  }
`;
const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.chatBackground};
  color: ${({ theme }) => theme.colors.font.primary};

  svg {
    color: ${({ theme }) => theme.colors.font.primary}
  }
`;

const Field = styled.div`
  padding: 10px;
  display: grid;
  /* grid-template-rows: 1fr; */
  grid-template-columns: 2fr auto;
  grid-gap: 20px;

  h3 {
    display: flex;
    align-items: center;
  }
`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const UserSettings = () => {
  const classes = useStyles();
  // const [{ sidebar, currentProvider }, dispatch] = useStateValue();
  const [updateType, setUpdateType] = useState(null);
  const { currentUser } = useAuth();
  const sidebar = useSelector((state) => state.sidebar);
  const currentProvider = useSelector((state) => state.currentProvider);
  const dispatch = useDispatch();

  // const showHideSidebar = () => {
  //   dispatch({
  //     type: actionTypes.SET_SIDEBAR,
  //     sidebar: !sidebar,
  //   });
  // };

  // const getUserProvider = () => {
  //   dispatch({
  //     type: actionTypes.SET_CURRENT_PROVIDER,
  //     currentProvider: currentUser.providerData,
  //   });
  // };

  const checkProviderId = (name) => {
    let check = false;
    currentUser.providerData.forEach((el) => {
      if (el.providerId === name) {
        check = true;
      }
    });
    return check;
  };

  useEffect(async () => {
    await auth.onAuthStateChanged((user) => {
      dispatch(setCurrentProvider(currentUser.providerData));
    });
    // dispatch(setCurrentProvider(currentUser.providerData));
  }, []);

  // const openUpdate = () => {
  //   dispatch({
  //     type: actionTypes.SET_UPDATE_USER_DATA,
  //     updateUserData: true,
  //   });
  // };

  const editName = () => {
    setUpdateType('nameUpdate');
    dispatch(toggleUpdateUserData());
  };
  const editEmail = () => {
    setUpdateType('emailUpdate');
    dispatch(toggleUpdateUserData());
  };
  const editPassword = () => {
    setUpdateType('passwordUpdate');
    dispatch(toggleUpdateUserData());
  };
  const editImage = () => {
    setUpdateType('imageUpdate');
    dispatch(toggleUpdateUserData());
  };

  return (
    <Wrapper>
      <Header
        left={
          <ChatItem
            name='Ustawienia użytkownika'
            avatar={currentUser.photoURL}
            // info={
            //   roomName
            //     ? displayRoomInfo(lastSeen)
            //     : 'Wybierz czat z menu aby rozmawiać'
            // }
          />
        }
        right={
          <>
            <IconButton
              id='menuButton'
              onClick={() => dispatch(toggleSidebar())}
            >
              {sidebar ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </>
        }
      />
      <Body>
        <Avatar
          alt={currentUser.displayName}
          src={currentUser.photoURL}
          className={classes.large}
          sx={{ width: 24, height: 24 }}
        />
        <Tooltip title='Edytuj zdjęcie'>
          <IconButton id='menuButton'
                      size='small'
                      onClick={editImage}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Field>
          <h3>{currentUser.displayName}</h3>
          <Tooltip title='Edytuj nazwę'>
            <IconButton id='menuButton'
                        size='small'
                        onClick={editName}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Field>
        {currentProvider.length === 1 && checkProviderId('password') ? (
          <Field>
            <h3>{currentUser.email}</h3>
            <Tooltip title='Edytuj e-mail'>
              <IconButton id='menuButton'
                          size='small'
                          onClick={editEmail}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Field>
        ) : null}
        {checkProviderId('password') ? (
          <Field>
            <h3>Zmień hasło</h3>
            <Tooltip title='Edytuj hasło'>
              <IconButton id='menuButton'
                          size='small'
                          onClick={editPassword}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Field>
        ) : null}
      </Body>
      <UpdateUserDataModal type={updateType} />
    </Wrapper>
  );
};
export default UserSettings;
