from pydantic import BaseModel

class LeaveApprovalRequest(BaseModel):
    comment: str = ""