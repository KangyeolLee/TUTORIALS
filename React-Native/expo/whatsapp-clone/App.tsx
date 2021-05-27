import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import config from './aws-exports.ts';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
Amplify.configure(config);

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  // run only when App is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      // get Authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (userInfo) {
        // get the user from Backend with the user Id(SUB) from Auth
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub }),
        );

        if (userData.data.getUser) {
          console.log('User is already registered in DB');
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey, I am using whatsApp',
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));

        // if there is no user in DB with the id, then create one
      }
    };
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
