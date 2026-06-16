from models.mobilenet import predict as mobilenet_predict

MODEL_REGISTRY = {
    "mobilenet": mobilenet_predict,
}