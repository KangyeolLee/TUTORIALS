import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: '100%',
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avater: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 60,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    color: 'grey',
    width: '100%',
  },
});

export default styles;
