// api/submit.js

const axios = require('axios');
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;


module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST method allowed' });
    return;
  }

  try {
    const hubspotUrl = 'https://api.hubapi.com/form-integrations/v1/submissions/forms/afaa90c8-44dd-41bd-baf4-b25eca71ea2e';

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
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
};
