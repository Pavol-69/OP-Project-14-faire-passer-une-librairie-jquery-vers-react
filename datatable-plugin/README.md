## DataTable Plugin

## 1. Description

    This plugin has been made to display data into a table with the following features :
        - Possibility to search, with a text input, any element on the table
        - Possibility to range the data by alphabetical order, or the opposite order
        - Possibility to display 5, 10 or 20 rows on each page
        - Possibility to go to the next or previous page
        - Possibility to go to the first or last page
        - Possibility to modify an employee informations
        - Possibility to delete an employee from the list

## 2. Necessary props

    - The data, which is a list of elements [{}, {}, {}, ...]
        => Could be a employees list for example, with firstName, lastName, birthDate, ...
        => Each element should have an id
    - All the columns name, with which element data we are refering to
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
    - The function to delete the row
    - The function to update the row
    - The Modal we want see to change row info, which should have as props :
        - showModal -> Boolean value
        - SetShowModal
        - rowValue
        - setRowValue
        - handleUpdateRow

## Versions

## Version 1.0.1

    - Correction of Readme
    - Fix search function bug
