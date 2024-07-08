import pandas as pd
import numpy as np
import keras
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential, load_model
import pickle

with open('model/tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

with open('model/label_encoder.pkl', 'rb') as handle:
    label_encoder = pickle.load(handle)

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

# Preprocess the input text
input_text = "i feel beautifully emotional knowing that these women of whom i knew just a handful were holding me and my baba on our journey"

input_sequence = tokenizer.texts_to_sequences([input_text])
padded_input_sequence = pad_sequences(input_sequence, maxlen=max_length)
prediction = model.predict(padded_input_sequence)
predicted_label = label_encoder.inverse_transform([np.argmax(prediction[0])])
print(f"User Input Text :-", input_text)
print(f"Predict Emotion :-", predicted_label[0])
