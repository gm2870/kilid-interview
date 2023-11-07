# kilid-front-interview-farzanegan

## Description

You will create a standalone application with Angular 16 and material design. You can use tailwindCSS or any other similar library for utility classes.
Feel free to ask questions if you needed any further information.

We will track your progress so please:

- Do not commit too many files at once
- Write precise and understandable commit messages

## Project

### Create Employee

`We want to know you can work with reactive forms and different types of validation.`

Implement a form to create new Employees.

- An Employee has

  - Id (auto-generated unique field)
  - First Name *
  - Last Name *
  - Phone Number *
  - Position *
  - IsActive *
  - Date of birth

- Fields with * are required
- Phone number must start with 09, eg: 09121234567 (Pattern Validator)
- An Employee can hold one position at a time and the options are (You may want to define Enum for position)
  - Front End Developer
  - Backend Developer
  - Data Analyst
  - Data Engineer
- An Employee IsActive status will be a boolean

### Storing Data

`We want to know you can work with data and services in angular.`

Please use local storage as your database.

It will be good to have a service just to handle writing and reading data from local storage and another service to implment CRUD.

- LocalStorageService
- EmployeeService

EmployeeService must have these methods:

- create: it will create an employee with a unique Id
- update: it will update an existing employee
- getAll: it will return all the existing employees
- getById: it will get an id and return the employee with that id
- delete: it will get an id and remove the employee with that id

### Showing and Filtering Data

`We want to know if you can show data in a table and filter them.`

Show all the employees at a table. The table must have these columns:

- Full Name (First Name + Last Name)
- Phone Number
- Position
- Active

Users can search the table and filter results with these values:

- Full Name (text input)
- Position (select option)

### Updating and Deleting Data

`We want to know if you can refactor and change the code to add functionality to it!`

- The form you built earlier for creating an Employee must be used as an update form too. If you provide initial data it will act as an update form.
- Add a button to the Employees table to delete an employee.

## PLUS

Doing any of these plus tasks is not necessary but, it will have an impact on your code reviewers.

- Using signals
- Adding a password field to the Employee, with two input fields in the form to repeat the password.
- Adding 1000ms delay to CRUD actions
- Delete actions usually have a confirmation, see if you can create a confirmation procedure with a custom Angular
  Directive. The directive can be added to any button and will show a popup, modal or dialogue before the delete action. You can do it in any other way that you feel comfortable with. 



You have two days after your initial commit to finish the task. If you wanted to extend the time, contact us.
### Good Luck!
