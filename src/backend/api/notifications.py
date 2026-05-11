from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict
from auth.auth import UserRole

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def notify_user(self, user_id: int, message: dict):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(message)

    async def broadcast_to_role(self, role: str, message: dict, users_list: list):
        """Envoie une notification à tous les utilisateurs d'un certain rôle"""
        for user in users_list:
            if user.role == role:
                await self.notify_user(user.id, message)

manager = ConnectionManager()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            # Maintenir la connexion ouverte
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user_id)