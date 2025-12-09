from PIL import Image  # Pillow(PIL) is a lib for manipulating images

# Image is used to open image files,convert color modes,resize,etc.

import numpy as np  # because CLIP returns embeddings in NumPy arrays

from app.ml.clip_model import model  # import preloaded CLIP model


def gen_img_embedding(image_path: str):
    #load image from path and gives a PIL Image obj
    img = Image.open(image_path).convert("RGB")  #RGB ensures compatibility
    embedding = model.encode(img) #return a 512D embedding vector
    return np.array(embedding).tolist()  # convert numpy -> list for JSON/db
