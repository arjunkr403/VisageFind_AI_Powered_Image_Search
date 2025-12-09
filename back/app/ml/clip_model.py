from sentence_transformers import SentenceTransformer

def load_clip_model():
    #refers to CLIP=Contrastive Language Image Pretraining , ViT-32 Vision Transformer
    model=SentenceTransformer("clip-ViT-B-32") 
    #encodes images into a 512-dimentional vector
    return model

model=load_clip_model() #loading the model globally