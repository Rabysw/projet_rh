module {
  public type Department = {
    id : Nat;
    name : Text;
    description : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type DepartmentInput = {
    name : Text;
    description : Text;
  };

  public type DepartmentWithCount = {
    id : Nat;
    name : Text;
    description : Text;
    employeeCount : Nat;
    createdAt : Int;
    updatedAt : Int;
  };
};
