const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY); // Replace with your service account JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://giftly-c8dda-default-rtdb.firebaseio.com"
});

const db = admin.database();
const app = express();

app.use(bodyParser.json());

// Routes

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'static')));

// Define a fallback route for 404 errors
app.use((req, res) => {
  res.status(404).send('404: Page Not Found');
});

// Create a new wantlist
app.post('/wantlist', (req, res) => {
    const { userId, title, items } = req.body;
    const ref = db.ref('wantlists').push();
    ref.set({
        userId,
        title,
        items: items || []
    }, (error) => {
        if (error) {
            res.status(500).send({ success: false, error: error.message });
        } else {
            res.send({ success: true, id: ref.key });
        }
    });
});

// Get a user's wantlists
app.get('/wantlists/:userId', (req, res) => {
    const userId = req.params.userId;
    db.ref('wantlists').orderByChild('userId').equalTo(userId).once('value', (snapshot) => {
        res.send(snapshot.val() || {});
    }, (error) => {
        res.status(500).send({ success: false, error: error.message });
    });
});

// Add an idea to a wantlist (hidden from the owner)
app.post('/wantlist/:listId/ideas', (req, res) => {
    const { listId } = req.params;
    const { idea } = req.body;
    const ref = db.ref(`hiddenIdeas/${listId}`).push();
    ref.set({ idea }, (error) => {
        if (error) {
            res.status(500).send({ success: false, error: error.message });
        } else {
            res.send({ success: true, id: ref.key });
        }
    });
});

// Get ideas for a wantlist (not visible to the owner)
app.get('/wantlist/:listId/ideas', (req, res) => {
    const { listId } = req.params;
    db.ref(`hiddenIdeas/${listId}`).once('value', (snapshot) => {
        res.send(snapshot.val() || {});
    }, (error) => {
        res.status(500).send({ success: false, error: error.message });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
