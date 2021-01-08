import React from "react";
import Snackbar from "react-native-snackbar";


const displayErrorToast = message => {
  console.log(Snackbar);
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor:'#8b0000',
    textColor:'#fff',
  // fontFamily:'Poppins-Regular'
  });
};

const displaySuccessToast = message =>
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor:'#006200',
    textColor:'#fff',
    // fontFamily:'Poppins-Regular'
  });

const displayNetworkError = () => {
  displayErrorToast("Experiencing network issues. Please try again.");
};

const displayInternalServer = () => {
  displayErrorToast("Internal server error. Please try again.");
};

export {
  displayErrorToast,
  displaySuccessToast,
  displayNetworkError,
  displayInternalServer
};