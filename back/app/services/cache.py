import redis   # allows you to connect to a Redis server
from app.config import settings

redis_client = redis.Redis(
    host = settings.REDIS_HOST,
    port = settings.REDIS_PORT,
    decode_responses=True  # without decode_responses Redis returns bytes
)

#  For example
#  redis_client.set("key", "value")
#  redis_client.get("key")

# Auto handles- TCP connection,reconnecting if server restarts,etc.