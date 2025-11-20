const functions = require('firebase-functions');
const OpenAI = require('openai').default;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Legal Advice API Endpoint
 * Provides legal strategy advice based on forensic analysis summaries
 */
exports.legalAdvice = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { summary } = req.body;

    if (!summary) {
      res.status(400).json({ error: 'Summary is required' });
      return;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are Verum Omnis legal module. Provide professional legal strategy advice based on forensic analysis. Output should be clear, actionable, and professional. Focus on legal implications, potential strategies, and recommended next steps.'
        },
        {
          role: 'user',
          content: summary
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const advice = completion.choices[0].message.content;

    res.status(200).json({ 
      output: advice,
      model: 'gpt-4o-mini',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Return appropriate error response
    if (error.response) {
      res.status(error.response.status).json({ 
        error: 'API error',
        details: error.response.data 
      });
    } else {
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
});

/**
 * Health check endpoint
 */
exports.healthCheck = functions.https.onRequest((req, res) => {
  res.status(200).json({ 
    status: 'ok',
    service: 'Verum Omnis Functions',
    timestamp: new Date().toISOString()
  });
});
