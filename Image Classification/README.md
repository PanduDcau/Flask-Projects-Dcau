# Introduction

<br></br>
Take me to the [code and Jupyter Notebook](www) for Image Recognition!

<br></br>
This article explores a Machine Learning algorithm called Convolution Neural Network (CNN), it's a common Deep Learning technique used for image recognition and classification.

<br></br>
<div align="center">
<img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Data/single_prediction/cat_or_dog_1.jpg" height=300 alt="Dog">

<img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Data/single_prediction/cat_or_dog_2.jpg" height=300 alt="Cat">
</div>




<br></br>
You are provided with a dataset consisting of 5,000 Cat images and 5,000 Dog images. We are going to train a Machine Learning model to learn differences between the two categories. The model will predict if a new unseen image is a Cat or Dog. The code architecture is robust and can be used to recognize any number of image categories, if provided with enough data.



<br></br>

# Convolution Neural Networks (CNN)

<br></br>
Convolution Neural Networks are good for pattern recognition and feature detection which is especially useful in image classification. Improve the performance of Convolution Neural Networks through hyper-parameter tuning, adding more convolution layers, adding more fully connected layers, or providing more correctly labeled data to the algorithm.


<br></br>
Create a Convolution Neural Network (CNN) with the following steps:

1. Convolution
2. Max Pooling
3. Flattening
4. Full Connection


<br></br>
Check out [How to implement a neural network](http://peterroelants.github.io/posts/neural_network_implementation_intermezzo02/), also take a look at [A Friendly Introduction to Cross-Entropy Loss](http://rdipietro.github.io/friendly-intro-to-cross-entropy-loss/).


<br></br>
Convolution is a function derived from two other functions through an integration that expresses how the shape of one is modified by the other.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/01%20-%20Convolution%20Equation.png" alt="Convolution-Equation"></div>


<br></br>
For image recognition, we convolve the input image with Feature Detectors (also known as Kernel or Filter) to generate a Feature Map (also known as Convolved Map or Activation Map). This reveals and preserves patterns in the image, and also compresses the image for easier processing. Feature Maps are generated by element-wise multiplication and addition of corresponding images with Filters consisting of multiple Feature Detectors. This allows the creation of multiple Feature Maps.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/02%20-%20CNN%20Example.png" width="500" alt="CNN-Example"></div>


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/03%20-%20CNN%20Feature%20Map.png" width="500" alt="CNN-Feature"></div>


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/04%20-%20CNN%20Multi%20Feature%20Map.png" width="500" alt="Feature-Map"></div>


<br></br>
This [Image Convolution Guide](https://docs.gimp.org/en/plug-in-convmatrix.html) allows you to play with various filters applied to an image. Edge Detect is a useful filters in Machine Learning. The algorithm creates filters that are not recognizable to humans, perhaps we learn with similar techniques in our subconscious. Feature Maps preserve spatial relationships between pixels throughout processing.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/05%20-%20Edge%20Detect%20Filter.png" width="500" alt="Edge-Detect"></div>



<br></br>

# Rectified Linear Units (ReLU)

<br></br>
Rectifier Functions are applied to Convolution Neural Networks to increases non-linearity (breaks up linearity). This is an important step for image recognition with CNNs. Images are usually non-linear due to sharp transition of pixels, different colors, etc. ReLU functions help amplify the non-linearity of images so the ML model has an easier time finding patterns. 

<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/06%20-%20ReLU%20Layer.png" alt="ReLU"></div>


<br></br>
### Before ReLU

<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/07%20-%20Before%20ReLU.png" alt="Before-ReLU"></div>


<br></br>
###  After ReLU

<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/08%20-%20After%20ReLU.png" alt="After-ReLU"></div>


<br></br>
In the above example, the ReLU operation removed the Black Pixels so there's less White to Gray to Black transitions. Borders now have more abrupt Pixel changes. Microsoft argues that the using their Modified Rectifier Function works better for CNNs.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/09%20-%20Modified%20Rectifier.png" alt="Rectifier"></div>



<br></br>

# Max Pooling

<br></br>
Max Pooling finds the largest value of small grids in the Feature Map, this creates a Pooled Feature Map. Average Pooling (sub-sampling) takes the average values of small grids.  It makes sure that your Neural Network has Spatial Invariance (able to find learned features in new images that are slightly varied or distorted). Max Pooling provides resilience against shifter or rotated features. It also further distills Feature Maps (reduces size) while preserving spatial relationships of pixels. Removing unnecessary information also helps prevent overfitting. Read 'Evaluation of Pooling Operations in Convolutional Architectures for Object Recognition.pdf'. Here is an online [CNN Visualization Tool](http://scs.ryerson.ca/~aharley/vis/conv/flat.html).


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/10%20-%20Max%20Pooling.png" alt="Pooling"></div>



<br></br>

# Flattening

<br></br>
Flattening puts values of the pooled Feature Map matrix into a 1-D vector. This makes it easy for the image data to pass through an Artificial Neural Network algorithm.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/11%20-%20Flattening.png" width="400" alt="Flattening"></div>


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/12%20-%20Flattening%202.png" width="400" alt="Flattening-2"></div>



<br></br>

# Full Connection

<br></br>
This is when the output of a Convolution Neural Network is flattened and fed through a classic Artificial Neural Network. It's important to note that CNNs require fully-connected hidden layers where as regular ANNs don't necessarily need full connections.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/13%20-%20Full%20Connection.png" width="400" alt="Full-Connection"></div>


<br></br>
The process of CNN back-propagation adjusts weights of neurons, while adjusting Feature Maps.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/14%20-%20CNN%20Backprop.png" width="400" alt="Back-Propagation"></div>


<br></br>
When it's time for the CNN to make a decision between Cat or Dog, the final layer neurons 'vote' on probability of an image being a Cat or Dog (or any other categories you show it). The Neural Network adjusts votes according to the best weights it has determined through back-propagation.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/15%20-%20CNN%20Weighted%20Votes.png" alt="Weighted-Votes"></div>


<br></br>
Here is a summary of every step of a CNN, don't forget about the Rectifier Function that removes linearity in Feature Maps, also remember that the hidden layers are fully connected.


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/16%20-%20CNN%20Full.png" alt="CNN-Full"></div>



<br></br>

# Pre-Processing (Images Augmentation)

<br></br>
This step modifies images to prevent over-fitting. This data augmentation trick can generate tons more data by applying random modifications to existing data like shearing, stretching, zooming, etc. This makes your dataset and algorithm more robust and generalized.



<br></br>

# Softmax and Cross-Entropy Cost Function

<br></br>
The Softmax function shown below is used to make sure that the probabilities of the output layer add up to one, this gives us a percentage guess. Watch this Geoffrey Hinton [video about the SoftMax Function](https://www.youtube.com/watch?v=mlaLLQofmR8).


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/18%20-%20Softmax%20Function.png" alt="SoftMax"></div>


<br></br>
We had previously used the Mean Squared Error (MSE) Cost Function. For CNNs, it's better to use the Cross-Entropy Function as your Cost Function. We use Cross-Entropy as a Loss Function because it has a 'Log' term which helps amplify small Errors and better guide gradient descent.

<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/17%20-%20Log%20Loss%20Function.png" alt="Loss-Function"></div>


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/19%20-%20Cross%20Entropy%20Function.png" width="200" alt="Cross-Entropy"></div>


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/20%20-%20Cross%20Entropy%20Plug%20In.png" width="400" alt="Cross-Entropy-2"></div>


<br></br>
<div align="center"><img src="https://raw.githubusercontent.com/AMoazeni/Machine-Learning-Image-Recognition/master/Jupyter%20Notebook/Images/21%20-%20Error%20Comparison.png" alt="Error"></div>



<br></br>

# Code

<br></br>
Download the code and run it with 'Jupyter Notebook' or copy the code into the 'Spyder' IDE found in the [Anaconda Distribution](https://www.anaconda.com/download/). 'Spyder' is similar to MATLAB, it allows you to step through the code and examine the 'Variable Explorer' to see exactly how the data is parsed and analyzed. Jupyter Notebook also offers a [Jupyter Variable Explorer Extension](http://volderette.de/jupyter-notebook-variable-explorer/) which is quite useful for keeping track of variables.


<br></br>
```shell
$ git clone https://github.com/AMoazeni/Machine-Learning-Image-Recognition.git
$ cd Machine-Learning-Image-Recognition
```

<br></br>
<br></br>
<br></br>
<br></br>