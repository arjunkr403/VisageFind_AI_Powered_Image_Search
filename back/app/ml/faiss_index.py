import numpy as np #FAISS requires input vectors to be a NumPy array of type float32.
import faiss #(facebook AI similarity search) search for embeddings of multimedia docs that are similar to each other

def build_faiss_index(vectors: list):
    #all embeddings are of same length
    dimension=len(vectors[0]) 
    
    # - Flat index = brute-force search but extremely fast in C++
    # - L2 distance = Euclidean distance (default choice for CLIP embeddings)
    # - Best for small/medium datasets (<100k images)
    index=faiss.IndexFlatL2(dimension)
    
    # Convert vectors to NumPy array and ensure float32 datatype
    # FAISS ONLY accepts float32 arrays. Python lists or float64 numpy arrays will fail.
    vectors_np = np.array(vectors).astype('float32')
    
    # Add all vectors to the FAISS index
    # FAISS internally stores them for efficient similarity search.
    index.add(vectors_np)
    
    return index



#High-Lvl Overview

#1.Takes all your stored image embeddings

#2. Creates a FAISS index (a search engine)

#3. Adds all vectors into the index

#4. Returns the ready-to-use FAISS index 

