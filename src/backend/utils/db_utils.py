import time
import asyncio
import inspect
from functools import wraps
from httpx import RemoteProtocolError

def retry_on_disconnect(max_retries=3, delay=1):
    def decorator(func):
        if inspect.iscoroutinefunction(func):
            @wraps(func)
            async def async_wrapper(*args, **kwargs):
                last_exception = None
                for i in range(max_retries):
                    try:
                        return await func(*args, **kwargs)
                    except Exception as e:
                        error_msg = str(e)
                        is_disconnect = (
                            "Server disconnected" in error_msg or 
                            "RemoteProtocolError" in error_msg or
                            "Connection reset by peer" in error_msg or
                            "Broken pipe" in error_msg or
                            isinstance(e, RemoteProtocolError)
                        )
                        if is_disconnect:
                            last_exception = e
                            print(f"⚠️ Déconnexion serveur détectée ({type(e).__name__}) dans async {func.__name__}. Tentative {i+1}/{max_retries}...")
                            await asyncio.sleep(delay * (i + 1))
                            continue
                        raise e
                raise last_exception
            return async_wrapper
        else:
            @wraps(func)
            def sync_wrapper(*args, **kwargs):
                last_exception = None
                for i in range(max_retries):
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        error_msg = str(e)
                        is_disconnect = (
                            "Server disconnected" in error_msg or 
                            "RemoteProtocolError" in error_msg or
                            "Connection reset by peer" in error_msg or
                            "Broken pipe" in error_msg or
                            isinstance(e, RemoteProtocolError)
                        )
                        if is_disconnect:
                            last_exception = e
                            print(f"⚠️ Déconnexion serveur détectée ({type(e).__name__}) dans sync {func.__name__}. Tentative {i+1}/{max_retries}...")
                            time.sleep(delay * (i + 1))
                            continue
                        raise e
                raise last_exception
            return sync_wrapper
    return decorator
