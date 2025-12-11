import QRCode from 'qrcode';

export const generateQRCode = async (data: string) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data);
    return qrCodeDataUrl;
  } catch (err) {
    console.error('Erro ao gerar QR code:', err);
    throw err;
  }
};
