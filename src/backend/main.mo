import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import EmpTypes "types/employees";
import DeptTypes "types/departments";
import EmployeesApi "mixins/employees-api";
import DepartmentsApi "mixins/departments-api";
import DashboardApi "mixins/dashboard-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  let employees = Map.empty<Nat, EmpTypes.Employee>();
  let departments = Map.empty<Nat, DeptTypes.Department>();

  include EmployeesApi(accessControlState, employees);
  include DepartmentsApi(accessControlState, departments, employees);
  include DashboardApi(accessControlState, employees, departments);
};
