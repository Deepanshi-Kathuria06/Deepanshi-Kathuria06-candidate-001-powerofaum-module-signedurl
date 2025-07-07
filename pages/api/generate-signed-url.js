export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { filePath, userId } = req.query;

  if (!filePath || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameters: filePath and userId",
    });
  }

  const expires = Math.floor(Date.now() / 1000) + 2 * 60;
  const token = Buffer.from(`${userId}_${Date.now()}`).toString('base64');

  const signedUrl = `https://signed.example.com${filePath}?token=${token}&expires=${expires}`;

  return res.status(200).json({
    success: true,
    signedUrl,
  });
}
