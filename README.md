# Voice API 🎤

Simple Node.js + Express API to upload, list, and play voice files.

## Endpoints

- `POST /upload?name=filename.mp3` → Upload voice file
- `GET /voice/list` → Get list of uploaded voices
- `GET /voice/:name` → Play/download specific voice

## Run locally
```bash
npm install
npm start
