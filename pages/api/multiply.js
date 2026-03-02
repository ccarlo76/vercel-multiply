export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { a, b } = req.body;

  if (a === undefined || b === undefined || isNaN(Number(a)) || isNaN(Number(b))) {
    return res.status(400).json({ error: 'Please provide two valid numbers.' });
  }

  const result = Number(a) * Number(b);
  return res.status(200).json({ result });
}
