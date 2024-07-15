from flask import Flask, request, render_template, redirect, url_for
import pickle
import numpy as np
import pandas as pd
from keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

with open('model/tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

with open('model/label_encoder.pkl', 'rb') as handle:
    label_encoder = pickle.load(handle)

# Define a dictionary to map emotions to image filenames
emotion_images = {
    'joy': 'joy.png',
    'sadness': 'sadness.png',
    'anger': 'anger.png',
    'fear': 'fear.png',
    'surprise': 'surprise.png',
    'disgust': 'disgust.png',
    'love': 'love.png'
}

# Load data
data = pd.read_csv("train.txt", sep=';')
data.columns = ["Text", "Emotions"]

texts = data["Text"].tolist()
labels = data["Emotions"].tolist()

# Tokenize the text data
tokenizer.fit_on_texts(texts)

sequences = tokenizer.texts_to_sequences(texts)
max_length = max([len(seq) for seq in sequences])
padded_sequences = pad_sequences(sequences, maxlen=max_length)

# Encode the string labels to integers
labels = label_encoder.fit_transform(labels)

# Load the model and tokenizer for predictions
model = load_model('model/emotion_model2.h5')

@app.route('/')
def home():
    return render_template('index.html', prediction=None)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.form['message']
        sequences = tokenizer.texts_to_sequences([message])
        padded = pad_sequences(sequences, maxlen=max_length)
        prediction = model.predict(padded)
        predicted_label = label_encoder.inverse_transform([np.argmax(prediction[0])])[0]
        confidence = round(np.max(prediction[0]) * 100, 3)   # Confidence as a percentage
        image_path = url_for('static', filename=f'images/{emotion_images[predicted_label]}')
        # print(image_path)
        return render_template('index.html', prediction=predicted_label, image_path=image_path,confidence=confidence)

@app.route('/reset')
def reset():
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
