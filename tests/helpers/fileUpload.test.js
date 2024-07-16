import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'devytxbt1',
  api_key: '223528452569255',
  api_secret: 'EhAaUjGz4lqg-czcZGXSxSP59KI',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://st.depositphotos.com/1002049/3461/i/450/depositphotos_34618651-stock-photo-jpg-file-icon.jpg';

    const resp = await fetch(imageUrl);

    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.webp', '');

    await cloudinary.api.delete_resources([imageId]);
  });
  test('debe de retornar un null', async () => {
    const file = new File([], 'foto.jpg');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
