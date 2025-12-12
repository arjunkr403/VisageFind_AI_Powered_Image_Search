import app.ml.cpp_preprocess as cpp #c++ fast preprocessing
from PIL import Image # for image manipulation
import numpy as np  # because CLIP returns embeddings in NumPy arrays
from app.ml.clip_model import model  #  preloaded CLIP model

def gen_img_embedding(image_path: str):
    
    arr= cpp.preprocess_image(image_path) #returns NumPy array (224x224x3)
    
    img = Image.fromarray(arr.astype("uint8")) # Convert NumPy -> PIL
    
    embedding = model.encode(
        [img],                   
        convert_to_numpy=True    
    )[0]  # take the first element
    #encoding using CLIP vision encoder & return a 512D embedding vector
    
    return np.array(embedding).tolist()  # convert numpy -> list for JSON/db




# image_path
#  → C++ preprocess → NumPy
#  → PIL Image
#  → model.encode([PIL], convert_to_numpy=True)
#  → numpy vector
#  → list
