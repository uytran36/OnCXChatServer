// var admin = require('firebase-admin');
import admin from 'firebase-admin';
// import serviceAccount from './oncx-noti-app-test.json';

const serviceAccount = {
  "type": "service_account",
  "project_id": "oncx-test-nofitication-app",
  "private_key_id": "7ff027734681a56437236f753a5b426dabfd92dd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgsxkOd+7P3Nh/\nuRYBP9QWpBHCszH32DK6/JwQV9J+gAuAmldyvNN0tpEtabjTbjwZ86lhRMX6zkVF\nYVJZp3jFXVtxE+BNDZw6AEjhczvPcop03zXkfI/jto8uvgwMz7kvut6rYAHJY37U\nGQB86tW3akKqyjxfKCrZ4vtOUcssawjoYkCN7faG252Q7aan2CaZaXerrVwIYmDD\nX2vEAtMRlmH1dB8no0StljmqWEDhe1rirv6OHfJbH+6fLD9FJqSvQ0oxSjUj5Zmf\nTwMxrdSOFMydmZAHevYObnESaYkr2EW8GnCUU/MaEhWNjs63mK9fYa36ksKkGdyX\nR7xL13kFAgMBAAECggEAN0WCb7yGcg4GlN+HFwTqIKNrzGiv3gwJXtD1qJVcO9A0\npJXxT/BsVm9YvaLoRChdGZv5/Q+XfK0nnDZeCaIVYuS6R8lLU5VDz5s7dfeZcb92\nqb4AHkdNgkfPNYd+Q4XKrwT6Az2xP6AuBitXRJ/MxBoTNgT7AMui+XAdeZGebPcT\n9Wfx3Bvnp3D2cE/pHcEgQ+9RzXwn5tcGfwVeTjsFwIwOoU+1FmC5ywLjR0H10HhF\nPizMbNVEE7qJIWdNH/ehSBBvMI48cq2EjY6I/gK6xILJHZp9rR5uee3D0gLId5WP\nVcd88Nt/ubN5InTklNJUqomEQZl7leyTSQnMGqVOPQKBgQDQR5toeh+TCnRxbbDp\n0BP3yGp+kQT3+2N3rs5yQraLBQQVVoyJJYnbdhcdmVajI9om7fIlZ5WcII/Zx0Ek\nh+Z04bSHH2gJEcDrGYXGlcDmbTsT7eo9SsOfaXUIJeAOEM3VUk3NHPCS7AMN+ZU1\nDT222hNBRWJrz3BWZ60Rj9NVtwKBgQDFhLy4zKJQgRv0sHJ/So+cV+lXPsYVz9az\n3Esi30NDnQY94usaJZqHGapDZPSFSLgLmWdPrV4LSI8j8AwaJUjNzmDsAyMcpiBf\n8S16v7QXK4rlatqizDS8kfWy7eSdtNxdRdJ3yHkG7B4C7wwRAkhrTAH+avY+376w\n/sSM3DtHIwKBgHSJLFY3xoTiW6a/pjYcu59vXs60W6BY4x2rDE34L+T3CILb60Qt\nYcYOe/6OtmAPhlcz2cG+BILX4UUL7NIAzBxn0TethetVKKkinawwTD9hrKWJAAAN\nXglK2zWU45lbI6ARLgDvCVhbf5YJKMgHQZmWySFDLj9+UK+30Kk73RZfAoGAbb5D\nkTX5lVs26ixDYaBOzKI3vsbdDm9tLn/eq2B7Ig0T07zJvbxY8Gl9JXbpOUjfIWq5\ncRa1YvWMun38a2Z93gOl7FwN3TQcVtJM35+18w25XaCSG9P0FTXP2vu8gzdjHNvX\nhcA4JnV4c07YWHb5P8x6ax6I9QQiEntrP4x5zxsCgYEAxFfjRtonkUKZGzqPFWyL\nkUDFpI4vCb82Etc2J7KeQszVtAGDIn2WLqkGvzFIzyXVfMZA1o8V7mVcxf2DeTSc\n1fBnptwv1MzObAa5Vsq5lFdTiyuyq0Sd8Ap2hoV9ymDb2wNfqn97VsyeMdbWIV3F\n+2dboFPaapow0JTnyqW1qBY=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ll8nk@oncx-test-nofitication-app.iam.gserviceaccount.com",
  "client_id": "112380529290534237463",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ll8nk%40oncx-test-nofitication-app.iam.gserviceaccount.com"
}

// var serviceAccount = require('./oncx-noti-app-test.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
