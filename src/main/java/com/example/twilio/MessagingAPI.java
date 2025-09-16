package com.example.twilio;

import java.util.List;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class MessagingAPI {
    public static final String ACCOUNT_SID = "AC1ea983056b04621ab3004bac9ef828ca";
    public static final String AUTH_TOKEN = "ab28e76fd4ba32dbd720bdd722585802";
    public static final List<String> numbers = java.util.Arrays.asList("123", "456", "789", "111", "234");
    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        for(int i = 0 ; i < 5 ; i++){
        String link = "https://example.com/accept?number=+91" + numbers.get(i);
        String messageText = "Hi, click this link to accept: " + link;
    
        Message message = Message.creator(
            new PhoneNumber("+91" + numbers.get(i)), // Use get(i) for List
            new PhoneNumber("+16673270771"),
            messageText
        ).create();
        System.out.println("Message SID: " + message.getSid());
        }
    }
}
