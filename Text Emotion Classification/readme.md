# Emotion Detection Using Text Classification

## Project Overview

This project aims to build a machine learning model that can predict the emotion expressed in a given text. The model is trained on a dataset containing sentences labeled with corresponding emotions. The primary goal is to classify text data into predefined emotion categories using Natural Language Processing (NLP) techniques and deep learning models.

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

You can install the required packages using pip:

```bash
pip install pandas numpy keras tensorflow scikit-learn
