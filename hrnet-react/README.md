# HRNet with React

This web app has been develop in order to replace an old app made with jQuery

## 1. Backend - Server

    There is no dedicated backend, all data is stored in a Redux store, and will be reinitiate at each refresh

    => We can play with the initial data set on store.jsx

## 2. Frontend - Client

## 2.1 Launch the app

    2 possibilities :
        - npm run dev => nativ code will be readen
        - npm run preview => build code will be readen

## 2.2 Plugins used for this app

    In order to replace the DropDownMenu, DatePicker, and Modal plugins from jQuery, we imported some plugin from Material-UI (https://mui.com/material-ui/)

        - DropDownMenu => Select & MenuItem (https://mui.com/material-ui/react-select/)
        - DatePicker (https://mui.com/x/react-date-pickers/)
        - Modal (https://mui.com/material-ui/react-modal/)
        - We also add another one for input in order to have the same style (https://mui.com/material-ui/react-text-field/)

## 2.3 Plugin coded from scratch

    One jQuery was not replaced by another existing one, but has been coded from scratch : the DataTable

        - Necessary props : the data (here, the employees list), and all the columns name, with which element data we are refering to
            => Should be like the following example :
                const columns = [
                    { name: "First Name", selector: (row) => row.firstName },
                    { name: "Last Name", selector: (row) => row.lastName },
                    { name: "Start Date", selector: (row) => row.startDate },
                    { name: "Department", selector: (row) => row.department },
                    { name: "Date of Birth", selector: (row) => row.birthDate },
                    { name: "Street", selector: (row) => row.street },
                    { name: "City", selector: (row) => row.city },
                    { name: "State", selector: (row) => row.state },
                    { name: "Zip Code", selector: (row) => row.zipCode },
                ];

        - Features :
            - Possibility to search, with a text input, any element on the table
            - Possibility to range the data by alphabetical order, or the opposite order
            - Possibility to display 5, 10 or 20 rows on each page
            - Possibility to modify an employee informations
            - Possibility to delete an employee from the list

    => Due to DataTable view, the minimum width has been set to 1150px for more visibility, ce can still scroll on the horizontal axis on small screen
