import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(154, 227, 220)',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 5,
        width: '90%', // This is to make sure the button doesn't take the full width
        alignSelf: 'center', // This is to center the button
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end', backgroundColor: '#000' // This will align the children elements to the end of the main axis
    },
    camera: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    home: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: { // You can wrap your button(s) with a View with this style
        backgroundColor: 'transparent',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20, // Optional. You can adjust this number to add more or less space at the bottom
    },
});

export default styles;
