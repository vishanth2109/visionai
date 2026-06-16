import cv2
import numpy as np
import tensorflow as tf
from PIL import Image


def generate_gradcam(model, image_path):
    image = Image.open(image_path).convert("RGB")
    image = image.resize((224, 224))

    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)

    return img_array