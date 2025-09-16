import { Router } from "express";
import twilio from "twilio";

const router = Router();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_SERVICE_SID,
  TWILIO_PHONE_NUMBER
} = process.env;

const client = (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN)
  ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

router.post("/send", async (req, res) => {
  try {
    if (!client) {
      return res.status(500).json({ error: "Twilio client not configured. Set credentials in .env" });
    }
    const { to, body } = req.body || {};
    if (!to || !body) {
      return res.status(400).json({ error: "Missing 'to' or 'body'" });
    }

    const messageParams = {
      to,
      body
    };

    if (TWILIO_MESSAGING_SERVICE_SID) {
      messageParams.messagingServiceSid = TWILIO_MESSAGING_SERVICE_SID;
    } else if (TWILIO_PHONE_NUMBER) {
      messageParams.from = TWILIO_PHONE_NUMBER;
    } else {
      return res.status(500).json({ error: "Provide TWILIO_MESSAGING_SERVICE_SID or TWILIO_PHONE_NUMBER" });
    }

    const message = await client.messages.create(messageParams);
    return res.status(200).json({ sid: message.sid, status: message.status });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to send message" });
  }
});

router.post("/webhook", (req, res) => {
  // Twilio will send application/x-www-form-urlencoded by default
  // Ensure upstream middleware can parse it if needed; here we handle JSON/URL-encoded via Express config
  const payload = {
    from: req.body.From,
    to: req.body.To,
    body: req.body.Body,
    messageSid: req.body.MessageSid,
    raw: req.body
  };

  // In a real app, you'd persist or process this payload.
  // For now, just acknowledge to Twilio with 200 OK.
  return res.status(200).json({ received: true, payload });
});

export default router;


