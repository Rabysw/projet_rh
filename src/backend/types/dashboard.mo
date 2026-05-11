module {
  public type EmployeeStatusSummary = {
    active : Nat;
    inactive : Nat;
    onLeave : Nat;
    total : Nat;
  };

  public type DepartmentStat = {
    departmentId : Nat;
    departmentName : Text;
    employeeCount : Nat;
  };

  public type DashboardStats = {
    statusSummary : EmployeeStatusSummary;
    departmentStats : [DepartmentStat];
  };
};
