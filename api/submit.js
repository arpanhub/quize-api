// api/submit.js

const axios = require('axios');
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://preview--escape-leaderboard-chronicle.lovable.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const hubspotUrl = 'https://api.hubapi.com/form-integrations/v1/submissions/forms/afaa90c8-44dd-41bd-baf4-b25eca71ea2e';

  try {
    if (req.method === 'POST') {
      // Submit form data to HubSpot
      const hubspotRes = await axios.post(
        hubspotUrl,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      res.status(200).json(hubspotRes.data);
    } else if (req.method === 'GET') {
      // Retrieve form submissions from HubSpot
      const hubspotRes = await axios.get(
        hubspotUrl,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      res.status(200).json(hubspotRes.data);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
};
