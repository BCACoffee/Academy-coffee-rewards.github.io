Christian Academy Coffee Rewards — Firebase + QR (PWA)
1) In index.html and customer.html, replace the demo firebaseConfig with your real Firebase config.
2) Host the repo (Netlify). Open index.html for staff. Student links use customer.html?id=...
3) Firestore rules (simple demo):
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /customers/{id} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2030,1,1);
    }
  }
}
