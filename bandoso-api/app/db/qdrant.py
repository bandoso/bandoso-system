from app.core.embedding import embeddings
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
from app.config import config
from langchain_qdrant import QdrantVectorStore

# Initialize Qdrant client using config
client = QdrantClient(host=config.QDRANT_HOST, port=config.QDRANT_PORT)

def setup_collections():
    """Setup Qdrant collections if they don't exist"""
    try:
        # CHUNK COLLECTION
        if not client.collection_exists(config.CHUNK_COLLECTION_NAME):
            client.create_collection(
                collection_name=config.CHUNK_COLLECTION_NAME,
                vectors_config=VectorParams(size=config.EMBEDDING_SIZE, distance=Distance.COSINE),
            )

        # CACHE COLLECTION
        if not client.collection_exists(config.CACHE_COLLECTION_NAME):
            client.create_collection(
                collection_name=config.CACHE_COLLECTION_NAME,
                vectors_config=VectorParams(size=config.EMBEDDING_SIZE, distance=Distance.COSINE),
            )
    except Exception as e:
        print(f"Error setting up collections: {e}")
        # Don't fail startup, collections will be created when needed

def get_doc_vector_store():
    """Get document vector store"""
    return QdrantVectorStore(
        client=client,
        collection_name=config.CHUNK_COLLECTION_NAME,
        embedding=embeddings,
    )

def get_cache_vector_store():
    """Get cache vector store"""
    return QdrantVectorStore(
        client=client,
        collection_name=config.CACHE_COLLECTION_NAME,
        embedding=embeddings,
    )

# Initialize vector stores
doc_vector_store = None
cache_vector_store = None

def init_vector_stores():
    """Initialize vector stores"""
    global doc_vector_store, cache_vector_store
    setup_collections()
    doc_vector_store = get_doc_vector_store()
    cache_vector_store = get_cache_vector_store()