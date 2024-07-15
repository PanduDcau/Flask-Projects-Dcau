# Emotion Detection Using Text Classification

## Project Overview

This project aims to build a ML model that can predict the emotion expressed in a given text. The model is trained on a dataset containing sentences labeled with corresponding emotions. The primary goal is to classify text data into predefined emotion categories using Natural Language Processing (NLP) techniques and deep learning models.

## Project Structure

- **train.txt**: The dataset file containing text and corresponding emotion labels.
- **textClassify.py**: The main Python script for preprocessing the data, training the model, and making predictions.
- **model/emotion_model2.h5**: The trained Keras model saved in HDF5 format.
- **model/tokenizer.pkl**: The tokenizer used to convert text into sequences.
- **model/label_encoder.pkl**: The label encoder used to convert string labels to integers.

## Requirements

- pandas
- numpy
- keras
- tensorflow
- scikit-learn
- mathplotlib

You can install the required packages using pip:

```bash
pip install pandas numpy keras tensorflow scikit-learn
```

## Data Preprocessing

### Load Data
The data is loaded from `train.txt` file, which contains text and corresponding emotion labels separated by a semicolon (`;`).

### Tokenization
The text data is tokenized using `Tokenizer` from Keras to convert the sentences into sequences of integers.

### Padding
The sequences are padded to ensure uniform input length for the model.

### Label Encoding
The emotion labels are encoded into integers using `LabelEncoder` from scikit-learn.

## Model Training
The model is a Sequential Neural Network consisting of the following layers:

- **Embedding Layer**: Converts integer sequences to dense vectors of fixed size.
- **Flatten Layer**: Flattens the input.
- **Dense Layer**: Fully connected layer with ReLU activation.
- **Output Layer**: Fully connected layer with softmax activation to output probability distribution over emotion classes.

The model is compiled using the Adam optimizer and categorical cross-entropy loss. It is trained on the preprocessed data with an 80-20 train-test split.

## Saving the Model

After training, the model is saved in HDF5 format (`emotion_model2.h5`). The tokenizer and label encoder are also saved using `pickle` for consistent preprocessing during predictions.

## Making Predictions

To make predictions on new input text:

1. Load the trained model, tokenizer, and label encoder.
2. Preprocess the input text (tokenize and pad the sequence).
3. Use the model to predict the emotion type.
4. Decode the predicted label using the label encoder.
