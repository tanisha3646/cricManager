import { StyleSheet } from "react-native";
export default app = StyleSheet.create({  
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  backImg:{
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  text:{
    color: 'brown',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input:{      
    color: 'black',
    borderBottomWidth: 1,
    backgroundColor:'transparent',
    borderBottomColor: 'brown',
    height: 40,
    fontSize:15,    
  },
  borderInput:{
    color: 'black',
    borderWidth: 1,
    borderColor: 'brown',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginRight:10,
  },
  otpBack:{
    width: '10%',
    alignSelf: 'center',
    fontSize:13,
    color:'brown',
    fontWeight:"bold",
    textDecorationColor:'brown',
    textDecorationLine:'underline',
    textDecorationStyle:"solid",
    marginBottom:20, 
  },
  usrDet:{
    backgroundColor: 'rgba(128, 128, 128, 0.2)'
  },
  switchContainer: {
    width: '30%',
    height: 30,
    borderRadius: 10,
    borderWidth:1,
    backgroundColor:'transparent',
    borderColor: 'brown',
    flexDirection:'row',
  },
  switchCircle: {
    width: '50%',
    height: 28,
    borderRadius: 8,
    backgroundColor: 'brown',
  },
  switchText: {      
    width: '50%',
    fontWeight: 'bold',
    color: 'brown',
    fontSize:13
  },
  button: {
    backgroundColor: 'brown',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10, 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerPlaceholder: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0e5d8',
  },
  cameraIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -10,
    borderRadius: 50,
    backgroundColor:'brown',
    padding:6,
    right:5
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin:5
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  shareOption: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  optionText: {
    color: 'brown',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  });
  