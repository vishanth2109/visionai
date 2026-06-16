import numpy as np
import tensorflow as tf

from tensorflow.keras.applications.mobilenet_v2 import (
    MobileNetV2,
    preprocess_input,
    decode_predictions,
)

from PIL import Image

mobilenet = MobileNetV2(weights="imagenet")


def predict_image(image_file):
    image = Image.open(image_file).convert("RGB")

    image = image.resize((224, 224))

    img_array = tf.keras.preprocessing.image.img_to_array(image)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = preprocess_input(img_array)

    predictions = mobilenet.predict(img_array)

    decoded = decode_predictions(predictions, top=3)[0]

    return [
        {
            "label": label.replace("_", " "),
            "confidence": float(score),
        }
        for (_, label, score) in decoded
    ]