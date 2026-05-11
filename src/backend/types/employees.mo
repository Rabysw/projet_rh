import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type EmploymentStatus = {
    #Active;
    #Inactive;
    #OnLeave;
  };

  public type ContractType = {
    #CDI;
    #CDD;
    #Internship;
    #Freelance;
    #PartTime;
  };

  public type HRRole = {
    #HRAdmin;
    #HRManager;
    #Manager;
    #Employee;
    #Direction;
  };

  public type Employee = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
    departmentId : ?Nat;
    hrRole : HRRole;
    contractType : ContractType;
    status : EmploymentStatus;
    profilePicture : ?Storage.ExternalBlob;
    createdAt : Int;
    updatedAt : Int;
  };

  public type EmployeeInput = {
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
    departmentId : ?Nat;
    hrRole : HRRole;
    contractType : ContractType;
    status : EmploymentStatus;
  };

  public type EmployeeFilter = {
    search : ?Text;
    departmentId : ?Nat;
    status : ?EmploymentStatus;
    hrRole : ?HRRole;
  };

  public type PaginationParams = {
    page : Nat;
    pageSize : Nat;
  };

  public type PaginatedEmployees = {
    employees : [Employee];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
