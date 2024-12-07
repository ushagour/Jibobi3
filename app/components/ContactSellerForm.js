import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {



  
   


    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id)
    // .then(response => {
      
    //   if (!response.ok) {
    //     alert(`Error: ${response.data.error}`); // Access and display the error message
    //   } else {

    //     alert("message sent successfully");
    //   }
    // }).catch(error => {
    //   alert("Network error, please try again.");
    // });



    
    if (!result.ok) {
      console.log("Error:", result.data);
      
     Alert.alert("Error", "Could not send the message to the seller.");
     return;
    }

    resetForm();
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the seller.",
      },
      trigger: null, // null triggers it immediately as a local notification
    });
    console.log("message sent successfully");
    
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
